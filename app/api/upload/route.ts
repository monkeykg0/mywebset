import { createClient } from '@/lib/supabase/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { NextResponse } from 'next/server'

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

// 请求体: { filename: string, contentType: string }
// 返回: { uploadUrl: string, publicUrl: string }
export async function POST(request: Request) {
  // 验证用户已登录
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  const { filename, contentType } = await request.json()
  if (!filename || !contentType) {
    return NextResponse.json({ error: '缺少参数' }, { status: 400 })
  }

  // 生成唯一的文件路径，避免覆盖
  const ext = filename.split('.').pop()
  const key = `uploads/${user.id}/${Date.now()}.${ext}`

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: key,
    ContentType: contentType,
  })

  // 生成 15 分钟有效的预签名上传 URL
  const uploadUrl = await getSignedUrl(r2, command, { expiresIn: 900 })
  const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`

  return NextResponse.json({ uploadUrl, publicUrl })
}
