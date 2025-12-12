// 词库与分类配置，供 App 按需引入

export const INITIAL_CATEGORIES = {
  character: { id: "character", label: "人物 (CHARACTER)", color: "blue" },
  item: { id: "item", label: "物品 (ITEM)", color: "amber" },
  action: { id: "action", label: "动作 (ACTION)", color: "rose" },
  location: { id: "location", label: "地点 (LOCATION)", color: "emerald" },
  visual: { id: "visual", label: "画面 (VISUALS)", color: "violet" },
  other: { id: "other", label: "其他 (OTHER)", color: "slate" }
};

// --- 初始数据配置 (Updated with new banks for examples) ---
export const INITIAL_BANKS = {
  role: {
    label: "角色身份",
    category: "character",
    options: ["游戏与动漫概念美术设计大师", "资深影视角色原画师", "赛博朋克风格设计师", "暗黑幻想风格插画师"]
  },
  subject: {
    label: "主体对象",
    category: "character",
    options: ["女性角色", "男性角色", "机甲少女", "怪物拟人化", "奇幻种族(精灵/恶魔)"]
  },
  character_companion: {
    label: "合影角色",
    category: "character",
    options: ["死侍 (Deadpool)", "超人 (Superman)", "爱因斯坦 (Einstein)", "神奇女侠 (Wonder Woman)", "钢铁侠 (Iron Man)", "皮卡丘 (Pikachu)", "哥斯拉 (Godzilla)", "初音未来 (Hatsune Miku)"]
  },
  layout_focus: {
    label: "构图重心",
    category: "visual",
    options: ["全身立绘", "半身肖像", "动态战斗姿势", "背影回眸"]
  },
  grid_pose: { 
    label: "九宫格动作", 
    category: "action", 
    options: [
      "前景手指虚化", "目光锁定镜头", "单色下巴托手", "透过模糊肩带拍摄", 
      "正面特写阴影", "斜角拍摄", "双手置于锁骨", "坐姿半身侧面", 
      "侧面微距水滴", "闭眼仰头享受", "用手遮挡阳光", "回眸一笑", "吹泡泡糖特写",
      "正面直视镜头，表情平静，眼神清澈", "凝视镜头，嘴角微微上扬，展现自信", 
      "专注地看着镜头，表情柔和，眼神温和", "侧身回望，眼神温柔，嘴角上扬", 
      "转身回眸，长发飘逸，笑容自然", "手轻抚下巴，表情优雅，眼神柔和", 
      "单手支撑下巴，表情自然，眼神专注", "利用肩带营造景深，焦点清晰在眼睛", 
      "正在吹泡泡糖，表情可爱，眼神专注", "侧面微距特写，突出面部轮廓和细节"
    ] 
  },
  
  camera_angle: {
    label: "拍摄角度",
    category: "visual",
    options: ["脸颊和颈部特写", "目光锁定镜头", "单色下巴托手肖像", "透过模糊的肩带拍摄", "正面特写，面部阴影交错", "斜角拍摄的原始人像", "双手置于锁骨附近的特写", "坐姿半身侧面照", "侧面微距照"]
  },
  connectors: {
    label: "视觉引导",
    category: "visual",
    options: ["手绘箭头或引导线", "虚线连接", "彩色光束", "半透明数据线"]
  },
  underwear_style: {
    label: "私密内着拆解",
    category: "item",
    options: ["成套的蕾丝内衣裤", "运动风格纯棉内衣", "极简主义丝绸内衣", "哥特风格绑带内衣"]
  },
  clothing: {
    label: "人物服饰",
    category: "item",
    options: ["炭灰色无袖连衣裙", "白色丝绸衬衫", "黑色修身西装", "战术机能风外套", "复古碎花连衣裙"]
  },
  clothing_male: {
    label: "男性服饰",
    category: "item",
    options: ["剪裁合体的深蓝西装", "复古棕色皮夹克", "战术背心与工装裤", "宽松的灰色卫衣", "白色亚麻衬衫", "黑色高领毛衣"]
  },
  clothing_female: {
    label: "女性服饰",
    category: "item",
    options: ["炭灰色无袖连衣裙", "丝绸吊带晚礼服", "机车皮衣与短裙", "白色蕾丝衬衫", "黑色紧身连体衣", "优雅的香奈儿风套装"]
  },
  expressions: {
    label: "表情集",
    category: "character",
    options: ["疯狂、病娇、狂喜", "羞涩、躲闪、红晕", "冷漠、鄙视、高傲", "痛苦、忍耐、咬唇"]
  },
  texture_zoom: {
    label: "材质特写",
    category: "visual",
    options: ["凌乱感与私处汗渍", "皮肤上的勒痕与红印", "丝袜的抽丝细节", "皮革的光泽与磨损"]
  },
  action_detail: {
    label: "动作细节",
    category: "action",
    options: ["带着项圈的爬行", "双手被缚在身后的挣扎", "跪姿并展示鞋底", "拉扯领口的诱惑"]
  },
  special_view: {
    label: "特殊视角",
    category: "visual",
    options: ["被踩在脚下的仰视视角", "从门缝中偷窥的视角", "镜子反射的背影", "监控摄像头的俯视视角"]
  },
  bag_content: {
    label: "随身包袋",
    category: "item",
    options: ["日常通勤包或手拿包", "战术腿包", "可爱的毛绒背包", "透明材质的痛包"]
  },
  cosmetics: {
    label: "美妆与护理",
    category: "item",
    options: ["常用的化妆品组合", "散落的口红与粉饼", "便携式补妆镜", "香水小样与护手霜"]
  },
  private_items: {
    label: "私密生活物件",
    category: "item",
    options: ["震动棒与项圈", "手铐与眼罩", "鞭子与蜡烛", "润滑液与安全套"]
  },
  art_style: {
    label: "画风",
    category: "visual",
    options: ["高质量的 2D 插画风格", "写实厚涂风格", "赛博朋克霓虹风格", "水彩手绘风格"]
  },
  background_style: {
    label: "背景风格",
    category: "visual",
    options: ["漫画网格笔记本", "蓝图设计稿纸", "工业风金属背景", "极简纯色背景"]
  },
  classic_scene: {
    label: "经典场景",
    category: "location",
    options: [
      "黑客帝国",
      "千与千寻",
      "疯狂动物城（Zootopia）",
      "生活大爆炸",
      "霍格沃茨魔法学院",
      "侏罗纪公园丛林入口",
      "星球大战塔图因集市",
      "指环王夏尔",
      "权力的游戏君临城城墙",
      "盗梦空间折叠城市",
      "赛博朋克霓虹夜市",
      "未来城市空港枢纽"
    ]
  },
  position: {
    label: "文字位置",
    category: "location",
    options: ["顶部中央", "底部中央", "左上角偏中", "右上角偏中", "画面中上方悬浮"]
  },
  render_style: {
    label: "渲染风格",
    category: "visual",
    options: [
      "Octane Render 和 Cinema 4D",
      "乐高积木风格",
      "Unreal Engine 5 写实光追",
      "Pixar 卡通渲染",
      "黏土动画质感",
      "手办级实体渲染",
      "3D像素风格"
    ]
  },
  company: {
    label: "公司",
    category: "location",
    options: [
      "Apple",
      "任天堂（Nintendo）",
      "SONY",
      "宜家（IKEA）"
    ]
  },
  ratio: {
    label: "画幅比例",
    category: "visual",
    options: [
      "3:4竖构图",
      "9:16竖构图",
      "1:1",
      "4:3横构图",
      "16:9横构图"
    ]
  },
  // Fashion Template additions
  fashion_deconstruct: {
    label: "穿搭解构",
    category: "item",
    options: ["整齐折叠的外套和精致的高跟鞋", "散落的配饰与包包", "悬挂的衬衫与百褶裙", "堆叠的金属配饰与皮带"]
  },
  toy_companion: {
    label: "互动公仔",
    category: "item",
    options: ["Labubu艺术公仔", "暴力熊积木熊", "泡泡玛特Molly", "复古泰迪熊", "赛博朋克机械狗"]
  },
  
  // Old ones preserved for compatibility or other templates
  lens_param: {
    label: "九宫格镜头",
    category: "visual",
    options: ["85mm, f/1.8", "85mm, f/2.0", "50mm, f/2.2", "50mm, f/2.5", "50mm, f/3.2", "35mm, f/4.5", "85mm, f/1.9", "50mm, f/1.8", "85mm, f/2.2", "50mm, f/2.0"]
  },
  lighting: {
    label: "灯光布置",
    category: "visual",
    options: ["大型顶置柔光箱，轻微侧向反射光", "自然窗光", "伦勃朗光", "赛博朋克霓虹光", "影棚硬光"]
  },
  sticker_core: {
    label: "核心贴纸",
    category: "item",
    options: ["用户穿着甜美约会装的照片", "复古摇滚乐队T恤穿搭", "日系JK制服穿搭", "极简职场通勤装"]
  },
  sticker_decor: {
    label: "装饰元素",
    category: "item",
    options: ["手绘爱心、闪光符号", "星星、月亮贴纸", "复古邮票与票据", "赛博故障风Glitch元素"]
  },
  action_pose: {
    label: "互动姿势",
    category: "action",
    options: ["用手指在男人脑后比划'兔耳朵'", "勾肩搭背比V字手势", "互相指着对方大笑", "背靠背酷炫站姿"]
  },
  background_scene: {
    label: "背景场景",
    category: "location",
    options: ["俯瞰纽约市的复仇者大厦楼顶", "废弃的工业仓库", "熙熙攘攘的时代广场", "外太空飞船内部"]
  }
};

