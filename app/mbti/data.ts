export type MBTIDimension = 'EI' | 'SN' | 'TF' | 'JP';

export interface MBTIQuestion {
  id: number;
  text: string;
  dimension: MBTIDimension;
  positivePole: string; 
  negativePole: string;
}

export interface MBTITypeInfo {
  type: string;
  name: string;
  title: string;
  description: string;
  traits: string[];
  color: string;
  careers: string[];
  famousPeople: string[];
}

// --- Question Sets ---

export const shortQuestions: MBTIQuestion[] = [
  { id: 1, text: "在社交场合中，你通常是活跃分子而非安静的旁观者。", dimension: 'EI', positivePole: 'E', negativePole: 'I' },
  { id: 2, text: "独自度过一个周末会让你感到精力充沛，而不是孤独。", dimension: 'EI', positivePole: 'I', negativePole: 'E' },
  { id: 3, text: "你更倾向于通过交谈来理清思路，而不是独自思考。", dimension: 'EI', positivePole: 'E', negativePole: 'I' },
  { id: 4, text: "在漫长的一天结束后，你更喜欢通过社交活动来放松。", dimension: 'EI', positivePole: 'E', negativePole: 'I' },
  { id: 5, text: "你更关注当下的现实，而非未来的各种可能性。", dimension: 'SN', positivePole: 'S', negativePole: 'N' },
  { id: 6, text: "你经常陷入对未来的幻想，甚至因此忽略了眼前的事。 ", dimension: 'SN', positivePole: 'N', negativePole: 'S' },
  { id: 7, text: "在处理问题时，你更依赖过往的经验，而不是直觉。", dimension: 'SN', positivePole: 'S', negativePole: 'N' },
  { id: 8, text: "你喜欢寻找事物背后的深层含义和联系。", dimension: 'SN', positivePole: 'N', negativePole: 'S' },
  { id: 9, text: "在做决定时，逻辑和客观事实比他人的感受更重要。", dimension: 'TF', positivePole: 'T', negativePole: 'F' },
  { id: 10, text: "你很容易产生同理心，甚至会因他人的情绪而波动。", dimension: 'TF', positivePole: 'F', negativePole: 'T' },
  { id: 11, text: "你认为真相往往比顾及面子更重要。", dimension: 'TF', positivePole: 'T', negativePole: 'F' },
  { id: 12, text: "在冲突中，你更倾向于寻找情感上的和解而非争论对错。", dimension: 'TF', positivePole: 'F', negativePole: 'T' },
  { id: 13, text: "你喜欢制定详细的计划并严格执行。", dimension: 'JP', positivePole: 'J', negativePole: 'P' },
  { id: 14, text: "你觉得生活中的惊喜和即兴发挥比有序的计划更有趣。", dimension: 'JP', positivePole: 'P', negativePole: 'J' },
  { id: 15, text: "你的工作台或居住环境通常是整洁有序的。", dimension: 'JP', positivePole: 'J', negativePole: 'P' },
  { id: 16, text: "你倾向于在最后期限临近时才会产生最强的爆发力。", dimension: 'JP', positivePole: 'P', negativePole: 'J' },
  { id: 17, text: "在团队中，你更喜欢担任领导角色而非执行角色。", dimension: 'EI', positivePole: 'E', negativePole: 'I' },
  { id: 18, text: "你更喜欢具体、可操作的信息，而非抽象的理论。", dimension: 'SN', positivePole: 'S', negativePole: 'N' },
  { id: 19, text: "你很难忽视逻辑上的漏洞，即使这会伤害感情。", dimension: 'TF', positivePole: 'T', negativePole: 'F' },
  { id: 20, text: "你觉得‘条条框框’会让你感到束缚和不自在。", dimension: 'JP', positivePole: 'P', negativePole: 'J' },
];

