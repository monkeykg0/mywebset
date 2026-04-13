// ─── 维度定义 ─────────────────────────────────────────────
// 6个核心维度，每个维度两极
// STR: 武力 vs 智谋 (S=武 I=智)
// LED: 独断 vs 纳谏 (D=独 L=纳)
// EMO: 热血 vs 冷静 (H=热 C=冷)
// LOY: 忠义 vs 实用 (Y=忠 P=实)
// SOC: 张扬 vs 内敛 (E=张 R=内)
// AMB: 称霸 vs 辅佐 (K=霸 M=辅)

export type DimKey = 'STR' | 'LED' | 'EMO' | 'LOY' | 'SOC' | 'AMB'
export type DimPole = 'S' | 'I' | 'D' | 'L' | 'H' | 'C' | 'Y' | 'P' | 'E' | 'R' | 'K' | 'M'

export interface SanguoChar {
  code: string
  name: string
  title: string
  faction: 'wei' | 'shu' | 'wu' | 'han' | 'qun'
  tagline: string
  description: string
  color: string
  rarity: 'legendary' | 'epic' | 'rare' | 'common'
  poles: [DimPole, DimPole, DimPole, DimPole, DimPole, DimPole]
}

export interface Question {
  id: number
  text: string
  group: string
  options: {
    text: string
    scores: Partial<Record<DimKey, number>>
  }[]
}

