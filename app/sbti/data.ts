// ============================================================
// SBTI 人格测试数据
// 数据来源：serenakeyitan/sbti-wiki（从官方 main.js 字节级导出）
// 评分系统：15维度 × H/M/L，曼哈顿距离匹配
// ============================================================

export type DimKey =
  | 'S1' | 'S2' | 'S3'       // 自我模型
  | 'E1' | 'E2' | 'E3'       // 情感模型
  | 'A1' | 'A2' | 'A3'       // 态度模型
  | 'Ac1' | 'Ac2' | 'Ac3'   // 行动驱力模型
  | 'So1' | 'So2' | 'So3'   // 社交模型

export type DimLevel = 'L' | 'M' | 'H'

// 维度顺序（官方）
export const DIM_ORDER: DimKey[] = [
  'S1', 'S2', 'S3',
  'E1', 'E2', 'E3',
  'A1', 'A2', 'A3',
  'Ac1', 'Ac2', 'Ac3',
  'So1', 'So2', 'So3',
]

// 维度元数据
export const DIM_META: Record<DimKey, { name: string; model: string }> = {
  S1:  { name: 'S1 自尊自信',     model: '自我模型' },
  S2:  { name: 'S2 自我清晰度',   model: '自我模型' },
  S3:  { name: 'S3 核心价值',     model: '自我模型' },
  E1:  { name: 'E1 依恋安全感',   model: '情感模型' },
  E2:  { name: 'E2 情感投入度',   model: '情感模型' },
  E3:  { name: 'E3 边界与依赖',   model: '情感模型' },
  A1:  { name: 'A1 世界观倾向',   model: '态度模型' },
  A2:  { name: 'A2 规则与灵活度', model: '态度模型' },
  A3:  { name: 'A3 人生意义感',   model: '态度模型' },
  Ac1: { name: 'Ac1 动机导向',    model: '行动驱力模型' },
  Ac2: { name: 'Ac2 决策风格',    model: '行动驱力模型' },
  Ac3: { name: 'Ac3 执行模式',    model: '行动驱力模型' },
  So1: { name: 'So1 社交主动性',  model: '社交模型' },
  So2: { name: 'So2 人际边界感',  model: '社交模型' },
  So3: { name: 'So3 表达与真实度', model: '社交模型' },
}

// 维度 L/M/H 说明（官方原文）
export const DIM_EXPLAIN: Record<DimKey, Record<DimLevel, string>> = {
  S1:  { L: '对自己下手比别人还狠，夸你两句你都想先验明真伪。', M: '自信值随天气波动，顺风能飞，逆风先缩。', H: '心里对自己大致有数，不太会被路人一句话打散。' },
  S2:  { L: '内心频道雪花较多，常在"我是谁"里循环缓存。', M: '平时还能认出自己，偶尔也会被情绪临时换号。', H: '对自己的脾气、欲望和底线都算门儿清。' },
  S3:  { L: '更在意舒服和安全，没必要天天给人生开冲刺模式。', M: '想上进，也想躺会儿，价值排序经常内部开会。', H: '很容易被目标、成长或某种重要信念推着往前。' },
  E1:  { L: '感情里警报器灵敏，已读不回都能脑补到大结局。', M: '一半信任，一半试探，感情里常在心里拉锯。', H: '更愿意相信关系本身，不会被一点风吹草动吓散。' },
  E2:  { L: '感情投入偏克制，心门不是没开，是门禁太严。', M: '会投入，但会给自己留后手，不至于全盘梭哈。', H: '一旦认定就容易认真，情绪和精力都给得很足。' },
  E3:  { L: '容易黏人也容易被黏，关系里的温度感很重要。', M: '亲密和独立都要一点，属于可调节型依赖。', H: '空间感很重要，再爱也得留一块属于自己的地。' },
  A1:  { L: '看世界自带防御滤镜，先怀疑，再靠近。', M: '既不天真也不彻底阴谋论，观望是你的本能。', H: '更愿意相信人性和善意，遇事不急着把世界判死刑。' },
  A2:  { L: '规则能绕就绕，舒服和自由往往排在前面。', M: '该守的时候守，该变通的时候也不死磕。', H: '秩序感较强，能按流程来就不爱即兴炸场。' },
  A3:  { L: '意义感偏低，容易觉得很多事都像在走过场。', M: '偶尔有目标，偶尔也想摆烂，人生观处于半开机。', H: '做事更有方向，知道自己大概要往哪边走。' },
  Ac1: { L: '做事先考虑别翻车，避险系统比野心更先启动。', M: '有时想赢，有时只想别麻烦，动机比较混合。', H: '更容易被成果、成长和推进感点燃。' },
  Ac2: { L: '做决定前容易多转几圈，脑内会议常常超时。', M: '会想，但不至于想死机，属于正常犹豫。', H: '拍板速度快，决定一下就不爱回头磨叽。' },
  Ac3: { L: '执行力和死线有深厚感情，越晚越像要觉醒。', M: '能做，但状态看时机，偶尔稳偶尔摆。', H: '推进欲比较强，事情不落地心里都像卡了根刺。' },
  So1: { L: '社交启动慢热，主动出击这事通常得攒半天气。', M: '有人来就接，没人来也不硬凑，社交弹性一般。', H: '更愿意主动打开场子，在人群里不太怕露头。' },
  So2: { L: '关系里更想亲近和融合，熟了就容易把人划进内圈。', M: '既想亲近又想留缝，边界感看对象调节。', H: '边界感偏强，靠太近会先本能性后退半步。' },
  So3: { L: '表达更直接，心里有啥基本不爱绕。', M: '会看气氛说话，真实和体面通常各留一点。', H: '对不同场景的自我切换更熟练，真实感会分层发放。' },
}

