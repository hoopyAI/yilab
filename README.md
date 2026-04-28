# YiLab — 一个产品人的易经笔记

> 易 (Yi) = 变化 · Lab = 实验室
> 把 64 卦当成现代人的决策框架来读。

## 开发

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 预览。

## 构建静态站

```bash
npm run build
# 静态导出在 ./out 目录，可直接部署到 Cloudflare Pages
```

## 文档

- 设计规范：`docs/specs/2026-04-28-yilab-v1-design.md`
- 学习计划：`docs/learning-plan.md`
- 工作区上下文（给 AI）：`CLAUDE.md`

## 技术栈

- Next.js 16 + React 19 + TypeScript
- CSS Modules + CSS Variables
- 静态导出，部署 Cloudflare Pages
