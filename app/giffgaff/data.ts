// ─────────────────────────────────────────────────────────────
// giffgaff 完整使用教程 — 数据来源：giffgaff.docx
// 图片资源位于 /public/giffgaff/
// ─────────────────────────────────────────────────────────────

const IMG = (n: string) => `/giffgaff/${n}`

export interface Step {
  /** 步骤序号文字，如 "第一步" */
  label?: string
  /** 步骤正文 */
  text: string
  /** 可选链接 */
  link?: { url: string; text?: string }
  /** 备注（黄色提示） */
  note?: string
  /** 配图，可多张 */
  images?: string[]
}

export interface Section {
  id: string
  /** 章节编号，如 "01" */
  num: string
  /** 章节标题 */
  title: string
  /** 章节副标题 / 简介 */
  intro?: string
  /** 图标 emoji */
  icon: string
  /** 步骤列表 */
  steps?: Step[]
  /** 简单要点列表（无序号） */
  points?: string[]
  /** 顶部整段说明（位于 steps 之前） */
  lead?: string
  /** 危险/重要提示 */
  warning?: string
}

export const META = {
  title: 'giffgaff 完全使用手册',
  subtitle:
    '从激活、充值、保号到 eSIM 转换 —— 一份图文并茂、按章节梳理的英国 giffgaff SIM 卡保姆级中文教程。',
  brand: 'giffgaff',
}

