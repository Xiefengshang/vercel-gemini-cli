# Gemini Vercel Proxy

高性能反代 `cloudcode-pa.googleapis.com`，**隐藏源 IP+去除vercel相关headers**，支持流式传输。

## 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/xiefengshang/vercel-gemini-cli)

在 Vercel 项目 → Settings → General：  
Framework Preset 必须是 Next.js  
Build Command 留空（自动检测）  
Output Directory 留空（自动检测）  

## 手动部署

1. **Push 到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "initial"
   git push origin main
