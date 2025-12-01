export const runtime = 'edge';

const TARGET_URL = 'https://cloudcode-pa.googleapis.com/';
const REMOVE_HEADERS = /^(host|referer|x-forwarded-for|x-real-ip|cf-|x-vercel-|x-now-|user-agent)$/i;
const SAFELIST_HEADERS = /^(content-type|authorization|accept|accept-encoding|content-length|origin)$/i;

export const { GET, POST, PUT, DELETE, PATCH, HEAD } = Object.fromEntries(
  ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'].map(method => [
    method,
    async (req: Request, { params }: { params: { path: string[] } }) => {
      // 构建目标 URL（零正则，高性能）
      const url = TARGET_URL + params.path.join('/') + req.url.slice(req.url.indexOf('?') || 0);
      
      // 安全策略：仅允许白名单头 + 移除黑名单头
      const headers = new Headers();
      for (const [key, value] of req.headers.entries()) {
        const lowKey = key.toLowerCase();
        if (SAFELIST_HEADERS.test(lowKey) || (!REMOVE_HEADERS.test(lowKey) && !lowKey.startsWith('x-'))) {
          headers.set(key, value);
        }
      }
      
      // 伪装 User-Agent
      headers.set('User-Agent', 'Google-API-JavaScript/1.0.0');
      
      return fetch(url, {
        method: req.method,
        headers,
        body: req.body,
        cache: 'no-store',
      });
    }
  ])
);
