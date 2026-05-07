'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { Accordions, Accordion } from '@/components/docs/accordion'
import Callout from '@/components/docs/callout'
import {
  Zap,
} from 'lucide-react'

import img0 from './images/1.png'
import img1 from './images/2.png'
import img2 from './images/3.png'
import img3 from './images/4.png'
import img4 from './images/5.png'
import img5 from './images/6.png'
import img6 from './images/7.png'

function CodeBlock({
  children,
  language,
}: {
  children: ReactNode
  language?: string
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
      {language ? (
        <div className="px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-200/70">
          {language}
        </div>
      ) : null}
      <pre className={language ? 'p-4' : 'p-4'}>{children}</pre>
    </div>
  )
}

export default function TransferGuideClient() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="flex items-start gap-3">
          <div className="mt-1 rounded-lg bg-blue-50 border border-blue-100 p-2 text-blue-700">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">快速入门</h1>
          </div>
        </div>

        <div className="mt-6 space-y-10">
          <section>
            <p className="text-gray-600 leading-relaxed text-lg">
              new-api 是一个 AI 模型统一接入网关，兼容 OpenAI API 格式。你只需要一个 API Key 和一个 Base URL，就能通过同一套接口调用 GPT、Claude、Gemini、Kimi 等数十种主流 AI 模型，无需为每家服务商单独管理账号和密钥。
            </p>
            <p className="mt-3 text-gray-600 leading-relaxed text-lg">
              无论你是直接通过代码调用 API，还是使用 Claude Code、OpenClaw 等客户端工具，接入方式都一样简单。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">一、五分钟接入三步走</h2>

            <div className="mt-6 space-y-10">
              <div>
                <h3 className="text-xl font-semibold">Step 1 — 获取你的 API Key</h3>

                <div className="mt-6 space-y-6">
                  <div>
                    <h4 className="text-base font-semibold">1.1 登录 控制台</h4>
                    <p className="mt-2 text-gray-600 text-sm sm:text-[15px]">
                      打开{' '}
                      <a className="text-blue-700 hover:text-blue-800 underline" href="https://monkeykg.zeabur.app" target="_blank" rel="noreferrer">
                        https://monkeykg.zeabur.app
                      </a>
                      ，登录后进入控制台。
                    </p>
                    <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
                      <Image src={img0} alt="登录 EasyRouter 控制台" placeholder="blur" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold">1.2 进入令牌管理，创建令牌</h4>
                    <div className="mt-2 text-gray-600 text-sm sm:text-[15px]">
                      在左侧导航点击「令牌管理」，点击右上角「创建令牌」按钮。
                    </div>
                    <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
                      <Image src={img1} alt="令牌管理页面" placeholder="blur" />
                    </div>
                    <div className="mt-3 overflow-hidden rounded-xl border border-gray-200 bg-white">
                      <Image src={img2} alt="点击「创建令牌」按钮" placeholder="blur" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold">1.3 复制 Base URL 和 API Key</h4>
                    <div className="mt-2 text-gray-600 text-sm sm:text-[15px]">
                      令牌创建后，在令牌列表中可以直接看到：
                    </div>
                    <ul className="mt-3 space-y-2 text-sm sm:text-[15px] text-gray-700 list-disc pl-5">
                      <li>
                        <span className="font-medium">Base URL</span>：<span className="font-mono">https://monkeykg.zeabur.app</span>
                      </li>
                      <li>
                        <span className="font-medium">API Key</span>：以 <span className="font-mono">sk-</span> 开头的密钥（只显示一次，请立即复制保存）
                      </li>
                    </ul>
                    <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
                      <Image src={img4} alt="令牌列表中的 Base URL 和 API Key" placeholder="blur" />
                    </div>
                    <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
                      <Image src={img3} alt="填写令牌信息并确认创建" placeholder="blur" />
                    </div>
                  </div>

                  <Callout type="warn" title="重要提示">
                    API Key 创建后只显示一次，请妥善保存。如果丢失，需要重新创建令牌。
                  </Callout>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Step 2 — 调用第一个 API</h3>
                <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                 new-api 与 OpenAI API 完全兼容，任何支持 OpenAI 的 SDK 或工具，只需把 <span className="font-mono">base_url</span> 和 <span className="font-mono">api_key</span> 换成 EasyRouter 的即可。
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-base font-semibold">2.1 用 curl 快速验证</h4>
                    <div className="mt-3">
                      <CodeBlock language="bash">{`curl https://monkeykg.zeabur.app/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk-你的APIKey" \\
  -d '{
    "model": "gpt-4o",
    "messages": [
      {"role": "user", "content": "你好，介绍一下你自己"}
    ]
  }'`}</CodeBlock>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold">2.2 用 Python（openai SDK）</h4>
                    <div className="mt-3">
                      <CodeBlock language="python">{`from openai import OpenAI

client = OpenAI(
    base_url="https://monkeykg.zeabur.app/v1",
    api_key="sk-你的APIKey"
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "user", "content": "你好，介绍一下你自己"}
    ]
)

print(response.choices[0].message.content)`}</CodeBlock>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold">2.3 查询可用模型列表</h4>
                    <div className="mt-3">
                      <CodeBlock language="bash">{`curl https://monkeykg.zeabur.app/v1/models \\
  -H "Authorization: Bearer sk-你的APIKey"`}</CodeBlock>
                    </div>
                    <p className="mt-3 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                      返回的 <span className="font-mono">id</span> 字段即为调用时使用的 <span className="font-mono">model</span> 参数值。
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Step 3 — 接入你的工具</h3>
                <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                  支持所有兼容 OpenAI API 的客户端和工具，接入三要素：
                </p>

                <div className="mt-4 rounded-xl border border-gray-200 bg-white overflow-hidden">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700 border-b border-gray-200">参数</th>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700 border-b border-gray-200">值</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                          API 地址（Base URL）
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                        https://monkeykg.zeabur.app
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                          API Key
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                          你在控制台创建的令牌
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                          模型名称
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                          从 /v1/models 查询，或参考控制台模型列表
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 space-y-10">
                  <div>
                    <h4 className="text-base font-semibold">cc-switch（推荐新手）：一键配置秘钥</h4>
                    <p className="mt-2 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                      使用 <span className="font-mono">cc-switch</span> 直接把 EasyRouter 的 API Key/地址导入到 Codex，
                      避免手动配置环境变量或逐项填写。
                    </p>

                    <ol className="mt-4 space-y-3 text-sm text-gray-700 list-decimal pl-5">
                      <li>
                        下载一个 cc-switch
                        <div className="mt-2 text-sm">
                          GitHub 仓库：{' '}
                          <a
                            className="text-blue-700 hover:text-blue-800 underline"
                            href="https://github.com/farion1231/cc-switch"
                            target="_blank"
                            rel="noreferrer"
                          >
                            https://github.com/farion1231/cc-switch
                          </a>
                        </div>
                        <div className="mt-1 text-sm">
                          下载地址：{' '}
                          <a
                            className="text-blue-700 hover:text-blue-800 underline"
                            href="https://github.com/farion1231/cc-switch/releases"
                            target="_blank"
                            rel="noreferrer"
                          >
                            https://github.com/farion1231/cc-switch/releases
                          </a>
                        </div>
                      </li>

                      <li>
                        打开后选择右上角「＋」，选择 Codex 供应商自定义配置（也可以在创建密钥的页面直接点“导入配置”一键配置）
                        <div className="mt-3 overflow-hidden rounded-xl border border-gray-200 bg-white">
                          <Image src={img5} alt="图6" placeholder="blur" />
                        </div>
                      </li>

                      <li>
                        API KEY 填写上一步创建得到的 API KEY；API 地址填写{' '}
                        <span className="font-mono">https://monkeykg.zeabur.app</span>
                        <div className="mt-3 overflow-hidden rounded-xl border border-gray-200 bg-white">
                          <Image src={img6} alt="图7" placeholder="blur" />
                        </div>
                      </li>

                      <li>
                        回到主页面点击开启，重新打开 Codex 即可正常使用
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold">💻 Claude Code / Codex CLI（命令行代码助手）</h4>
                    <p className="mt-2 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                      在终端使用 Claude Code 或 Codex CLI 时，设置以下环境变量：
                    </p>
                    <div className="mt-4">
                      <CodeBlock language="bash">{`# Claude Code
export ANTHROPIC_BASE_URL="https://monkeykg.zeabur.app"
export ANTHROPIC_API_KEY="sk-你的APIKey"

# Codex CLI
export OPENAI_BASE_URL="https://monkeykg.zeabur.app/v1"
export OPENAI_API_KEY="sk-你的APIKey"`}</CodeBlock>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold">🦅 OpenClaw（自托管 AI 助手，进阶）</h4>
                    <p className="mt-2 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                      OpenClaw 是一个自托管 AI 助手平台，支持 Telegram、Discord、Feishu 等多渠道接入。在 <span className="font-mono">~/.openclaw/openclaw.json</span> 中添加以下配置：
                    </p>
                    <div className="mt-4">
                      <CodeBlock language="json">{`{
  "models": {
    "mode": "merge",
    "providers": {
      "easyrouter": {
        "baseUrl": https://monkeykg.zeabur.app/v1",
        "apiKey": "sk-你的APIKey",
        "api": "openai-completions",
        "models": [
          { "id": "gpt-4o", "name": "GPT-4o" },
          { "id": "claude-3-5-sonnet", "name": "Claude 3.5 Sonnet" }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "easyrouter/gpt-4o"
      }
    }
  }
}`}</CodeBlock>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold">🍒 Cherry Studio（桌面 AI 客户端，推荐新手）</h4>
                    <ol className="mt-3 space-y-2 text-sm text-gray-700 list-decimal pl-5">
                      <li>下载并安装 Cherry Studio：<a className="text-blue-700 hover:text-blue-800 underline" href="https://cherry-ai.com/download" target="_blank" rel="noreferrer">https://cherry-ai.com/download</a></li>
                      <li>打开「设置」→「模型服务商」→ 添加服务商</li>
                      <li>服务商类型选择 OpenAI（或兼容 OpenAI 的选项）</li>
                      <li>API 地址填写：<span className="font-mono">https://monkeykg.zeabur.app</span></li>
                      <li>API Key 填写你的令牌</li>
                      <li>添加你想使用的模型 ID（可从 <span className="font-mono">/v1/models</span> 查询）</li>
                    </ol>

                    <div className="mt-4">
                      <Callout type="info" title="一键填入">
                        EasyRouter 控制台令牌管理页支持「一键填入 Cherry Studio」快捷操作，在令牌列表点击后 Cherry Studio 会自动填充配置，无需手动输入。
                      </Callout>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold">🔌 其他 OpenAI 兼容工具（通用配置）</h4>
                    <p className="mt-2 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                      任何支持自定义 API 地址的工具，只需按如下三项配置即可接入：
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc pl-5">
                      <li>
                        <span className="font-medium">API 地址 / Base URL</span> → <span className="font-mono">https://monkeykg.zeabur.app/</span>
                      </li>
                      <li>
                        <span className="font-medium">API Key</span> → 你在控制台创建的令牌
                      </li>
                      <li>
                        <span className="font-medium">模型名称</span> → 从 <span className="font-mono">/v1/models</span> 查询后填写
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold">二、API 能力一览</h2>
            <p className="mt-2 text-gray-600 text-sm sm:text-[15px] leading-relaxed">
              EasyRouter 提供以下 AI 模型 API，均兼容 OpenAI 格式：
            </p>

            <div className="mt-4 rounded-xl border border-gray-200 bg-white overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700 border-b border-gray-200">API</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700 border-b border-gray-200">端点</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700 border-b border-gray-200">说明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">对话补全</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                      <span className="font-mono">POST /v1/chat/completions</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                      多轮对话，支持流式输出（stream: true）、Tool Calling、结构化输出
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">文本补全</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                      <span className="font-mono">POST /v1/completions</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">传统文本补全接口</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">图像生成</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                      <span className="font-mono">POST /v1/images/generations</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">AI 图像生成</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">视频生成</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                      <span className="font-mono">POST /v1/videos</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">AI 视频生成</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">模型列表</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                      <span className="font-mono">GET /v1/models</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">查询当前可用模型</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