// ─── 人物数据（疯癫+自嘲版） ──────────────────────────────────────
export const characters: SanguoChar[] = [
  {
    code: 'CAOCAO', name: '曹操', title: '绝世大怨种', faction: 'wei',
    tagline: '宁可我白嫖全天下，休教天下人白嫖我！',
    description: '重度PUA带师，一边深夜发emo朋友圈装诗人，一边反手把同事的饭碗端了。你的口头禅是"这事儿得有大格局"，其实就是自己不想干活。最离谱的是，居然总有一帮傻子愿意跟着你吃饼，真是老天瞎了眼。',
    color: '#00B4FF', rarity: 'legendary', poles: ['I','D','C','P','E','K'],
  },
  {
    code: 'SIMAYI', name: '司马懿', title: '千年老阴比', faction: 'wei',
    tagline: '比谁更能苟，老子还没输过。',
    description: '办公室里最没存在感的狠角色。别人在群里对骂，你在默默截图；别人为了晋升大打出手，你在旁边喝枸杞茶。你活着的唯一动力就是把所有认识的人都熬死，因为只要敌人都死了，你就是最后的王者。',
    color: '#8B00FF', rarity: 'legendary', poles: ['I','D','C','P','R','K'],
  },
  {
    code: 'LIUBEI', name: '刘备', title: '互联网绿茶', faction: 'shu',
    tagline: '老铁借点钱，下辈子一定还！',
    description: '深谙"会哭的孩子有奶吃"的宇宙法则！打不过就跑，跑不掉就哭。看起来人畜无害甚至有点废，其实心里算盘打得比收银机还快。别人靠实力打天下，你凭一张"兄弟我苦啊"的嘴就能凑齐一整套草台班子，简直是白手起家的奇葩！',
    color: '#FF6B35', rarity: 'legendary', poles: ['I','L','H','Y','E','K'],
  },
  {
    code: 'ZHUGELIANG', name: '诸葛亮', title: '顶级卷王', faction: 'shu',
    tagline: '扶我起来，我还能再跑几个需求！',
    description: '你的存在就是为了衬托其他人的废物！有强迫症，看见别人代码写得烂比死了还难受，所以什么事都非得自己来。天天熬夜肝进度，明明拿着打工仔的钱，操着董事长的碎心。听句劝吧，再卷容易猝死！',
    color: '#00FF87', rarity: 'legendary', poles: ['I','D','C','Y','R','M'],
  },
  {
    code: 'GUANYU', name: '关羽', title: '死傲娇', faction: 'shu',
    tagline: '插标卖首的垃圾，别来沾边！',
    description: '面子比命还重要，可以不吃饭，但绝对不能不装B。对看不上的人连个正眼都不给，但只要有人顺毛顺对了一次，你连命都能给人家。可惜有时候装逼过头容易翻车，被人在背后阴了还得保持迷之微笑。',
    color: '#FF0000', rarity: 'legendary', poles: ['S','D','H','Y','E','M'],
  },
  {
    code: 'ZHANGFEI', name: '张飞', title: '纯种暴龙机', faction: 'shu',
    tagline: '能动手尽量别吵吵，你是不是找抽？',
    description: '脑子直得像钢筋，情绪管理长期处于离线状态。遇到问题第一反应永远是掀桌子，但实际上内心极度缺爱。对待小弟非常暴躁，也就是仗着兄弟罩着你，不然早就在电视剧第二集被人套麻袋打死了。',
    color: '#FF4500', rarity: 'epic', poles: ['S','D','H','Y','E','M'],
  },
  {
    code: 'ZHAOYU', name: '赵云', title: '职场幻神', faction: 'shu',
    tagline: '稳住，我能送老板安全回家！',
    description: '你是那种每个老板做梦都想拥有的神仙员工：干最苦的活，拿微薄的薪，还从不邀功！哪怕公司破产去讨债，你也能杀出一条血路把老板的公积金抢回来。就是太完美了点，完美到让人怀疑你是不是AI仿生人。',
    color: '#87CEEB', rarity: 'legendary', poles: ['S','L','H','Y','R','M'],
  },
  {
    code: 'SUNQUAN', name: '孙权', title: '苟分战神', faction: 'wu',
    tagline: '只要我不出门，意外就找不到我。',
    description: '富二代中的奇迹，擅长在别人的争吵中假装听不见。遇到危机第一反应"关门放狗"，绝对不主动出击。虽然经常被嘲笑是个混子，但只要活得够长，看着仇人们一个个暴毙，你就是笑到最后的那个靓仔。',
    color: '#FF4500', rarity: 'legendary', poles: ['I','L','C','P','E','K'],
  },
  {
    code: 'ZHOUYU', name: '周瑜', title: '易怒体质', faction: 'wu',
    tagline: '有他没我，有我没他，气死老子了！',
    description: '长得好看，业务能力也强，就是心态太容易炸裂。胜负欲极高，天天在心里和假想敌赛跑，看到别人过得比你好就会默默破防。其实你已经很棒了，只是这该死的嫉妒心让你永远无法快乐吃瓜。',
    color: '#00BFFF', rarity: 'legendary', poles: ['I','D','H','Y','E','K'],
  },
  {
    code: 'LVBU', name: '吕布', title: '反复横跳带师', faction: 'qun',
    tagline: '谁给我加薪，谁就是我新爹！',
    description: '武力值MAX，情商负数！你根本不懂什么叫"忠诚"，你只认"前途"。为了涨薪可以随意跳槽，甚至连老板也能打。最后因为得罪的人太多被全行业封杀，妥妥的一把好牌打得稀烂。',
    color: '#FF1493', rarity: 'legendary', poles: ['S','D','H','P','E','K'],
  },
  {
    code: 'DIAOCHAN', name: '貂蝉', title: '高段位海王', faction: 'han',
    tagline: '哥哥们别打了，都是我的鱼！',
    description: '表面楚楚可怜，其实是个顶级的套路王。擅长在两个甚至多个大佬之间走钢丝，动动手指就能让他们为你大打出手。在这个残酷的社会，你用一种"你们都在保护我、其实都在被我玩"的方式杀出重围。',
    color: '#FF69B4', rarity: 'epic', poles: ['I','L','H','Y','R','M'],
  },
  {
    code: 'XUCHU', name: '许褚', title: '肌肉沙雕', faction: 'wei',
    tagline: '脑子是个好东西，但我不用它！',
    description: '四肢发达，头脑约等于没有。谁对你好，你就给谁卖命，思考这种复杂的事情对你来说太费电了。虽然经常被人叫二愣子，但这种纯粹的快乐，那些天天算计的老银币八辈子也体会不到。',
    color: '#CC4400', rarity: 'epic', poles: ['S','L','H','Y','E','M'],
  },
  {
    code: 'JIAXU', name: '贾诩', title: '键盘侠祖师爷', faction: 'wei',
    tagline: '我只提个建议，炸鸡翅炸了厨房不关我事。',
    description: '你是那种最可怕的混子，一句话就能让公司倒闭，但你绝对不会在群里发出来，只会私发。极致的利己主义者，永远有后路。哪天世界末日来了，你这号人肯定能混进诺亚方舟的头等舱。',
    color: '#556B2F', rarity: 'legendary', poles: ['I','D','C','P','R','M'],
  },
  {
    code: 'YUANSHAO', name: '袁绍', title: '装逼犯', faction: 'qun',
    tagline: '只要我家世好，就算躺着也能装一装！',
    description: '投胎技术满分的一个奇男子！家里条件太好了，以至于你觉得全天下都欠你的。犹豫不决、又爱听马屁，顺风局浪得飞起，逆风局疯狂甩锅。一手同花顺因为发脾气硬是拆成散牌打出去了，也算是一种绝活。',
    color: '#4B0082', rarity: 'epic', poles: ['I','D','C','P','E','K'],
  },
  {
    code: 'LUSU', name: '鲁肃', title: '极品大冤种', faction: 'wu',
    tagline: '大家有话好好说，别动手啊喂！',
    description: '全职和事佬，老好人本好。天天被队友坑，还要被对手骗，但你依然相信这个世界充满爱。你总是试图把水火不容的两拨人拉到一张桌子上吃饭，最后结账的那个冤大头肯定是你。',
    color: '#3CB371', rarity: 'epic', poles: ['I','L','C','Y','R','M'],
  },
  {
    code: 'MACHAO', name: '马超', title: '锦马超骑士', faction: 'shu',
    tagline: '只要跑得够快，生活的铁锤就追不上我！',
    description: '虽然长得帅，但脑子似乎一直在外包。人生哲学就是只要速度够快，责任就追不上我。自带一种莫名其妙的热血，实际上全凭本能在活，很容易被聪明人当枪使。',
    color: '#00BFFF', rarity: 'epic', poles: ['S','D','H','Y','E','K'],
  },
  {
    code: 'HUANGZHONG', name: '黄忠', title: '老当益壮', faction: 'shu',
    tagline: '老子不退休，你们全都没机会！',
    description: '严重的不服老综合症患者。只要敢说一句"您辛苦了"，他就能跳起来砍死你。虽然是一把老骨头了，但是职场经验极度丰富，每天的动力就是卷死那些自以为是的年轻人。',
    color: '#FFD700', rarity: 'epic', poles: ['S','L','H','Y','R','M'],
  },
  {
    code: 'WEIYAN', name: '魏延', title: '反骨男孩', faction: 'shu',
    tagline: '只要我足够叛逆，老板就得哄着我。',
    description: '天生反骨，对谁都不服。虽然有真本事，但是嘴太臭，情商基本为负数。你觉得这叫个性，但在别人眼里你就是个行走的雷管，根本不知道你什么时候就把团队给炸了。',
    color: '#32CD32', rarity: 'rare', poles: ['S','D','H','P','E','K'],
  },
  {
    code: 'PANGTONG', name: '庞统', title: '防沉迷设定', faction: 'shu',
    tagline: '长得丑怎么了？这叫防沉迷设定！',
    description: '靠才华吃饭的绝对典型。总是一副看破红尘的拽样，最喜欢在一旁看着别人瞎忙活然后冷笑着指指点点。虽然嘴上欠打也很遭人恨，但往往他提的方案都是对的。',
    color: '#9370DB', rarity: 'epic', poles: ['I','D','C','P','E','K'],
  },
  {
    code: 'SUNSHANGXIANG', name: '孙尚香', title: '军火大小姐', faction: 'wu',
    tagline: '与其等个霸道总裁，不如我自己当哥！',
    description: '家里有矿所以天不怕地不怕的大小姐。性格火爆，随时准备物理超度别人。看起来是个女汉子，其实内心有着无法无天的中二病，是那种会在婚礼上掏出加特林的狠角色。',
    color: '#FF1493', rarity: 'epic', poles: ['S','D','H','Y','E','K'],
  },
  {
    code: 'GANNING', name: '甘宁', title: '精神小伙', faction: 'wu',
    tagline: '出来混，就是要讲排场！',
    description: '典型的社会人，哪怕穷得吃土，身上的混混套装也必须是全场最亮的。自带BGM的男人，走到哪都要弄出点动静，虽然嚣张但也算肝胆相照，只要不借钱，大家都好做兄弟。',
    color: '#FF8C00', rarity: 'rare', poles: ['S','D','H','P','E','M'],
  },
  {
    code: 'LUXUN', name: '陆逊', title: '斯文败类', faction: 'wu',
    tagline: '没点素质怎么混江湖？看我烧你全家！',
    description: '表面上是个温文尔雅的小奶狗，实际上是个心黑手辣的顶级老赖。你用最纯良的表情干着最缺德的事情，看着对手被坑得怀疑人生，你在被窝里捂着嘴偷笑。',
    color: '#DC143C', rarity: 'legendary', poles: ['I','L','C','Y','R','M'],
  },
  {
    code: 'TAISHICI', name: '太史慈', title: '头铁骑士', faction: 'wu',
    tagline: '我的规矩就是规矩！',
    description: '严重的强迫症和道德洁癖，认死理。他说一就是一，你要是敢说二，他当场跟你决斗。这种人在现代社会非常稀缺，因为通常活不过三天，但奇迹般地，你总是能莽出生存空间。',
    color: '#FFD700', rarity: 'rare', poles: ['S','L','H','Y','R','M'],
  },
  {
    code: 'DIANWEI', name: '典韦', title: '完美挡箭牌', faction: 'wei',
    tagline: '拿命换钱？太好了，我最缺钱！',
    description: '终极打工人，老板的完美保命符。只要工资给够，就算让他去挡核弹都不眨眼。平时憨厚老实得像块充电宝，一旦激活就彻底暴走，毫无节制地疯狂输出，直到燃尽自己。',
    color: '#8B0000', rarity: 'rare', poles: ['S','L','H','Y','R','M'],
  },
  {
    code: 'GUOJIA', name: '郭嘉', title: '赛博病娇', faction: 'wei',
    tagline: '熬夜一时爽，一直熬夜一直爽！',
    description: '智商突破天际，但生活作息烂得一塌糊涂。靠着透支生命在写代码想方案，是全公司最不可或缺也最容易突然暴毙的传奇存在。你的宗旨是：活的灿烂，死得突然。',
    color: '#8A2BE2', rarity: 'legendary', poles: ['I','D','C','P','R','M'],
  },
  {
    code: 'XUNYU', name: '荀彧', title: '强迫症晚期', faction: 'wei',
    tagline: '如果这破公司倒了，一定是因为我还没秃。',
    description: '强迫症晚期+完美主义者。就算公司明天就要倒闭，今天也要把文件的格式排整齐。你对别人严格，对自己更狠。最可怕的是，老板离不开你，但你还在焦虑自己做的不够好。',
    color: '#00FFFF', rarity: 'epic', poles: ['I','L','C','Y','R','M'],
  },
  {
    code: 'ZHANGCHUNHUA', name: '张春华', title: '黑寡妇', faction: 'wei',
    tagline: '惹我可以，先看看你的骨头硬不硬。',
    description: '顶级腹黑御姐。外表贤良淑德，切开来里面全都是黑的。专治各种白莲花和普信男，你信奉的人生哲学是：只要把制造问题的人物理解决了，问题自然就没了。',
    color: '#C71585', rarity: 'epic', poles: ['I','D','C','P','R','K'],
  },
  {
    code: 'DONGZHUO', name: '董卓', title: '野兽派老总', faction: 'qun',
    tagline: '好汉不吃眼前亏，我吃肉！',
    description: '极度信奉丛林法则的肉食主义者，把自私写在脑门上。活得非常真实，一点假面具都不戴，就是俗不可耐的喜欢钱和权力。虽然臭名昭著，但私底下很多人还挺羡慕你活得这么洒脱。',
    color: '#008000', rarity: 'epic', poles: ['S','D','H','P','E','K'],
  },
  {
    code: 'YUANSHU', name: '袁术', title: '戏精之王', faction: 'qun',
    tagline: '我就是太阳，地球必须绕着我转！',
    description: '一个彻头彻尾的幻想家，被自己编造的剧本深深洗脑。你总觉得只要大喊一声，全宇宙都会响应响应。虽然每天都在假想的王座上做梦而且常被打脸，但这份无敌的自我催眠能力也算绝了。',
    color: '#FFFF00', rarity: 'rare', poles: ['I','D','H','P','E','K'],
  },
  {
    code: 'HUATUO', name: '华佗', title: '暴力庸医', faction: 'qun',
    tagline: '疼？疼就对了！疼说明你还活着！',
    description: '看似救死扶伤的白衣天使，其实根本是个科学狂人。别人眼里的病人，在你眼里就是待解决的BUG。遇到疑难杂症眼睛发光，一旦治好就失去兴趣。这种人虽然医术高，但你最好祈祷永远别遇见他。',
    color: '#00FA9A', rarity: 'epic', poles: ['I','D','C','Y','R','M'],
  }
]