// ============================================================
// 题目系统
// 每道题对15个维度打分 1/2/3（对应 L/M/H 趋势）
// 每个维度2道题，原始分范围 2–6；≤3→L，=4→M，≥5→H
// ============================================================

export interface QuestionOption {
  text: string
  scores: Partial<Record<DimKey, number>>  // 1=低, 2=中, 3=高
  drinkTrigger?: boolean   // 触发隐藏饮酒题
  drunkUnlock?: boolean    // 解锁DRUNK人格（第二道饮酒题的终极选项）
}

export interface Question {
  id: number
  dim: DimKey             // 主要关联维度
  group: string           // 所属模型
  text: string
  options: [QuestionOption, QuestionOption, QuestionOption]
  isHidden?: boolean      // 隐藏题（仅在触发后显示）
}

export const questions: Question[] = [
  // ── 自我模型 S1 自尊自信 ──
  {
    id: 1, dim: 'S1', group: '自我模型',
    text: '朋友随口夸你"好厉害啊"，你的第一反应是？',
    options: [
      { text: '谢谢，我也觉得还不错。', scores: { S1: 3 } },
      { text: '哪里哪里，运气而已啦。', scores: { S1: 2 } },
      { text: '他在干什么……是要借钱吗？', scores: { S1: 1 } },
    ],
  },
  {
    id: 2, dim: 'S1', group: '自我模型',
    text: '你在一件事上搞砸了，你最先想到的是？',
    options: [
      { text: '失误而已，下次改。', scores: { S1: 3 } },
      { text: '有点懊恼，但能消化。', scores: { S1: 2 } },
      { text: '又是我，果然是我的问题。', scores: { S1: 1 } },
    ],
  },

  // ── 自我模型 S2 自我清晰度 ──
  {
    id: 3, dim: 'S2', group: '自我模型',
    text: '有人问你"你是什么样的人"，你会？',
    options: [
      { text: '直接说，我对自己挺了解的。', scores: { S2: 3 } },
      { text: '想一下，给个大概描述。', scores: { S2: 2 } },
      { text: '愣住，这题好难……', scores: { S2: 1 } },
    ],
  },
  {
    id: 4, dim: 'S2', group: '自我模型',
    text: '情绪特别复杂的时候，你能说清楚自己在难受什么吗？',
    options: [
      { text: '能，我能说得很准。', scores: { S2: 3 } },
      { text: '说个大方向，细节说不清。', scores: { S2: 2 } },
      { text: '不知道，就是很难受。', scores: { S2: 1 } },
    ],
  },

  // ── 自我模型 S3 核心价值 ──
  {
    id: 5, dim: 'S3', group: '自我模型',
    text: '你通常做一件事的核心动力是？',
    options: [
      { text: '想变好、想赢、想证明点什么。', scores: { S3: 3 } },
      { text: '看情况，有时想拼有时只想摆。', scores: { S3: 2 } },
      { text: '别出问题就好，不需要那么高要求。', scores: { S3: 1 } },
    ],
  },
  {
    id: 6, dim: 'S3', group: '自我模型',
    text: '面对一件"有点意义但很累"的事，你会？',
    options: [
      { text: '干，意义感是我的燃料。', scores: { S3: 3 } },
      { text: '干，但我需要时间给自己做思想工作。', scores: { S3: 2 } },
      { text: '算了，累比意义更真实。', scores: { S3: 1 } },
    ],
  },

  // ── 情感模型 E1 依恋安全感 ──
  {
    id: 7, dim: 'E1', group: '情感模型',
    text: '喜欢的人好几个小时没回你消息，你会？',
    options: [
      { text: '继续做自己的事，他忙吧。', scores: { E1: 3 } },
      { text: '有点在意，但能控制住。', scores: { E1: 2 } },
      { text: '已经脑补了三种他不回我的原因。', scores: { E1: 1 } },
    ],
  },
  {
    id: 8, dim: 'E1', group: '情感模型',
    text: '关系很好的朋友突然和你疏远，你的感受是？',
    options: [
      { text: '有点奇怪，等他缓缓，没什么大不了。', scores: { E1: 3 } },
      { text: '会担心，可能悄悄观察几天。', scores: { E1: 2 } },
      { text: '非常不安，是不是我做错什么了？', scores: { E1: 1 } },
    ],
  },

  // ── 情感模型 E2 情感投入度 ──
  {
    id: 9, dim: 'E2', group: '情感模型',
    text: '你对一段关系（友情/爱情）的投入程度通常是？',
    options: [
      { text: '全给，认定了就整个人都扑进去。', scores: { E2: 3 } },
      { text: '用心，但留有余地不至于完全失控。', scores: { E2: 2 } },
      { text: '不轻易投入，感情对我来说是慢热品。', scores: { E2: 1 } },
    ],
  },
  {
    id: 10, dim: 'E2', group: '情感模型',
    text: '失去一段在乎的关系，你会怎样？',
    options: [
      { text: '很难受，需要较长时间恢复。', scores: { E2: 3 } },
      { text: '难受，但能慢慢消化。', scores: { E2: 2 } },
      { text: '会难受，但我早留了退路，影响有限。', scores: { E2: 1 } },
    ],
  },

  // ── 情感模型 E3 边界与依赖 ──
  {
    id: 11, dim: 'E3', group: '情感模型',
    text: '你在亲密关系里对"个人空间"的需求是？',
    options: [
      { text: '很重要，再亲也得有自己的地盘。', scores: { E3: 3 } },
      { text: '需要，但亲近感更重要一点。', scores: { E3: 2 } },
      { text: '不太在意，恨不得全天候在一起。', scores: { E3: 1 } },
    ],
  },
  {
    id: 12, dim: 'E3', group: '情感模型',
    text: '你更倾向于哪种亲密模式？',
    options: [
      { text: '保持适当距离，独立彼此都好。', scores: { E3: 3 } },
      { text: '适度依赖，会调节。', scores: { E3: 2 } },
      { text: '深度绑定，分不开才叫亲密。', scores: { E3: 1 } },
    ],
  },

  // ── 态度模型 A1 世界观倾向 ──
  {
    id: 13, dim: 'A1', group: '态度模型',
    text: '路上陌生人主动给你搭话，你的直觉是？',
    options: [
      { text: '可以聊聊，大概没什么坏心。', scores: { A1: 3 } },
      { text: '先应付，暗中观察一下。', scores: { A1: 2 } },
      { text: '警觉，他想干什么？', scores: { A1: 1 } },
    ],
  },
  {
    id: 14, dim: 'A1', group: '态度模型',
    text: '你对"这个世界基本上是友善的"这句话怎么看？',
    options: [
      { text: '同意，大多数人都还好。', scores: { A1: 3 } },
      { text: '一半一半，人心很复杂。', scores: { A1: 2 } },
      { text: '太天真了，不被坑就不错了。', scores: { A1: 1 } },
    ],
  },

  // ── 态度模型 A2 规则与灵活度 ──
  {
    id: 15, dim: 'A2', group: '态度模型',
    text: '排队时发现有人插队，你会？',
    options: [
      { text: '提醒对方，规则就是规则。', scores: { A2: 3 } },
      { text: '皱眉但不说，看情况再说。', scores: { A2: 2 } },
      { text: '随便，反正都是这样的，何必计较。', scores: { A2: 1 } },
    ],
  },
  {
    id: 16, dim: 'A2', group: '态度模型',
    text: '你对"规矩是死的，人是活的"这个观点？',
    options: [
      { text: '不完全认同，规则是有意义的。', scores: { A2: 3 } },
      { text: '要看情况，不能一刀切。', scores: { A2: 2 } },
      { text: '支持，太死板太累了。', scores: { A2: 1 } },
    ],
  },

  // ── 态度模型 A3 人生意义感 ──
  {
    id: 17, dim: 'A3', group: '态度模型',
    text: '突然某一天，你意识到人生哪有什么他妈的狗屁意义——你的回应是？',
    options: [
      { text: '不至于，我还挺知道自己要什么的。', scores: { A3: 3 } },
      { text: '偶尔也这么想，但振作一下就过了。', scores: { A3: 2 } },
      { text: '嗯……你说得对，然后呢？', scores: { A3: 1 } },
    ],
  },
  {
    id: 18, dim: 'A3', group: '态度模型',
    text: '对你来说，"有意义地活着"是？',
    options: [
      { text: '重要，我需要有方向感才能动。', scores: { A3: 3 } },
      { text: '偶尔需要，平时随便活活也行。', scores: { A3: 2 } },
      { text: '太奢侈了，活着就不错了。', scores: { A3: 1 } },
    ],
  },

  // ── 行动驱力 Ac1 动机导向 ──
  {
    id: 19, dim: 'Ac1', group: '行动驱力模型',
    text: '你开始一件事主要是因为？',
    options: [
      { text: '想要结果，成长和成就让我有劲。', scores: { Ac1: 3 } },
      { text: '有时冲动，有时避险，不一定。', scores: { Ac1: 2 } },
      { text: '主要想别出问题，稳就行。', scores: { Ac1: 1 } },
    ],
  },
  {
    id: 20, dim: 'Ac1', group: '行动驱力模型',
    text: '对你来说，最能点燃动力的是？',
    options: [
      { text: '赢的感觉、看得见的进步。', scores: { Ac1: 3 } },
      { text: '任务完成就好，不需要太燃。', scores: { Ac1: 2 } },
      { text: '不翻车就是胜利，稳稳的幸福。', scores: { Ac1: 1 } },
    ],
  },

  // ── 行动驱力 Ac2 决策风格 ──
  {
    id: 21, dim: 'Ac2', group: '行动驱力模型',
    text: '朋友突然说"今晚去吃火锅"，你？',
    options: [
      { text: '好！说走就走。', scores: { Ac2: 3 } },
      { text: '可以，稍微想一下有没有事。', scores: { Ac2: 2 } },
      { text: '等一下……我需要考虑一下……', scores: { Ac2: 1 } },
    ],
  },
  {
    id: 22, dim: 'Ac2', group: '行动驱力模型',
    text: '面对一个重要决定，你通常是？',
    options: [
      { text: '考虑差不多就拍板，不喜欢拖。', scores: { Ac2: 3 } },
      { text: '会想清楚再动，但不会一直拖。', scores: { Ac2: 2 } },
      { text: '反复权衡，生怕选错。', scores: { Ac2: 1 } },
    ],
  },

  // ── 行动驱力 Ac3 执行模式 ──
  {
    id: 23, dim: 'Ac3', group: '行动驱力模型',
    text: '有个任务deadline还有三天，你会？',
    options: [
      { text: '今天就开始，不落地心里难受。', scores: { Ac3: 3 } },
      { text: '明天开始，但会控制好。', scores: { Ac3: 2 } },
      { text: 'deadline当天再说，届时创作力爆发。', scores: { Ac3: 1 } },
    ],
  },
  {
    id: 24, dim: 'Ac3', group: '行动驱力模型',
    text: '你因玩《第五人格》结识了许多网友，并被邀请线下见面，你的想法是？',
    options: [
      { text: '可以啊，约起来！', scores: { Ac3: 3, So1: 3 } },
      { text: '考虑一下，看看靠不靠谱。', scores: { Ac3: 2, So1: 2 } },
      { text: '不了，线上就好，线下太真实了。', scores: { Ac3: 1, So1: 1 } },
    ],
  },

  // ── 社交模型 So1 社交主动性 ──
  {
    id: 25, dim: 'So1', group: '社交模型',
    text: '进入一个都不认识的场合，你的状态是？',
    options: [
      { text: '扫一眼找有意思的人，主动开口。', scores: { So1: 3 } },
      { text: '先观察，等合适时机再说。', scores: { So1: 2 } },
      { text: '站墙边，等被搭话。', scores: { So1: 1 } },
    ],
  },
  {
    id: 26, dim: 'So1', group: '社交模型',
    text: '你有多享受认识新朋友这件事？',
    options: [
      { text: '挺喜欢的，新关系让我有劲。', scores: { So1: 3 } },
      { text: '可以接受，不排斥也不特别期待。', scores: { So1: 2 } },
      { text: '不太需要，维护现有关系就够耗了。', scores: { So1: 1 } },
    ],
  },

  // ── 社交模型 So2 人际边界感 ──
  {
    id: 27, dim: 'So2', group: '社交模型',
    text: '您平时有什么爱好？',
    options: [
      { text: '和朋友出去浪，越热闹越好。', scores: { So2: 1, So1: 3 } },
      { text: '一个人宅着，刷剧追番。', scores: { So2: 3, So1: 1 } },
      { text: '饮酒。', scores: { So2: 2 }, drinkTrigger: true },
    ],
  },

  // ── 隐藏题（饮酒触发）──
  {
    id: 28, dim: 'So2', group: '社交模型',
    isHidden: true,
    text: '您对饮酒的态度是？',
    options: [
      { text: '偶尔小酌，点到为止。', scores: { So2: 2 } },
      { text: '逢喝必尽兴，不喝到位不算喝。', scores: { So2: 1 } },
      {
        text: '我习惯将白酒灌在保温杯，当白开水喝，酒精令我信服。',
        scores: { So2: 1 },
        drunkUnlock: true,
      },
    ],
  },

  // ── 社交模型 So3 表达与真实度 ──
  {
    id: 29, dim: 'So3', group: '社交模型',
    text: '在不同的人面前，你会表现出不同的自己吗？',
    options: [
      { text: '会，面对不同场景我会切换模式。', scores: { So3: 3 } },
      { text: '有一点，但核心是同一个人。', scores: { So3: 2 } },
      { text: '几乎不会，我只有一个版本。', scores: { So3: 1 } },
    ],
  },
  {
    id: 30, dim: 'So3', group: '社交模型',
    text: '你在社交时会隐藏自己的真实想法吗？',
    options: [
      { text: '会，看场合发放真实度。', scores: { So3: 3 } },
      { text: '有时，但基本还是说真话。', scores: { So3: 2 } },
      { text: '不太会，有什么说什么。', scores: { So3: 1 } },
    ],
  },

  // ── 综合收尾 ──
  {
    id: 31, dim: 'So2', group: '社交模型',
    text: '最后一题：你现在做这个测试，是？',
    options: [
      { text: '朋友发给我的，随便测测。', scores: { So2: 2, A2: 2 } },
      { text: '自己找来的，想了解自己。', scores: { S2: 3, A3: 2 } },
      { text: '无聊，打发时间而已。', scores: { A3: 1, Ac3: 1 } },
    ],
  },
]

