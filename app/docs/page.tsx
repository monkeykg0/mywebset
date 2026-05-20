'use client'

import { useState } from 'react'
import Image from 'next/image'
import img5 from '../transfer/images/6.png'
import img6 from '../transfer/images/7.png'

type DocSection = 'Nodejs' | 'CCSwitch' | 'Codex' | 'Claude' | 'Gemini' | 'OpenClaw' | 'Hermes'

const NAV_ITEMS: { key: DocSection; label: string }[] = [
  { key: 'Nodejs', label: 'Node.js 环境安装教程' },
  { key: 'CCSwitch', label: 'cc-switch 配置教程' },
  { key: 'Codex', label: 'Codex 配置教程' },
  { key: 'Claude', label: 'Claude Code 配置教程' },
  { key: 'Gemini', label: 'Gemini CLI 配置教程' },
  { key: 'OpenClaw', label: 'OpenClaw 配置教程' },
  { key: 'Hermes', label: 'Hermes 配置教程' },
]

const BASE_URL = 'https://infiniteapi.zeabur.app'

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="rounded-xl overflow-hidden border border-[#e5e7eb] dark:border-[#2d2d2d] my-3 text-sm">
      <div className="flex items-center justify-between bg-[#f3f4f6] dark:bg-[#1e1e1e] px-4 py-2">
        <span className="text-xs font-mono text-[#6b7280] dark:text-[#9ca3af] uppercase tracking-widest">{lang}</span>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
          className="text-xs text-[#6b7280] dark:text-[#9ca3af] hover:text-[#111827] dark:hover:text-white transition-colors px-2 py-0.5 rounded hover:bg-[#e5e7eb] dark:hover:bg-[#2d2d2d]"
        >
          {copied ? '已复制 ✓' : '复制'}
        </button>
      </div>
      <pre className="bg-[#18181b] text-[#e4e4e7] p-4 overflow-x-auto font-mono leading-6 text-[13px] whitespace-pre-wrap break-all">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function OSTabs({ tabs, children }: { tabs: string[]; children: (active: string) => React.ReactNode }) {
  const [active, setActive] = useState(tabs[0])
  return (
    <div className="mt-3">
      <div className="flex gap-1 mb-0 flex-wrap border-b border-[#e5e7eb] dark:border-[#2d2d2d]">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`px-3 py-1.5 text-sm font-medium transition-colors rounded-t relative -mb-px ${
              active === t
                ? 'text-[#2563eb] border border-b-white dark:border-b-[#18181b] border-[#e5e7eb] dark:border-[#2d2d2d] bg-white dark:bg-[#18181b]'
                : 'text-[#6b7280] dark:text-[#9ca3af] hover:text-[#374151] dark:hover:text-[#d1d5db] border border-transparent'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="pt-1">{children(active)}</div>
    </div>
  )
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 bg-[#eff6ff] dark:bg-[#1e3a5f]/30 border border-[#bfdbfe] dark:border-[#1e40af] rounded-xl px-4 py-3 text-sm text-[#1e40af] dark:text-[#93c5fd] my-3">
      <span className="flex-shrink-0">💡</span>
      <span>{children}</span>
    </div>
  )
}

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 bg-[#fffbeb] dark:bg-[#451a03]/30 border border-[#fde68a] dark:border-[#92400e] rounded-xl px-4 py-3 text-sm text-[#92400e] dark:text-[#fcd34d] my-3">
      <span className="flex-shrink-0">⚠️</span>
      <span>{children}</span>
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-semibold text-[#111827] dark:text-[#f9fafb] mt-6 mb-2">{children}</h3>
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h4 className="text-sm font-medium text-[#374151] dark:text-[#d1d5db] mt-4 mb-1">{children}</h4>
}

// ─── Node.js ────────────────────────────────────────────────────────────────

function NodejsDoc({ onNavigate }: { onNavigate: (s: DocSection) => void }) {
  return (
    <article className="prose-custom">
      <h2 className="text-2xl font-bold text-[#111827] dark:text-white mb-1">Node.js 环境安装教程</h2>
      <p className="text-[#6b7280] dark:text-[#9ca3af] mb-4">在 Windows、macOS、Linux 安装 Node.js LTS，并验证 node/npm 命令可用。</p>
      <Tip>后续的 Claude Code、Gemini CLI、Codex 都依赖 Node.js 运行环境。先完成本教程，再继续各自工具配置。</Tip>

      {/* Windows */}
      <SectionHeading>Windows</SectionHeading>
      <SubHeading>方法一：官方下载（推荐）</SubHeading>
      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">前往 <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="text-[#2563eb] hover:underline">Node.js 官网</a> 下载 LTS 版本，双击安装包按提示安装即可。</p>
      <SubHeading>方法二：使用 Chocolatey</SubHeading>
      <CodeBlock lang="CMD / PowerShell" code="choco install nodejs-lts" />
      <SubHeading>方法三：使用 Scoop</SubHeading>
      <CodeBlock lang="CMD / PowerShell" code="scoop install nodejs-lts" />

      {/* macOS */}
      <SectionHeading>macOS</SectionHeading>
      <SubHeading>方法一：使用 Homebrew（推荐）</SubHeading>
      <CodeBlock lang="BASH" code="brew install node" />
      <SubHeading>方法二：官方下载</SubHeading>
      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">前往 <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="text-[#2563eb] hover:underline">Node.js 官网</a> 下载 macOS 安装包。</p>

      {/* Linux */}
      <SectionHeading>Linux</SectionHeading>
      <SubHeading>Ubuntu / Debian：</SubHeading>
      <CodeBlock lang="BASH" code={`curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -\nsudo apt-get install -y nodejs`} />
      <SubHeading>CentOS / RHEL：</SubHeading>
      <CodeBlock lang="BASH" code={`curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -\nsudo yum install -y nodejs`} />

      {/* 验证 */}
      <SectionHeading>验证安装</SectionHeading>
      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">安装完成后，在终端执行：</p>
      <CodeBlock lang="TERMINAL" code={`node --version\nnpm --version`} />
      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">如果能输出版本号，说明 Node.js 与 npm 已可用。</p>

      {/* 下一步 */}
      <SectionHeading>下一步</SectionHeading>
      <div className="flex flex-wrap gap-2 mt-2">
        {([['Claude', 'Claude Code 配置'], ['Gemini', 'Gemini CLI 配置'], ['Codex', 'Codex 配置']] as [DocSection, string][]).map(([key, label]) => (
          <button key={key} onClick={() => onNavigate(key)}
            className="inline-flex flex-col items-start px-4 py-2.5 rounded-xl border border-[#e5e7eb] dark:border-[#2d2d2d] hover:border-[#2563eb] hover:bg-[#eff6ff] dark:hover:bg-[#1e3a5f]/20 transition-all text-left"
          >
            <span className="text-xs text-[#6b7280] dark:text-[#9ca3af]">步骤 2</span>
            <span className="text-sm font-medium text-[#111827] dark:text-white">{label}</span>
          </button>
        ))}
      </div>
    </article>
  )
}

// ─── CCSwitch ────────────────────────────────────────────────────────────────

function CCSwitchDoc() {
  return (
    <article>
      <h2 className="text-2xl font-bold text-[#111827] dark:text-white mb-1">cc-switch 配置教程</h2>
      <p className="text-[#6b7280] dark:text-[#9ca3af] mb-4">
        使用 <code className="bg-[#f3f4f6] dark:bg-[#27272a] px-1.5 py-0.5 rounded font-mono text-[13px]">cc-switch</code> 一键把平台的 API Key 和地址导入到 Codex，无需手动配置环境变量。
      </p>

      <SectionHeading>第一步：下载 cc-switch</SectionHeading>
      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mb-2">
        前往 GitHub 仓库下载对应系统的安装包：
      </p>
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-[#6b7280] dark:text-[#9ca3af]">GitHub 仓库：</span>
          <a href="https://github.com/farion1231/cc-switch" target="_blank" rel="noopener noreferrer" className="text-[#2563eb] hover:underline font-mono text-[13px]">
            https://github.com/farion1231/cc-switch
          </a>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-[#6b7280] dark:text-[#9ca3af]">下载地址：</span>
          <a href="https://github.com/farion1231/cc-switch/releases" target="_blank" rel="noopener noreferrer" className="text-[#2563eb] hover:underline font-mono text-[13px]">
            https://github.com/farion1231/cc-switch/releases
          </a>
        </div>
      </div>

      <SectionHeading>第二步：添加自定义配置</SectionHeading>
      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mb-3">
        打开 cc-switch 后，点击右上角「＋」，选择 <strong className="text-[#374151] dark:text-[#d1d5db]">Codex 供应商自定义配置</strong>。
      </p>
      <div className="overflow-hidden rounded-xl border border-[#e5e7eb] dark:border-[#2d2d2d] bg-white dark:bg-[#18181b] mb-3">
        <Image src={img5} alt="cc-switch 添加配置入口" placeholder="blur" className="w-full" />
      </div>

      <SectionHeading>第三步：填写 API 信息</SectionHeading>
      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mb-3">
        在配置页面中填写以下信息：
      </p>
      <div className="overflow-hidden rounded-xl border border-[#e5e7eb] dark:border-[#2d2d2d] mb-3">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#f9fafb] dark:bg-[#1e1e1e] border-b border-[#e5e7eb] dark:border-[#2d2d2d]">
              <th className="text-left px-4 py-2 text-xs font-semibold text-[#6b7280] dark:text-[#9ca3af] uppercase tracking-wider">字段</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-[#6b7280] dark:text-[#9ca3af] uppercase tracking-wider">值</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-[#18181b]">
              <td className="px-4 py-2.5 font-mono text-xs text-[#374151] dark:text-[#d1d5db]">API 地址</td>
              <td className="px-4 py-2.5 font-mono text-xs text-[#2563eb] dark:text-[#60a5fa]">{BASE_URL}</td>
            </tr>
            <tr className="bg-[#f9fafb] dark:bg-[#1e1e1e]">
              <td className="px-4 py-2.5 font-mono text-xs text-[#374151] dark:text-[#d1d5db]">API KEY</td>
              <td className="px-4 py-2.5 text-xs text-[#6b7280] dark:text-[#9ca3af]">你创建的 API Key</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="overflow-hidden rounded-xl border border-[#e5e7eb] dark:border-[#2d2d2d] bg-white dark:bg-[#18181b] mb-3">
        <Image src={img6} alt="cc-switch 填写 API 信息" placeholder="blur" className="w-full" />
      </div>
      <Tip>
        API 地址填写 <code className="bg-[#dbeafe] dark:bg-[#1e3a5f] px-1.5 py-0.5 rounded font-mono text-[13px]">{BASE_URL}</code>，API KEY 填写你在控制台创建的令牌。
      </Tip>

      <SectionHeading>第四步：开启并重启 Codex</SectionHeading>
      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">
        回到主页面点击开启，然后重新打开 Codex 即可正常使用。
      </p>
    </article>
  )
}

// ─── Codex ──────────────────────────────────────────────────────────────────

function CodexDoc() {
  return (
    <article>
      <h2 className="text-2xl font-bold text-[#111827] dark:text-white mb-1">Codex 配置教程</h2>
      <p className="text-[#6b7280] dark:text-[#9ca3af] mb-4">
        安装并配置 Codex，通过 <code className="bg-[#f3f4f6] dark:bg-[#27272a] px-1.5 py-0.5 rounded font-mono text-[13px]">~/.codex</code> 连接平台。
      </p>

      <Warning>手动安装前请先完成 Node.js 环境安装教程。</Warning>

      <SectionHeading>第一步：安装 Codex</SectionHeading>
      <OSTabs tabs={['Windows', 'Linux', 'macOS']}>
        {() => <CodeBlock lang="CMD / PowerShell" code="npm install -g @openai/codex@latest" />}
      </OSTabs>
      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mt-1">以上命令会从 npm 官方仓库下载并安装最新版本的 Codex 工具。</p>

      <SubHeading>验证安装</SubHeading>
      <CodeBlock lang="TERMINAL" code="codex --version" />
      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">如果显示版本号，恭喜你！Codex 已经成功安装了。</p>

      <SectionHeading>第二步：创建配置文件</SectionHeading>
      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mb-1">
        Codex 使用配置文件进行连接设置，需要创建{' '}
        <code className="bg-[#f3f4f6] dark:bg-[#27272a] px-1.5 py-0.5 rounded font-mono text-[13px]">config.toml</code> 和{' '}
        <code className="bg-[#f3f4f6] dark:bg-[#27272a] px-1.5 py-0.5 rounded font-mono text-[13px]">auth.json</code> 两个文件。
      </p>
      <OSTabs tabs={['Windows', 'Linux', 'macOS']}>
        {(active) => active === 'Windows'
          ? <CodeBlock lang="POWERSHELL" code={`# 删除旧目录并创建新目录
if (Test-Path "$env:USERPROFILE\\.codex") { Remove-Item -Recurse -Force "$env:USERPROFILE\\.codex" }
mkdir "$env:USERPROFILE\\.codex"

# 创建 config.toml
@"
model_provider = "OpenAI"
model = "gpt-5.5"
review_model = "gpt-5.5"
model_reasoning_effort = "high"
disable_response_storage = true
network_access = "enabled"
windows_wsl_setup_acknowledged = true
model_context_window = 270000
model_auto_compact_token_limit = 270000
effective_context_window_percent = 95

[model_providers.OpenAI]
name = "OpenAI"
base_url = "${BASE_URL}/v1"
wire_api = "responses"
requires_openai_auth = true
"@ | Out-File -FilePath "$env:USERPROFILE\\.codex\\config.toml" -Encoding utf8

# 创建 auth.json
@"
{
  "OPENAI_API_KEY": "YOUR_API_KEY"
}
"@ | Out-File -FilePath "$env:USERPROFILE\\.codex\\auth.json" -Encoding utf8`}
          />
          : <CodeBlock lang="BASH" code={`mkdir -p ~/.codex

cat > ~/.codex/config.toml << 'EOF'
model_provider = "OpenAI"
model = "gpt-5.5"
review_model = "gpt-5.5"
model_reasoning_effort = "high"
disable_response_storage = true
network_access = "enabled"
model_context_window = 270000
model_auto_compact_token_limit = 270000
effective_context_window_percent = 95

[model_providers.OpenAI]
name = "OpenAI"
base_url = "${BASE_URL}/v1"
wire_api = "responses"
requires_openai_auth = true
EOF

cat > ~/.codex/auth.json << 'EOF'
{
  "OPENAI_API_KEY": "YOUR_API_KEY"
}
EOF`}
          />
        }
      </OSTabs>
      <Tip>
        请将 <code className="bg-[#dbeafe] dark:bg-[#1e3a5f] px-1.5 py-0.5 rounded font-mono text-[13px]">YOUR_API_KEY</code> 替换为你的 API Key。
      </Tip>

      <SectionHeading>第三步：开始使用</SectionHeading>
      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mb-1">进入项目目录后运行：</p>
      <CodeBlock lang="TERMINAL" code="codex" />
      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">
        更多使用说明请参考{' '}
        <a href="https://platform.openai.com/docs" target="_blank" rel="noopener noreferrer" className="text-[#2563eb] hover:underline">OpenAI 官方文档 ↗</a>。
      </p>
    </article>
  )
}