// ─── 题目数据（疯癫+自嘲版） ──────────────────────────────────────
export const questions: Question[] = [
  {
    id: 1,
    text: '老板拍脑门做了一个极其脑瘫的决定，你会——',
    group: '职场生存',
    options: [
      { text: '直接掀桌！大声指责老板是个弱智（然后被炒）', scores: { STR: 3, LED: 2, EMO: 2 } },
      { text: '假装没听见，疯狂摸鱼，反正公司垮了也不关我事', scores: { LOY: -2, AMB: -1, SOC: -2 } },
      { text: '高呼老板英明！背地里偷偷联系猎头并转移公司资产', scores: { STR: -2, LED: 1, AMB: 2, LOY: -3 } },
      { text: '委屈巴巴地去跑执行，边跑边在厕所偷偷抹眼泪', scores: { LOY: 2, SOC: -1, EMO: -1 } },
    ],
  },
  {
    id: 2,
    text: '听说死对头最近亏了一大波钱，你真实的想法是——',
    group: '情绪管理',
    options: [
      { text: '哈哈哈哈爽！立刻买三挂鞭炮去他家门口放！', scores: { SOC: 3, EMO: 2, AMB: 1 } },
      { text: '表面叹气惋惜，反手就把这事发到所有小群里', scores: { SOC: -1, STR: -1, LOY: -1 } },
      { text: '这说明行情不好，我得赶紧检查一下自己的余额', scores: { STR: -2, LED: 2, EMO: -2 } },
      { text: '找准机会低价收购他的烂摊子，物理超度他', scores: { LED: 2, AMB: 3, STR: 1 } },
    ],
  },
  {
    id: 3,
    text: '你刚被拉进一个全是陌生大佬的群，你的第一反应是——',
    group: '社交牛逼症',
    options: [
      { text: '先发个不要脸的表情包震慑全场：“在座的各位都是弟弟！”', scores: { SOC: 3, STR: 2, EMO: 1 } },
      { text: '潜水装死，假装是个只会扣"1"的底层机器人', scores: { SOC: -3, STR: -1 } },
      { text: '火速翻看群成员资料，精准物色哪个爹最粗，准备抱腿', scores: { AMB: 2, STR: -1, LED: 1 } },
      { text: '开始有组织有预谋地发广告或者抢红包', scores: { AMB: 1, SOC: 1, LOY: -2 } },
    ],
  },
  {
    id: 4,
    text: '周末老板夺命连环call喊你去无效加班，你的骚操作是——',
    group: '极限拉扯',
    options: [
      { text: '"老子在荒岛探险没信号！"——直接关机睡觉', scores: { STR: 2, LOY: -2, SOC: -1 } },
      { text: '"老板我来啦！"——秒回消息，然后磨叽三小时才到', scores: { STR: -2, LOY: 1, LED: -1 } },
      { text: '趁机讲条件：“去可以，但要求调休+三倍报销”', scores: { AMB: 2, LED: 2, EMO: -1 } },
      { text: '比老板还卷！提前五分钟到岗，并把老板卷出内疚感', scores: { LOY: 3, EMO: -1, SOC: -1 } },
    ],
  },
  {
    id: 5,
    text: '当意识到自己其实就是个平平无奇的普通废物时，你会——',
    group: '自我认知',
    options: [
      { text: '拒绝承认！每天给自己洗脑：我是天选之子！', scores: { SOC: 2, EMO: 2, STR: 1 } },
      { text: '彻底摆烂：既然是废物，那我不努力也很合理吧？', scores: { AMB: -3, STR: -2, EMO: -1 } },
      { text: '开始包装自己：当不了一流人才，我就当一流神棍', scores: { STR: -1, LED: 2, SOC: -1 } },
      { text: '认清现实，找个厉害的狠人死死抱住他大腿', scores: { LOY: 2, AMB: -1, SOC: -2 } },
    ],
  },
  {
    id: 6,
    text: '如果你可以选一个超能力，你会选什么？',
    group: '终极幻想',
    options: [
      { text: '一拳把所有讨厌的人轰到外太空！', scores: { STR: 3, EMO: 2, SOC: 1 } },
      { text: '可以看透别人心思，把别人当狗溜！', scores: { STR: -2, LED: 3, EMO: -1 } },
      { text: '魅惑众生，让所有人自愿给我打钱！', scores: { SOC: 2, LOY: -2, AMB: 2 } },
      { text: '只要我不想起床，时间就永远静止！', scores: { AMB: -2, EMO: -2, STR: -1 } },
    ],
  },
  {
    id: 7,
    text: '面对别人"画的大饼"，你通常的消化方式是——',
    group: '智商税',
    options: [
      { text: '不仅吃下去，还要感动到哭着为他卖命！', scores: { LOY: 3, EMO: 1, STR: -1 } },
      { text: '直接把饼砸他脸上：“滚，老子要现金！”', scores: { STR: 2, EMO: 2, SOC: 1 } },
      { text: '假装吃得很香，然后在饼里下毒反杀老总', scores: { LED: 2, AMB: 2, LOY: -3 } },
      { text: '太棒了！拿着这块饼再去骗五个下线接盘！', scores: { SOC: 1, LED: 2, STR: -1 } },
    ],
  },
  {
    id: 8,
    text: '关于"忠诚"这东西，你觉得多少钱一斤？',
    group: '道德底线',
    options: [
      { text: '无价！认了大哥就是一辈子的事，死都不抛弃！', scores: { LOY: 3, SOC: 1, STR: 1 } },
      { text: '看脸，好看的无价，难看的按斤称！', scores: { EMO: 2, SOC: 1, LOY: -1 } },
      { text: '忠诚不过是因为背叛的筹码还不够大。', scores: { LOY: -3, LED: 2, AMB: 2 } },
      { text: '我自己就是老板，我只要求别人对我忠诚！', scores: { LED: 3, AMB: 2, SOC: 1 } },
    ],
  },
  {
    id: 9,
    text: '网恋对象居然是个骗钱的抠脚大汉，你会——',
    group: '大风大浪',
    options: [
      { text: '心态崩塌，半夜买醉，在朋友圈发网抑云歌词', scores: { EMO: 3, STR: -1, SOC: 1 } },
      { text: '顺势拜把子，拉他一起合伙去骗下一个受害者', scores: { LED: 2, AMB: 2, LOY: -2 } },
      { text: '连夜顺着网线过去，把他的头打进显示器里！', scores: { STR: 3, EMO: 2, SOC: 2 } },
      { text: '冷静收集证据、报警、冻结资产，并要他三倍赔偿', scores: { STR: -2, LED: 2, EMO: -2 } },
    ],
  },
  {
    id: 10,
    text: '在公司年会上，大家都喝醉了，你会——',
    group: '放飞自我',
    options: [
      { text: '抢过麦克风，踩在桌子上唱《好汉歌》！', scores: { SOC: 3, EMO: 2, STR: 1 } },
      { text: '拿着酒杯挨个敬酒，疯狂结交隐形大佬', scores: { AMB: 2, SOC: 2, LED: 1 } },
      { text: '趁乱吃光最贵的海鲜，然后悄无声息地溜走', scores: { SOC: -2, STR: -1, EMO: -1 } },
      { text: '保持半清醒，录下老板出洋相的视频留作以后的把柄', scores: { LED: 2, LOY: -2, EMO: -2 } },
    ],
  },
]