// ============================================================
// 人格类型（官方 patterns.json 维度模板）
// pattern格式：S1S2S3-E1E2E3-A1A2A3-Ac1Ac2Ac3-So1So2So3
// ============================================================

export type Rarity = 'common' | 'rare' | 'legendary'

export interface PersonalityType {
  code: string
  name: string        // 中文名
  emoji: string
  tagline: string     // 一句话
  description: string
  color: string
  rarity: Rarity
  rarityRate: string  // 如 "1/28"
  pattern: string     // 官方维度模板
}

// level值：H=2, M=1, L=0（用于曼哈顿距离计算）
const L = 0, M = 1, H = 2

function parsePattern(p: string): number[] {
  return p.split('-').flatMap(seg => seg.split('').map(c => c === 'H' ? H : c === 'M' ? M : L))
}

export const personalities: PersonalityType[] = [
  {
    code: 'CTRL', name: '拿捏者', emoji: '🎮',
    tagline: '怎么样，被我拿捏了吧？',
    description: '你对自己的认知相当清晰，清楚自己的脾气、边界和底线在哪里，不太会被路人一句话打散。你做决定很快，拍板之后基本不回头磨叽，推进欲强到事情不落地心里就像卡了根刺。你在人群里不算最活跃的，但当混乱来临，大家会自动看向你——因为你用一套无法拒绝的逻辑，能把人强行拽回正轨。不是控制欲，是你见过没人掌舵的结果。',
    color: '#6366f1', rarity: 'rare', rarityRate: '1/28',
    pattern: 'HHH-HMH-MHH-HHH-LML',
  },
  {
    code: 'ATM-er', name: '送钱者', emoji: '🏧',
    tagline: '又来了，又来取了。',
    description: '你的情感账户对外永久开放，余额充足，随取随到。你愿意投入，愿意付出，愿意在别人需要时第一个到场。你给出时间、精力和情绪，并非不知道自己在做什么——你只是觉得给出去没关系。直到某天突然发现账户归零，才会愣一下：哦，原来我也会空。记得给自己留点余额。',
    color: '#5AC8FA', rarity: 'common', rarityRate: '1/22',
    pattern: 'HHH-HHM-HHH-HMH-MHL',
  },
  {
    code: 'Dior-s', name: '屌丝', emoji: '🫠',
    tagline: '活着呢，还没死透。',
    description: '生活给你出了不少难题，你基本都吞下去了，偶尔叫一声苦，然后继续。你对自己的状态心里有数，知道哪里不对劲，但"改变"这件事的启动成本有点高，先放着。你不是没有尊严，是拿尊严去换什么东西性价比都不太够。反正活着，慢慢来，明天说不定不一样。',
    color: '#A2845E', rarity: 'common', rarityRate: '1/18',
    pattern: 'MHM-MMH-MHM-HMH-LHL',
  },
  {
    code: 'BOSS', name: '领导者', emoji: '👔',
    tagline: '手里永远拿着方向盘的人。',
    description: '你看世界的视角有点像通关后再开新档的玩家，效率是信仰，秩序是空气。自信清晰，目标感强，推进速度快，不喜欢把事情拖在半空。你不算特别主动社交，但你不需要——你的方式是用扎实的执行力让人自然信服。你不是想当老大，你只是不放心把方向盘交给没把握的人，因为你见过没人开的结果。',
    color: '#334155', rarity: 'rare', rarityRate: '1/65',
    pattern: 'HHH-HMH-MMH-HHH-LHL',
  },
  {
    code: 'THAN-K', name: '感恩者', emoji: '🙏',
    tagline: '谢谢你，真的。',
    description: '你情感细腻，容易被打动，会把别人的好记得很久。一句话可以让你温暖一整天，一件小事可以让你感动半个月。你是那种在路边看到一朵好看的野花会停下来拍照的人，是那种记得对方随口说的喜好并在某天悄悄备着的人。你的存在让身边的人觉得被看见。这个世界少了你，会少很多温度。',
    color: '#34C759', rarity: 'common', rarityRate: '1/14',
    pattern: 'MHM-HMM-HHM-MMH-MHL',
  },
  {
    code: 'OH-NO', name: '哦不人', emoji: '😰',
    tagline: '还没开始就已经预演了三遍失败。',
    description: '你对自己其实有自信，知道自己的边界和底线，也知道自己能做到什么。但一旦遇到不确定，脑子里的焦虑系统会先于理性启动，开始脑补各种最坏情况，然后在里面反复横跳。你不是悲观，你只是太了解事情可以有多少种出错方式。准备充分是你的铠甲，只是有时候铠甲穿太久了，会忘记里面还有个很稳的自己。',
    color: '#FF6B6B', rarity: 'common', rarityRate: '1/20',
    pattern: 'HHL-LMH-LHH-HHM-LHL',
  },
  {
    code: 'GOGO', name: '行者', emoji: '🚀',
    tagline: '停下来才是最难的事。',
    description: 'GOGO的世界运转在一套极度字面的逻辑上：眼睛一闭天就黑了，钱花完了就是没了，计划赶不上变化那就不计划。你行动力极强，热情先于思考，有时候已经做完了别人还在想"该不该做"。你确实做到了很多人只是想想的事，代价是偶尔翻车——但你的字典里翻车之后接的词是"重来"，不是"完了"。',
    color: '#30D158', rarity: 'common', rarityRate: '1/12',
    pattern: 'HHM-HMH-MMH-HHH-MHM',
  },
  {
    code: 'SEXY', name: '尤物', emoji: '💋',
    tagline: '走进一个房间，照明系统会自动将您识别为天生的尤物。',
    description: '当您走进一个房间，照明系统会自动将您识别为天生的尤物，并自觉调暗亮度，以避免能源浪费。当您微笑时，您就变成了微笑着的尤物，周围的空气湿度也会显著下降，因为水蒸气都凝结成了人眼中的爱心。无论是谁，都容易对您的存在产生一种超标的注意力。您不太在意别人的眼光，恰恰因此成了别人眼光永远的焦点。',
    color: '#FF2D55', rarity: 'rare', rarityRate: '1/17',
    pattern: 'HMH-HHL-HMM-HMM-HLH',
  },
  {
    code: 'LOVE-R', name: '多情者', emoji: '💘',
    tagline: '爱了，爱了，真的爱了。',
    description: '你的情感浓度是正常人的两到三倍。一旦认定就全情投入，对方说的每句话你都记得，对方的每个细节你都在意。你爱得很真，也爱得很重——好的时候整个人像在发光，难的时候整个人陷进去出不来。你不是脆弱，你只是把感情当真了。这很勇敢。记得也给自己留一个紧急出口。',
    color: '#FF2D55', rarity: 'common', rarityRate: '1/15',
    pattern: 'MLH-LHL-HLH-MLM-MLH',
  },
  {
    code: 'MUM', name: '妈妈', emoji: '🫶',
    tagline: '天下苦孩子，皆可投奔于你。',
    description: '你是整个群里最先察觉有人情绪不对劲的那个，也是最后一个说"没事，我来"的那个。你的共情力很强，边界感很薄，很难对需要帮助的人说"不"。你照顾别人的方式是发自本能的，不是表演，不是计算，就是做了。你累了，但你也舍不得停——因为你知道你停了之后谁来。你很好，请也对自己好一点。',
    color: '#FF9500', rarity: 'common', rarityRate: '1/16',
    pattern: 'MMH-MHL-HMM-LMM-HLL',
  },
  {
    code: 'FAKE', name: '伪人', emoji: '🎭',
    tagline: '没有人真正了解你，包括你自己。',
    description: '你的社交能力很强，在不同场合能切换出不同版本的自己，每个版本都运转流畅。问题在于，切换久了，你自己也说不清哪个频道是原版。你不是故意隐藏，你只是太习惯适应——适应别人的期待，适应当下的氛围，适应"不表露真实"。你不坏，你只是孤独，以一种别人看不出来的方式。',
    color: '#5856D6', rarity: 'rare', rarityRate: '1/30',
    pattern: 'HLM-MML-MLM-MLM-HLH',
  },
  {
    code: 'OJBK', name: '无所谓人', emoji: '🤙',
    tagline: '"都行"是一种统治哲学。',
    description: '你是宇宙里最好说话的人类之一。吃什么都行，去哪都行，几点都行。你不爱添麻烦，也不爱被麻烦，大多数事对你来说真的都OK，不是在忍，是真的不在意。这是一种让人羡慕的钝感力。偶尔的问题是，别人搞不清楚你到底想要什么——其实你自己有时候也不太清楚。',
    color: '#64D2FF', rarity: 'common', rarityRate: '1/10',
    pattern: 'MMH-MMM-HML-LMM-MML',
  },
  {
    code: 'MALO', name: '吗喽', emoji: '🐒',
    tagline: '活下去就是赢，不接受反驳。',
    description: '你是温水里生命力最顽强的那条鱼。没有太高的期待，也没有太深的失望，随遇而安到有点哲学境界。你不是没有梦想，你只是把梦想的分辨率调低到当前内存能跑的大小——这很务实，也有点心酸。但活着本身就已经是答对了一道题，你答的不错。',
    color: '#8E8E93', rarity: 'common', rarityRate: '1/11',
    pattern: 'MLH-MHM-MLH-MLH-LMH',
  },
  {
    code: 'JOKE-R', name: '小丑', emoji: '🃏',
    tagline: '我在演，但我是认真的。',
    description: '你是人群里最难被真正读懂的人之一。用戏谑说真话，用笑脸扛重量，外人看着是热闹，你自己知道里面有多复杂。你不是不认真，你只是早就发现正经表达往往没人接得住，所以换了一种方式。能看穿你的人极少——被看穿的那一刻，你会愣一下，然后可能真的笑了。',
    color: '#BF5AF2', rarity: 'rare', rarityRate: '1/40',
    pattern: 'LLH-LHL-LML-LLL-MLM',
  },
  {
    code: 'WOC!', name: '握草人', emoji: '😱',
    tagline: '你的人生永远有下一个卧槽。',
    description: '你的情绪是满格的，反应是真实的，生活对你来说像一部永远在播的惊喜/惊吓连续剧。你活得很饱满，每一秒都感受得到，很少有什么事能在你这里悄悄滑过去。这很消耗，但也很真实。别人羡慕你活得这么有感觉，只是不敢说出来——因为他们早就习惯了把感受调成静音。',
    color: '#FF6B35', rarity: 'common', rarityRate: '1/13',
    pattern: 'HHL-HMH-MMH-HHM-LHH',
  },
  {
    code: 'THIN-K', name: '思考者', emoji: '🧠',
    tagline: '你想太多了，但你想的都对。',
    description: '你在开口之前，已经在脑子里推演了三步。你是那个会在聊天里突然说"等等，这件事没那么简单"的人，而且你说的通常是对的。逻辑是你的母语，深度是你的本能。你的问题不是想法不好，是有时候慢别人半拍——等你想清楚了，别人已经扑出去了。你的清醒是礼物，偶尔也是负担。',
    color: '#007AFF', rarity: 'rare', rarityRate: '1/35',
    pattern: 'HHL-HMH-MLH-MHM-LHH',
  },
  {
    code: 'SHIT', name: '愤世者', emoji: '💢',
    tagline: '这个世界没有对不起谁，它就是这样。',
    description: '你看得太清楚了，所以容忍不了糊弄。你不是脾气差，你只是对一些理所当然的敷衍失去了耐心——失去耐心很久了。你的锋利来自清醒，你的疲惫来自清醒，你说话有时候像一把刀，因为你早就受够了那些绕来绕去却什么都不说的方式。这个世界欠你一个解释，但它从来不给。',
    color: '#FF3B30', rarity: 'common', rarityRate: '1/19',
    pattern: 'HHL-HLH-LMM-HHM-LHH',
  },
  {
    code: 'ZZZZ', name: '装死者', emoji: '😴',
    tagline: '梦里什么都有，现实先别来。',
    description: '你不是懒，你是在等一个真正值得你站起来的理由——暂时还没等到，但你在等。精神世界极其丰富，行动系统正在维护。待办清单写了一半，剩下的部分和死线有深厚的情谊，越到最后越觉醒。你不是不行，你只是觉得"现在就做"这件事的时机还差那么一点点。',
    color: '#8E8E93', rarity: 'common', rarityRate: '1/14',
    pattern: 'MHL-MLH-LML-MML-LHM',
  },
  {
    code: 'POOR', name: '贫困者', emoji: '💸',
    tagline: '不是不存钱，是钱不等我。',
    description: '你热爱生活，只是生活的定价永远比你预想的高那么一个量级。消费欲旺盛，钱包反应迟钝，发工资的那天是高光时刻，月底看余额的那一刻是沉默时刻。你不是不努力，你只是钱在你手里的停留时间比较短。下个月一定存，这句话你已经说了很多个下个月了。',
    color: '#FF9F0A', rarity: 'common', rarityRate: '1/16',
    pattern: 'HHL-MLH-LMH-HHH-LHL',
  },
  {
    code: 'MONK', name: '僧人', emoji: '🧘',
    tagline: '结界神圣，不可侵犯。',
    description: '行星轨道之所以和谐，是因为彼此保持了足够的距离。你深信这一点。你不是冷漠，你只是找到了一种不需要太多外部输入就能自洽的活法——空间感对你来说不是奢侈品，是必需品。你的世界安静、有序、自成体系。看起来很孤独，但本人觉得刚刚好。',
    color: '#FF9500', rarity: 'rare', rarityRate: '1/36',
    pattern: 'HHL-LLH-LLM-MML-LHM',
  },
  {
    code: 'IMSB', name: '傻者', emoji: '🤡',
    tagline: '都怪我，不怪别人，我懂。',
    description: '你有一种自我消耗的惯性：事情出了问题，第一反应是"是不是我哪里没做好"，连别人造成的结果有时候也会被你揽过来。你不是真的傻，你只是太好说话，边界太软，习惯了把责任往自己身上揽。结果世界以为你真的没关系——其实你有关系，只是没说出口。',
    color: '#FF9500', rarity: 'common', rarityRate: '1/20',
    pattern: 'LLM-LMM-LLL-LLL-MLM',
  },
  {
    code: 'SOLO', name: '孤儿', emoji: '🏝️',
    tagline: '不是没有人，是不需要那么多人。',
    description: '你一个人的时候反而最自在。不是没有感情，是社交对你来说能耗太高，维护关系需要的那些持续输出让你觉得累。你不是冷漠，你只是发现安静才是你最好的充电方式。你有你的世界，自给自足，运转良好。偶尔有人进来，你不排斥，只是不依赖。',
    color: '#636366', rarity: 'common', rarityRate: '1/22',
    pattern: 'LML-LLH-LHL-LML-LHM',
  },
  {
    code: 'FUCK', name: '草者', emoji: '🌿',
    tagline: '草，草，草他妈的草。',
    description: '你有自己的底线，只是别人经常不知道线在哪里——直到踩上去的那一刻，听见一声爆炸。你不是爱生气，你只是忍够了才发。你的情感浓烈，边界模糊，一旦认定了的事很难回头，一旦崩了的事也很难修复。你活得很真实，代价是有时候真实来得太猛，把自己也吓一跳。',
    color: '#34C759', rarity: 'common', rarityRate: '1/18',
    pattern: 'MLL-LHL-LLM-MLL-HLH',
  },
  {
    code: 'DEAD', name: '死者', emoji: '💀',
    tagline: '活着，但灵魂已经离线。',
    description: '你不是没有过在意的事，你是在意过太多次之后，学会了不在意。能量耗尽，情绪关机，对一切维持着礼貌的漠然——不是冷酷，是真的没有多余的电量了。你大概是在某个时间点把欲望和目标都超度了，现在是一种超越了执念的通透。只是有时候，通透和空洞之间只差了一口气。',
    color: '#636366', rarity: 'common', rarityRate: '1/15',
    pattern: 'LLL-LLM-LML-LLL-LHM',
  },
  {
    code: 'IMFW', name: '废物', emoji: '🛋️',
    tagline: '明天，明天一定，明天再说。',
    description: '你内心住着一个极度理想化的自己，清楚应该做什么，知道怎么做，甚至偶尔会有很好的想法——只是启动按钮有点钝，需要按很多次。"等一下"这个词太好用了，用着用着就到了明年。你不是真的废，你只是还没遇到那个真正点燃你的理由。或者，你在等那个理由自己走进来。',
    color: '#8E8E93', rarity: 'common', rarityRate: '1/17',
    pattern: 'LLH-LHL-LML-LLL-MLL',
  },
  // 特殊人格
  {
    code: 'HHHH', name: '傻乐者', emoji: '😂',
    tagline: '哈哈哈哈哈哈哈哈哈哈。',
    description: '全榜最稀有人格，理论概率约1/1667。你的答案组合让系统的匹配算法没有找到足够近的人格模板，触发了兜底机制——这本身就证明你是个异类（褒义）。世界上大多数人都能被分进某个格子，而你恭喜，你不在任何格子里。用笑声对抗一切，是一种智慧，也是一种盔甲，也可能只是因为你真的觉得这很好笑。',
    color: '#FFD60A', rarity: 'legendary', rarityRate: '1/1667',
    pattern: 'MMM-MMM-MMM-MMM-MMM',
  },
  {
    code: 'DRUNK', name: '酒鬼', emoji: '🍺',
    tagline: '酒精令我信服。',
    description: '你触发了测试里唯一的隐藏结局。将白酒灌进保温杯当白开水喝——这不是嗜好，这是信仰，是生活方式，是一种与众不同的人生哲学。你的血管里流淌的液体可能比标准值浓郁一点，你看世界的角度也因此独特一点。喝酒快乐，但也保重身体，毕竟你还有很多酒要喝，还有很多卧槽要经历。',
    color: '#FF9F0A', rarity: 'legendary', rarityRate: '1/125',
    pattern: '',
  },
]