export const sections: Section[] = [
  {
    id: 'activate',
    num: '01',
    title: '激活 SIM 卡',
    intro: '拿到实体卡后的第一件事，按以下 11 步完成开卡与首充。',
    icon: '🚀',
    steps: [
      {
        label: '第一步',
        text: '访问 Giffgaff 官方激活页面，输入卡片上 6 位激活码，点击 Activate your SIM。',
        link: { url: 'https://www.giffgaff.com/activate' },
        images: [IMG('image1.png')],
      },
      {
        label: '第二步',
        text: '输入邮箱，点击 Next。',
        images: [IMG('image2.png')],
      },
      {
        label: '第三步',
        text: '输入邮箱收到的验证码，点击 Confirm。',
        images: [IMG('image3.png')],
      },
      {
        label: '第四步',
        text: '创建密码，点击 Register。',
        images: [IMG('image4.png')],
      },
      {
        label: '第五步',
        text: '选择 No, thanks，点击 Continue。',
        images: [IMG('image5.png')],
      },
      {
        label: '第六步',
        text: '网页下拉至最底部选择 Pay as you go，点击 Continue。',
        note: '注意别选错了套餐。',
        images: [IMG('image6.png')],
      },
      {
        label: '第七步',
        text: '选择 10 英镑，点击 Pay now，使用多币种信用卡（VISA 或 MasterCard）进行充值。',
        note: '若没有信用卡，去找代充买充值卡，点击 Or redeem a top-up voucher，在 Voucher code 里输入 16 位充值卡密。',
        images: [IMG('image7.png')],
      },
      {
        label: '第八步',
        text: '填写姓名和地址（建议用现实中存在的英文名，用谷歌地图搜个真实地址），点击 Continue。',
        images: [IMG('image8.png'), IMG('image9.png')],
      },
      {
        label: '第九步',
        text: '输入信用卡信息，勾选 I understand and agree，点击 Place order。',
        note: '若用充值卡激活，不需要填写信用卡信息。',
      },
      {
        label: '第十步',
        text: '出现的号码就是你的手机号（英国区号 +44）。',
        images: [IMG('image10.png')],
      },
      {
        label: '第十一步',
        text: '回到主页，显示余额表示已激活；如果未显示表示还在激活中，请耐心等待。',
        images: [IMG('image11.png')],
      },
    ],
  },
  {
    id: 'roaming',
    num: '02',
    title: '漫游资费',
    icon: '🌍',
    lead: '在中国大陆等地区使用前，请务必了解漫游资费，避免高额扣费。',
    steps: [
      {
        text: '购买流量套餐：手机端登录 giffgaff App，主页顶部 My data 里选择你所在国家（例如中国）进行购买。',
        images: [IMG('image12.jpeg')],
      },
      {
        text: '在其他国家/地区使用资费，可查看官方漫游页面。',
        link: { url: 'https://www.giffgaff.com/roaming', text: '查看官方漫游资费' },
      },
    ],
    warning:
      '这张卡除了收发短信接码之外的其他都不建议使用，因为真的很贵没必要。强烈建议关闭移动数据与数据漫游！',
  },
  {
    id: 'keep',
    num: '03',
    title: '保号规则',
    icon: '🛡️',
    lead: '核心规则 —— 不操作会被回收，请认真阅读。',
    points: [
      '每 180 天（6 个月）内必须有一次有效的消费 / 充值产生的余额变动。',
      '从充值激活日开始计算，以后每次消费 / 充值产生余额变动的日期，都作为新一轮周期的开始。',
      '如果在规定时间内没有任何操作，号码将被回收，余额将作废且无法找回。',
    ],
    steps: [
      { text: '发一条短信（最推荐）。' },
      { text: '用一次移动数据上网。' },
      { text: '打一次电话（不包括拨打紧急服务和官方客服热线）。' },
      { text: '充一次话费。' },
    ],
    warning:
      '建议卡到手后在手机日历里做个提醒，设置为 175 天左右比较安全；每次余额变动后记得更新提醒，这样最稳。官方会在保号周期到期前 35 天及 5 天发送 2 份提醒邮件，请特别留意。',
  },
  {
    id: 'mynumber',
    num: '04',
    title: '查询本机号码',
    icon: '📞',
    points: [
      '编辑短信内容 number 发送到 2020 或者 43430。',
      '通常会在 30 秒到 2 分钟内收到回复短信。',
    ],
  },
  {
    id: 'format',
    num: '05',
    title: '短信 / 电话格式',
    icon: '✉️',
    lead: '拨打或发送给英国号码时的正确格式。',
    points: [
      '例如朋友的英国号码是：88xxxxxx88。',
      '发短信 / 打电话格式：+ 国家区号 + 号码，示例 +4488xxxxxx88。',
    ],
  },
  {
    id: 'account',
    num: '06',
    title: '更改密码 / 邮箱',
    icon: '🔑',
    steps: [
      {
        label: '改密码',
        text: '前往密码重置页面。',
        link: { url: 'https://www.giffgaff.com/auth/reset-password', text: '重置密码' },
      },
      {
        label: '改邮箱',
        text: '在个人资料页面修改邮箱等信息。',
        link: { url: 'https://www.giffgaff.com/profile/details', text: '个人资料设置' },
      },
    ],
  },
  {
    id: 'nosms',
    num: '07',
    title: '收不到短信',
    icon: '🚫',
    points: [
      '先确定有信号，能收到官方短信即表示号码正常（例如登录官网时收到验证码）。',
      '如果在注册平台收不到短信，一般是代理 IP / VPN 问题，请更换更干净的 IP。',
    ],
  },
  {
    id: 'changenumber',
    num: '08',
    title: '更改号码',
    icon: '🔄',
    lead: '如对系统分配的号码不满意（或该号码有使用记录），可以更换，依旧随机分配。',
    steps: [
      {
        text: '打开换号页面，点击 Get a new giffgaff number。',
        link: { url: 'https://www.giffgaff.com/profile/details/getnumber', text: '换号页面' },
      },
      { text: '输入密码，再点击 Change my number。' },
      { text: '系统会跳转至个人信息与设置界面，等待显示新号码。' },
    ],
    warning:
      '注意事项：中国时间深夜 5:30 至上午 13:00 期间不可更换；新号码和余额最多需 4 小时显示到账户；全程使用 Wi-Fi；每个账户支持更换 2 次号码，第二次需 24 小时后。',
  },
  {
    id: 'restriction',
    num: '09',
    title: '打电话提示"设置了限制"',
    icon: '⚠️',
    points: [
      '手机设置里关闭运营商自动选择，手动选择中国移动，并重启手机后再发送。',
    ],
  },
  {
    id: 'balance',
    num: '10',
    title: '查询余额',
    icon: '💰',
    steps: [
      {
        text: '登录官网或使用 App 查询。',
        link: { url: 'https://www.giffgaff.com', text: '官网首页' },
      },
    ],
  },
  {
    id: 'topup',
    num: '11',
    title: '充值',
    icon: '💳',
    steps: [
      {
        text: '登录官网，点击 Add credit。',
        link: { url: 'https://www.giffgaff.com', text: '官网首页' },
      },
      { text: '选择金额和支付方式，点击 Continue 按提示操作。' },
      {
        text: '可用带 VISA 或 MasterCard 标志的信用卡充值。',
        note: '也可通过第三方平台购买 giffgaff Voucher，输入 16 位数字码即可完成充值。',
      },
    ],
  },
  {
    id: 'to-esim',
    num: '12',
    title: '实体卡转 eSIM',
    icon: '📲',
    lead: '准备：支持 eSIM 的手机（例如外版无锁 iPhone）；手机安装好 giffgaff App 并连接 Wi-Fi；操作时间为北京时间 12:30 至次日凌晨 4:30。',
    steps: [
      { text: '登录 App，依次点击 Account › SIM › Replace my SIM › Switch to a new eSIM。' },
      { text: '会看到提示，请保持稳定的 Wi-Fi 连接。' },
      { text: '勾选 I understand and accept this，点击 Start the switch。' },
      { text: '输入短信收到的验证码（或点击将验证码发到邮箱），点击 Confirm。' },
      { text: "点击 Install eSIM，按提示操作，最后出现 We're activating your eSIM（我们正在激活您的 eSIM）。" },
      { text: '一般 1 小时内会激活好（最慢不超过 24 小时），可不定时打开 App 查看；完成后实体卡自动无服务（即作废）。' },
    ],
    warning: '上述步骤官方可能不定时更新，以官网为准。',
  },
  {
    id: 'to-sim',
    num: '13',
    title: 'eSIM 转实体卡',
    icon: '🔁',
    lead: '操作时间：北京时间 12:30 至次日凌晨 4:30。',
    steps: [
      { text: '买一张未激活的 SIM 卡。' },
      {
        text: '网页打开官网，进入个人资料和设置，找到 Replace my SIM，点击 Activate your SIM。',
        link: { url: 'https://www.giffgaff.com/profile/details', text: '个人资料和设置' },
      },
      { text: '输入新卡片上 6 位激活码。' },
      { text: '点击 Yes, I want to replace my SIM。' },
      { text: "再点击 Yes I'm sure，等待不到 1 小时（最多 24 小时）即可转好。" },
    ],
  },
  {
    id: 'wifi-calling',
    num: '14',
    title: 'Wi-Fi Calling',
    icon: '📶',
    lead: '开启 Wi-Fi Calling 后资费更便宜：发短信 0.08 英镑/条，打电话 0.03 英镑/分钟。需在全局英国 IP 网络环境下使用。',
    steps: [
      { text: 'iPhone 设置 → App → 电话 → 打开 Wi-Fi 通话。' },
      { text: 'iPhone 设置 → 蜂窝网络 → 点击你的号码 → 语音与数据 → 选择 4G 或 5G。' },
    ],
    warning: '官网提供介绍与视频演示，可前往官网查看 Wi-Fi Calling 相关说明。',
  },
  {
    id: 'others',
    num: '15',
    title: '其他常见问题',
    icon: '🧩',
    steps: [
      { label: '续费充值', text: '前往充值页面。', link: { url: 'https://www.giffgaff.com/top-up', text: 'Top-up' } },
      { label: '话费账单查询', text: '查看用量与账单。', link: { url: 'https://www.giffgaff.com/profile/usage-statement', text: '账单查询' } },
      { label: 'eSIM 相关问题', text: '官方 eSIM 帮助合集。', link: { url: 'https://help.giffgaff.com/en/collections/626993-esim', text: 'eSIM 帮助' } },
      { label: '转入空卡', text: 'SIM 替换页面。', link: { url: 'https://www.giffgaff.com/profile/details#simswap', text: 'SIM Swap' } },
      { text: '如果还有其他疑问，建议配合使用 AI 工具提问。' },
    ],
  },
  {
    id: 'support',
    num: '16',
    title: '官方客服 / 条款',
    icon: '📋',
    steps: [
      { label: '客服', text: '联系官方客服。', link: { url: 'https://www.giffgaff.com/boiler-plate/contact', text: 'Contact' } },
      { label: '条款', text: '查看官方条款。', link: { url: 'https://www.giffgaff.com/terms', text: 'Terms' } },
    ],
  },
]