// ─── 计算结果 ─────────────────────────────────────────────
export interface CalcResult {
  character: SanguoChar
  matchScore: number
  factionCount: Record<string, number>
  dimScores: Record<DimKey, number>
}

const DIM_POLES: Record<DimKey, [DimPole, DimPole]> = {
  STR: ['S', 'I'],  // 武力 vs 智谋
  LED: ['D', 'L'],  // 独断 vs 纳谏
  EMO: ['H', 'C'],  // 热血 vs 冷静
  LOY: ['Y', 'P'],  // 忠义 vs 实用
  SOC: ['E', 'R'],  // 张扬 vs 内敛
  AMB: ['K', 'M'],  // 称霸 vs 辅佐
}

export function calculateResult(scores: Partial<Record<DimKey, number>>): CalcResult {
  const dimScores = {
    STR: scores.STR ?? 0,
    LED: scores.LED ?? 0,
    EMO: scores.EMO ?? 0,
    LOY: scores.LOY ?? 0,
    SOC: scores.SOC ?? 0,
    AMB: scores.AMB ?? 0,
  }

  // 根据得分确定每个维度的极性
  function getPole(key: DimKey): DimPole {
    const [pos, neg] = DIM_POLES[key]
    return dimScores[key] >= 0 ? pos : neg
  }

  const myPoles: DimPole[] = [
    getPole('STR'), getPole('LED'), getPole('EMO'),
    getPole('LOY'), getPole('SOC'), getPole('AMB'),
  ]

  // 匹配度计算
  let bestChar = characters[0]
  let bestScore = -1

  for (const char of characters) {
    let match = 0
    for (let i = 0; i < 6; i++) {
      if (char.poles[i] === myPoles[i]) match++
    }
    // 加权：极性得分越接近越好
    const dims: DimKey[] = ['STR','LED','EMO','LOY','SOC','AMB']
    let weightedScore = match * 10
    for (let i = 0; i < 6; i++) {
      const key = dims[i]
      const [pos] = DIM_POLES[key]
      const charWantPositive = char.poles[i] === pos
      const myScore = dimScores[key]
      if (charWantPositive && myScore > 0) weightedScore += Math.min(myScore, 5)
      if (!charWantPositive && myScore < 0) weightedScore += Math.min(-myScore, 5)
    }
    if (weightedScore > bestScore) {
      bestScore = weightedScore
      bestChar = char
    }
  }

  const factionCount: Record<string, number> = {}
  for (const c of characters) {
    factionCount[c.faction] = (factionCount[c.faction] ?? 0) + 1
  }

  return {
    character: bestChar,
    // 因为砍掉了题目，调整了权重分，所以稍微修正匹配度，避免过小
    matchScore: Math.min(99, Math.round((bestScore / 60) * 100)),
    factionCount,
    dimScores,
  }
}