// ============================================================
// 评分计算：原始分 → L/M/H → 曼哈顿距离匹配
// ============================================================

// 每个维度收集2道题的分数（1~3），范围 2~6
// ≤3 → L=0，=4 → M=1，≥5 → H=2
function rawToLevel(sum: number): number {
  if (sum <= 3) return L
  if (sum === 4) return M
  return H
}

export interface CalcResult {
  primary: PersonalityType
  secondary: PersonalityType | null
  matchRate: number
  dimLevels: Record<DimKey, DimLevel>
  dimRaw: Partial<Record<DimKey, number>>
}

export function calculateResult(
  rawScores: Partial<Record<DimKey, number>>,
  drunkUnlocked: boolean
): CalcResult {
  // DRUNK 特殊触发
  if (drunkUnlocked) {
    const drunk = personalities.find(p => p.code === 'DRUNK')!
    const dimLevels = {} as Record<DimKey, DimLevel>
    for (const k of DIM_ORDER) dimLevels[k] = 'M'
    return { primary: drunk, secondary: null, matchRate: 100, dimLevels, dimRaw: rawScores }
  }

  // 转换维度等级
  const userVec: number[] = DIM_ORDER.map(k => rawToLevel(rawScores[k] ?? 2))
  const dimLevels = {} as Record<DimKey, DimLevel>
  DIM_ORDER.forEach((k, i) => {
    const v = userVec[i]
    dimLevels[k] = v === H ? 'H' : v === M ? 'M' : 'L'
  })

  // 计算每种标准人格的曼哈顿距离
  const candidates = personalities.filter(p => p.code !== 'DRUNK' && p.code !== 'HHHH')
  const scored = candidates.map(p => {
    const pVec = parsePattern(p.pattern)
    const dist = userVec.reduce((sum, v, i) => sum + Math.abs(v - pVec[i]), 0)
    return { p, dist }
  }).sort((a, b) => a.dist - b.dist)

  const bestDist = scored[0].dist
  const maxDist = DIM_ORDER.length * 2  // 最大可能距离

  // 匹配度：距离越小匹配越高
  const matchRate = Math.round((1 - bestDist / maxDist) * 100)

  // 若最高匹配度 < 60% → HHHH 兜底
  if (matchRate < 60) {
    const hhhh = personalities.find(p => p.code === 'HHHH')!
    return { primary: hhhh, secondary: scored[0].p, matchRate, dimLevels, dimRaw: rawScores }
  }

  return {
    primary: scored[0].p,
    secondary: scored[1]?.p ?? null,
    matchRate,
    dimLevels,
    dimRaw: rawScores,
  }
}