export const standardQuestions: MBTIQuestion[] = [
  ...shortQuestions,
  { id: 21, text: "你更喜欢结识新朋友，而不是与老朋友小聚。", dimension: 'EI', positivePole: 'E', negativePole: 'I' },
  { id: 22, text: "你觉得在人群中保持沉默是一件很困难的事情。", dimension: 'EI', positivePole: 'E', negativePole: 'I' },
  { id: 23, text: "你认为自己是一个内敛、安静的人。", dimension: 'EI', positivePole: 'I', negativePole: 'E' },
  { id: 24, text: "你喜欢成为注意力的中心。", dimension: 'EI', positivePole: 'E', negativePole: 'I' },
  { id: 25, text: "你倾向于通过观察来学习，而不是亲身实践。", dimension: 'EI', positivePole: 'I', negativePole: 'E' },
  { id: 26, text: "你更注重事物的实际用途，而不是其美学价值。", dimension: 'SN', positivePole: 'S', negativePole: 'N' },
  { id: 27, text: "你经常能够注意到别人忽略的细节。", dimension: 'SN', positivePole: 'S', negativePole: 'N' },
  { id: 28, text: "你喜欢讨论哲学、心理学或科学的未来。", dimension: 'SN', positivePole: 'N', negativePole: 'S' },
  { id: 29, text: "你认为遵循传统比寻求改变更稳妥。", dimension: 'SN', positivePole: 'S', negativePole: 'N' },
  { id: 30, text: "你经常能预见到事情的发展趋势。", dimension: 'SN', positivePole: 'N', negativePole: 'S' },
  { id: 31, text: "你更看重一个人的能力，而不是其人品。", dimension: 'TF', positivePole: 'T', negativePole: 'F' },
  { id: 32, text: "你很难拒绝别人的请求，即使这会让你很为难。", dimension: 'TF', positivePole: 'F', negativePole: 'T' },
  { id: 33, text: "你认为批评应该是直截了当的。", dimension: 'TF', positivePole: 'T', negativePole: 'F' },
  { id: 34, text: "你总是试图避免伤害任何人的感情。", dimension: 'TF', positivePole: 'F', negativePole: 'T' },
  { id: 35, text: "你更倾向于追求公平，而不是怜悯。", dimension: 'TF', positivePole: 'T', negativePole: 'F' },
  { id: 36, text: "你总是保持准时，甚至会提前到达。", dimension: 'JP', positivePole: 'J', negativePole: 'P' },
  { id: 37, text: "你喜欢随遇而安，而不是事先预约。", dimension: 'JP', positivePole: 'P', negativePole: 'J' },
  { id: 38, text: "你喜欢在开始工作前先整理好所有的工具。", dimension: 'JP', positivePole: 'J', negativePole: 'P' },
  { id: 39, text: "你觉得‘最后期限’是用来灵活调整的。", dimension: 'JP', positivePole: 'P', negativePole: 'J' },
  { id: 40, text: "你更喜欢有规律的生活节奏。", dimension: 'JP', positivePole: 'J', negativePole: 'P' },
  { id: 41, text: "你在派对上通常是待到最后的人之一。", dimension: 'EI', positivePole: 'E', negativePole: 'I' },
  { id: 42, text: "你更喜欢写邮件或发信息，而不是直接打电话。", dimension: 'EI', positivePole: 'I', negativePole: 'E' },
  { id: 43, text: "你喜欢快节奏的工作环境。", dimension: 'EI', positivePole: 'E', negativePole: 'I' },
  { id: 44, text: "你认为想象力比知识更重要。", dimension: 'SN', positivePole: 'N', negativePole: 'S' },
  { id: 45, text: "你倾向于按部就班地处理复杂任务。", dimension: 'SN', positivePole: 'S', negativePole: 'N' },
  { id: 46, text: "你认为逻辑的一致性比人们的和谐共处更重要。", dimension: 'TF', positivePole: 'T', negativePole: 'F' },
  { id: 47, text: "你是一个感性的人。", dimension: 'TF', positivePole: 'F', negativePole: 'T' },
  { id: 48, text: "你总是知道自己在哪里放了东西。", dimension: 'JP', positivePole: 'J', negativePole: 'P' },
  { id: 49, text: "你喜欢保留多种选择，而不是过早下结论。", dimension: 'JP', positivePole: 'P', negativePole: 'J' },
  { id: 50, text: "你认为结果比过程更重要。", dimension: 'TF', positivePole: 'T', negativePole: 'F' },
  { id: 51, text: "你很难隐藏自己的情绪。", dimension: 'EI', positivePole: 'E', negativePole: 'I' },
  { id: 52, text: "你喜欢结构化的会议议程。", dimension: 'JP', positivePole: 'J', negativePole: 'P' },
  { id: 53, text: "你经常丢三落四。", dimension: 'JP', positivePole: 'P', negativePole: 'J' },
  { id: 54, text: "你认为‘善意的谎言’有时是必要的。", dimension: 'TF', positivePole: 'F', negativePole: 'T' },
  { id: 55, text: "你更喜欢抽象的艺术作品。", dimension: 'SN', positivePole: 'N', negativePole: 'S' },
  { id: 56, text: "你是一个喜欢质疑一切的人。", dimension: 'TF', positivePole: 'T', negativePole: 'F' },
  { id: 57, text: "你认为细节决定成败。", dimension: 'SN', positivePole: 'S', negativePole: 'N' },
  { id: 58, text: "你喜欢在行动前先分析所有的风险。", dimension: 'TF', positivePole: 'T', negativePole: 'F' },
  { id: 59, text: "你觉得自己是一个天生的乐观主义者。", dimension: 'EI', positivePole: 'E', negativePole: 'I' },
  { id: 60, text: "你更喜欢独处，因为这能让你集中注意力。", dimension: 'EI', positivePole: 'I', negativePole: 'E' },
];