export const INITIAL_DEFAULTS = {
  role: "游戏与动漫概念美术设计大师",
  subject: "女性角色",
  character_companion: "死侍 (Deadpool)",
  layout_focus: "全身立绘",
  camera_angle: "脸颊和颈部特写",
  connectors: "手绘箭头或引导线",
  underwear_style: "成套的蕾丝内衣裤",
  clothing: "炭灰色无袖连衣裙",
  clothing_male: "剪裁合体的深蓝西装",
  clothing_female: "炭灰色无袖连衣裙",
  expressions: "疯狂、病娇、狂喜",
  texture_zoom: "凌乱感与私处汗渍",
  action_detail: "带着项圈的爬行",
  special_view: "被踩在脚下的仰视视角",
  bag_content: "日常通勤包或手拿包",
  cosmetics: "常用的化妆品组合",
  private_items: "震动棒与项圈",
  art_style: "高质量的 2D 插画风格",
  background_style: "漫画网格笔记本",
  fashion_deconstruct: "整齐折叠的外套和精致的高跟鞋",
  toy_companion: "Labubu艺术公仔",
  classic_scene: "黑客帝国",
  render_style: "Octane Render 和 Cinema 4D",
  position: "顶部中央",
  company: "任天堂（Nintendo）",
  ratio: "3:4竖构图",
  
  // Grid defaults
  grid_pose: "前景手指虚化",
  
  // Legacy defaults
  lens_param: "85mm, f/1.8",
  lighting: "大型顶置柔光箱，轻微侧向反射光",
  sticker_core: "用户穿着甜美约会装的照片",
  sticker_decor: "手绘爱心、闪光符号",
  action_pose: "用手指在男人脑后比划'兔耳朵'",
  background_scene: "俯瞰纽约市的复仇者大厦楼顶"
};

