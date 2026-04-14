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
  },
  {
    code: 'CAOPI', name: '曹丕', title: '职场宫斗冠军', faction: 'wei',
    tagline: '表面恭敬，背刺第一名！',
    description: '深谙职场权谋的终极高手。表面上兄友弟恭、尊师重道，实则背后算盘打得噼啪响。你的忍耐力极强，为了达到目的可以说最甜的话、下最狠的手，只要能爬上王座，过程有多不体面都没关系。',
    color: '#1E90FF', rarity: 'legendary', poles: ['I','D','C','P','R','K'],
  },
  {
    code: 'CAOZHI', name: '曹植', title: '裸辞文艺青年', faction: 'wei',
    tagline: '工作去死，老子要写诗！',
    description: '天生浪漫且极度情绪化的艺术天才。视规矩为粪土，最讨厌朝九晚五的打卡生活。每次被现实毒打后都会emo很久，发几条仅三天可见的长篇朋友圈，最后还是选择沉醉在自己的精神世界里不出来。',
    color: '#87CEFA', rarity: 'epic', poles: ['I','L','H','P','E','M'],
  },
  {
    code: 'XIAHOUDUN', name: '夏侯惇', title: '不死的小强', faction: 'wei',
    tagline: '瞎了一只眼，我照样能砍你两条腿！',
    description: '极其头铁的硬汉子。不论遇到多大的困难，受多重的伤，你的第一反应永远是“干就完了”。虽然有时候会因为冲动而吃亏，但你那种“只要还没死就能继续打”的精神，让所有人都不敢轻易惹你。',
    color: '#DC143C', rarity: 'epic', poles: ['S','D','H','Y','E','M'],
  },
  {
    code: 'XIAHOUYUAN', name: '夏侯渊', title: '闪电战狂魔', faction: 'wei',
    tagline: '兵贵神速，等你想明白我都下班了！',
    description: '效率至上的行动派。对你来说，做事最讨厌磨磨唧唧，什么流程审批通通见鬼去吧。你总是以最快的速度解决战斗，但这也导致你经常忽略细节，在不经意间翻个大车。',
    color: '#FF4500', rarity: 'epic', poles: ['S','D','C','Y','E','K'],
  },
  {
    code: 'ZHANGLIAO', name: '张辽', title: '治小儿夜啼', faction: 'wei',
    tagline: '八百人怎么了？八百人照样包围你十万！',
    description: '顶级战术大师兼魔鬼教头。平时不显山不露水，一到关键时刻就能爆发出掀翻全场的能量。只要你看一眼，对面连大气都不敢出，属于那种一出手就让人留下一辈子心理阴影的狠人。',
    color: '#4682B4', rarity: 'legendary', poles: ['S','D','C','P','R','K'],
  },
  {
    code: 'ZHANGHE', name: '张郃', title: '膝盖中箭体质', faction: 'wei',
    tagline: '又是我？怎么每次背锅的都是我！',
    description: '实力强悍且经验丰富的老油条，懂得如何在复杂的职场中明哲保身。但无奈总是自带“背锅光环”，每次大老板出纰漏，最后膝盖中箭的都是你。虽然委屈，但你总能凭借超强的生存能力活下来。',
    color: '#5F9EA0', rarity: 'epic', poles: ['S','L','C','P','R','M'],
  },
  {
    code: 'XUHUANG', name: '徐晃', title: '铁血卷王', faction: 'wei',
    tagline: '加班？只要给钱，我能干到公司破产！',
    description: '军纪严明的劳模典范。从不迟到早退，指哪打哪，没有感情的执行机器。你对“规矩”有着近乎病态的固执，为了完成KPI，甚至能狠下手斩断私人关系，简直是领导最爱的完美打工人。',
    color: '#B0C4DE', rarity: 'epic', poles: ['S','L','C','Y','R','M'],
  },
  {
    code: 'YUAN', name: '于禁', title: '晚节不保老黄牛', faction: 'wei',
    tagline: '干了一辈子苦劳，就输在最后一次投降！',
    description: '前半生兢兢业业，履历完美无瑕。结果却在快要退休的最后关头，因为一次“认怂”而晚节不保。这告诉我们一个道理：平时装得太伟光正，一旦跌落神坛，吃瓜群众的口水就能把你淹死。',
    color: '#708090', rarity: 'rare', poles: ['S','L','C','P','R','M'],
  },
  {
    code: 'CAOREN', name: '曹仁', title: '极致抗压王', faction: 'wei',
    tagline: '打不死我的，只会让我再抗揍一点！',
    description: '无懈可击的防御专家，绝对的叹息之墙。不论对方火力多猛，你都能硬扛下来。你可能不是最闪耀的那个，但绝对是团队里最让人安心的底牌，只要有你在，这块阵地就绝对丢不了。',
    color: '#8B4513', rarity: 'epic', poles: ['S','L','C','Y','R','M'],
  },
  {
    code: 'XUNYOU', name: '荀攸', title: '隐形狗头军师', faction: 'wei',
    tagline: '低调做人，高调出坑人的主意。',
    description: '大智若愚的小透明。平时开会坐在最角落一言不发，但每次一旦开口，绝对是直插要害的阴狠点子。你最擅长把自己藏在镁光灯外，默默操控着一切，深藏功与名。',
    color: '#2F4F4F', rarity: 'epic', poles: ['I','D','C','Y','R','M'],
  },
  {
    code: 'CHENGYU', name: '程昱', title: '狠活发明家', faction: 'wei',
    tagline: '只要道德底线足够灵活，就没有过不去的坎。',
    description: '纯粹的实用主义者，没有丝毫道德洁癖的狼人。为了达成目标，什么缺德主意都敢出。在你看来，这世上只有“好用的办法”和“不能用的办法”，至于别人怎么骂你，那是死人才会关心的事情。',
    color: '#A52A2A', rarity: 'rare', poles: ['I','D','C','P','E','K'],
  },
  {
    code: 'ZHONGHUI', name: '钟会', title: '腹黑学霸', faction: 'wei',
    tagline: '我不仅聪明，我还惦记着你的位子。',
    description: '野心勃勃的精英做题家。脑子极好，学什么都快，但也因此极其自负。你总觉得身边的人都是蠢猪，觉得自己理应得到更多。一旦有机会上位，你翻脸的速度比翻书还快。',
    color: '#DAA520', rarity: 'epic', poles: ['I','D','H','P','E','K'],
  },
  {
    code: 'DENGAI', name: '邓艾', title: '荒野求生博主', faction: 'wei',
    tagline: '路？翻过这座山，到处都是路！',
    description: '脑洞大开的不走寻常路天才。最讨厌按套路出牌，别人走大路，你偏要爬悬崖。虽然平时说话有些结巴不讨喜，但一旦到了野外生存或者执行奇袭任务，你就是创造奇迹的神。',
    color: '#556B2F', rarity: 'epic', poles: ['S','D','C','Y','R','K'],
  },
  {
    code: 'ZHENJI', name: '甄姬', title: '高冷氛围美女', faction: 'wei',
    tagline: '美不是我的错，是你们的贪心。',
    description: '自带悲剧滤镜的纯欲天花板。不管走到哪里都是视线的焦点，但这份美丽往往也会给你带来无尽的麻烦。你外表高冷孤傲，内心却充满防备，是个极度缺乏安全感但又极具魅力的矛盾体。',
    color: '#FFB6C1', rarity: 'epic', poles: ['I','L','C','P','R','M'],
  },
  {
    code: 'GUOHUAI', name: '郭淮', title: '续命狂魔', faction: 'wei',
    tagline: '只要我还剩一口气，你们就别想赢！',
    description: '坚韧不拔的熬战小能手。你很少能打出那种碾压局，但你的血条长得离谱，恢复能力更是惊人。每次别人以为你快挂了的时候，你总能奇迹般地续上一条命，硬生生把对手耗崩溃。',
    color: '#8A2BE2', rarity: 'rare', poles: ['S','D','C','Y','R','M'],
  },
  {
    code: 'MANCHONG', name: '满宠', title: '铁面审计员', faction: 'wei',
    tagline: '在我这里，没有变通，只有规矩！',
    description: '冷酷无情的纪检委。谁的账都敢查，谁的过错都敢揪，从不讲求人情世故。你在公司里是绝对的刺头鬼见愁，大老板爱死你了，但同事们背地里恨不得把你扎成小人天天扎。',
    color: '#2F4F4F', rarity: 'rare', poles: ['I','D','C','Y','R','M'],
  },
  {
    code: 'HAOZHAO', name: '郝昭', title: '铁公鸡塔防王', faction: 'wei',
    tagline: '想攻破我这，除非踩着我的尸体过去。',
    description: '抠门到极致的防守大师。给你一堆破铜烂铁，你都能建起一座铜墙铁壁。面对铺天盖地的攻击，你眉头都不皱一下，不仅防守滴水不漏，还能用火箭把对方烧得怀疑人生。',
    color: '#B8860B', rarity: 'rare', poles: ['S','D','C','Y','R','M'],
  },
  {
    code: 'SIMASHI', name: '司马师', title: '硬核狠人', faction: 'wei',
    tagline: '眼睛掉了就吞下去，接着干活！',
    description: '人狠话不多的行动绝缘体。遇到天大的变故连眉头都不皱一下，甚至连自己的眼珠子掉出来都能面不改色。行事果断残忍，一旦认准的事情，即使得罪全天下也要一条道走到黑。',
    color: '#483D8B', rarity: 'epic', poles: ['I','D','C','P','R','K'],
  },
  {
    code: 'SIMAZHAO', name: '司马昭', title: '嚣张富二代', faction: 'wei',
    tagline: '我连演都不想演了，大家看明白了吗？',
    description: '把野心直接写在名片上的得瑟小天才。因为背景太硬，干脆撕破脸皮不再伪装。你的那点心思全天下都知道，但偏偏就是没人能拿你怎么样，这种绝对的实力碾压让你爽到了极点。',
    color: '#9370DB', rarity: 'epic', poles: ['I','D','H','P','E','K'],
  },
  {
    code: 'WANGYUANJI', name: '王元姬', title: '人间清醒', faction: 'wei',
    tagline: '收起你的套路，我一眼就看穿了。',
    description: '冷静睿智的大局观王者。别人还在被表象迷惑时，你已经看透了事物的本质。你不仅智商高，情商也极高，能完美地规避潜在风险，并在恰当的时候给出身边人致命的忠告，可惜他们通常不听。',
    color: '#FF69B4', rarity: 'epic', poles: ['I','L','C','P','R','M'],
  },
  {
    code: 'JIANGWEI', name: '姜维', title: '九世铁粉', faction: 'shu',
    tagline: '丞相遗志，哪怕打烂牌底我也要梭哈！',
    description: '为了偶像（孔明）的一句话能肝到死脑残粉。哪怕全天下都觉得没戏了，你也要一个人死撑。你身上有一种近乎偏执的理想主义，不管拿到的牌多烂，你都会硬着头皮打出王炸的气势。',
    color: '#00FA9A', rarity: 'legendary', poles: ['S','D','H','Y','E','K'],
  },
  {
    code: 'XUSHU', name: '徐庶', title: '摆烂天花板', faction: 'shu',
    tagline: '进了大厂后，我发誓不再敲一行代码。',
    description: '因为被逼无奈加入不喜欢的大厂，从此开启了极致摆烂人生。其实你才华横溢，但一想到给讨厌的资本家打工，你就宁愿天天摸鱼喝茶。你证明了只要不想干，谁也逼不了你。',
    color: '#D3D3D3', rarity: 'epic', poles: ['I','L','C','Y','R','M'],
  },
  {
    code: 'MALIANG', name: '马良', title: '流量白月光', faction: 'shu',
    tagline: '只要长得帅，干啥都有人原谅。',
    description: '自带主角光环的超级白月光。温柔体贴、才华横溢，简直是完美的理想型。可惜天妒红颜，英年早逝的结局反而让你成了所有人心中永远无法触及的痛，人气永远处于顶流。',
    color: '#FFFFFF', rarity: 'rare', poles: ['I','L','C','Y','E','M'],
  },
  {
    code: 'MASU', name: '马谡', title: '纸上谈兵带师', faction: 'shu',
    tagline: 'PPT我做的天下无敌，一实操就拉闸。',
    description: '理论考试永远第一名，实际操作永远出局。你讲起大道理头头是道，连老板都被你忽悠得一愣一愣的。但千万别让你管具体执行，不然你分分钟就能把所有人都送上天。',
    color: '#F08080', rarity: 'epic', poles: ['I','D','H','Y','E','K'],
  },
  {
    code: 'FAZHENG', name: '法正', title: '睚眦必报小霸王', faction: 'shu',
    tagline: '你昨天多吃我一块肉，我今天就要你一条腿。',
    description: '记仇能力满级、爆发力极强的暴躁老哥。谁敢惹你，你一定百倍奉还；谁帮你，你也涌泉相报。活得极其爱恨分明，在别人眼里你可能是个疯子，但你老板却把你当成了手心里的宝。',
    color: '#DC143C', rarity: 'legendary', poles: ['I','D','H','P','E','K'],
  },
  {
    code: 'YANYAN', name: '严颜', title: '宁死不屈老顽固', faction: 'shu',
    tagline: '字典里没有屈服，只有断头将军！',
    description: '骨头比金刚石还硬的老顽固。不管面对多大的威胁，哪怕刀架在脖子上，你的嘴巴也绝对不会软一下。虽然脾气倔得让人抓狂，但这种誓死不屈的精神，就算敌人也会对你肃然起敬。',
    color: '#8B4513', rarity: 'rare', poles: ['S','D','H','Y','E','M'],
  },
  {
    code: 'GUANPING', name: '关平', title: '极品辅助', faction: 'shu',
    tagline: '我爹去哪我去哪，我爹砍谁我补刀。',
    description: '永远跟在超级主C身后的金牌辅助。虽然光芒大多被大腿掩盖，但你毫无怨言，兢兢业业地做着所有的脏活累活。没有你在旁边帮忙递刀子，大佬的输出至少得打个七折。',
    color: '#2E8B57', rarity: 'rare', poles: ['S','L','C','Y','R','M'],
  },
  {
    code: 'LIUSHAN', name: '刘禅', title: '快乐躺平党', faction: 'shu',
    tagline: '只要我足够废，麻烦就找不到我。',
    description: '大智若愚（或者单纯就是愚）的躺平宗师。把“乐不思蜀”贯彻到了人生的每一个毛孔。既然努力卷不过别人，不如干脆放手去享受生活。只要抱紧大腿，再大的风浪也能安然度过。',
    color: '#FFD700', rarity: 'epic', poles: ['I','L','C','P','R','M'],
  },
  {
    code: 'HUANGYUEYING', name: '黄月英', title: '硬核工科女', faction: 'shu',
    tagline: '别跟我讲废话，拿图纸说话。',
    description: '智商碾压全场的硬核理科女。不爱社交、不修边幅，唯一的爱好就是搞发明创造。你制造的黑科技连孔明都得甘拜下风。在你眼里，谈恋爱不如造木牛流马有意思。',
    color: '#C0C0C0', rarity: 'epic', poles: ['I','L','C','Y','R','M'],
  },
  {
    code: 'XINGCAI', name: '星彩', title: '怪力萝莉', faction: 'shu',
    tagline: '虽然长得萌，但我一盾牌能把你拍墙上抠不下来。',
    description: '外表可能是个乖巧萌妹，其实是个能一拳打爆沙袋的女汉子。肩负着父辈的责任，平时沉默寡言，但一旦需要你保护重要的人，你会瞬间化身为战场上最狂暴的终结者。',
    color: '#32CD32', rarity: 'rare', poles: ['S','L','C','Y','R','M'],
  },
  {
    code: 'GUANYINPING', name: '关银屏', title: '健身狂魔女汉子', faction: 'shu',
    tagline: '别问，问就是还在举铁。',
    description: '天天泡在健身房里的魔鬼筋肉女。完美继承了将门武力值，别的女孩在买化妆品，你在买蛋白粉。极度自律，充满活力，是那种一巴掌拍在你背上能让你咳出半斤血的热情大姐头。',
    color: '#FF6347', rarity: 'rare', poles: ['S','L','H','Y','E','M'],
  },
  {
    code: 'FEIYI', name: '费祎', title: '摸鱼管理大师', faction: 'shu',
    tagline: '只要喝茶的速度够快，工作就追不上我。',
    description: '一边处理天下最烂的摊子，一边还能抽出空喝茶聊天的顶级时间管理大师。你面对再多的工作也能游刃有余、轻描淡写地化解危机。这种四两拨千斤的从容，让人嫉妒得牙都快碎了。',
    color: '#ADD8E6', rarity: 'epic', poles: ['I','L','C','P','R','M'],
  },
  {
    code: 'JIANGWAN', name: '蒋琬', title: '究极接盘侠', faction: 'shu',
    tagline: '老板你安心去吧，这堆烂摊子我帮你擦屁股。',
    description: '无论前任留下了多大的超级地狱级烂摊子，你都能面不改色地接过来并梳理得井井有条。虽然毫无主角光环，但你是整个系统绝对不能缺少的巨石承重墙。',
    color: '#90EE90', rarity: 'epic', poles: ['I','L','C','Y','R','M'],
  },
  {
    code: 'WANGPING', name: '王平', title: '稳如老狗', faction: 'shu',
    tagline: '虽然我不识字，但道理我都懂。',
    description: '没读过多少书，但直觉和逻辑简直满分的实干家。不管别人说得多天花乱坠，你只相信自己的经验。做事极其稳重，绝不贪功冒进，是那种关键时刻绝对不会掉链子的靠谱队友。',
    color: '#CD853F', rarity: 'rare', poles: ['S','L','C','Y','R','M'],
  },
  {
    code: 'LIAOHUA', name: '廖化', title: '活化石记录员', faction: 'shu',
    tagline: '大佬们都死光了，只能我上了。',
    description: '熬死了所有同时代风流人物的终极生存赢家。从黄巾之乱一直活到了蜀汉灭亡，你亲眼见证了无数大起大落。既然活得久，资历自然也就混成了全场最高，所谓的剩者为王，说的就是你。',
    color: '#D2B48C', rarity: 'rare', poles: ['S','L','C','Y','R','M'],
  },
  {
    code: 'MENGHUO', name: '孟获', title: '反复去世达人', faction: 'shu',
    tagline: '抓我七次？有种你再抓我第八次！',
    description: '极其头铁、坚信力气能解决一切的南蛮猛男。虽然智商经常被碾压，被套路算计了无数次，但你依然保持着迷之自信。不到黄河心不死，不撞南墙不回头，直到被收拾得服服帖帖为止。',
    color: '#8B0000', rarity: 'epic', poles: ['S','D','H','Y','E','K'],
  },
  {
    code: 'ZHURONGFUREN', name: '祝融夫人', title: '御姐火神', faction: 'shu',
    tagline: '老娘玩飞刀的时候，你们还在穿开裆裤。',
    description: '脾气像火山一样暴躁的野性大姐头。在家里绝对是一把手，老公被欺负了就亲自出马帮他找场子。性格直来直往，一点不矫揉造作，手里那把飞刀更是专治各种不服。',
    color: '#FF4500', rarity: 'epic', poles: ['S','D','H','P','E','K'],
  },
  {
    code: 'MIFA', name: '糜芳', title: '猪队友本猪', faction: 'shu',
    tagline: '不好意思，我先跑路了哈。',
    description: '自带团灭光环的顶级坑货。平时享受着大厂的福利，一旦到了生死存亡的关键时刻，你跑得比谁都快。不仅见死不救，还要反手把队友卖个干净，堪称所有团队的噩梦。',
    color: '#A9A9A9', rarity: 'rare', poles: ['I','L','C','P','R','M'],
  },
  {
    code: 'JIANYONG', name: '简雍', title: '社交牛逼症', faction: 'shu',
    tagline: '只要我不尴尬，尴尬的就是老板。',
    description: '不要脸的最高境界。跟谁都能称兄道弟，就算是面对暴脾气的领导，你也敢半躺在椅子上抖腿。你靠讲段子和厚脸皮在激烈的职场竞争中混得风生水起。',
    color: '#FFA07A', rarity: 'rare', poles: ['I','D','H','Y','E','M'],
  },
  {
    code: 'XIAHOUBA', name: '夏侯霸', title: '弃暗投明二五仔', faction: 'shu',
    tagline: '不是我想叛变，是前老板想杀我啊！',
    description: '因为极度害怕被迫加入敌方阵营的叛逆青年。你的跳槽毫无忠诚度可言，纯粹是因为求生欲太强烈。每天活在惶恐和迷茫中，但靠着机灵劲儿，居然也能在新公司混个一席之地。',
    color: '#FF7F50', rarity: 'rare', poles: ['S','L','C','P','R','M'],
  },
  {
    code: 'SUNCE', name: '孙策', title: '热血莽夫', faction: 'wu',
    tagline: '生死看淡，不服就干！',
    description: '有着一头热血的平头哥转世。字典里从来没有“怂”这个字，不管对面是谁，也不管对面有多少人，拔出刀就是冲。虽然这种性格让你魅力四射，但也极容易因为冲动而交出不必要的一血。',
    color: '#FF4500', rarity: 'legendary', poles: ['S','D','H','Y','E','K'],
  },
  {
    code: 'SUNJIAN', name: '孙坚', title: '被诅咒的开荒者', faction: 'wu',
    tagline: '刚打下基业，老子就要被剧情杀了？',
    description: '极其倒霉的创业先锋。你辛辛苦苦、起早贪黑地为了事业打拼，好不容易看到了胜利的曙光，结果总是在最关键的时刻因为一些莫名其妙的低级意外而被迫退出群聊，堪称运气最差的实干家。',
    color: '#B22222', rarity: 'epic', poles: ['S','D','H','Y','E','K'],
  },
  {
    code: 'LVMENG', name: '吕蒙', title: '逆袭做题家', faction: 'wu',
    tagline: '谁说文盲不能考研究生的？！',
    description: '从大头兵一路逆袭当上CEO的超级励志哥。刚开始被人嘲笑是文盲，结果你不声不响地卷起了学历。等你再出场的时候，你的文凭和智商已经可以无情碾压那些曾经看不起你的人了。',
    color: '#6A5ACD', rarity: 'legendary', poles: ['I','D','C','P','R','K'],
  },
  {
    code: 'HUANGGAI', name: '黄盖', title: '抖M老戏骨', faction: 'wu',
    tagline: '尽情地抽我吧，为了伟大的事业！',
    description: '为了赢可以连自己都骗的狠人。你身上有一种近乎自虐的奉献精神，只要是有利于全局，哪怕当众挨一顿毒打你也心甘情愿。你那奥斯卡级别的苦肉计，不知道骗过了多少天真无邪的对手。',
    color: '#8B0000', rarity: 'epic', poles: ['S','L','H','Y','E','M'],
  },
  {
    code: 'CHENGPU', name: '程普', title: '倚老卖老专业户', faction: 'wu',
    tagline: '老子跟着先皇打天下的时候，你还在玩泥巴呢！',
    description: '职场上典型的旧时代残党。仗着自己资历深，总是看新来的年轻主管不顺眼。虽然脾气臭、爱摆架子，但真到了需要老人镇场子的时候，你那身经百战的经验依然无可替代。',
    color: '#D2691E', rarity: 'rare', poles: ['S','L','H','Y','E','M'],
  },
  {
    code: 'ZHOUTAI', name: '周泰', title: '人肉防弹衣', faction: 'wu',
    tagline: '砍我可以，动我老板不行！',
    description: '浑身上下找不到一块好皮的狂战士。你就像是一面永远不会碎的护盾，只要老板有危险，你永远是第一个冲上去挡刀的人。你不仅不觉得疼，反而觉得身上的伤疤是你最骄傲的勋章。',
    color: '#A52A2A', rarity: 'epic', poles: ['S','L','C','Y','R','M'],
  },
  {
    code: 'DAQIAO', name: '大乔', title: '绝美金丝雀', faction: 'wu',
    tagline: '美貌是我唯一的防具，也是我最大的诅咒。',
    description: '长在金丝笼里的顶级花瓶。刚刚幻想过上霸道总裁爱上我的剧本，总裁就直接嗝屁了。你虽然拥有倾国倾城的容貌，但命运从来不由你做主，总是被迫卷入权力的漩涡里随波逐流。',
    color: '#FFB6C1', rarity: 'epic', poles: ['I','L','C','P','R','M'],
  },
  {
    code: 'XIAOQIAO', name: '小乔', title: '玛丽苏本苏', faction: 'wu',
    tagline: '负责貌美如花就行了，难道还要我打天下？',
    description: '集万千宠爱于一身的小公主。嫁给了全公司最帅也是最有前途的青年才俊。你人生的大部分时间都在享受被人捧在手心里的感觉，虽然有点娇纵任性，但谁让你长得好看呢？',
    color: '#FFC0CB', rarity: 'epic', poles: ['I','L','H','P','E','M'],
  },
  {
    code: 'ZHUGEJIN', name: '诸葛瑾', title: '卑微HR', faction: 'wu',
    tagline: '大家有话好好说，别动不动就辞职啊！',
    description: '夹在神仙打架中间的超级受气包。你每天的工作就是作为外交官去各种擦屁股求情。别人在前面装逼发飙，你只能在后面卑躬屈膝地当和事佬。虽然很憋屈，但你的情商确实保住了不少人的命。',
    color: '#D3D3D3', rarity: 'rare', poles: ['I','L','C','P','R','M'],
  },
  {
    code: 'ZHANGZHAO', name: '张昭', title: '投降派祖师爷', faction: 'wu',
    tagline: '这公司吃枣药丸，不如早点卖身给隔壁吧。',
    description: '最极致的保守主义者。只要外面稍微有一点风吹草动，你的第一反应永远是“完了，赶紧跑路吧”。你满脑子都是避险止损，极其缺乏搏一把的血性，经常把满心热血的老板气得半死。',
    color: '#A9A9A9', rarity: 'rare', poles: ['I','D','C','P','R','K'],
  },
  {
    code: 'DINGFENG', name: '丁奉', title: '雪地裸奔神将', faction: 'wu',
    tagline: '老将出马，一个顶俩！而且我不冷！',
    description: '越老越妖的极限运动狂徒。别人在这个年纪都在跳广场舞，你却能在冰天雪地里脱了衣服去砍人。只要你不服老，这天下就没人能让你退休。你用实际行动证明了什么叫硬核青春期。',
    color: '#4682B4', rarity: 'rare', poles: ['S','D','H','Y','E','K'],
  },
  {
    code: 'HANDANG', name: '韩当', title: '永恒小透明', faction: 'wu',
    tagline: '那个...其实我也在这家公司干了二十年了。',
    description: '存在感稀薄到令人心疼的边缘员工。明明资历很老，参加过无数次重大项目，但在庆功大会上，领导总是会把你给忘了。虽然经常被忽视，但你依然默默无闻地继续干着自己的活。',
    color: '#F5DEB3', rarity: 'common', poles: ['S','L','C','Y','R','M'],
  },
  {
    code: 'JIANGQIN', name: '蒋钦', title: '强迫症水匪', faction: 'wu',
    tagline: '抢劫也是要有规矩的，懂不懂什么叫体面？',
    description: '从底层黑帮一路洗白上岸的体面人。虽然出身草根，但极其注重形象和规矩。你不仅要求自己做事滴水不漏，甚至连干坏事都要讲究个程序正义，是个非常有原则的强迫症患者。',
    color: '#708090', rarity: 'rare', poles: ['S','L','C','Y','R','M'],
  },
  {
    code: 'XUSHENG', name: '徐盛', title: '虚张声势艺术大师', faction: 'wu',
    tagline: '只要我的PPT做得足够大，对手就会被吓死。',
    description: '极致的舞台美术特效师。你极其擅长用最少的成本制造出最宏大的恐吓效果。哪怕手里只有几个纸片人，你也能摆弄出千军万马的气势。这种靠造假把对手吓尿的艺术行为，让人不得不服。',
    color: '#00CED1', rarity: 'rare', poles: ['I','D','C','P','E','K'],
  },
  {
    code: 'BULIANSHI', name: '步练师', title: '无敌贤内助', faction: 'wu',
    tagline: '有我在，老板的心情永远是晴天。',
    description: '情绪价值提供之神。你不仅不作妖，还极其善解人意，不仅能把家里打理得井井有条，甚至还能帮老板纳妾。这种毫无嫉妒心且能完美处理一切人际关系的女人，简直是不可思议的存在。',
    color: '#FFC0CB', rarity: 'epic', poles: ['I','L','C','Y','R','M'],
  },
  {
    code: 'LINGTONG', name: '凌统', title: '傲娇记仇狂', faction: 'wu',
    tagline: '虽然我救了你一命，但我还是看你不顺眼！',
    description: '极度要面子的死傲娇。这辈子最恨的人就是杀父仇人（其实是同事），但因为老板发话又不得不一起工作。表面上天天冷嘲热讽，但在对方快死的时候又忍不住会去救，口嫌体正直的代表。',
    color: '#FA8072', rarity: 'rare', poles: ['S','D','H','Y','E','K'],
  },
  {
    code: 'GAOSHUN', name: '高顺', title: '哑巴爆破手', faction: 'qun',
    tagline: '闭嘴，然后把对面的水晶拆了。',
    description: '绝对的实干派，从来不说一句废话。只要老板下达了命令，你就会化身为一台无情的拆家机器，神挡杀神佛挡杀佛。虽然你不懂人情世故，也不讨领导喜欢，但你的业务能力绝对是天花板级别的。',
    color: '#708090', rarity: 'epic', poles: ['S','L','C','Y','R','M'],
  },
  {
    code: 'CHENGONG', name: '陈宫', title: '心碎老阿妈', faction: 'qun',
    tagline: '我怎么跟了这么个听不懂人话的蠢老板！',
    description: '智商极高但运气极差的绝望军师。你满脑子都是绝妙的战略计划，可惜偏偏跟了一个完全听不进建议的猪老板。你就像个每天操碎了心的老妈子，眼睁睁看着公司一步步走向倒闭却无能为力。',
    color: '#DDA0DD', rarity: 'epic', poles: ['I','D','H','P','E','M'],
  },
  {
    code: 'LVLINGQI', name: '吕玲绮', title: '叛逆将门恶女', faction: 'qun',
    tagline: '我爹天下无敌，我自然也要继承他的暴力美学！',
    description: '完美继承了老爹可怕基因的暴走太妹。从小在打打杀杀的环境中长大，形成了极度叛逆和好战的性格。别跟她讲什么礼义廉耻，惹急了她连亲爹都敢顶撞，是个名副其实的危险分子。',
    color: '#FF1493', rarity: 'rare', poles: ['S','D','H','P','E','K'],
  },
  {
    code: 'ZHANGJIAO', name: '张角', title: '邪教微商头目', faction: 'qun',
    tagline: '喝了这碗符水，明天就能喜提玛莎拉蒂！',
    description: '顶级传销大师兼洗脑天才。只靠一张嘴和几碗莫名其妙的符水，就能忽悠成千上万的人为你卖命。你极度擅长煽动情绪，只要给你一个舞台，你分分钟就能拉起一支庞大的疯狂粉丝团。',
    color: '#FFD700', rarity: 'legendary', poles: ['I','D','H','P','E','K'],
  },
  {
    code: 'GONGZUNZAN', name: '公孙瓒', title: '白马飙车族', faction: 'qun',
    tagline: '只要我的马跑得够快，厄运就永远追不上我！',
    description: '酷爱速度与激情的偏执狂。你把所有的资源都砸在了一支华丽的白马飙车队上，享受风驰电掣的感觉。其实你内心极度缺乏安全感，只能靠不停地奔跑和修建坚固的堡垒来掩饰自己的恐惧。',
    color: '#FFFFFF', rarity: 'rare', poles: ['S','D','C','P','R','K'],
  },
  {
    code: 'YANLIANG', name: '颜良', title: '光速炮灰一号', faction: 'qun',
    tagline: '我可是河北名将......等等，我头呢？',
    description: '面板数据高得吓人，出场气势十足，结果刚摆好pose就被一刀秒杀的悲情人物。你用自己短暂而辉煌的出场，完美地衬托了别人的强大，堪称三国里最昂贵的背景板。',
    color: '#BDB76B', rarity: 'rare', poles: ['S','D','H','Y','E','K'],
  },
  {
    code: 'WENCHOU', name: '文丑', title: '光速炮灰二号', faction: 'qun',
    tagline: '我要为好兄弟报仇！......等等，我头也没了？',
    description: '和好兄弟一模一样的命运，甚至因为有了前车之鉴显得更加滑稽。你本来有机会跑路，却非要为了所谓的面子上去送人头。你们俩兄弟的名字，从此成为了垫脚石的同义词。',
    color: '#BDB76B', rarity: 'rare', poles: ['S','D','H','Y','E','K'],
  },
  {
    code: 'XINGDAORONG', name: '刑道荣', title: '第一嘴炮王', faction: 'qun',
    tagline: '说出吾名，吓汝一跳！其实我虚得很。',
    description: '吹牛从来没输过，打架从来没赢过。你极度擅长虚张声势，明明是个菜狗，偏要装出天下无敌的样子。每次牛皮吹破后下跪求饶的速度也是天下第一，这种不要脸的喜剧天赋真是百年难遇。',
    color: '#D2B48C', rarity: 'common', poles: ['S','L','H','P','E','M'],
  },
  {
    code: 'PANFENG', name: '潘凤', title: '无双上将', faction: 'qun',
    tagline: '我的大斧已经饥渴难耐了！（然后一秒领盒饭）',
    description: '被老板强行捧杀的终极牺牲品。明明实力有限，偏偏被老板吹上了天，最后只能硬着头皮出去送死。你在职场里生动诠释了什么叫被捧得越高，死得越快，活生生变成了一个段子。',
    color: '#CD5C5C', rarity: 'common', poles: ['S','L','H','Y','E','M'],
  },
  {
    code: 'LIUBIAO', name: '刘表', title: '佛系房东', faction: 'qun',
    tagline: '你们在外面打生打死，别影响我喝茶听戏就行。',
    description: '守着一亩三分地天天喝茶的佛系老大爷。年轻时也曾意气风发，但老了以后就只想守着自己的家业安度晚年。极度害怕麻烦，对任何有风险的投资都避之不及，最后眼睁睁看着家业被别人瓜分。',
    color: '#F5DEB3', rarity: 'rare', poles: ['I','L','C','P','R','M'],
  },
  {
    code: 'LIUZHANG', name: '刘璋', title: '终极傻白甜', faction: 'qun',
    tagline: '我是真心把你当兄弟，你竟然想抢我家产？！',
    description: '引狼入室还帮着人数钱的天真富二代。极其容易相信别人，人家随便掉两滴眼泪你就把家底掏空了送给人家。在这个弱肉强食的世界里，你这种没有獠牙的小绵羊注定只能被吃干抹净。',
    color: '#E6E6FA', rarity: 'rare', poles: ['I','L','C','P','R','M'],
  },
  {
    code: 'LIUXIE', name: '刘协', title: '万年背锅侠', faction: 'qun',
    tagline: '求求你们放过我吧，吉祥物谁爱当谁当！',
    description: '身份看似高贵，其实被各路大佬随便拿捏的可怜提线木偶。所有的锅都是你的，所有的好处都是别人的。你这辈子最大的愿望就是赶紧把这个破职位交出去，安安稳稳地做个普通人。',
    color: '#FFD700', rarity: 'epic', poles: ['I','L','C','P','R','M'],
  },
  {
    code: 'LIJUE', name: '李傕', title: '纯正野兽派', faction: 'qun',
    tagline: '我不懂什么大道理，我就知道谁抢我东西我杀谁。',
    description: '毫无底线的破坏分子。你做事没有任何长跑规划和逻辑可言，完全被最原始的贪婪和愤怒驱动。只要你所到之处，绝对是寸草不生。这种纯粹的野性虽然一时爽，但也注定了无法长久。',
    color: '#8B4513', rarity: 'rare', poles: ['S','D','H','P','E','K'],
  },
  {
    code: 'HUAXIONG', name: '华雄', title: '专属垫脚石', faction: 'qun',
    tagline: '我连着干掉了好几个大佬，然后就倒大霉了。',
    description: '本来也可以算是个狠角色，但运气太差碰到了拿着男主剧本的大满级号。你在喝凉水都塞牙缝的倒霉日，用自己的人头成就了别人流芳百世的一段佳话，是职场里实打实的悲剧垫脚石。',
    color: '#A0522D', rarity: 'rare', poles: ['S','D','H','Y','E','K'],
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
  {
    id: 11,
    text: '好友朋友圈九宫格全是从不同角度摆拍的自己，你的第一反应是——',
    group: '朋友圈鉴赏',
    options: [
      { text: '我也把自己发进去，凑个十宫格，霸占他的版面！', scores: { SOC: 3, EMO: 1, STR: 1 } },
      { text: '默默截图保存，日后或许用得上', scores: { LED: 1, SOC: -2, EMO: -2 } },
      { text: '点赞+评论"好看！"（其实压根没仔细看）', scores: { LOY: -1, SOC: 1, EMO: -1 } },
      { text: '取消关注、屏蔽、拉黑，眼不见心不烦', scores: { SOC: -3, STR: 2, EMO: -1 } },
    ],
  },
  {
    id: 12,
    text: '半夜三点，你突然想出一个能彻底搞垮竞争对手的绝招，你会——',
    group: '深夜恶谋',
    options: [
      { text: '立刻执行！冲动是魔鬼但也是动力！睡什么觉！', scores: { STR: 2, EMO: 3, LED: -1 } },
      { text: '先睡一觉，万一明天想开了这招太缺德用不上呢', scores: { EMO: -2, LED: 1, AMB: -1 } },
      { text: '把这招记下来，压箱底等待最佳时机再出手', scores: { LED: 3, AMB: 2, EMO: -2 } },
      { text: '我做不出这么狠的事，关掉笔记本继续睡觉', scores: { LOY: 1, AMB: -2, STR: -1 } },
    ],
  },
  {
    id: 13,
    text: '领导说"这事要好好处理一下"，你的破译结果是——',
    group: '职场黑话',
    options: [
      { text: '"好好处理"＝立刻找人背锅，然后下手处置', scores: { LED: 2, STR: 1, LOY: -2 } },
      { text: '随便弄弄差不多就行，反正领导也记不住', scores: { LOY: -1, AMB: -2, SOC: -1 } },
      { text: '照字面意思理解，用最认真的态度把它做好', scores: { STR: -1, LED: -1, LOY: 2 } },
      { text: '立刻找领导逐字确认，不搞清楚绝不动手', scores: { LOY: 1, LED: 1, SOC: -1 } },
    ],
  },
  {
    id: 14,
    text: '公司突然宣布要裁员30%，你的第一反应是——',
    group: '生存危机',
    options: [
      { text: '我肯定是那30%的主力，先跑！立刻偷偷更新简历', scores: { SOC: -1, AMB: 1, LOY: -3 } },
      { text: '帮老板背黑锅，暗中把裁员指标转移给竞争对手', scores: { LOY: -1, LED: 2, AMB: 2 } },
      { text: '淡定，这不是危机，是机会。低头学新技能等破局', scores: { EMO: -2, STR: -1, AMB: 2 } },
      { text: '组织全员罢工！兄弟们同进退！', scores: { LOY: 2, SOC: 3, STR: 2 } },
    ],
  },
  {
    id: 15,
    text: '你偶然发现了一个号称"月入百万"的搞钱秘笈，你会——',
    group: '财富玄学',
    options: [
      { text: '立刻梭哈全部身家！先富起来再说！', scores: { EMO: 3, STR: 2, LED: -2 } },
      { text: '仔细研读，找出里面的坑，改进之后再用', scores: { LED: 3, STR: -1, EMO: -2 } },
      { text: '这是骗局！我要实名举报他！', scores: { LOY: 2, EMO: 1, AMB: -1 } },
      { text: '转发给身边所有人，大家一起发财，我功德无量', scores: { SOC: 2, LOY: -1, AMB: 1 } },
    ],
  },
  {
    id: 16,
    text: '相亲对象问你"你的未来规划是什么"，你怎么回答——',
    group: '恋爱玄学',
    options: [
      { text: '我的规划就是让你成为我的规划（深情凝视）', scores: { EMO: 2, SOC: 2, AMB: -1 } },
      { text: '称霸宇宙。（严肃脸，不解释）', scores: { AMB: 3, SOC: 1, LED: 2 } },
      { text: '摆烂+存钱+偶尔做梦，这就是真实的我，不喜欢拜拜', scores: { AMB: -2, EMO: -1, SOC: -1 } },
      { text: '视对象的条件而定，先看看你能提供哪些资源', scores: { LED: 2, LOY: -1, AMB: 1 } },
    ],
  },
  {
    id: 17,
    text: '你帮人担保，结果对方跑路让你背了一屁股债，你会——',
    group: '被人坑了',
    options: [
      { text: '挖地三尺也要找到他，让他每天都后悔来到这个世界', scores: { STR: 3, EMO: 3, LOY: -1 } },
      { text: '沉默，流泪，然后悄悄记在一个小本子上', scores: { EMO: 1, LED: 1, SOC: -2 } },
      { text: '无所谓，这点钱就当喂狗了，我来日方长', scores: { EMO: -2, AMB: 2, SOC: -1 } },
      { text: '走法律途径！把证据整理得比毕业论文还详尽', scores: { LED: 2, STR: -1, EMO: -1 } },
    ],
  },
  {
    id: 18,
    text: '你在王者荣耀打团，队友全是猪，你会——',
    group: '组队地狱',
    options: [
      { text: '开麦狂骂，自己单排carry全场（虽然根本carry不了）', scores: { SOC: 2, EMO: 3, LED: -1 } },
      { text: '精准指挥，微操换人头，想办法把猪队友也变成工具', scores: { LED: 3, STR: -1, EMO: -1 } },
      { text: '默默承受，陪打到天亮，输了就归因于运气', scores: { LOY: 2, SOC: -2, EMO: -1 } },
      { text: '直接挂机，我才不陪猪队友浪费青春', scores: { AMB: -1, LOY: -2, SOC: -1 } },
    ],
  },
  {
    id: 19,
    text: '深夜三点，你突然陷入"我这辈子到底为了什么"的哲学深渊，你会——',
    group: '深夜emo',
    options: [
      { text: '发长篇朋友圈emo，顺便@几个平时看不顺眼的人！', scores: { SOC: 2, EMO: 3, LOY: -1 } },
      { text: '打开简历，默默给自己加两条技能点', scores: { AMB: 2, EMO: -2, STR: -1 } },
      { text: '喝一杯热水，等天亮，明天继续当社畜', scores: { LOY: 1, EMO: -2, AMB: -1 } },
      { text: '开始策划一个宏大的逆袭计划，不实现就不睡觉', scores: { AMB: 3, LED: 2, EMO: 1 } },
    ],
  },
  {
    id: 20,
    text: '你终于拥有了让所有人臣服的绝对权力，你第一件事是——',
    group: '君临天下',
    options: [
      { text: '大赦天下，广施仁政，成为万民爱戴的明君！', scores: { AMB: 2, LOY: 3, SOC: 2 } },
      { text: '第一件事：把曾经欺负过我的人全部清算一遍', scores: { STR: 3, EMO: 2, AMB: 1 } },
      { text: '找个代理人让他去处理，我去钓鱼享清福', scores: { AMB: -2, LED: -1, SOC: -2 } },
      { text: '这才刚到权力顶峰，我已经在谋划下一个更大的目标了', scores: { AMB: 3, LED: 3, EMO: -1 } },
    ],
  },
  {
    id: 21,
    text: '你发现同事在背地里说你坏话，你会——',
    group: '情报战',
    options: [
      { text: '当场对质，把对方怼到怀疑人生，大家都看清楚他的嘴脸', scores: { STR: 2, EMO: 2, SOC: 2 } },
      { text: '假装不知道，见面照样笑嘻嘻，私下已经把人加进黑名单', scores: { LED: 2, SOC: -1, LOY: -2 } },
      { text: '立刻在大群里来一条让所有人知道他人品的内容', scores: { SOC: 3, EMO: 1, LOY: -1 } },
      { text: '写成书面材料，实名向人事举报，法律途径解决', scores: { LOY: 1, LED: 1, EMO: -2 } },
    ],
  },
  {
    id: 22,
    text: '明知道这一仗必输，你会怎么做？',
    group: '战略撤退',
    options: [
      { text: '老子就算知道必输也要搏一把！没什么比死得热烈更值得！', scores: { STR: 3, EMO: 3, AMB: 1 } },
      { text: '找个体面的借口先跑，留着青山在不怕没柴烧', scores: { AMB: 1, LOY: -2, SOC: -2 } },
      { text: '主动谈判，双方各退一步，把损失降到最低', scores: { LED: 2, STR: -2, EMO: -1 } },
      { text: '假装认输，积蓄力量，等待完美的反杀时机', scores: { LED: 3, LOY: -2, AMB: 2 } },
    ],
  },
  {
    id: 23,
    text: '你最尴尬的黑历史被人翻出来公开了，你的操作是——',
    group: '黑历史曝光',
    options: [
      { text: '直接承认！反向营业，把黑历史打造成我的独特人设！', scores: { SOC: 3, EMO: 2, STR: 1 } },
      { text: '矢口否认，死鸭子嘴硬，谁说都不认', scores: { STR: 1, LOY: -1, LED: -1 } },
      { text: '找出一个比我更惨的案例来转移网友的注意力', scores: { LED: 2, SOC: 1, LOY: -1 } },
      { text: '立刻关闭一切社交账号，等风头过了再复活', scores: { SOC: -3, EMO: -2, AMB: -1 } },
    ],
  },
  {
    id: 24,
    text: '你的"成功哲学"核心是什么？',
    group: '人生信条',
    options: [
      { text: '成功靠拳头！解决不了的继续用更大的拳头解决！', scores: { STR: 3, LED: -1, EMO: 2 } },
      { text: '把所有人当棋子，精准算计，一步一步把对手将死', scores: { LED: 3, LOY: -2, AMB: 2 } },
      { text: '跟对人比做对事更重要，抱好大腿是第一生产力', scores: { AMB: -1, LOY: 2, SOC: -1 } },
      { text: '我才不需要成功，我只需要让对手比我更惨', scores: { AMB: -2, STR: 1, EMO: -1 } },
    ],
  },
  {
    id: 25,
    text: '如果可以穿越到三国乱世，你第一件事会是——',
    group: '穿越大赏',
    options: [
      { text: '火速找到最强的主公，当场拜码头表忠心！', scores: { LOY: 2, AMB: -1, SOC: 1 } },
      { text: '左右逢源，摸清各势力筹码，在最佳时机下注', scores: { LED: 3, LOY: -2, AMB: 2 } },
      { text: '独立建业！乱世正是我辈男儿出头之日！', scores: { AMB: 3, STR: 2, LED: 1 } },
      { text: '找诸葛亮交朋友，靠着这层关系苟到游戏结束', scores: { STR: -2, LED: 1, LOY: 1 } },
    ],
  },
  {
    id: 26,
    text: '你身陷舆论漩涡，被网友铺天盖地地批评，你会——',
    group: '舆论管控',
    options: [
      { text: '我的账号我做主！反骂到底，血战到最后一个账号！', scores: { STR: 3, SOC: 2, EMO: 3 } },
      { text: '注销账号假死，换号复活后当无事发生', scores: { SOC: -3, LOY: -1, AMB: -1 } },
      { text: '发一封言辞恳切但实际上没真正认错什么的道歉声明', scores: { LED: 2, SOC: -1, LOY: -1 } },
      { text: '找更大的爆料转移视线，这场热搜必须让别人背', scores: { LED: 3, AMB: 1, LOY: -2 } },
    ],
  },
  {
    id: 27,
    text: '上级明显有偏见故意打压你，你的应对策略是——',
    group: '权力游戏',
    options: [
      { text: '直接越级向他的上司汇报，让他尝尝被挤兑的滋味', scores: { AMB: 2, LOY: -2, SOC: 2 } },
      { text: '默默积累证据，等证据够多时一次性掀翻他', scores: { LED: 3, AMB: 2, EMO: -2 } },
      { text: '当面硬刚！大不了鱼死网破，最坏不过是换工作！', scores: { STR: 3, EMO: 3, LOY: -1 } },
      { text: '认了，忍了，发挥我的长寿体质，等他先退休', scores: { LOY: 2, AMB: -1, EMO: -2 } },
    ],
  },
  {
    id: 28,
    text: '你的团队粮草快撑不住了，眼看就要崩盘，你会——',
    group: '粮草危机',
    options: [
      { text: '带着骨干核心赶紧换赛道，换个方向继续干', scores: { AMB: 2, LED: 2, LOY: -1 } },
      { text: '疯狂拉投资，哪怕对金主许下天花乱坠的承诺', scores: { AMB: 2, STR: 1, LOY: -2 } },
      { text: '大刀阔斧裁员降本，哪怕被骂也要先活下去', scores: { LED: 3, STR: -1, LOY: -2 } },
      { text: '号召大家共渡难关！我们同吃苦同甘苦一定能撑过去！', scores: { LOY: 3, SOC: 2, EMO: 2 } },
    ],
  },
  {
    id: 29,
    text: '你认为了解对手最好的方法是——',
    group: '知己知彼',
    options: [
      { text: '直接去问他！坦诚相待是建立信任的最快方式', scores: { STR: 2, SOC: 2, LED: -1 } },
      { text: '安插眼线长期潜伏，不打无准备之战', scores: { LED: 3, STR: -1, EMO: -2 } },
      { text: '研究他的朋友圈、消费习惯、社交关系，大数据不会说谎', scores: { STR: -2, LED: 2, SOC: -1 } },
      { text: '不需要了解，我就是要打信息差，直接开冲！', scores: { STR: 3, EMO: 2, LED: -2 } },
    ],
  },
  {
    id: 30,
    text: '有人说你"天生就是做大事的料"，你的内心os是——',
    group: '天命之问',
    options: [
      { text: '那当然！这世界终于有人看清了真相，我等这句话太久了！', scores: { AMB: 3, SOC: 3, EMO: 2 } },
      { text: '哈哈，谢谢，不过我做的蠢事列一百件都够了', scores: { SOC: -1, EMO: -1, STR: -1 } },
      { text: '那就给我找一件值得我去做的大事吧', scores: { AMB: 2, LED: 2, STR: 1 } },
      { text: '算了，我只想安安静静过日子，大事太累了', scores: { AMB: -3, LOY: 1, SOC: -2 } },
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

  const dims: DimKey[] = ['STR', 'LED', 'EMO', 'LOY', 'SOC', 'AMB']

  // 根据得分确定每个维度的极性
  function getPole(key: DimKey): DimPole {
    const [pos, neg] = DIM_POLES[key]
    return dimScores[key] >= 0 ? pos : neg
  }

  const myPoles: DimPole[] = dims.map(getPole)

  // 计算每个角色的匹配分
  // 极性匹配：每个维度0-10分（完全匹配10分，部分权重按绝对值）
  // 加权连续分：同方向时，绝对值越大越匹配（上限5分/维）
  // 理论最大分：6*10 + 6*5 = 90
  function calcScore(char: SanguoChar): number {
    let total = 0
    for (let i = 0; i < 6; i++) {
      const key = dims[i]
      const [pos] = DIM_POLES[key]
      const charWantsPositive = char.poles[i] === pos
      const myScore = dimScores[key]
      const poleMatch = char.poles[i] === myPoles[i]

      // 极性是否一致
      if (poleMatch) {
        total += 10
      }
      // 同方向强度加分（无论极性是否完全一致，只要同号就给强度分）
      if (charWantsPositive && myScore > 0) total += Math.min(myScore, 5)
      if (!charWantsPositive && myScore < 0) total += Math.min(-myScore, 5)
    }
    return total
  }

  let bestChar = characters[0]
  let bestScore = -1
  let secondScore = -1

  for (const char of characters) {
    const s = calcScore(char)
    if (s > bestScore) {
      secondScore = bestScore
      bestScore = s
      bestChar = char
    } else if (s > secondScore) {
      secondScore = s
    }
  }

  // 匹配置信度：最高分与次高分差距越大，匹配度越高；差距小则适当降低
  const gap = bestScore - secondScore
  // 基础分映射到 55-99 区间，gap 提供额外加成
  const BASE_MAX = 90 // 理论最大分
  const base = Math.round((bestScore / BASE_MAX) * 85)
  const bonus = Math.min(14, Math.round(gap * 1.2))
  const matchScore = Math.min(99, Math.max(55, base + bonus))

  const factionCount: Record<string, number> = {}
  for (const c of characters) {
    factionCount[c.faction] = (factionCount[c.faction] ?? 0) + 1
  }

  return {
    character: bestChar,
    matchScore,
    factionCount,
    dimScores,
  }
}
