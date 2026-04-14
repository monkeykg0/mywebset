# Cloudflare R2 图片上传

## 配置说明

R2 相关配置存放在 `.env.local`，需包含以下字段：

| 变量名 | 说明 |
|--------|------|
| `R2_ACCOUNT_ID` | Cloudflare 账号 ID |
| `R2_ACCESS_KEY_ID` | R2 API Token 的 Access Key |
| `R2_SECRET_ACCESS_KEY` | R2 API Token 的 Secret Key |
| `R2_BUCKET_NAME` | Bucket 名称（当前：`tykwebsite`） |
| `R2_PUBLIC_URL` | 公开访问域名（当前：`https://www.monkeykg.top`） |

## 上传脚本

脚本路径：`scripts/upload-to-r2.mjs`

**功能：**
- 扫描 `public/` 目录下所有图片文件（.png / .jpg / .jpeg / .gif / .webp / .svg / .ico / .avif）
- 保留目录结构上传到 R2，例如 `public/sanguo/caocao.png` → R2 key 为 `sanguo/caocao.png`
- 公开访问地址：`https://www.monkeykg.top/sanguo/caocao.png`

## 使用方式

```bash
# 全量上传（覆盖已存在文件）
node scripts/upload-to-r2.mjs

# 增量上传（跳过 R2 中已存在的文件）
node scripts/upload-to-r2.mjs --skip-existing
```

## 当前已上传文件

首次上传于 2026-04-14，共 16 个文件：

```
sanguo/caocao.png
sanguo/diaochan.png
sanguo/guanyu.png
sanguo/jiaxu.png
sanguo/liubei.png
sanguo/lusu.png
sanguo/lvbu.png
sanguo/machao.png
sanguo/simayi.png
sanguo/sunquan.png
sanguo/xuchu.png
sanguo/yuanshao.png
sanguo/zhangfei.png
sanguo/zhaoyu.png
sanguo/zhouyu.png
sanguo/zhugeliang.png
```

## 新增图片流程

1. 将图片放入 `public/` 对应目录
2. 运行 `node scripts/upload-to-r2.mjs --skip-existing`
3. 在代码中使用 R2 公开地址替代本地路径

```jsx
// 本地路径（开发环境可用）
<img src="/sanguo/caocao.png" />

// R2 地址（推荐生产环境使用）
<img src="https://www.monkeykg.top/sanguo/caocao.png" />
```