export const comprehensiveQuestions: MBTIQuestion[] = [
  ...standardQuestions,
  { id: 61, text: "你倾向于在开口前先仔细斟酌词句。", dimension: 'EI', positivePole: 'I', negativePole: 'E' },
  { id: 62, text: "你喜欢在社交活动中认识各行各业的人。", dimension: 'EI', positivePole: 'E', negativePole: 'I' },
  { id: 63, text: "你认为自己更像是一个观察者。", dimension: 'EI', positivePole: 'I', negativePole: 'E' },
  { id: 64, text: "你喜欢思考‘如果...会怎样’。", dimension: 'SN', positivePole: 'N', negativePole: 'S' },
  { id: 65, text: "你更相信感官提供的信息。", dimension: 'SN', positivePole: 'S', negativePole: 'N' },
  { id: 66, text: "你倾向于看到森林，而不是具体的树木。", dimension: 'SN', positivePole: 'N', negativePole: 'S' },
  { id: 67, text: "你更喜欢具体的例证，而不是抽象的理论。", dimension: 'SN', positivePole: 'S', negativePole: 'N' },
  { id: 68, text: "你经常会有一些别人觉得古怪的想法。", dimension: 'SN', positivePole: 'N', negativePole: 'S' },
  { id: 69, text: "你更看重公正，而不是慈悲。", dimension: 'TF', positivePole: 'T', negativePole: 'F' },
  { id: 70, text: "你认为同情心有时会妨碍做出正确的决定。", dimension: 'TF', positivePole: 'T', negativePole: 'F' },
  { id: 71, text: "你认为被大家喜爱比被大家尊重更重要。", dimension: 'TF', positivePole: 'F', negativePole: 'T' },
  { id: 72, text: "你倾向于根据逻辑推导来做决定。", dimension: 'TF', positivePole: 'T', negativePole: 'F' },
  { id: 73, text: "你是一个善于安慰他人的人。", dimension: 'TF', positivePole: 'F', negativePole: 'T' },
  { id: 74, text: "你喜欢在度假前安排好所有的细节。", dimension: 'JP', positivePole: 'J', negativePole: 'P' },
  { id: 75, text: "你觉得太多的规则会限制人的创造力。", dimension: 'JP', positivePole: 'P', negativePole: 'J' },
  { id: 76, text: "你喜欢把事情一次性做完，而不是分几次。", dimension: 'JP', positivePole: 'J', negativePole: 'P' },
  { id: 77, text: "你喜欢在最后一刻改变主意。", dimension: 'JP', positivePole: 'P', negativePole: 'J' },
  { id: 78, text: "你认为生活应该是高度组织化的。", dimension: 'JP', positivePole: 'J', negativePole: 'P' },
  { id: 79, text: "你更喜欢大声说出自己的想法。", dimension: 'EI', positivePole: 'E', negativePole: 'I' },
  { id: 80, text: "你认为沉默是金。", dimension: 'EI', positivePole: 'I', negativePole: 'E' },
  { id: 81, text: "你倾向于用比喻和联想来表达自己。", dimension: 'SN', positivePole: 'N', negativePole: 'S' },
  { id: 82, text: "你是一个非常务实的人。", dimension: 'SN', positivePole: 'S', negativePole: 'N' },
  { id: 83, text: "你总是试图寻找问题的根源。", dimension: 'TF', positivePole: 'T', negativePole: 'F' },
  { id: 84, text: "你认为和谐比效率更重要。", dimension: 'TF', positivePole: 'F', negativePole: 'T' },
  { id: 85, text: "你喜欢事先知道接下来会发生什么。", dimension: 'JP', positivePole: 'J', negativePole: 'P' },
  { id: 86, text: "你经常觉得时间不够用。", dimension: 'JP', positivePole: 'J', negativePole: 'P' },
  { id: 87, text: "你是一个非常有创意的人。", dimension: 'SN', positivePole: 'N', negativePole: 'S' },
  { id: 88, text: "你认为数据比直觉更可靠。", dimension: 'TF', positivePole: 'T', negativePole: 'F' },
  { id: 89, text: "你觉得规律的生活很乏味。", dimension: 'JP', positivePole: 'P', negativePole: 'J' },
  { id: 90, text: "你更喜欢一个人静静地读书。", dimension: 'EI', positivePole: 'I', negativePole: 'E' },
  { id: 91, text: "你喜欢挑战现有的规则。", dimension: 'JP', positivePole: 'P', negativePole: 'J' },
  { id: 92, text: "你非常在意别人对你的看法。", dimension: 'TF', positivePole: 'F', negativePole: 'T' },
  { id: 93, text: "你认为生活是一场探险。", dimension: 'SN', positivePole: 'N', negativePole: 'S' },
];

