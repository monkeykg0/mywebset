/**
 * 上传 public/ 目录下的图片到 Cloudflare R2
 * 用法：node scripts/upload-to-r2.mjs
 */

import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// 读取 .env.local
const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const envPath = join(rootDir, ".env.local");

const env = {};
try {
  const content = readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    env[key] = value;
  }
} catch {
  console.error("❌ 无法读取 .env.local，请确保文件存在");
  process.exit(1);
}

const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL } = env;

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
  console.error("❌ R2 配置不完整，请检查 .env.local");
  process.exit(1);
}

const client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

const MIME_MAP = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".avif": "image/avif",
};

// 是否跳过已存在的文件（true = 增量上传，false = 全量覆盖）
const SKIP_EXISTING = process.argv.includes("--skip-existing");

function getAllFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function fileExistsInR2(key) {
  try {
    await client.send(new HeadObjectCommand({ Bucket: R2_BUCKET_NAME, Key: key }));
    return true;
  } catch {
    return false;
  }
}

async function uploadFile(filePath, key) {
  const ext = extname(filePath).toLowerCase();
  const contentType = MIME_MAP[ext] || "application/octet-stream";
  const body = readFileSync(filePath);

  await client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );
}

async function main() {
  const publicDir = join(rootDir, "public");
  const allFiles = getAllFiles(publicDir);

  // 只处理图片
  const imageFiles = allFiles.filter((f) => MIME_MAP[extname(f).toLowerCase()]);

  console.log(`📦 发现 ${imageFiles.length} 个图片文件，准备上传到 R2 bucket: ${R2_BUCKET_NAME}`);
  if (SKIP_EXISTING) console.log("⏭️  模式：跳过已存在文件（增量上传）");
  else console.log("♻️  模式：全量覆盖");

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const filePath of imageFiles) {
    // key 保留 public/ 之后的相对路径，例如 sanguo/caocao.png
    const key = relative(publicDir, filePath).replace(/\\/g, "/");

    if (SKIP_EXISTING) {
      const exists = await fileExistsInR2(key);
      if (exists) {
        console.log(`  ⏭️  跳过  ${key}`);
        skipped++;
        continue;
      }
    }

    try {
      await uploadFile(filePath, key);
      const publicUrl = R2_PUBLIC_URL ? `${R2_PUBLIC_URL}/${key}` : key;
      console.log(`  ✅ 上传  ${key}  →  ${publicUrl}`);
      uploaded++;
    } catch (err) {
      console.error(`  ❌ 失败  ${key}  错误: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n🎉 完成！上传: ${uploaded}  跳过: ${skipped}  失败: ${failed}`);
}

main().catch((err) => {
  console.error("❌ 脚本异常：", err);
  process.exit(1);
});
