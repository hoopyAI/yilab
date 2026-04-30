# YiLab — 一个产品人的易经笔记

> 易 (Yi) = 变化 · Lab = 实验室
> 把 64 卦当成现代人的决策框架来读。

🔗 **Live**: [yilab.hoopyai.space](https://yilab.hoopyai.space)

## 这是什么

一个用产品人/科技人视角学易经的网站。义理派打底，不走玄学/算命路线——把卦象当作"古人留下来的决策框架"来读。

- 64 卦速查与卦象解读
- 学习路径（曾仕强 → 傅佩荣 → 朱熹《周易本义》→ 系辞传）
- 卦例笔记 / 复盘记录

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