export const personalityTypes: Record<string, MBTITypeInfo> = {
  "INTJ": {
    type: "INTJ",
    name: "建筑师",
    title: "富有想象力且战略性的思考者",
    description: "你拥有独特的战略视野，能够看透复杂系统的本质。你独立、客观，总是追求卓越与逻辑的完美。",
    traits: ["独立", "逻辑严密", "远见卓识", "高度理性"],
    color: "#6B46C1",
    careers: ["系统分析师", "战略策划", "软件架构师", "科研专家"],
    famousPeople: ["埃隆·马斯克", "尼古拉·特斯拉", "弗里德里希·尼采"]
  },
  "INTP": {
    type: "INTP",
    name: "逻辑学家",
    title: "具有创造力的发明家",
    description: "你是永不疲倦的思想探索者。你对知识有着极度渴望，喜欢分析复杂的理论，并在脑海中构建各种可能性。",
    traits: ["好奇", "灵活", "客观", "深刻"],
    color: "#4A90E2",
    careers: ["程序员", "数学家", "哲学家", "游戏开发者"],
    famousPeople: ["阿尔伯特·爱因斯坦", "艾萨克·牛顿", "比尔·盖茨"]
  },
  "ENTJ": {
    type: "ENTJ",
    name: "指挥官",
    title: "大胆且意志坚强的领导者",
    description: "天生的领导者，善于规划全局并果断执行。你总是能发现低效之处并将其转化为高效的体系。",
    traits: ["果断", "自信", "高效", "战略"],
    color: "#C53030",
    careers: ["企业CEO", "项目经理", "律师", "管理咨询"],
    famousPeople: ["史蒂夫·乔布斯", "戈登·拉姆齐", "撒切尔夫人"]
  },
  "ENTP": {
    type: "ENTP",
    name: "辩论家",
    title: "聪明且好奇的思考者",
    description: "你喜欢挑战现状，通过辩论和头脑风暴来探索新事物。你反应极快，总是能找到独特的切入点。",
    traits: ["机智", "开放", "不循常规", "充满活力"],
    color: "#D69E2E",
    careers: ["营销策划", "创业者", "导演", "调查记者"],
    famousPeople: ["汤姆·汉克斯", "莱昂纳多·达·芬奇", "马克·吐温"]
  },
  "INFJ": {
    type: "INFJ",
    name: "提倡者",
    title: "安静而神秘，且极具鼓舞人心的理想主义者",
    description: "你拥有极强的洞察力和同理心。你不仅追求个人的成功，更渴望为世界带来深层次的正向改变。",
    traits: ["理想主义", "深刻", "坚定", "富同情心"],
    color: "#2D3748",
    careers: ["心理咨询师", "作家", "非营利组织领导", "教育家"],
    famousPeople: ["马丁·路德·金", "纳尔逊·曼德拉", "摩根·弗里曼"]
  },
  "INFP": {
    type: "INFP",
    name: "调解员",
    title: "诗意、善良且无私的人道主义者",
    description: "你是真正的理想主义者，总是试图在最糟糕的人或事中寻找美好的一面。你内心温柔，价值观极强。",
    traits: ["温柔", "忠诚", "极具想象力", "重视价值"],
    color: "#38A169",
    careers: ["自由职业", "艺术设计", "心理治疗", "翻译"],
    famousPeople: ["约翰·列侬", "J.K.罗琳", "威廉·莎士比亚"]
  },
  "ENFJ": {
    type: "ENFJ",
    name: "主人公",
    title: "富有魅力且鼓舞人心的领导者",
    description: "你天生具有感染力，能够激发他人的潜力。你对他人的需求极度敏感，是极佳的沟通者和协调者。",
    traits: ["感召力", "利他主义", "善解人意", "热情"],
    color: "#E53E3E",
    careers: ["公关总监", "培训讲师", "人力资源", "政治家"],
    famousPeople: ["巴拉克·奥巴马", "奥普拉·温弗瑞", "波诺"]
  },
  "ENFP": {
    type: "ENFP",
    name: "竞选者",
    title: "充满热情、创造力且自由自在的灵魂",
    description: "你是派对的焦点，总是能带给周围人惊喜。你乐观开朗，能够发现生活中处处存在的可能性。",
    traits: ["活力", "乐观", "社交达人", "有创造力"],
    color: "#DD6B20",
    careers: ["活动策划", "演艺人员", "创意总监", "旅游博主"],
    famousPeople: ["小罗伯特·唐尼", "罗宾·威廉姆斯", "华特·迪士尼"]
  },
  "ISTJ": {
    type: "ISTJ",
    name: "物流师",
    title: "务实且注重事实的人",
    description: "你是秩序的捍卫者。你可靠、严谨，重视传统和忠诚，是任何组织中都不可或缺的稳固基石。",
    traits: ["可靠", "严谨", "负责", "重视事实"],
    color: "#4A5568",
    careers: ["会计师", "审计", "法官", "系统管理员"],
    famousPeople: ["乔治·华盛顿", "安格拉·默克尔", "杰夫·贝佐斯"]
  },
  "ISFJ": {
    type: "ISFJ",
    name: "守卫者",
    title: "充满奉献精神且热情的保护者",
    description: "你非常照顾身边人的感受，总是默默提供支持。你务实且注重细节，是他人眼中最值得信赖的朋友。",
    traits: ["细心", "体贴", "勤奋", "低调"],
    color: "#319795",
    careers: ["护士", "社会工作者", "图书管理员", "客服经理"],
    famousPeople: ["伊丽莎白二世", "碧昂丝", "特蕾莎修女"]
  },
  "ESTJ": {
    type: "ESTJ",
    name: "总经理",
    title: "出色的管理者，在管理事务或人员方面无与伦比",
    description: "你坚信秩序和规则。你不仅自己高效，还能带动周围的人一起变得有序。你诚实、果断，喜欢直面困难。",
    traits: ["组织能力强", "务实", "正直", "效率导向"],
    color: "#2B6CB0",
    careers: ["销售经理", "警官", "工厂主", "财务主管"],
    famousPeople: ["约翰·D·洛克菲勒", "弗兰克·辛纳屈", "希拉里·克林顿"]
  },
  "ESFJ": {
    type: "ESFJ",
    name: "执政官",
    title: "极具同情心、社交能力强且受欢迎的人",
    description: "你乐于助人，总是能够营造出和谐的社交氛围。你非常看重社区意识和传统，对他人的认可非常敏感。",
    traits: ["热情", "合群", "尽责", "善于交际"],
    color: "#D53F8C",
    careers: ["教师", "行政顾问", "医疗保健", "客户协调员"],
    famousPeople: ["泰勒·斯威夫特", "比尔·克林顿", "詹妮弗·洛佩兹"]
  },
  "ISTP": {
    type: "ISTP",
    name: "鉴赏家",
    title: "大胆且实际的探索者",
    description: "你喜欢亲自动手解决问题。你冷静、灵活，能够迅速掌握新工具，是那种在压力下依然能游刃有余的硬核玩家。",
    traits: ["灵活", "冷静", "动手能力强", "好奇"],
    color: "#718096",
    careers: ["机械工程师", "法医", "飞行员", "运动员"],
    famousPeople: ["迈克尔·乔丹", "汤姆·克鲁斯", "斯嘉丽·约翰逊"]
  },
  "ISFP": {
    type: "ISFP",
    name: "冒险家",
    title: "灵活且富有魅力的艺术家",
    description: "你活在当下，总是在探索美的无限可能。你性格温和，不喜欢冲突，用一种独特且低调的方式表达自我。",
    traits: ["艺术触觉", "温和", "随性", "敏锐"],
    color: "#3182CE",
    careers: ["插画师", "时装设计师", "园艺师", "音乐家"],
    famousPeople: ["莉娜·德尔·雷", "迈克尔·杰克逊", "弗里达·卡罗"]
  },
  "ESTP": {
    type: "ESTP",
    name: "企业家",
    title: "聪明、精力充沛且极具洞察力的人",
    description: "你热爱冒险，喜欢处在行动的核心。你反应极快，能够瞬间做出决策，是那种在丛林法则中也能活得很好的行动派。",
    traits: ["自信", "适应性强", "敏锐", "行动派"],
    color: "#ED8936",
    careers: ["股票经纪人", "消防员", "特工", "职业赛车手"],
    famousPeople: ["唐纳德·特朗普", "麦当娜", "艾迪·墨菲"]
  },
  "ESFP": {
    type: "ESFP",
    name: "表演者",
    title: "自发、精力充沛且热情的表演者",
    description: "生活就是你的舞台。你天生乐观，能够带动周围的气氛。你极具审美，总是追求生活中最直接的感官享受。",
    traits: ["幽默", "热情", "专注当下", "审美优异"],
    color: "#F6E05E",
    careers: ["导游", "演员", "公共关系", "室内设计师"],
    famousPeople: ["阿黛尔", "玛丽莲·梦露", "贾斯汀·比伯"]
  }
};