// ─── Claude Code ────────────────────────────────────────────────────────────

function ClaudeDoc() {
  return (
    <article>
      <h2 className="text-2xl font-bold text-[#111827] dark:text-white mb-1">Claude Code 配置教程</h2>
      <p className="text-[#6b7280] dark:text-[#9ca3af] mb-4">手动安装 Claude Code 并配置环境变量，接入平台。</p>

      <Warning>手动安装前请先完成 Node.js 环境安装教程。</Warning>

      <SectionHeading>第一步：安装 Claude Code</SectionHeading>
      <OSTabs tabs={['Windows', 'Linux', 'macOS', '其他方式']}>
        {() => (
          <>
            <CodeBlock lang="CMD / PowerShell" code="npm install -g @anthropic-ai/claude-code" />
            <SubHeading>验证安装</SubHeading>
            <CodeBlock lang="BASH" code="claude --version" />
          </>
        )}
      </OSTabs>

      <SectionHeading>第二步：配置环境变量</SectionHeading>
      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mb-3">把下面的值写入当前终端或系统环境变量。</p>

      <div className="overflow-hidden rounded-xl border border-[#e5e7eb] dark:border-[#2d2d2d] mb-3">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#f9fafb] dark:bg-[#1e1e1e] border-b border-[#e5e7eb] dark:border-[#2d2d2d]">
              <th className="text-left px-4 py-2 text-xs font-semibold text-[#6b7280] dark:text-[#9ca3af] uppercase tracking-wider w-1/2">变量名</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-[#6b7280] dark:text-[#9ca3af] uppercase tracking-wider">值</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['ANTHROPIC_BASE_URL', BASE_URL],
              ['ANTHROPIC_AUTH_TOKEN', '在 API 密钥菜单内创建查看'],
              ['CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC', '1'],
            ].map(([k, v], i) => (
              <tr key={k} className={i % 2 === 0 ? 'bg-white dark:bg-[#18181b]' : 'bg-[#f9fafb] dark:bg-[#1e1e1e]'}>
                <td className="px-4 py-2.5 font-mono text-xs text-[#374151] dark:text-[#d1d5db]">{k}</td>
                <td className="px-4 py-2.5 text-[#6b7280] dark:text-[#9ca3af] text-xs">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Warning>请保留 CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1，用于关闭 Claude Code 的非必要遥测流量。</Warning>

      <SubHeading>临时设置（当前会话）</SubHeading>
      <OSTabs tabs={['Windows CMD', 'PowerShell', 'Mac / Linux']}>
        {(active) => {
          if (active === 'Windows CMD') return <CodeBlock lang="CMD" code={`set ANTHROPIC_BASE_URL=${BASE_URL}\nset ANTHROPIC_AUTH_TOKEN=your-key\nset CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1\ncd your-project\nclaude`} />
          if (active === 'PowerShell') return <CodeBlock lang="POWERSHELL" code={`$env:ANTHROPIC_BASE_URL = "${BASE_URL}"\n$env:ANTHROPIC_AUTH_TOKEN = "your-key"\n$env:CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC = "1"\ncd your-project\nclaude`} />
          return <CodeBlock lang="BASH" code={`export ANTHROPIC_BASE_URL=${BASE_URL}\nexport ANTHROPIC_AUTH_TOKEN=your-key\nexport CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1\ncd your-project\nclaude`} />
        }}
      </OSTabs>

      <SubHeading>永久设置</SubHeading>
      <OSTabs tabs={['PowerShell', 'Linux (bash)', 'macOS (zsh)']}>
        {(active) => {
          if (active === 'PowerShell') return <CodeBlock lang="POWERSHELL" code={`[System.Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "${BASE_URL}", [System.EnvironmentVariableTarget]::User)\n[System.Environment]::SetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", "your-key", [System.EnvironmentVariableTarget]::User)\n[System.Environment]::SetEnvironmentVariable("CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC", "1", [System.EnvironmentVariableTarget]::User)`} />
          if (active === 'Linux (bash)') return <CodeBlock lang="BASH" code={`echo 'export ANTHROPIC_BASE_URL=${BASE_URL}' >> ~/.bashrc\necho 'export ANTHROPIC_AUTH_TOKEN=your-key' >> ~/.bashrc\necho 'export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1' >> ~/.bashrc\nsource ~/.bashrc`} />
          return <CodeBlock lang="ZSH" code={`echo 'export ANTHROPIC_BASE_URL=${BASE_URL}' >> ~/.zshrc\necho 'export ANTHROPIC_AUTH_TOKEN=your-key' >> ~/.zshrc\necho 'export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1' >> ~/.zshrc\nsource ~/.zshrc`} />
        }}
      </OSTabs>
      <Tip>
        请将 <code className="bg-[#dbeafe] dark:bg-[#1e3a5f] px-1.5 py-0.5 rounded font-mono text-[13px]">your-key</code> 替换为你的 API Key。
      </Tip>

      <SectionHeading>第三步：开始使用</SectionHeading>
      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mb-1">进入项目目录后运行：</p>
      <CodeBlock lang="BASH" code="claude" />
      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">启动后，Claude Code 会分析当前目录的代码，并提供智能编程辅助。</p>
      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mt-2">
        更多使用说明请参考{' '}
        <a href="https://platform.claude.com/docs/zh-CN/intro" target="_blank" rel="noopener noreferrer" className="text-[#2563eb] hover:underline">Anthropic 官方文档 ↗</a>。
      </p>
    </article>
  )
}

// ─── Gemini CLI ──────────────────────────────────────────────────────────────

function GeminiDoc() {
  return (
    <article>
      <h2 className="text-2xl font-bold text-[#111827] dark:text-white mb-1">Gemini CLI 配置教程</h2>
      <p className="text-[#6b7280] dark:text-[#9ca3af] mb-1">安装并配置 Gemini CLI 工具，连接平台使用 Gemini 模型。</p>
      <p className="text-[#6b7280] dark:text-[#9ca3af] mb-4">Gemini CLI 是 Google 官方提供的终端 AI 助手工具。</p>
      <Warning>开始前请先完成 Node.js 环境安装教程。</Warning>

      <SectionHeading>第一步：安装 Gemini CLI</SectionHeading>
      <OSTabs tabs={['Windows', 'Linux', 'macOS']}>
        {() => <CodeBlock lang="CMD / PowerShell" code="npm install -g @google/gemini-cli" />}
      </OSTabs>
      <SubHeading>验证安装</SubHeading>
      <CodeBlock lang="TERMINAL" code="gemini --version" />
      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">如果显示版本号，说明安装成功了！</p>

      <SectionHeading>第二步：配置环境变量</SectionHeading>
      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mb-2">设置环境变量让 Gemini CLI 连接到平台。需要设置三个变量：</p>
      <ul className="list-none space-y-1.5 mb-3">
        {[
          ['GOOGLE_GEMINI_BASE_URL', '服务地址'],
          ['GEMINI_API_KEY', '你的 API Key'],
          ['GEMINI_MODEL', '使用的模型'],
        ].map(([k, v]) => (
          <li key={k} className="flex items-center gap-2 text-sm">
            <code className="bg-[#f3f4f6] dark:bg-[#27272a] px-2 py-0.5 rounded font-mono text-[13px] text-[#374151] dark:text-[#d1d5db]">{k}</code>
            <span className="text-[#6b7280] dark:text-[#9ca3af]">— {v}</span>
          </li>
        ))}
      </ul>

      <SubHeading>临时设置（当前会话）</SubHeading>
      <OSTabs tabs={['Windows', 'Linux', 'macOS']}>
        {(active) => active === 'Windows'
          ? <CodeBlock lang="POWERSHELL" code={`$env:GOOGLE_GEMINI_BASE_URL = "${BASE_URL}"\n$env:GEMINI_API_KEY = "YOUR_API_KEY"\n$env:GEMINI_MODEL = "gemini-3-pro-preview"`} />
          : <CodeBlock lang="BASH" code={`export GOOGLE_GEMINI_BASE_URL=${BASE_URL}\nexport GEMINI_API_KEY=YOUR_API_KEY\nexport GEMINI_MODEL=gemini-3-pro-preview`} />
        }
      </OSTabs>

      <SubHeading>永久设置</SubHeading>
      <OSTabs tabs={['Windows', 'Linux', 'macOS']}>
        {(active) => active === 'Windows'
          ? <CodeBlock lang="POWERSHELL" code={`[System.Environment]::SetEnvironmentVariable("GOOGLE_GEMINI_BASE_URL", "${BASE_URL}", [System.EnvironmentVariableTarget]::User)\n[System.Environment]::SetEnvironmentVariable("GEMINI_API_KEY", "YOUR_API_KEY", [System.EnvironmentVariableTarget]::User)\n[System.Environment]::SetEnvironmentVariable("GEMINI_MODEL", "gemini-3-pro-preview", [System.EnvironmentVariableTarget]::User)`}
          />
          : active === 'Linux'
          ? <CodeBlock lang="BASH" code={`echo 'export GOOGLE_GEMINI_BASE_URL=${BASE_URL}' >> ~/.bashrc\necho 'export GEMINI_API_KEY=YOUR_API_KEY' >> ~/.bashrc\necho 'export GEMINI_MODEL=gemini-3-pro-preview' >> ~/.bashrc\nsource ~/.bashrc`} />
          : <CodeBlock lang="ZSH" code={`echo 'export GOOGLE_GEMINI_BASE_URL=${BASE_URL}' >> ~/.zshrc\necho 'export GEMINI_API_KEY=YOUR_API_KEY' >> ~/.zshrc\necho 'export GEMINI_MODEL=gemini-3-pro-preview' >> ~/.zshrc\nsource ~/.zshrc`} />
        }
      </OSTabs>
      <Tip>
        请将 <code className="bg-[#dbeafe] dark:bg-[#1e3a5f] px-1.5 py-0.5 rounded font-mono text-[13px]">YOUR_API_KEY</code> 替换为你的 API Key。如需更换模型，只需修改 GEMINI_MODEL 即可。
      </Tip>

      <SectionHeading>第三步：开始使用</SectionHeading>
      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mb-1">配置完成后，在项目目录中运行：</p>
      <CodeBlock lang="TERMINAL" code="gemini" />
      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">Gemini CLI 会分析当前目录的代码，并提供智能建议。</p>
      <SubHeading>测试命令</SubHeading>
      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mb-1">非交互式查询：</p>
      <CodeBlock lang="TERMINAL" code='gemini -p "你好"' />
      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mt-2">
        更多使用说明请参考{' '}
        <a href="https://ai.google.dev/gemini-api/docs" target="_blank" rel="noopener noreferrer" className="text-[#2563eb] hover:underline">Google AI 官方文档 ↗</a>。
      </p>
    </article>
  )
}

// ─── OpenClaw ────────────────────────────────────────────────────────────────

function OpenClawDoc() {
  return (
    <article>
      <h2 className="text-2xl font-bold text-[#111827] dark:text-white mb-1">OpenClaw 配置教程</h2>
      <p className="text-[#6b7280] dark:text-[#9ca3af] mb-4">通过平台接入 OpenClaw。按提示选择 Anthropic（Claude）或 OpenAI（Codex）通道。</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {[
          { title: 'Anthropic（Claude）', url: BASE_URL, note: 'Claude / Anthropic 接口不要带 /v1，示例模型：claude-opus-4-6。' },
          { title: 'OpenAI（Codex）', url: `${BASE_URL}/v1`, note: 'OpenAI / Codex 接口必须带 /v1，示例模型：gpt-5.5。' },
        ].map(({ title, url, note }) => (
          <div key={title} className="rounded-xl border border-[#e5e7eb] dark:border-[#2d2d2d] p-3.5">
            <div className="text-sm font-semibold text-[#111827] dark:text-[#f9fafb] mb-1">{title}</div>
            <code className="text-xs font-mono text-[#2563eb] dark:text-[#60a5fa] break-all">{url}</code>
            <p className="text-xs text-[#6b7280] dark:text-[#9ca3af] mt-1.5">{note}</p>
          </div>
        ))}
      </div>

      <SectionHeading>第一步：安装 OpenClaw</SectionHeading>
      <CodeBlock lang="BASH" code="npm install -g @openclaw/cli" />

      <SectionHeading>第二步：选择接入通道</SectionHeading>
      <OSTabs tabs={['Anthropic（Claude）', 'OpenAI（Codex）']}>
        {(active) => active === 'Anthropic（Claude）'
          ? <>
              <CodeBlock lang="BASH" code={`export ANTHROPIC_API_KEY="YOUR_API_KEY"\nopenclaw onboard --auth-choice custom-api-key \\\n  --custom-base-url ${BASE_URL} \\\n  --custom-api-key-env ANTHROPIC_API_KEY \\\n  --custom-compatibility anthropic \\\n  --custom-model claude-opus-4-6`} />
              <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mt-1">Anthropic（Claude）通道使用根地址，不要加 <code className="bg-[#f3f4f6] dark:bg-[#27272a] px-1.5 py-0.5 rounded font-mono text-[13px]">/v1</code>。</p>
            </>
          : <CodeBlock lang="BASH" code={`export OPENAI_API_KEY="YOUR_API_KEY"\nopenclaw onboard --auth-choice custom-api-key \\\n  --custom-base-url ${BASE_URL}/v1 \\\n  --custom-api-key-env OPENAI_API_KEY \\\n  --custom-compatibility openai \\\n  --custom-model gpt-5.5`} />
        }
      </OSTabs>
      <Tip>
        请先获取对应分组的 API Key，并替换命令中的 <code className="bg-[#dbeafe] dark:bg-[#1e3a5f] px-1.5 py-0.5 rounded font-mono text-[13px]">YOUR_API_KEY</code>。
      </Tip>

      <SectionHeading>第三步：开始使用</SectionHeading>
      <CodeBlock lang="TERMINAL" code="openclaw" />
    </article>
  )
}

// ─── Hermes ──────────────────────────────────────────────────────────────────

function HermesDoc() {
  return (
    <article>
      <h2 className="text-2xl font-bold text-[#111827] dark:text-white mb-1">Hermes 配置教程</h2>
      <p className="text-[#6b7280] dark:text-[#9ca3af] mb-4">通过平台接入 Hermes，选择通道并写入配置。</p>
      <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mb-4">Claude / Anthropic 接口不要带 /v1；OpenAI / Codex 接口必须带 /v1。</p>

      <SectionHeading>第一步：安装 Hermes</SectionHeading>
      <CodeBlock lang="BASH" code="pipx install hermes-agent" />

      <SectionHeading>第二步：选择接入通道</SectionHeading>
      <OSTabs tabs={['Anthropic（Claude）', 'OpenAI（Codex）']}>
        {(active) => active === 'Anthropic（Claude）'
          ? <CodeBlock lang="YAML" code={`mkdir -p ~/.hermes\ncat > ~/.hermes/config.yaml << 'EOF'\nmodels:\n  default: apikeyfun-claude/claude-opus-4-6\nproviders:\n  apikeyfun-claude:\n    type: anthropic\n    base_url: ${BASE_URL}\n    api_key: YOUR_API_KEY\n    default_model: claude-opus-4-6\nEOF`} />
          : <CodeBlock lang="YAML" code={`mkdir -p ~/.hermes\ncat > ~/.hermes/config.yaml << 'EOF'\nmodels:\n  default: apikeyfun-openai/gpt-5.5\nproviders:\n  apikeyfun-openai:\n    type: openai\n    base_url: ${BASE_URL}/v1\n    api_key: YOUR_API_KEY\n    default_model: gpt-5.5\nEOF`} />
        }
      </OSTabs>
      <Tip>
        请先获取对应分组的 API Key，并替换命令中的 <code className="bg-[#dbeafe] dark:bg-[#1e3a5f] px-1.5 py-0.5 rounded font-mono text-[13px]">YOUR_API_KEY</code>。
      </Tip>

      <SectionHeading>第三步：开始使用</SectionHeading>
      <CodeBlock lang="TERMINAL" code="hermes" />
    </article>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DocsPage() {
  const [active, setActive] = useState<DocSection>('Nodejs')

  const contentMap: Record<DocSection, React.ReactNode> = {
    Nodejs: <NodejsDoc onNavigate={setActive} />,
    CCSwitch: <CCSwitchDoc />,
    Codex: <CodexDoc />,
    Claude: <ClaudeDoc />,
    Gemini: <GeminiDoc />,
    OpenClaw: <OpenClawDoc />,
    Hermes: <HermesDoc />,
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex gap-8">

        {/* ── Sidebar ── */}
        <aside className="w-[220px] flex-shrink-0 hidden md:block">
          <div className="sticky top-10">
            <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-2 px-3">快速上手</p>
            <nav className="space-y-0.5">
              {NAV_ITEMS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-[13.5px] transition-colors ${
                    active === key
                      ? 'bg-[#eff6ff] dark:bg-[#1e3a5f]/30 text-[#1d4ed8] dark:text-[#60a5fa] font-medium'
                      : 'text-[#4b5563] dark:text-[#9ca3af] hover:bg-[#f3f4f6] dark:hover:bg-[#1e1e1e] hover:text-[#111827] dark:hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* ── Mobile select ── */}
        <div className="md:hidden w-full mb-6 absolute">
          <select
            value={active}
            onChange={e => setActive(e.target.value as DocSection)}
            className="w-full border border-[#e5e7eb] dark:border-[#2d2d2d] rounded-xl px-3 py-2.5 text-sm bg-white dark:bg-[#18181b] text-[#111827] dark:text-white"
          >
            {NAV_ITEMS.map(({ key, label }) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* ── Content ── */}
        <main className="flex-1 min-w-0 pt-1 md:pt-0">
          {contentMap[active]}
        </main>
      </div>
    </div>
  )
}
