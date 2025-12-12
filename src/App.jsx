import React, { useState, useRef, useEffect } from 'react';
import { Copy, Plus, X, Settings, Check, Edit3, Eye, Trash2, FileText, Pencil, Copy as CopyIcon, Globe, ChevronDown, ChevronUp, ChevronRight, GripVertical, Download, Image as ImageIcon, List, Undo, Redo, Maximize2, RotateCcw, LayoutGrid, Sidebar, Search, ArrowRight, User } from 'lucide-react';
import html2canvas from 'html2canvas';
import { INITIAL_TEMPLATES_CONFIG, TEMPLATE_TAGS } from './data/templates';
import { INITIAL_BANKS, INITIAL_DEFAULTS, INITIAL_CATEGORIES } from './data/banks';

// --- 翻译配置 (Translations) ---
const TRANSLATIONS = {
  cn: {
    template_management: "模版管理",
    template_subtitle: "切换或管理不同 Prompt",
    new_template: "新建模版",
    reset_template: "恢复初始",
    confirm_reset_template: "确定要重置该模板吗？所有修改将丢失。",
    bank_config: "词库配置",
    bank_subtitle: "所有模版共享同一套词库",
    preview_mode: "预览交互",
    edit_mode: "编辑模版",
    copy_result: "复制结果",
    export_image: "保存长图",
    exporting: "导出中...",
    copied: "已复制",
    insert: "插入",
    add_option_placeholder: "新增选项...",
    add_bank_group: "创建新变量组",
    add_bank_title: "新增变量分类",
    label_name: "显示名称 (Label)",
    label_placeholder: "例如: 武器类型",
    id_name: "唯一标识 (ID)",
    id_placeholder: "例如: weapon",
    confirm_add: "确认添加",
    cancel: "取消",
    preview_status: "预览与交互模式",
    editing_status: "正在编辑模版结构...",
    rename: "重命名",
    duplicate: "创建副本",
    delete: "删除",
    select: "选择",
    no_options: "暂无选项，请在左侧添加",
    please_select: "请选择...",
    undefined_var: "未定义变量",
    alert_id_exists: "该 ID 已存在！",
    alert_keep_one: "至少需要保留一个模版",
    confirm_delete_template: "确定要删除这个模版吗？操作无法撤销。",
    confirm_delete_bank: "确定要删除“{{name}}”整个词库吗？",
    new_template_name: "新模版",
    new_template_content: "### 新模版\n\n开始编辑你的内容，使用 {{variable}} 插入变量。",
    copy_suffix: " (副本)",
    add_custom_option: "添加自定义选项",
    confirm: "确定",
    category_label: "分类 (Category)",
    category_character: "人物 (Character)",
    category_item: "物品 (Item)",
    category_action: "动作 (Action)",
    category_location: "地点 (Location)",
    category_visual: "画面 (Visuals)",
    category_other: "其他 (Other)",
    manage_categories: "管理分类",
    add_category: "新增分类",
    category_name_placeholder: "分类名称",
    delete_category_confirm: "确定要删除分类“{{name}}”吗？该分类下的词库将归为“其他”。",
    edit_category: "编辑分类",
    search_templates: "搜索模版...",
    filter_by_tags: "按标签筛选",
    all_templates: "全部",
    template_tags: "模版标签",
    add_tags: "添加标签",
    edit_tags: "编辑标签",
    expand_view: "展开视图",
    collapse_view: "收起视图",
    settings: "设置",
    app_title: "提示词填空器",
    author_info: "Made by CornerStudio 角落工作室 | 公众号：角落工作室 | Wechat: tanshilongmario",
    export_template: "导出模板",
    import_template: "导入模板",
    export_all_templates: "导出全部",
    storage_management: "存储管理",
    storage_used: "已使用",
    clear_all_data: "清空所有数据",
    confirm_clear_all: "确定要清空所有数据吗？此操作无法撤销！",
    image_url: "图片链接",
    image_url_placeholder: "输入图片URL地址...",
    use_url: "使用链接",
    or: "或",
    upload_image: "上传图片",
    change_image: "更换图片",
    storage_mode: "存储模式",
    use_browser_storage: "浏览器存储",
    use_local_folder: "本地文件夹",
    select_folder: "选择文件夹",
    folder_selected: "已选择文件夹",
    auto_save_enabled: "自动保存已启用",
    browser_not_supported: "浏览器不支持文件系统访问",
    folder_access_denied: "文件夹访问被拒绝",
    load_from_folder: "从文件夹加载",
    refresh_system: "刷新系统模版/词库",
    refresh_desc: "强制更新内置模版与词库，保留用户自定义",
    refresh_done_no_conflict: "刷新完成，系统内容已更新。",
    refresh_done_with_conflicts: "刷新完成，发现并保留以下用户改动：",
    refreshed_backup_suffix: "（自定义备份）"
  },
  en: {
    template_management: "Templates",
    template_subtitle: "Manage your Prompts",
    new_template: "New Template",
    reset_template: "Reset",
    confirm_reset_template: "Reset template to default? Changes will be lost.",
    bank_config: "Word Banks",
    bank_subtitle: "Shared across all templates",
    preview_mode: "Preview",
    edit_mode: "Edit",
    copy_result: "Copy Result",
    export_image: "Save Image",
    exporting: "Exporting...",
    copied: "Copied",
    insert: "Insert",
    add_option_placeholder: "Add option...",
    add_bank_group: "New Variable Group",
    add_bank_title: "Add Variable Category",
    label_name: "Display Name",
    label_placeholder: "e.g. Weapon Type",
    id_name: "Unique ID",
    id_placeholder: "e.g. weapon",
    confirm_add: "Confirm",
    cancel: "Cancel",
    preview_status: "Preview & Interactive Mode",
    editing_status: "Editing Template Structure...",
    rename: "Rename",
    duplicate: "Duplicate",
    delete: "Delete",
    select: "Select",
    no_options: "No options, add from left",
    please_select: "Select...",
    undefined_var: "Undefined",
    alert_id_exists: "ID already exists!",
    alert_keep_one: "Keep at least one template",
    confirm_delete_template: "Delete this template? Cannot be undone.",
    confirm_delete_bank: "Delete the entire bank “{{name}}”?",
    new_template_name: "New Template",
    new_template_content: "### New Template\n\nStart editing content. Use {{variable}} to insert variables.",
    copy_suffix: " (Copy)",
    add_custom_option: "Add Custom Option",
    confirm: "Confirm",
    category_label: "Category",
    category_character: "Character",
    category_item: "Item",
    category_action: "Action",
    category_location: "Location",
    category_visual: "Visuals",
    category_other: "Other",
    manage_categories: "Manage Categories",
    add_category: "Add Category",
    category_name_placeholder: "Category Name",
    delete_category_confirm: "Delete category “{{name}}”? Banks will be moved to 'Other'.",
    edit_category: "Edit Category",
    search_templates: "Search templates...",
    filter_by_tags: "Filter by tags",
    all_templates: "All",
    template_tags: "Template Tags",
    add_tags: "Add Tags",
    edit_tags: "Edit Tags",
    expand_view: "Expand View",
    collapse_view: "Collapse View",
    settings: "Settings",
    app_title: "Prompt Fill",
    author_info: "Made by CornerStudio",
    export_template: "Export Template",
    import_template: "Import Template",
    export_all_templates: "Export All",
    storage_management: "Storage",
    storage_used: "Used",
    clear_all_data: "Clear All",
    confirm_clear_all: "Clear all data? This cannot be undone!",
    image_url: "Image URL",
    image_url_placeholder: "Enter image URL...",
    use_url: "Use URL",
    or: "or",
    upload_image: "Upload Image",
    change_image: "Change Image",
    storage_mode: "Storage Mode",
    use_browser_storage: "Browser Storage",
    use_local_folder: "Local Folder",
    select_folder: "Select Folder",
    folder_selected: "Folder Selected",
    auto_save_enabled: "Auto-save Enabled",
    browser_not_supported: "Browser doesn't support file system access",
    folder_access_denied: "Folder access denied",
    load_from_folder: "Load from Folder",
    refresh_system: "Refresh System Templates/Banks",
    refresh_desc: "Force update built-ins, keep user data",
    refresh_done_no_conflict: "Refreshed. System content is up to date.",
    refresh_done_with_conflicts: "Refreshed. Kept user changes:",
    refreshed_backup_suffix: "(User Backup)"
  }
};

// --- 工具函数：深拷贝与合并策略 ---
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

const makeUniqueKey = (base, existingKeys, suffix = "custom") => {
  let candidate = `${base}_${suffix}`;
  let counter = 1;
  while (existingKeys.has(candidate)) {
    candidate = `${base}_${suffix}${counter}`;
    counter += 1;
  }
  return candidate;
};

// 等待图片加载完成，避免导出时空白
const waitForImageLoad = (img, timeout = 6000) => {
  if (!img) return Promise.resolve();
  if (img.complete && img.naturalWidth > 0) return Promise.resolve();
  return new Promise((resolve) => {
    const clear = () => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
      clearTimeout(timer);
    };
    const onLoad = () => { clear(); resolve(); };
    const onError = () => { clear(); resolve(); }; // 失败也放行，避免阻塞
    const timer = setTimeout(() => { clear(); resolve(); }, timeout);
    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);
  });
};

// 合并系统模板，系统模板强制更新，用户改动备份
const mergeTemplatesWithSystem = (currentTemplates, { backupSuffix }) => {
  const systemMap = new Map(INITIAL_TEMPLATES_CONFIG.map(t => [t.id, deepClone(t)]));
  const merged = INITIAL_TEMPLATES_CONFIG.map(t => deepClone(t));
  const notes = [];
  const existingIds = new Set(merged.map(t => t.id));

  currentTemplates.forEach(t => {
    if (systemMap.has(t.id)) {
      const sys = systemMap.get(t.id);
      const isDifferent = JSON.stringify({ ...t, id: undefined, name: undefined }) !== JSON.stringify({ ...sys, id: undefined, name: undefined });
      if (isDifferent) {
        const backupId = makeUniqueKey(t.id, existingIds, "user");
        existingIds.add(backupId);
        merged.push({ ...deepClone(t), id: backupId, name: `${t.name}${backupSuffix || ""}` });
        notes.push(`模板 ${t.id} 已更新，旧版备份为 ${backupId}`);
      }
    } else {
      let newId = t.id;
      if (existingIds.has(newId)) {
        newId = makeUniqueKey(newId, existingIds, "custom");
        notes.push(`自定义模板 ${t.id} 与系统冲突，已重命名为 ${newId}`);
      }
      existingIds.add(newId);
      merged.push({ ...deepClone(t), id: newId });
    }
  });

  return { templates: merged, notes };
};

// 合并系统词库与默认值，系统词库强制更新，用户改动备份
const mergeBanksWithSystem = (currentBanks, currentDefaults, { backupSuffix }) => {
  const mergedBanks = deepClone(INITIAL_BANKS);
  const mergedDefaults = { ...INITIAL_DEFAULTS };
  const notes = [];
  const existingKeys = new Set(Object.keys(mergedBanks));

  Object.entries(currentBanks || {}).forEach(([key, bank]) => {
    if (INITIAL_BANKS[key]) {
      const isDifferent = JSON.stringify(bank) !== JSON.stringify(INITIAL_BANKS[key]);
      if (isDifferent) {
        const backupKey = makeUniqueKey(key, existingKeys, "user");
        existingKeys.add(backupKey);
        mergedBanks[backupKey] = deepClone(bank);
        if (currentDefaults && key in currentDefaults) mergedDefaults[backupKey] = currentDefaults[key];
        notes.push(`词库 ${key} 已更新，用户改动备份为 ${backupKey}`);
      }
    } else {
      let newKey = key;
      if (existingKeys.has(newKey)) {
        newKey = makeUniqueKey(newKey, existingKeys, "custom");
        notes.push(`自定义词库 ${key} 与系统冲突，已重命名为 ${newKey}`);
      }
      existingKeys.add(newKey);
      mergedBanks[newKey] = deepClone(bank);
      if (currentDefaults && key in currentDefaults) mergedDefaults[newKey] = currentDefaults[key];
    }
  });

  Object.entries(currentDefaults || {}).forEach(([key, val]) => {
    if (!(key in mergedDefaults) && mergedBanks[key]) {
      mergedDefaults[key] = val;
    }
  });

  return { banks: mergedBanks, defaults: mergedDefaults, notes };
};

const PREMIUM_STYLES = {
  blue: { from: "#93C5FD", to: "#3B82F6", shadowColor: "rgba(59, 130, 246, 0.4)", glowColor: "rgba(59, 130, 246, 0.6)" },
  amber: { from: "#FCD34D", to: "#F59E0B", shadowColor: "rgba(245, 158, 11, 0.4)", glowColor: "rgba(245, 158, 11, 0.6)" },
  rose: { from: "#F472B6", to: "#DB2777", shadowColor: "rgba(219, 39, 119, 0.4)", glowColor: "rgba(219, 39, 119, 0.6)" }, // Changed from light pink/red to Pink/Fuchsia
  emerald: { from: "#6EE7B7", to: "#10B981", shadowColor: "rgba(16, 185, 129, 0.4)", glowColor: "rgba(16, 185, 129, 0.6)" },
  violet: { from: "#BEB3FF", to: "#8C79FF", shadowColor: "rgba(139, 92, 246, 0.4)", glowColor: "rgba(139, 92, 246, 0.6)" },
  slate: { from: "#CBD5E1", to: "#64748B", shadowColor: "rgba(100, 116, 139, 0.4)", glowColor: "rgba(100, 116, 139, 0.6)" },
  orange: { from: "#FDBA74", to: "#F97316", shadowColor: "rgba(249, 115, 22, 0.4)", glowColor: "rgba(249, 115, 22, 0.6)" },
  cyan: { from: "#67E8F9", to: "#06B6D4", shadowColor: "rgba(6, 182, 212, 0.4)", glowColor: "rgba(6, 182, 212, 0.6)" },
  lime: { from: "#BEF264", to: "#84CC16", shadowColor: "rgba(132, 204, 22, 0.4)", glowColor: "rgba(132, 204, 22, 0.6)" },
  pink: { from: "#F9A8D4", to: "#EC4899", shadowColor: "rgba(236, 72, 153, 0.4)", glowColor: "rgba(236, 72, 153, 0.6)" },
  indigo: { from: "#A5B4FC", to: "#6366F1", shadowColor: "rgba(99, 102, 241, 0.4)", glowColor: "rgba(99, 102, 241, 0.6)" },
  teal: { from: "#5EEAD4", to: "#14B8A6", shadowColor: "rgba(20, 184, 166, 0.4)", glowColor: "rgba(20, 184, 166, 0.6)" }
};

const CATEGORY_STYLES = {
  blue: {
    text: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200",
    hoverBg: "hover:bg-blue-100", hoverBorder: "hover:border-blue-300", hoverText: "hover:text-blue-600",
    ring: "ring-blue-300", bgActive: "bg-blue-100",
    badgeText: "text-blue-700", badgeBg: "bg-blue-100",
    dotBg: "bg-blue-500", btnBg: "bg-blue-600",
    inputRing: "focus:ring-blue-200", inputBorder: "focus:border-blue-500"
  },
  amber: {
    text: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200",
    hoverBg: "hover:bg-amber-100", hoverBorder: "hover:border-amber-300", hoverText: "hover:text-amber-600",
    ring: "ring-amber-300", bgActive: "bg-amber-100",
    badgeText: "text-amber-700", badgeBg: "bg-amber-100",
    dotBg: "bg-amber-500", btnBg: "bg-amber-600",
    inputRing: "focus:ring-amber-200", inputBorder: "focus:border-amber-500"
  },
  rose: {
    text: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200",
    hoverBg: "hover:bg-rose-100", hoverBorder: "hover:border-rose-300", hoverText: "hover:text-rose-600",
    ring: "ring-rose-300", bgActive: "bg-rose-100",
    badgeText: "text-rose-700", badgeBg: "bg-rose-100",
    dotBg: "bg-rose-500", btnBg: "bg-rose-600",
    inputRing: "focus:ring-rose-200", inputBorder: "focus:border-rose-500"
  },
  emerald: {
    text: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200",
    hoverBg: "hover:bg-emerald-100", hoverBorder: "hover:border-emerald-300", hoverText: "hover:text-emerald-600",
    ring: "ring-emerald-300", bgActive: "bg-emerald-100",
    badgeText: "text-emerald-700", badgeBg: "bg-emerald-100",
    dotBg: "bg-emerald-500", btnBg: "bg-emerald-600",
    inputRing: "focus:ring-emerald-200", inputBorder: "focus:border-emerald-500"
  },
  violet: {
    text: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200",
    hoverBg: "hover:bg-violet-100", hoverBorder: "hover:border-violet-300", hoverText: "hover:text-violet-600",
    ring: "ring-violet-300", bgActive: "bg-violet-100",
    badgeText: "text-violet-700", badgeBg: "bg-violet-100",
    dotBg: "bg-violet-500", btnBg: "bg-violet-600",
    inputRing: "focus:ring-violet-200", inputBorder: "focus:border-violet-500"
  },
  slate: {
    text: "text-slate-600", bg: "bg-slate-50", border: "border-slate-200",
    hoverBg: "hover:bg-slate-100", hoverBorder: "hover:border-slate-300", hoverText: "hover:text-slate-600",
    ring: "ring-slate-300", bgActive: "bg-slate-100",
    badgeText: "text-slate-700", badgeBg: "bg-slate-100",
    dotBg: "bg-slate-500", btnBg: "bg-slate-600",
    inputRing: "focus:ring-slate-200", inputBorder: "focus:border-slate-500"
  },
  orange: {
    text: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200",
    hoverBg: "hover:bg-orange-100", hoverBorder: "hover:border-orange-300", hoverText: "hover:text-orange-600",
    ring: "ring-orange-300", bgActive: "bg-orange-100",
    badgeText: "text-orange-700", badgeBg: "bg-orange-100",
    dotBg: "bg-orange-500", btnBg: "bg-orange-600",
    inputRing: "focus:ring-orange-200", inputBorder: "focus:border-orange-500"
  },
  cyan: {
    text: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-200",
    hoverBg: "hover:bg-cyan-100", hoverBorder: "hover:border-cyan-300", hoverText: "hover:text-cyan-600",
    ring: "ring-cyan-300", bgActive: "bg-cyan-100",
    badgeText: "text-cyan-700", badgeBg: "bg-cyan-100",
    dotBg: "bg-cyan-500", btnBg: "bg-cyan-600",
    inputRing: "focus:ring-cyan-200", inputBorder: "focus:border-cyan-500"
  },
  lime: {
    text: "text-lime-600", bg: "bg-lime-50", border: "border-lime-200",
    hoverBg: "hover:bg-lime-100", hoverBorder: "hover:border-lime-300", hoverText: "hover:text-lime-600",
    ring: "ring-lime-300", bgActive: "bg-lime-100",
    badgeText: "text-lime-700", badgeBg: "bg-lime-100",
    dotBg: "bg-lime-500", btnBg: "bg-lime-600",
    inputRing: "focus:ring-lime-200", inputBorder: "focus:border-lime-500"
  },
  pink: {
    text: "text-pink-600", bg: "bg-pink-50", border: "border-pink-200",
    hoverBg: "hover:bg-pink-100", hoverBorder: "hover:border-pink-300", hoverText: "hover:text-pink-600",
    ring: "ring-pink-300", bgActive: "bg-pink-100",
    badgeText: "text-pink-700", badgeBg: "bg-pink-100",
    dotBg: "bg-pink-500", btnBg: "bg-pink-600",
    inputRing: "focus:ring-pink-200", inputBorder: "focus:border-pink-500"
  },
  indigo: {
    text: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200",
    hoverBg: "hover:bg-orange-100", hoverBorder: "hover:border-orange-300", hoverText: "hover:text-orange-600",
    ring: "ring-orange-300", bgActive: "bg-orange-100",
    badgeText: "text-orange-700", badgeBg: "bg-orange-100",
    dotBg: "bg-orange-500", btnBg: "bg-orange-600",
    inputRing: "focus:ring-orange-200", inputBorder: "focus:border-orange-500"
  },
  teal: {
    text: "text-teal-600", bg: "bg-teal-50", border: "border-teal-200",
    hoverBg: "hover:bg-teal-100", hoverBorder: "hover:border-teal-300", hoverText: "hover:text-teal-600",
    ring: "ring-teal-300", bgActive: "bg-teal-100",
    badgeText: "text-teal-700", badgeBg: "bg-teal-100",
    dotBg: "bg-teal-500", btnBg: "bg-teal-600",
    inputRing: "focus:ring-teal-200", inputBorder: "focus:border-teal-500"
  }
};

const TAG_STYLES = {
  "建筑": "bg-stone-50 text-stone-600 border border-stone-200",
  "人物": "bg-rose-50 text-rose-600 border border-rose-200",
  "摄影": "bg-orange-50 text-orange-600 border border-orange-200",
  "产品": "bg-amber-50 text-amber-600 border border-amber-200",
  "实拍": "bg-emerald-50 text-emerald-600 border border-emerald-200",
  "图表": "bg-sky-50 text-sky-600 border border-sky-200",
  "卡通": "bg-pink-50 text-pink-600 border border-pink-200",
  "宠物": "bg-orange-50 text-orange-600 border border-orange-200",
  "游戏": "bg-violet-50 text-violet-600 border border-violet-200",
  "创意": "bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-200",
  "default": "bg-gray-50 text-gray-500 border border-gray-200"
};

const TAG_LABELS = {
  cn: {
    "建筑": "建筑",
    "人物": "人物",
    "摄影": "摄影",
    "产品": "产品",
    "实拍": "实拍",
    "图表": "图表",
    "卡通": "卡通",
    "宠物": "宠物",
    "游戏": "游戏",
    "创意": "创意"
  },
  en: {
    "建筑": "Architecture",
    "人物": "Character",
    "摄影": "Photography",
    "产品": "Product",
    "实拍": "Real Shot",
    "图表": "Infographic",
    "卡通": "Cartoon",
    "宠物": "Pets",
    "游戏": "Gaming",
    "创意": "Creative"
  }
};



// --- 持久化存储 Hook ---
const useStickyState = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    try {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    } catch (error) {
      console.error(`读取 localStorage 失败 (${key}):`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      const storageMode = window.localStorage.getItem('app_storage_mode') || 'browser';
      // 在使用本地文件夹模式时，不再写入 localStorage，避免大图触发配额弹窗
      if (storageMode === 'folder') return;

      const serialized = JSON.stringify(value);
      window.localStorage.setItem(key, serialized);
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.error('LocalStorage 存储空间已满！');
        // 仅浏览器存储模式下提示，文件夹模式直接跳过
        const storageMode = window.localStorage.getItem('app_storage_mode') || 'browser';
        if (storageMode === 'browser') {
          alert('存储空间不足！图片过大或数据过多。建议：\n1. 使用更小的图片（建议小于500KB）\n2. 删除一些不需要的模板\n3. 清理浏览器缓存');
        }
      } else {
        console.error(`保存到 localStorage 失败 (${key}):`, error);
      }
    }
  }, [key, value]);

  return [value, setValue];
};


// --- 组件：可点击的变量词 ---
const Variable = ({ id, index, config, currentVal, isOpen, onToggle, onSelect, onAddCustom, popoverRef, categories, t }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [customVal, setCustomVal] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  // Determine styles based on category
  const categoryId = config?.category || 'other';
  const colorKey = categories[categoryId]?.color || 'slate';
  const style = CATEGORY_STYLES[colorKey] || CATEGORY_STYLES.slate;
  const premium = PREMIUM_STYLES[colorKey] || PREMIUM_STYLES.slate;

  // Reset state when popover closes
  useEffect(() => {
    if (!isOpen) {
        setIsAdding(false);
        setCustomVal("");
    }
  }, [isOpen]);

  if (!config) return <span className="text-gray-400 bg-gray-50 px-1 rounded border border-gray-200 text-xs" title={`${t('undefined_var')}: ${id}`}>[{id}?]</span>;

  const handleAddSubmit = () => {
      if (customVal.trim()) {
          onAddCustom(customVal.trim());
          setCustomVal("");
          setIsAdding(false);
      }
  };

  return (
    <div className="relative inline-block mx-1.5 align-baseline group text-base">
      <span 
        data-export-pill="true" // 关键：添加标识供导出时抓取
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          cursor-pointer px-3 py-1 rounded-full transition-all duration-300 select-none font-medium text-white
          ${isOpen ? `ring-2 ring-offset-2 ${style.ring}` : ''}
          hover:scale-105 active:scale-95
        `}
        style={{
            background: `linear-gradient(135deg, ${premium.from} 0%, ${premium.to} 100%)`,
            boxShadow: isHovered 
                ? `inset 0px 2px 4px 0px rgba(255, 255, 255, 0.2), 0 4px 12px ${premium.glowColor}`
                : `inset 0px 2px 4px 0px rgba(0, 0, 0, 0.1), 0 2px 5px ${premium.shadowColor}`,
            border: '1px solid rgba(255, 255, 255, 0.3)',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }}
      >
        {currentVal || <span className="opacity-70 italic">{t('please_select')}</span>}
      </span>
      
      {/* Popover - 词库选择器 */}
      {isOpen && (
        <div 
          ref={popoverRef}
          className="absolute left-0 top-full mt-2 w-72 rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col text-left animate-in fade-in zoom-in-95 duration-200 origin-top-left"
          style={{ 
              minWidth: '280px',
              backdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: `0 10px 40px -10px ${premium.shadowColor}, 0 0 0 1px rgba(0,0,0,0.05)`
          }}
        >
          <div className="px-4 py-3 border-b border-gray-100/50 flex justify-between items-center bg-white/50 backdrop-blur-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{t('select')} {config.label}</span>
             <span 
                className="text-[10px] px-2 py-0.5 rounded-full font-bold text-white shadow-sm"
                style={{ background: `linear-gradient(135deg, ${premium.from}, ${premium.to})` }}
             >
                {categories[categoryId]?.label || categoryId}
            </span>
          </div>
          <div className="max-h-64 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {config.options.length > 0 ? config.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => onSelect(opt)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group flex items-center justify-between
                  ${currentVal === opt 
                    ? 'bg-white shadow-md ring-1 ring-black/5 font-bold' 
                    : 'hover:bg-white/60 hover:shadow-sm text-gray-600 hover:text-gray-900'}`}
                style={currentVal === opt ? { color: premium.to } : {}}
              >
                <span>{opt}</span>
                {currentVal === opt && <Check size={14} style={{ color: premium.to }} />}
              </button>
            )) : (
              <div className="px-3 py-8 text-center text-gray-400 text-sm italic">
                {t('no_options')}
              </div>
            )}
          </div>
          
           {/* Add Custom Option Footer */}
           <div className="p-2 border-t border-gray-100/50 bg-white/50 backdrop-blur-sm">
             {isAdding ? (
                 <div className="flex gap-2">
                     <input 
                        autoFocus
                        type="text"
                        value={customVal}
                        onChange={(e) => setCustomVal(e.target.value)}
                        placeholder={t('add_option_placeholder')}
                        className="flex-1 min-w-0 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white/80"
                        onKeyDown={(e) => e.key === 'Enter' && handleAddSubmit()}
                     />
                     <button 
                        onClick={handleAddSubmit}
                        disabled={!customVal.trim()}
                        className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors shadow-sm"
                     >
                        {t('confirm')}
                     </button>
                 </div>
             ) : (
                 <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsAdding(true);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs text-gray-500 hover:text-orange-600 hover:bg-orange-50/50 rounded-lg border border-dashed border-gray-300 hover:border-orange-300 transition-all font-medium"
                 >
                    <Plus size={12} /> {t('add_custom_option')}
                 </button>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Visual Editor Component (New) ---
const VisualEditor = React.forwardRef(({ value, onChange, banks, categories }, ref) => {
  const preRef = useRef(null);

  const handleScroll = (e) => {
    if (preRef.current) {
      preRef.current.scrollTop = e.target.scrollTop;
    }
  };

  const renderHighlights = (text) => {
    // Split by {{...}}
    const parts = text.split(/(\{\{[^{}\n]+\}\})/g);
    return parts.map((part, i) => {
      if (part.startsWith('{{') && part.endsWith('}}')) {
         const key = part.slice(2, -2).trim();
         const bank = banks[key];
         const categoryId = bank?.category || 'other';
         const colorKey = categories[categoryId]?.color || 'slate';
         const style = CATEGORY_STYLES[colorKey];
         
         // Style needs to match font metrics exactly, so avoid padding/border that adds width
         return (
            <span key={i} className={`${style.bg} ${style.text} font-bold rounded-sm`}>
               {part}
            </span>
         );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-50">
      {/* Backdrop */}
      <pre
        ref={preRef}
        className="absolute inset-0 p-8 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words pointer-events-none text-gray-800 overflow-hidden m-0"
        style={{ fontFamily: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }} 
        aria-hidden="true"
      >
        {renderHighlights(value)}
        <br />
      </pre>

      {/* Textarea */}
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        onScroll={handleScroll}
        className="absolute inset-0 w-full h-full p-8 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words bg-transparent text-transparent caret-gray-800 resize-none focus:outline-none overflow-auto z-10 m-0 selection:bg-orange-200 selection:text-orange-900"
        style={{ fontFamily: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
        spellCheck={false}
      />
    </div>
  );
});

// --- 组件：可折叠的分类区块 (New Component) ---
const CategorySection = ({ catId, categories, banks, onInsert, onDeleteOption, onAddOption, onDeleteBank, onUpdateBankCategory, t }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const category = categories[catId];
  
  if (!category) return null;

  const catBanks = Object.entries(banks).filter(([_, bank]) => (bank.category || 'other') === catId);
  
  // 如果该分类下没有词库，不显示
  if (catBanks.length === 0) return null;

  const style = CATEGORY_STYLES[category.color] || CATEGORY_STYLES.slate;

  return (
    <div className="break-inside-avoid transition-all duration-300">
        <div 
            className="flex items-center gap-1 mb-2 cursor-pointer group select-none py-1 -ml-1 pl-1 rounded hover:bg-gray-50 transition-colors"
            onClick={() => setIsCollapsed(!isCollapsed)}
        >
            <div className="text-gray-400 group-hover:text-gray-600 transition-colors mt-0.5">
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
            </div>
            <h3 className={`text-xs font-bold uppercase tracking-wider ${style.text} flex items-center gap-1.5 flex-1`}>
                <span className={`w-1.5 h-1.5 rounded-full ${style.dotBg}`}></span>
                {category.label}
                <span className="text-gray-300 font-normal ml-1 text-[10px] tabular-nums">({catBanks.length})</span>
            </h3>
            {/* 折叠时的装饰线 */}
            {isCollapsed && <div className="h-px bg-gray-100 flex-1 ml-2 mr-2"></div>}
        </div>
        
        {!isCollapsed && (
            <div className="space-y-3 pl-1">
                {catBanks.map(([key, bank]) => (
                    <BankGroup 
                        key={key}
                        bankKey={key} 
                        bank={bank} 
                        onInsert={onInsert}
                        onDeleteOption={onDeleteOption}
                        onAddOption={onAddOption}
                        onDeleteBank={onDeleteBank}
                        onUpdateBankCategory={onUpdateBankCategory}
                        categories={categories}
                        t={t}
                    />
                ))}
            </div>
        )}
    </div>
  );
};

// --- 组件：可折叠的词库组 ---
const BankGroup = ({ bankKey, bank, onInsert, onDeleteOption, onAddOption, onDeleteBank, onUpdateBankCategory, categories, t }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isEditingCategory, setIsEditingCategory] = useState(false);

    const categoryId = bank.category || 'other';
    const colorKey = categories[categoryId]?.color || 'slate';
    const style = CATEGORY_STYLES[colorKey];
    const premium = PREMIUM_STYLES[colorKey] || PREMIUM_STYLES.slate;

    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', `{{${bankKey}}}`);
        e.dataTransfer.effectAllowed = 'copy';
    };

    return (
        <div 
            draggable="true"
            onDragStart={handleDragStart}
            className="relative group/card mb-3 cursor-grab active:cursor-grabbing"
        >
            {/* Gradient Border Glow */}
            <div 
                className="absolute -inset-[1px] rounded-xl opacity-70 group-hover/card:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(135deg, ${premium.from}, ${premium.to})` }}
            />

            {/* Main Card Content */}
            <div className="relative bg-white rounded-[11px] m-[1px] overflow-hidden">
                {/* Header / Collapsed View */}
                <div 
                    className="flex justify-between items-start p-3 cursor-pointer hover:bg-gray-50/80 transition-colors"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <div className="flex items-start gap-2 overflow-hidden flex-1 pr-2">
                        <div className="mt-0.5 flex-shrink-0 text-gray-400 group-hover/card:text-gray-600 transition-colors">
                            {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold text-gray-700 truncate leading-tight group-hover/card:text-gray-900 transition-colors">{bank.label}</span>
                            <code className="text-[10px] text-gray-400 truncate font-mono mt-0.5" style={{ color: premium.to }}>{`{{${bankKey}}}`}</code>
                        </div>
                    </div>
                    <div className="flex gap-1 items-center">
                        <button 
                            onClick={(e) => { e.stopPropagation(); onInsert(bankKey); }}
                            title={t('insert')}
                            className="p-1.5 bg-white rounded-lg border border-gray-100 hover:border-orange-200 text-gray-400 hover:text-orange-600 hover:bg-orange-50 transition-all shadow-sm flex items-center gap-1"
                        >
                            <Plus size={14} /> 
                            {!isCollapsed && <span className="text-xs font-medium">{t('insert')}</span>}
                        </button>
                        
                        {!isCollapsed && (
                            <>
                                <button 
                                    onClick={(e) => { 
                                        e.stopPropagation(); 
                                        setIsEditingCategory(!isEditingCategory); 
                                    }}
                                    title={t('category_label')}
                                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <Settings size={14} />
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onDeleteBank(bankKey); }}
                                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
                
                {/* Expanded Content */}
                {!isCollapsed && (
                    <div className="p-3 pt-0">
                        <div className="h-px bg-gray-100 mb-3 -mx-3"></div>
                        
                        {/* Category Edit Mode */}
                        {isEditingCategory && (
                            <div className="mb-3 pb-3 border-b border-gray-100">
                                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">{t('category_label')}</label>
                                <select 
                                    value={categoryId}
                                    onChange={(e) => {
                                        onUpdateBankCategory(bankKey, e.target.value);
                                        setIsEditingCategory(false);
                                    }}
                                    className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-gray-50"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {Object.values(categories).map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="flex flex-col gap-2 mb-3">
                            {bank.options.map((opt, idx) => (
                                <div key={idx} className="group/opt flex items-center justify-between gap-2 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 px-2.5 py-1.5 rounded-lg text-xs text-gray-600 shadow-sm transition-all duration-200">
                                    <span className="truncate select-text" title={opt}>{opt}</span>
                                    <button 
                                        onClick={() => onDeleteOption(bankKey, opt)}
                                        className="opacity-0 group-hover/opt:opacity-100 text-gray-300 hover:text-red-500 transition-all flex-shrink-0"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder={t('add_option_placeholder')}
                                className="flex-1 px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-white"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        onAddOption(bankKey, e.target.value);
                                        e.target.value = '';
                                    }
                                }}
                            />
                            <button 
                                className="p-1.5 bg-gray-50 border border-gray-200 text-gray-400 rounded-lg hover:bg-white hover:border-orange-300 hover:text-orange-600 transition-all shadow-sm"
                                onClick={(e) => {
                                    const input = e.currentTarget.previousSibling;
                                    onAddOption(bankKey, input.value);
                                    input.value = '';
                                }}
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Modal: Category Manager ---
const CategoryManager = ({ isOpen, onClose, categories, setCategories, banks, setBanks, t }) => {
  const [newCatName, setNewCatName] = useState("");
  const [newCatColor, setNewCatColor] = useState("slate");
  const [editingCatId, setEditingCatId] = useState(null);
  const [tempCatName, setTempCatName] = useState("");
  
  const availableColors = Object.keys(CATEGORY_STYLES);

  if (!isOpen) return null;

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    const newId = `cat_${Date.now()}`;
    
    setCategories(prev => ({
      ...prev,
      [newId]: { id: newId, label: newCatName, color: newCatColor }
    }));
    setNewCatName("");
    setNewCatColor("slate");
  };

  const handleDeleteCategory = (catId) => {
    if (catId === 'other') return; // Cannot delete default
    
    const catName = categories[catId].label;
    if (window.confirm(t('delete_category_confirm', { name: catName }))) {
       // 1. Update banks to use 'other'
       const updatedBanks = { ...banks };
       Object.keys(updatedBanks).forEach(key => {
           if (updatedBanks[key].category === catId) {
               updatedBanks[key].category = 'other';
           }
       });
       setBanks(updatedBanks);

       // 2. Remove category
       const updatedCats = { ...categories };
       delete updatedCats[catId];
       setCategories(updatedCats);
    }
  };

  const startEditing = (cat) => {
      setEditingCatId(cat.id);
      setTempCatName(cat.label);
  };

  const saveEditing = () => {
      if (!tempCatName.trim()) return;
      setCategories(prev => ({
          ...prev,
          [editingCatId]: { ...prev[editingCatId], label: tempCatName }
      }));
      setEditingCatId(null);
  };

  const changeColor = (catId, color) => {
      setCategories(prev => ({
          ...prev,
          [catId]: { ...prev[catId], color }
      }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[80vh]">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <List size={18} /> {t('manage_categories')}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded text-gray-500"><X size={18}/></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
           {/* Add New */}
           <div className="flex gap-2 items-center mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <input 
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder={t('category_name_placeholder')}
                className="flex-1 text-sm border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:border-orange-500"
              />
              <select 
                value={newCatColor}
                onChange={(e) => setNewCatColor(e.target.value)}
                className="text-sm border border-gray-300 rounded px-2 py-1.5 bg-white"
              >
                {availableColors.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <button 
                onClick={handleAddCategory}
                disabled={!newCatName.trim()}
                className="p-1.5 bg-orange-600 text-white rounded disabled:opacity-50 hover:bg-orange-700"
              >
                <Plus size={16} />
              </button>
           </div>

           {/* List */}
           <div className="space-y-2">
             {Object.values(categories).map(cat => (
               <div key={cat.id} className="flex items-center gap-2 p-2 border border-gray-100 rounded bg-white hover:border-gray-200 transition-colors">
                  <div className={`w-3 h-3 rounded-full ${CATEGORY_STYLES[cat.color].dotBg}`}></div>
                  
                  {editingCatId === cat.id ? (
                      <input 
                        autoFocus
                        value={tempCatName}
                        onChange={(e) => setTempCatName(e.target.value)}
                        onBlur={saveEditing}
                        onKeyDown={(e) => e.key === 'Enter' && saveEditing()}
                        className="flex-1 text-sm border border-orange-300 rounded px-1 py-0.5 outline-none"
                      />
                  ) : (
                      <span className="flex-1 text-sm font-medium text-gray-700 truncate">{cat.label}</span>
                  )}

                  <div className="flex items-center gap-1">
                      {/* Color Picker */}
                      <div className="relative group/color">
                          <div className={`w-5 h-5 rounded cursor-pointer border border-gray-200 ${CATEGORY_STYLES[cat.color].bg}`}></div>
                          <div className="absolute right-0 top-full mt-1 hidden group-hover/color:grid grid-cols-5 gap-1 p-2 bg-white border border-gray-200 shadow-lg rounded z-10 w-32">
                              {availableColors.map(c => (
                                  <div 
                                    key={c} 
                                    onClick={() => changeColor(cat.id, c)}
                                    className={`w-4 h-4 rounded-full cursor-pointer hover:scale-110 transition-transform ${CATEGORY_STYLES[c].dotBg}`}
                                    title={c}
                                  />
                              ))}
                          </div>
                      </div>

                      <button onClick={() => startEditing(cat)} className="p-1 text-gray-400 hover:text-orange-600 rounded"><Pencil size={14}/></button>
                      {cat.id !== 'other' && (
                          <button onClick={() => handleDeleteCategory(cat.id)} className="p-1 text-gray-400 hover:text-red-500 rounded"><Trash2 size={14}/></button>
                      )}
                  </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Modal: Insert Variable Picker ---
const InsertVariableModal = ({ isOpen, onClose, categories, banks, onSelect, t }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[80vh] animate-slide-up">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <List size={18} className="text-orange-600" /> {t('insert')}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded text-gray-500"><X size={18}/></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
           {Object.keys(categories).map(catId => {
               const catBanks = Object.entries(banks).filter(([_, bank]) => (bank.category || 'other') === catId);
               if (catBanks.length === 0) return null;
               
               const category = categories[catId];
               const style = CATEGORY_STYLES[category.color] || CATEGORY_STYLES.slate;

               return (
                   <div key={catId}>
                       <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${style.text} flex items-center gap-1.5 sticky top-0 bg-white py-1 z-10`}>
                           <span className={`w-1.5 h-1.5 rounded-full ${style.dotBg}`}></span>
                           {category.label}
                       </h4>
                       <div className="grid grid-cols-1 gap-2">
                           {catBanks.map(([key, bank]) => (
                               <button
                                   key={key}
                                   onClick={() => onSelect(key)}
                                   className={`
                                     flex items-center justify-between p-3 rounded-lg border text-left transition-all group
                                     bg-white border-gray-100 hover:border-orange-200 hover:bg-orange-50/50 hover:shadow-sm
                                   `}
                               >
                                   <div>
                                       <span className="block text-sm font-medium text-gray-700 group-hover:text-orange-700">{bank.label}</span>
                                       <code className="text-[10px] text-gray-400 font-mono group-hover:text-orange-400">{`{{${key}}}`}</code>
                                   </div>
                                   <Plus size={16} className="text-gray-300 group-hover:text-orange-500" />
                               </button>
                           ))}
                       </div>
                   </div>
               );
           })}
        </div>
      </div>
    </div>
  );
};


// --- Helper Component: Premium Button (New) ---
const PremiumButton = ({ onClick, children, className = "", active = false, disabled = false, title, icon: Icon, color="orange" }) => {
    const [isHovered, setIsHovered] = useState(false);
    const premium = PREMIUM_STYLES[color] || PREMIUM_STYLES.indigo;

    // Base classes
    const baseClasses = `
      flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all duration-300
      disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale
      ${className}
    `;

    // Active/Hover styles using inline styles for premium look
    const style = (active || isHovered) && !disabled ? {
        background: `linear-gradient(135deg, ${premium.from} 0%, ${premium.to} 100%)`,
        boxShadow: `inset 0px 1px 2px 0px rgba(255, 255, 255, 0.3), 0 4px 12px ${premium.glowColor}`,
        border: '1px solid rgba(255, 255, 255, 0.2)',
        color: 'white',
        transform: 'translateY(-1px)'
    } : {
        background: active ? '#EEF2FF' : 'white',
        border: '1px solid #E5E7EB',
        color: active ? premium.to : '#4B5563',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={baseClasses}
            style={style}
            title={title}
        >
            {Icon && <Icon size={16} />}
            {children && <span>{children}</span>}
        </button>
    );
};

// --- Helper Component: Editor Toolbar ---
const EditorToolbar = ({ onInsertClick, canUndo, canRedo, onUndo, onRedo, t }) => {
  return (
    <div className="h-12 border-b border-gray-200 bg-white/80 backdrop-blur-sm flex items-center justify-between px-4 flex-shrink-0 z-20">
      {/* Left: Undo/Redo */}
      <div className="flex items-center gap-2">
         <PremiumButton onClick={onUndo} disabled={!canUndo} title="Undo" icon={Undo} color="slate" className="!px-2 !py-1.5" />
         <PremiumButton onClick={onRedo} disabled={!canRedo} title="Redo" icon={Redo} color="slate" className="!px-2 !py-1.5" />
      </div>

      {/* Right: Insert & Tools */}
      <div className="flex items-center gap-2">
         <PremiumButton onClick={onInsertClick} icon={Plus} color="orange">
            {t('insert')}
         </PremiumButton>
      </div>
    </div>
  );
};

// --- Helper Component: Lightbox ---
const Lightbox = ({ isOpen, onClose, src }) => {
  if (!isOpen || !src) return null;
  return (
    <div 
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        onClick={onClose}
    >
        <button 
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors z-50"
            onClick={onClose}
        >
            <X size={32} />
        </button>
        <div 
            className="relative max-w-7xl w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
        >
            <img 
                src={src} 
                alt="Preview" 
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300 select-none" 
            />
        </div>
    </div>
  );
};

const App = () => {
  // Global State with Persistence
  // bump version keys to强制刷新新增词库与默认值
  const [banks, setBanks] = useStickyState(INITIAL_BANKS, "app_banks_v9");
  const [defaults, setDefaults] = useStickyState(INITIAL_DEFAULTS, "app_defaults_v9");
  const [language, setLanguage] = useStickyState("cn", "app_language_v1"); 
  const [categories, setCategories] = useStickyState(INITIAL_CATEGORIES, "app_categories_v1"); // New state
  
  const [templates, setTemplates] = useStickyState(INITIAL_TEMPLATES_CONFIG, "app_templates_v10");
  const [activeTemplateId, setActiveTemplateId] = useStickyState("tpl_default", "app_active_template_id_v4");
  
  // UI State
  const [bankSidebarWidth, setBankSidebarWidth] = useStickyState(420, "app_bank_sidebar_width_v1"); // Default width increased to 420px for 2-column layout
  const [isResizing, setIsResizing] = useState(false);
  const [mobileTab, setMobileTab] = useState("templates"); // 'templates', 'banks', 'editor'
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [isEditing, setIsEditing] = useState(false);
  const [activePopover, setActivePopover] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false); // New UI state
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false); // New UI state for Insert Picker
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false); // New UI state for Lightbox

  // Add Bank State
  const [isAddingBank, setIsAddingBank] = useState(false);
  const [newBankLabel, setNewBankLabel] = useState("");
  const [newBankKey, setNewBankKey] = useState("");
  const [newBankCategory, setNewBankCategory] = useState("other");

  // Template Management UI State
  const [editingTemplateNameId, setEditingTemplateNameId] = useState(null);
  const [tempTemplateName, setTempTemplateName] = useState("");
  const [zoomedImage, setZoomedImage] = useState(null);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [showImageUrlInput, setShowImageUrlInput] = useState(false);
  const [showImageActionMenu, setShowImageActionMenu] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false); // 追踪图片加载失败状态
  const [showToast, setShowToast] = useState(false); // Toast 提示
  const [toastMessage, setToastMessage] = useState(''); // Toast 消息
  const [isImporting, setIsImporting] = useState(false); // 导入加载状态
  const [importConfirmData, setImportConfirmData] = useState(null); // 导入确认数据
  
  // File System Access API State
  const [storageMode, setStorageMode] = useState(() => {
    return localStorage.getItem('app_storage_mode') || 'browser';
  });
  const [directoryHandle, setDirectoryHandle] = useState(null);
  const [isFileSystemSupported, setIsFileSystemSupported] = useState(false);
  
  // Template Tag Management State
  const [selectedTags, setSelectedTags] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTemplateTags, setEditingTemplateTags] = useState(null); // {id, tags}
  const [isTemplateExpanded, setIsTemplateExpanded] = useState(true); // New state for Home Page View
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // History State for Undo/Redo
  const [historyPast, setHistoryPast] = useState([]);
  const [historyFuture, setHistoryFuture] = useState([]);
  const historyLastSaveTime = useRef(0);

  const popoverRef = useRef(null);
  const textareaRef = useRef(null);
  const sidebarRef = useRef(null);

  // Helper: Translate
  const t = (key, params = {}) => {
    let str = TRANSLATIONS[language][key] || key;
    Object.keys(params).forEach(k => {
        str = str.replace(`{{${k}}}`, params[k]);
    });
    return str;
  };

  const displayTag = (tag) => {
    return TAG_LABELS[language]?.[tag] || tag;
  };

  // Check File System Access API support and restore directory handle
  useEffect(() => {
      const checkSupport = async () => {
          const supported = 'showDirectoryPicker' in window;
          setIsFileSystemSupported(supported);
          
          // Try to restore directory handle from IndexedDB
          if (supported && storageMode === 'folder') {
              try {
                  const db = await openDB();
                  const handle = await getDirectoryHandle(db);
                  if (handle) {
                      // Verify permission
                      const permission = await handle.queryPermission({ mode: 'readwrite' });
                      if (permission === 'granted') {
                          setDirectoryHandle(handle);
                          // Load data from file system
                          await loadFromFileSystem(handle);
                      } else {
                          // Permission not granted, switch back to browser storage
                          setStorageMode('browser');
                          localStorage.setItem('app_storage_mode', 'browser');
                      }
                  }
              } catch (error) {
                  console.error('恢复文件夹句柄失败:', error);
              }
          }
      };
      
      checkSupport();
  }, []);

  // IndexedDB helper functions for storing directory handle
  const openDB = () => {
      return new Promise((resolve, reject) => {
          const request = indexedDB.open('PromptFillDB', 1);
          request.onerror = () => reject(request.error);
          request.onsuccess = () => resolve(request.result);
          request.onupgradeneeded = (event) => {
              const db = event.target.result;
              if (!db.objectStoreNames.contains('handles')) {
                  db.createObjectStore('handles');
              }
          };
      });
  };

  const saveDirectoryHandle = async (handle) => {
      try {
          const db = await openDB();
          const transaction = db.transaction(['handles'], 'readwrite');
          const store = transaction.objectStore('handles');
          await store.put(handle, 'directory');
      } catch (error) {
          console.error('保存文件夹句柄失败:', error);
      }
  };

  const getDirectoryHandle = async (db) => {
      try {
          const transaction = db.transaction(['handles'], 'readonly');
          const store = transaction.objectStore('handles');
          return new Promise((resolve, reject) => {
              const request = store.get('directory');
              request.onsuccess = () => resolve(request.result);
              request.onerror = () => reject(request.error);
          });
      } catch (error) {
          console.error('获取文件夹句柄失败:', error);
          return null;
      }
  };

  // Fix initial categories if empty (migration safety)
  useEffect(() => {
      if (!categories || Object.keys(categories).length === 0) {
          setCategories(INITIAL_CATEGORIES);
      }
  }, []);

  // Track mobile viewport size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ensure all templates have tags field and sync default templates' tags (migration safety)
  useEffect(() => {
    let needsUpdate = false;
    const updatedTemplates = templates.map(t => {
      // Find if this is a default template
      const defaultTemplate = INITIAL_TEMPLATES_CONFIG.find(dt => dt.id === t.id);
      
      if (defaultTemplate) {
        // Sync tags from default template if it's a built-in one
        if (JSON.stringify(t.tags) !== JSON.stringify(defaultTemplate.tags)) {
          needsUpdate = true;
          return { ...t, tags: defaultTemplate.tags || [] };
        }
      } else if (!t.tags) {
        // User-created template without tags
        needsUpdate = true;
        return { ...t, tags: [] };
      }
      
      return t;
    });
    
    if (needsUpdate) {
      setTemplates(updatedTemplates);
    }
  }, []);

  // Derived State: Current Active Template
  const activeTemplate = templates.find(t => t.id === activeTemplateId) || templates[0];

  // --- Effects ---
  
  // 确保 activeTemplateId 始终指向一个有效的模版（自动选中第一个）
  useEffect(() => {
    if (!templates.find(t => t.id === activeTemplateId) && templates.length > 0) {
      setActiveTemplateId(templates[0].id);
    }
  }, [templates, activeTemplateId, setActiveTemplateId]);
  
  // 当模版或图片URL改变时，重置图片加载错误状态
  useEffect(() => {
    setImageLoadError(false);
  }, [activeTemplateId, activeTemplate?.imageUrl]);
  
  // Reset history when template changes
  useEffect(() => {
      setHistoryPast([]);
      setHistoryFuture([]);
      historyLastSaveTime.current = 0;
  }, [activeTemplateId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setActivePopover(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Resizing Logic
  useEffect(() => {
      const handleMouseMove = (e) => {
          if (!isResizing) return;
          // New Layout: Bank Sidebar is on the Right.
          // Width = Window Width - Mouse X
          const newWidth = window.innerWidth - e.clientX;
          
          if (newWidth > 280 && newWidth < 800) { // Min/Max constraints
              setBankSidebarWidth(newWidth);
          }
      };

      const handleMouseUp = () => {
          setIsResizing(false);
          document.body.style.cursor = 'default';
          document.body.style.userSelect = 'auto';
      };

      if (isResizing) {
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
          document.body.style.cursor = 'col-resize';
          document.body.style.userSelect = 'none'; // Prevent text selection while resizing
      }

      return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
      };
  }, [isResizing, setBankSidebarWidth]);

  const startResizing = () => {
      setIsResizing(true);
  };

  // --- Template Actions ---

  const handleAddTemplate = () => {
    const newId = `tpl_${Date.now()}`;
    const newTemplate = {
      id: newId,
      name: t('new_template_name'),
      content: t('new_template_content'),
      selections: {},
      tags: []
    };
    setTemplates([...templates, newTemplate]);
    setActiveTemplateId(newId);
    setIsEditing(true);
  };

  const handleDuplicateTemplate = (t_item, e) => {
      e.stopPropagation();
      const newId = `tpl_${Date.now()}`;
      const newTemplate = {
          ...t_item,
          id: newId,
          name: `${t_item.name}${t('copy_suffix')}`,
          selections: { ...t_item.selections }
      };
      setTemplates([...templates, newTemplate]);
      setActiveTemplateId(newId);
  };

  const handleDeleteTemplate = (id, e) => {
    e.stopPropagation();
    if (templates.length <= 1) {
      alert(t('alert_keep_one'));
      return;
    }
    if (window.confirm(t('confirm_delete_template'))) {
      const newTemplates = templates.filter(t => t.id !== id);
      setTemplates(newTemplates);
      if (activeTemplateId === id) {
        setActiveTemplateId(newTemplates[0].id);
      }
    }
  };

  const handleResetTemplate = (id, e) => {
    e.stopPropagation();
    if (!window.confirm(t('confirm_reset_template'))) return;

    const original = INITIAL_TEMPLATES_CONFIG.find(t => t.id === id);
    if (!original) return;

    setTemplates(prev => prev.map(t => 
      t.id === id ? JSON.parse(JSON.stringify(original)) : t
    ));
  };

  const startRenamingTemplate = (t, e) => {
    e.stopPropagation();
    setEditingTemplateNameId(t.id);
    setTempTemplateName(t.name);
  };

  const saveTemplateName = () => {
    if (tempTemplateName.trim()) {
      setTemplates(prev => prev.map(t => 
        t.id === editingTemplateNameId ? { ...t, name: tempTemplateName } : t
      ));
    }
    setEditingTemplateNameId(null);
  };

  // 刷新系统模板与词库，保留用户数据
  const handleRefreshSystemData = () => {
    const backupSuffix = t('refreshed_backup_suffix') || '';
    const templateResult = mergeTemplatesWithSystem(templates, { backupSuffix });
    const bankResult = mergeBanksWithSystem(banks, defaults, { backupSuffix });

    setTemplates(templateResult.templates);
    setBanks(bankResult.banks);
    setDefaults(bankResult.defaults);
    setActiveTemplateId(prev => templateResult.templates.some(t => t.id === prev) ? prev : "tpl_default");

    const notes = [...templateResult.notes, ...bankResult.notes];
    if (notes.length > 0) {
      alert(`${t('refresh_done_with_conflicts')}\n- ${notes.join('\n- ')}`);
    } else {
      alert(t('refresh_done_no_conflict'));
    }
  };

  // Template Tags Management
  const handleUpdateTemplateTags = (templateId, newTags) => {
    setTemplates(prev => prev.map(t => 
      t.id === templateId ? { ...t, tags: newTags } : t
    ));
  };

  const toggleTag = (tag) => {
    setSelectedTags(prevTag => prevTag === tag ? "" : tag);
  };

  // Filter templates based on search and tags
  const filteredTemplates = templates.filter(t => {
    // Search filter
    const matchesSearch = !searchQuery || 
      t.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tag filter
    const matchesTags = selectedTags === "" || 
      (t.tags && t.tags.includes(selectedTags));
    
    return matchesSearch && matchesTags;
  });

  const fileInputRef = useRef(null);
  
  const handleUploadImage = (e) => {
      try {
          const file = e.target.files?.[0];
          if (!file) return;
          
          // 验证文件类型
          if (!file.type.startsWith('image/')) {
              if (storageMode === 'browser') {
                  alert('请选择图片文件');
              }
              return;
          }
          
          // 移除文件大小限制，让用户自由上传
          // 如果超出localStorage限制，会在useStickyState中捕获并提示
          
          const reader = new FileReader();
          
          reader.onloadend = () => {
              try {
                  setTemplates(prev => prev.map(t => 
                      t.id === activeTemplateId ? { ...t, imageUrl: reader.result } : t
                  ));
                  // 重置图片加载错误状态
                  setImageLoadError(false);
              } catch (error) {
                  console.error('图片上传失败:', error);
                  if (storageMode === 'browser' && error.name === 'QuotaExceededError') {
                      alert('存储空间不足！图片过大。\n建议：\n1. 使用图片链接（URL）方式\n2. 压缩图片（tinypng.com）\n3. 导出备份后清空数据');
                  } else {
                      if (storageMode === 'browser') {
                          alert('图片上传失败，请重试');
                      }
                  }
              }
          };
          
          reader.onerror = () => {
              console.error('文件读取失败');
              if (storageMode === 'browser') {
                  alert('文件读取失败，请重试');
              }
          };
          
          reader.readAsDataURL(file);
      } catch (error) {
          console.error('上传图片出错:', error);
          if (storageMode === 'browser') {
              alert('上传图片出错，请重试');
          }
      } finally {
          // 重置input，允许重复选择同一文件
          if (e.target) {
              e.target.value = '';
          }
      }
  };

  const handleResetImage = () => {
      const defaultUrl = INITIAL_TEMPLATES_CONFIG.find(t => t.id === activeTemplateId)?.imageUrl;
      if (defaultUrl) {
          setTemplates(prev => prev.map(t => 
              t.id === activeTemplateId ? { ...t, imageUrl: defaultUrl } : t
          ));
          // 重置图片加载错误状态
          setImageLoadError(false);
      }
  };

  const handleSetImageUrl = () => {
      if (!imageUrlInput.trim()) return;
      
      setTemplates(prev => prev.map(t => 
          t.id === activeTemplateId ? { ...t, imageUrl: imageUrlInput } : t
      ));
      setImageUrlInput("");
      setShowImageUrlInput(false);
      // 重置图片加载错误状态
      setImageLoadError(false);
  };

  // --- 导出/导入功能 ---
  const handleExportTemplate = (template) => {
      try {
          const dataStr = JSON.stringify(template, null, 2);
          const dataBlob = new Blob([dataStr], { type: 'application/json' });
          const url = URL.createObjectURL(dataBlob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${template.name.replace(/\s+/g, '_')}_template.json`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
      } catch (error) {
          console.error('导出失败:', error);
          alert('导出失败，请重试');
      }
  };

  const handleExportAllTemplates = () => {
      try {
          const exportData = {
              templates,
              banks,
              categories,
              version: 'v9',
              exportDate: new Date().toISOString()
          };
          const dataStr = JSON.stringify(exportData, null, 2);
          const dataBlob = new Blob([dataStr], { type: 'application/json' });
          const url = URL.createObjectURL(dataBlob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `prompt_fill_backup_${Date.now()}.json`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
      } catch (error) {
          console.error('导出失败:', error);
          alert('导出失败，请重试');
      }
  };

  const handleImportTemplate = (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setIsImporting(true);
      showToastMessage('📂 正在读取文件...');

      const reader = new FileReader();
      reader.onload = (e) => {
          try {
              const data = JSON.parse(e.target.result);
              
              // 检查是单个模板还是完整备份
              if (data.templates && Array.isArray(data.templates)) {
                  // 完整备份 - 显示确认对话框
                  setImportConfirmData({
                      type: 'full',
                      data: data,
                      templatesCount: data.templates.length,
                      banksCount: data.banks?.length || 0,
                      categoriesCount: data.categories?.length || 0
                  });
                  setIsImporting(false);
              } else if (data.id && data.name) {
                  // 单个模板 - 直接导入
                  const newId = `tpl_${Date.now()}`;
                  const newTemplate = { ...data, id: newId };
                  setTemplates(prev => [...prev, newTemplate]);
                  setActiveTemplateId(newId);
                  setIsImporting(false);
                  showToastMessage('✅ 模板导入成功！');
              } else {
                  setIsImporting(false);
                  showToastMessage('❌ 文件格式不正确');
              }
          } catch (error) {
              console.error('导入失败:', error);
              setIsImporting(false);
              showToastMessage('❌ 导入失败，请检查文件格式');
          }
      };
      
      reader.onerror = () => {
          setIsImporting(false);
          showToastMessage('❌ 文件读取失败');
      };
      
      reader.readAsText(file);
      
      // 重置input
      event.target.value = '';
  };
  
  // 确认导入完整备份
  const confirmImportFullBackup = () => {
      if (!importConfirmData) return;
      
      try {
          setTemplates(importConfirmData.data.templates);
          if (importConfirmData.data.banks) setBanks(importConfirmData.data.banks);
          if (importConfirmData.data.categories) setCategories(importConfirmData.data.categories);
          setImportConfirmData(null);
          showToastMessage('✅ 完整备份导入成功！');
      } catch (error) {
          console.error('导入失败:', error);
          showToastMessage('❌ 导入失败');
      }
  };

  // --- File System Access API Functions ---
  const handleSelectDirectory = async () => {
      try {
          if (!isFileSystemSupported) {
              alert(t('browser_not_supported'));
              return;
          }

          const handle = await window.showDirectoryPicker({
              mode: 'readwrite',
              startIn: 'documents'
          });
          
          setDirectoryHandle(handle);
          setStorageMode('folder');
          localStorage.setItem('app_storage_mode', 'folder');
          
          // Save handle to IndexedDB for future use
          await saveDirectoryHandle(handle);
          
          // 尝试保存当前数据到文件夹
          await saveToFileSystem(handle);
          alert(t('auto_save_enabled'));
      } catch (error) {
          console.error('选择文件夹失败:', error);
          if (error.name !== 'AbortError') {
              alert(t('folder_access_denied'));
          }
      }
  };

  const saveToFileSystem = async (handle) => {
      if (!handle) return;
      
      try {
          const data = {
              templates,
              banks,
              categories,
              defaults,
              version: 'v9',
              lastSaved: new Date().toISOString()
          };
          
          const fileHandle = await handle.getFileHandle('prompt_fill_data.json', { create: true });
          const writable = await fileHandle.createWritable();
          await writable.write(JSON.stringify(data, null, 2));
          await writable.close();
          
          console.log('数据已保存到本地文件夹');
      } catch (error) {
          console.error('保存到文件系统失败:', error);
      }
  };

  const loadFromFileSystem = async (handle) => {
      if (!handle) return;
      
      try {
          const fileHandle = await handle.getFileHandle('prompt_fill_data.json');
          const file = await fileHandle.getFile();
          const text = await file.text();
          const data = JSON.parse(text);
          
          if (data.templates) setTemplates(data.templates);
          if (data.banks) setBanks(data.banks);
          if (data.categories) setCategories(data.categories);
          if (data.defaults) setDefaults(data.defaults);
          
          console.log('从本地文件夹加载数据成功');
      } catch (error) {
          console.error('从文件系统读取失败:', error);
      }
  };

  // Auto-save to file system when data changes
  useEffect(() => {
      if (storageMode === 'folder' && directoryHandle) {
          const timeoutId = setTimeout(() => {
              saveToFileSystem(directoryHandle);
          }, 1000); // Debounce 1 second
          
          return () => clearTimeout(timeoutId);
      }
  }, [templates, banks, categories, defaults, storageMode, directoryHandle]);

  // 存储空间管理
  const getStorageSize = () => {
      try {
          let total = 0;
          for (let key in localStorage) {
              if (localStorage.hasOwnProperty(key)) {
                  total += localStorage[key].length + key.length;
              }
          }
          return (total / 1024).toFixed(2); // KB
      } catch (error) {
          return '0';
      }
  };

  const handleClearAllData = () => {
      if (window.confirm(t('confirm_clear_all'))) {
          try {
              // 只清除应用相关的数据
              const keysToRemove = Object.keys(localStorage).filter(key => 
                  key.startsWith('app_')
              );
              keysToRemove.forEach(key => localStorage.removeItem(key));
              
              // 刷新页面
              window.location.reload();
          } catch (error) {
              console.error('清除数据失败:', error);
              alert('清除数据失败');
          }
      }
  };
  
  const handleSwitchToLocalStorage = async () => {
      setStorageMode('browser');
      setDirectoryHandle(null);
      localStorage.setItem('app_storage_mode', 'browser');
      
      // Clear directory handle from IndexedDB
      try {
          const db = await openDB();
          const transaction = db.transaction(['handles'], 'readwrite');
          const store = transaction.objectStore('handles');
          await store.delete('directory');
      } catch (error) {
          console.error('清除文件夹句柄失败:', error);
      }
  };
  
  const handleManualLoadFromFolder = async () => {
      if (directoryHandle) {
          try {
              await loadFromFileSystem(directoryHandle);
              alert('从文件夹加载成功！');
          } catch (error) {
              alert('从文件夹加载失败，请检查文件是否存在');
          }
      }
  };

  const updateActiveTemplateContent = (newContent, forceSaveHistory = false) => {
    // History Management
    const now = Date.now();
    const shouldSave = forceSaveHistory || (now - historyLastSaveTime.current > 1000);

    if (shouldSave) {
        setHistoryPast(prev => [...prev, activeTemplate.content]);
        setHistoryFuture([]); // Clear redo stack on new change
        historyLastSaveTime.current = now;
    }

    setTemplates(prev => prev.map(t => 
      t.id === activeTemplateId ? { ...t, content: newContent } : t
    ));
  };

  const handleUndo = () => {
      if (historyPast.length === 0) return;
      
      const previous = historyPast[historyPast.length - 1];
      const newPast = historyPast.slice(0, -1);
      
      setHistoryFuture(prev => [activeTemplate.content, ...prev]);
      setHistoryPast(newPast);
      
      // Direct update without saving history again
      setTemplates(prev => prev.map(t => 
        t.id === activeTemplateId ? { ...t, content: previous } : t
      ));
  };

  const handleRedo = () => {
      if (historyFuture.length === 0) return;

      const next = historyFuture[0];
      const newFuture = historyFuture.slice(1);

      setHistoryPast(prev => [...prev, activeTemplate.content]);
      setHistoryFuture(newFuture);

      // Direct update without saving history again
      setTemplates(prev => prev.map(t => 
        t.id === activeTemplateId ? { ...t, content: next } : t
      ));
  };

  const updateActiveTemplateSelection = (uniqueKey, value) => {
    setTemplates(prev => prev.map(t => {
      if (t.id === activeTemplateId) {
        return {
          ...t,
          selections: { ...t.selections, [uniqueKey]: value }
        };
      }
      return t;
    }));
  };

  // --- Bank Actions ---

  const handleSelect = (key, index, value) => {
    const uniqueKey = `${key}-${index}`;
    updateActiveTemplateSelection(uniqueKey, value);
    setActivePopover(null);
  };

  const handleAddCustomAndSelect = (key, index, newValue) => {
    if (!newValue || !newValue.trim()) return;
    
    // 1. Add to bank if not exists
    if (!banks[key].options.includes(newValue)) {
        handleAddOption(key, newValue);
    }
    
    // 2. Select it
    handleSelect(key, index, newValue);
  };

  const handleAddOption = (key, newOption) => {
    if (!newOption.trim()) return;
    setBanks(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        options: [...prev[key].options, newOption]
      }
    }));
  };

  const handleDeleteOption = (key, optionToDelete) => {
    setBanks(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        options: prev[key].options.filter(opt => opt !== optionToDelete)
      }
    }));
  };

  const handleAddBank = () => {
    if (!newBankLabel.trim() || !newBankKey.trim()) return;
    const safeKey = newBankKey.trim().replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase();
    
    if (banks[safeKey]) {
      alert(t('alert_id_exists'));
      return;
    }

    setBanks(prev => ({
      ...prev,
      [safeKey]: {
        label: newBankLabel,
        category: newBankCategory,
        options: []
      }
    }));
    setDefaults(prev => ({ ...prev, [safeKey]: "" }));
    setNewBankLabel("");
    setNewBankKey("");
    setNewBankCategory("other");
    setIsAddingBank(false);
  };

  const handleDeleteBank = (key) => {
    if (window.confirm(t('confirm_delete_bank', { name: banks[key].label }))) {
      const newBanks = { ...banks };
      delete newBanks[key];
      setBanks(newBanks);
    }
  };

  const handleUpdateBankCategory = (key, newCategory) => {
      setBanks(prev => ({
          ...prev,
          [key]: {
              ...prev[key],
              category: newCategory
          }
      }));
  };

  // --- Editor Actions ---

  const insertVariableToTemplate = (key) => {
    const textToInsert = ` {{${key}}} `;
    
    if (!isEditing) {
      setIsEditing(true);
      setTimeout(() => {
        updateActiveTemplateContent(activeTemplate.content + textToInsert, true);
        // Simple scroll to bottom hack
        if(textareaRef.current) textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
      }, 50);
      return;
    };

    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = activeTemplate.content;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    
    updateActiveTemplateContent(`${before}${textToInsert}${after}`, true);
    
    setTimeout(() => {
      textarea.focus();
      const newPos = start + textToInsert.length;
      textarea.setSelectionRange(newPos, newPos);
    }, 0);
  };

  // Toast 提示辅助函数
  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleCopy = () => {
    let finalString = activeTemplate.content;
    const counters = {};

    finalString = finalString.replace(/{{(.*?)}}/g, (match, key) => {
        const k = key.trim();
        const idx = counters[k] || 0;
        counters[k] = idx + 1;

        const uniqueKey = `${k}-${idx}`;
        // Prioritize selection, then default
        return activeTemplate.selections[uniqueKey] || defaults[k] || match;
    });

    const cleanText = finalString
        .replace(/###\s/g, '')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\n\s*\n/g, '\n\n');

    navigator.clipboard.writeText(cleanText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  const handleExportImage = async () => {
    const element = document.getElementById('preview-card');
    if (!element) return;

    setIsExporting(true);
    
    // --- 关键修复：预处理图片为 Base64 ---
    // 这能彻底解决 html2canvas 的跨域 (CORS) 和图片加载不全问题
    // 我们手动 fetch 图片 blob 并转为 base64，绕过 canvas 的跨域限制
    const templateDefault = INITIAL_TEMPLATES_CONFIG.find(t => t.id === activeTemplateId);
    const originalImageSrc = activeTemplate.imageUrl || templateDefault?.imageUrl || "";
    let tempBase64Src = null;
    const imgElement = element.querySelector('img');

    if (imgElement && originalImageSrc) {
        // 如果当前 img 没有正确的 src，先补上默认 src
        if (!imgElement.src || imgElement.src.trim() === "" || imgElement.src.includes("data:image") === false) {
          imgElement.src = originalImageSrc;
        }
    }

    if (imgElement && originalImageSrc && originalImageSrc.startsWith('http')) {
        try {
            // 尝试通过 fetch 获取图片数据
            const response = await fetch(originalImageSrc);
            const blob = await response.blob();
            tempBase64Src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
            
            // 临时替换为 Base64
            imgElement.src = tempBase64Src;
            await waitForImageLoad(imgElement);
        } catch (e) {
            console.warn("图片 Base64 转换失败，尝试直接导出", e);
            // 如果 fetch 失败（比如彻底的 CORS 封锁），我们只能尝试允许 canvas 污染
            // 但通常 fetch 失败意味着 canvas 也会失败
        }
    } else if (imgElement) {
        // 即便没转 base64，也要确保当前展示图已加载完成
        await waitForImageLoad(imgElement);
    }

    // 预加载二维码（转换为 base64）
    const websiteUrl = 'https://promptfill.tanshilong.com/';
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(websiteUrl)}&margin=0`;
    let qrCodeBase64 = null;
    
    try {
        console.log('正在加载二维码...', qrCodeUrl);
        const qrResponse = await fetch(qrCodeUrl);
        if (!qrResponse.ok) throw new Error('二维码加载失败');
        const qrBlob = await qrResponse.blob();
        qrCodeBase64 = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log('二维码加载成功');
                resolve(reader.result);
            };
            reader.readAsDataURL(qrBlob);
        });
    } catch (e) {
        console.error("二维码加载失败", e);
        // 即使失败也继续，会显示占位符
    }

    try {
        // 创建一个临时的导出容器
        const exportContainer = document.createElement('div');
        exportContainer.id = 'export-container-temp';
        exportContainer.style.position = 'fixed';
        exportContainer.style.left = '-99999px';
        exportContainer.style.top = '0';
        exportContainer.style.width = '1200px';
        exportContainer.style.minHeight = '1200px';
        exportContainer.style.padding = '80px';
        exportContainer.style.background = '#fafafa';
        exportContainer.style.display = 'flex';
        exportContainer.style.alignItems = 'center';
        exportContainer.style.justifyContent = 'center';
        document.body.appendChild(exportContainer);
        
        // 创建模糊背景层
        if (activeTemplate.imageUrl || tempBase64Src) {
            const bgLayer = document.createElement('div');
            bgLayer.style.position = 'absolute';
            bgLayer.style.inset = '0';
            bgLayer.style.backgroundImage = `url(${tempBase64Src || activeTemplate.imageUrl})`;
            bgLayer.style.backgroundSize = 'cover';
            bgLayer.style.backgroundPosition = 'center';
            bgLayer.style.backgroundRepeat = 'no-repeat';
            bgLayer.style.opacity = '0.4';
            bgLayer.style.filter = 'blur(100px)';
            bgLayer.style.transform = 'scale(1.3)';
            bgLayer.style.zIndex = '0';
            exportContainer.appendChild(bgLayer);
            
            // 轻微叠加层，只是稍微提亮，不遮盖颜色
            const overlay = document.createElement('div');
            overlay.style.position = 'absolute';
            overlay.style.inset = '0';
            overlay.style.background = 'rgba(255, 255, 255, 0.15)';
            overlay.style.zIndex = '1';
            exportContainer.appendChild(overlay);
        }
        
        // 克隆 preview-card
        const clonedCard = element.cloneNode(true);
        clonedCard.style.position = 'relative';
        clonedCard.style.zIndex = '10';
        clonedCard.style.background = 'rgba(255, 255, 255, 0.95)';
        clonedCard.style.borderRadius = '24px';
        clonedCard.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.15)';
        clonedCard.style.border = '1px solid rgba(255, 255, 255, 0.6)';
        clonedCard.style.padding = '50px 60px'; // 稍微减小内边距
        clonedCard.style.margin = '0 auto';
        clonedCard.style.maxWidth = 'calc(100% - 160px)';
        clonedCard.style.fontFamily = '"PingFang SC", "Microsoft YaHei", sans-serif';
        clonedCard.style.webkitFontSmoothing = 'antialiased';
        exportContainer.appendChild(clonedCard);
        
        const canvas = await html2canvas(exportContainer, {
            scale: 2.5, // 稍微降低分辨率，减小文件大小和图像尺寸
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
            onclone: (clonedDoc) => {
                const clonedElement = clonedDoc.getElementById('export-container-temp');
                if (clonedElement) {
                   const card = clonedElement.querySelector('#preview-card');
                   if (!card) return;

                   // 获取原始数据
                   const originalImg = card.querySelector('img');
                   const imgSrc = tempBase64Src || (originalImg ? originalImg.src : '');
                   const titleElement = card.querySelector('h2');
                   const titleText = titleElement ? titleElement.textContent.trim() : activeTemplate.name;
                   const contentElement = card.querySelector('#final-prompt-content');
                   const contentHTML = contentElement ? contentElement.innerHTML : '';
                   
                   console.log('正文内容获取:', contentHTML ? '成功' : '失败', contentHTML.length);
                   
                   // 获取版本号（动态从原始DOM）
                   const metaContainer = card.querySelector('.flex.flex-wrap.gap-2');
                   const versionElement = metaContainer ? metaContainer.querySelector('.bg-orange-50') : null;
                   const versionText = versionElement ? versionElement.textContent.trim() : '';
                   
                   // 清空卡片内容
                   card.innerHTML = '';
                   
                   // --- 1. 图片区域（顶部，最大300px）---
                   if (imgSrc) {
                       const imgContainer = clonedDoc.createElement('div');
                       imgContainer.style.width = '100%';
                       imgContainer.style.marginBottom = '30px';
                       imgContainer.style.display = 'flex';
                       imgContainer.style.justifyContent = 'center';
                       
                       const img = clonedDoc.createElement('img');
                       img.src = imgSrc;
                       img.style.maxWidth = '100%';
                       img.style.maxHeight = '300px';
                       img.style.width = 'auto';
                       img.style.height = 'auto';
                       img.style.objectFit = 'contain';
                       img.style.borderRadius = '16px';
                       img.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.2)';
                       img.style.border = '2px solid rgba(255, 255, 255, 0.8)';
                       
                       imgContainer.appendChild(img);
                       card.appendChild(imgContainer);
                   }
                   
                   // --- 2. 标题区域（无版本号、无标签）---
                   const titleContainer = clonedDoc.createElement('div');
                   titleContainer.style.marginBottom = '25px';
                   
                   const title = clonedDoc.createElement('h2');
                   title.textContent = titleText;
                   title.style.fontSize = '32px';
                   title.style.fontWeight = '700';
                   title.style.color = '#1f2937';
                   title.style.margin = '0';
                   title.style.lineHeight = '1.2';
                   
                   titleContainer.appendChild(title);
                   card.appendChild(titleContainer);
                   
                   // --- 3. 正文区域（不重复标题）---
                   if (contentHTML) {
                       const contentContainer = clonedDoc.createElement('div');
                       contentContainer.innerHTML = contentHTML;
                       contentContainer.style.fontSize = '18px';
                       contentContainer.style.lineHeight = '1.8';
                       contentContainer.style.color = '#374151';
                       contentContainer.style.marginBottom = '40px';
                       
                       // 修复胶囊样式
                       const variables = contentContainer.querySelectorAll('span[style*="background"]');
                       variables.forEach(v => {
                           // 保留原有的背景色和文字颜色，只优化布局
                           v.style.display = 'inline-flex';
                           v.style.alignItems = 'center';
                           v.style.justifyContent = 'center';
                           v.style.padding = '4px 12px';
                           v.style.margin = '2px 4px';
                           v.style.borderRadius = '6px';
                           v.style.fontSize = '17px'; 
                           v.style.fontWeight = '600';
                           v.style.lineHeight = '1.5';
                           v.style.verticalAlign = 'middle';
                           v.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                       });
                       
                       card.appendChild(contentContainer);
                   }
                   
                   // --- 4. 底部水印区域（增加版本号）---
                   const footer = clonedDoc.createElement('div');
                   footer.style.marginTop = '40px';
                   footer.style.paddingTop = '25px';
                   footer.style.paddingBottom = '15px';
                   footer.style.borderTop = '2px solid #e2e8f0';
                   footer.style.display = 'flex';
                   footer.style.justifyContent = 'space-between';
                   footer.style.alignItems = 'center';
                   footer.style.fontFamily = 'sans-serif';
                   
                   const qrCodeHtml = qrCodeBase64 
                       ? `<img src="${qrCodeBase64}" 
                               style="width: 80px; height: 80px; border: 3px solid #e2e8f0; border-radius: 8px; display: block; background: white;" 
                               alt="QR Code" />`
                       : `<div style="width: 80px; height: 80px; border: 3px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f8fafc; font-size: 10px; color: #94a3b8; font-weight: 500;">QR Code</div>`;
                   
                   footer.innerHTML = `
                       <div style="flex: 1; padding-right: 20px;">
                           <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap;">
                               <div style="font-size: 15px; font-weight: 600; color: #1f2937;">
                                   Generated by <span style="color: #6366f1; font-weight: 700;">Prompt Fill</span>
                               </div>
                               ${versionText ? `<span style="font-size: 11px; padding: 3px 10px; background: #fff7ed; color: #f97316; border-radius: 5px; font-weight: 600; border: 1px solid #fed7aa;">${versionText}</span>` : ''}
                           </div>
                           <div style="font-size: 12px; color: #6b7280; margin-bottom: 6px; font-weight: 500;">提示词填空器</div>
                           <div style="font-size: 11px; color: #3b82f6; font-weight: 500; background: #eff6ff; padding: 4px 8px; border-radius: 4px; display: inline-block; letter-spacing: 0.3px;">
                               ${websiteUrl}
                           </div>
                       </div>
                       <div style="display: flex; align-items: center;">
                           <div style="text-align: center;">
                               ${qrCodeHtml}
                               <div style="font-size: 9px; color: #94a3b8; margin-top: 4px; font-weight: 500;">扫码访问</div>
                           </div>
                       </div>
                   `;
                   
                   card.appendChild(footer);
                   console.log('新布局已应用');
                }
            }
        });

        // 使用 JPG 格式，质量 0.92（高质量同时节省空间）
        const image = canvas.toDataURL('image/jpeg', 0.92);
        const filename = `${activeTemplate.name.replace(/\s+/g, '_')}_prompt.jpg`;
        
        // 检测是否为移动设备
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
        
        if (isMobileDevice) {
            // 移动端：尝试使用 Web Share API 保存到相册
            try {
                // 将 base64 转换为 blob
                const base64Response = await fetch(image);
                const blob = await base64Response.blob();
                const file = new File([blob], filename, { type: 'image/jpeg' });
                
                // 检查是否支持 Web Share API
                if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        files: [file],
                        title: activeTemplate.name,
                        text: '导出的提示词模版'
                    });
                    showToastMessage('✅ 图片已分享/保存');
                } else {
                    // 降级方案：触发下载
                    const link = document.createElement('a');
                    link.href = image;
                    link.download = filename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    showToastMessage('✅ 图片已保存到下载文件夹');
                }
            } catch (shareError) {
                console.log('Share failed:', shareError);
                // 分享失败，使用传统下载
                const link = document.createElement('a');
                link.href = image;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                showToastMessage('✅ 图片已保存');
            }
        } else {
            // 桌面端：直接下载
            const link = document.createElement('a');
            link.href = image;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showToastMessage('✅ 图片导出成功！');
        }
    } catch (err) {
        console.error("Export failed:", err);
        showToastMessage('❌ 导出失败，请重试');
    } finally {
        // 清理临时容器
        const tempContainer = document.getElementById('export-container-temp');
        if (tempContainer) {
            document.body.removeChild(tempContainer);
        }
        
        // 恢复原始图片 src
        if (imgElement && originalImageSrc) {
            imgElement.src = originalImageSrc;
        }
        setIsExporting(false);
    }
  };

  // --- Renderers ---

  const renderTemplateContent = () => {
    const lines = activeTemplate.content.split('\n');
    const counters = {}; 
    
    return lines.map((line, lineIdx) => {
      if (!line.trim()) return <div key={lineIdx} className="h-6"></div>;

      let content = line;
      let Type = 'div';
      let className = "text-gray-700 mb-3 leading-10";

      if (line.startsWith('### ')) {
        Type = 'h3';
        className = "text-lg font-bold text-gray-900 mt-6 mb-3 border-b border-gray-100 pb-2";
        content = line.replace('### ', '');
      } else if (line.trim().startsWith('- ')) {
        className = "ml-4 flex items-start gap-2 text-gray-700 mb-2 leading-10";
        content = (
          <>
            <span className="text-gray-400 mt-2.5">•</span>
            <span className="flex-1">{parseLineWithVariables(line.replace('- ', '').trim(), lineIdx, counters)}</span>
          </>
        );
        return <div key={lineIdx} className={className}>{content}</div>;
      } else if (/^\d+\.\s/.test(line.trim())) {
         className = "ml-4 flex items-start gap-2 text-gray-700 mb-2 leading-10";
         const number = line.trim().match(/^\d+\./)[0];
         const text = line.trim().replace(/^\d+\.\s/, '');
         content = (
            <>
              <span className="font-mono text-gray-400 mt-1 min-w-[20px]">{number}</span>
              <span className="flex-1">{parseLineWithVariables(text, lineIdx, counters)}</span>
            </>
         );
         return <div key={lineIdx} className={className}>{content}</div>;
      }

      if (typeof content === 'string') {
          return <Type key={lineIdx} className={className}>{parseLineWithVariables(content, lineIdx, counters)}</Type>;
      }
      return <Type key={lineIdx} className={className}>{content}</Type>;
    });
  };

  const parseLineWithVariables = (text, lineKeyPrefix, counters) => {
    const parts = text.split(/({{[^}]+}})/g);
    return parts.map((part, idx) => {
      if (part.startsWith('{{') && part.endsWith('}}')) {
        const key = part.slice(2, -2).trim();
        const varIndex = counters[key] || 0;
        counters[key] = varIndex + 1;
        
        const uniqueKey = `${key}-${varIndex}`;
        const currentValue = activeTemplate.selections[uniqueKey] || defaults[key];

        return (
          <Variable 
            key={`${lineKeyPrefix}-${idx}`}
            id={key}
            index={varIndex}
            config={banks[key]}
            currentVal={currentValue}
            isOpen={activePopover === uniqueKey}
            onToggle={(e) => {
              e.stopPropagation();
              setActivePopover(activePopover === uniqueKey ? null : uniqueKey);
            }}
            onSelect={(opt) => handleSelect(key, varIndex, opt)}
            onAddCustom={(val) => handleAddCustomAndSelect(key, varIndex, val)}
            popoverRef={popoverRef}
            categories={categories}
            t={t}
          />
        );
      }
      
      const boldParts = part.split(/(\*\*.*?\*\*)/g);
      return boldParts.map((bp, bIdx) => {
        if (bp.startsWith('**') && bp.endsWith('**')) {
          return <strong key={`${lineKeyPrefix}-${idx}-${bIdx}`} className="text-gray-900">{bp.slice(2, -2)}</strong>;
        }
        return <span key={`${lineKeyPrefix}-${idx}-${bIdx}`}>{bp}</span>;
      });
    });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] font-sans text-slate-800 overflow-hidden md:p-4 md:gap-4">
      
      {/* --- 1. Templates Sidebar (Far Left) --- */}
      {/* Mobile: Show only if tab is 'templates'. Desktop: Always show. */}
      <div 
        className={`
        ${mobileTab === 'templates' ? 'flex fixed inset-0 z-50 md:static' : 'hidden'} 
        md:flex flex-col flex-shrink-0 h-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isTemplateExpanded ? 'w-full md:w-full z-50' : 'w-full md:w-[320px] bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg'}
        md:rounded-3xl overflow-hidden relative
      `}
        style={isTemplateExpanded ? {
          backgroundImage: 'url(/background1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        } : {}}
      >
        
        {/* Unified Header Section */}
        <div className={`
            flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${isTemplateExpanded ? 'p-8 pb-4' : 'p-5 border-b border-gray-200/50 bg-white/30 backdrop-blur-sm'}
        `}>
           <div className={`flex items-center transition-all duration-500 ${isTemplateExpanded ? 'justify-center relative mb-6' : 'justify-between mb-4'}`}>
               
               {/* Title Group */}
               <div className={`flex transition-all duration-500 ${isTemplateExpanded ? 'flex-col items-center' : 'flex-row items-baseline gap-2'}`}>
                   {/* Icon removed for Expanded state as per request */}
                   <div className={`flex flex-col ${isTemplateExpanded ? 'items-center' : 'items-start'}`}>
                        <h1 className={`font-bold tracking-tight transition-all duration-500 ${isTemplateExpanded ? 'text-3xl text-orange-500' : 'text-xs md:text-sm text-orange-500'}`}>
                            {isTemplateExpanded ? t('app_title') : '提示词填空器'}
                            {/* 移动端隐藏版本号以节省空间 */}
                            {!isTemplateExpanded && <span className="hidden md:inline text-gray-400 text-xs font-normal ml-1">V0.4.1</span>}
                        </h1>
                        {/* Author info removed from here for Expanded state, moved to bottom */}
                   </div>
               </div>

               {/* Right Actions (Toggle & Lang) - 移动端优化：更小的间距和图标 */}
               <div className={`flex items-center gap-1 md:gap-2 transition-all duration-500 ${isTemplateExpanded ? 'absolute right-0 top-0' : ''}`}>
                    {/* 刷新按钮 - 移动端隐藏以节省空间 */}
                    <button 
                      onClick={handleRefreshSystemData}
                      className="hidden md:block p-1.5 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                      title={t('refresh_desc')}
                    >
                      <RotateCcw size={16} />
                    </button>
                    
                    {/* 语言切换 - 移动端缩小 */}
                    <button 
                      onClick={() => setLanguage(language === 'cn' ? 'en' : 'cn')}
                      className="text-[9px] md:text-[10px] bg-white/80 text-gray-500 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full hover:text-orange-600 hover:bg-orange-50 border border-gray-200/50 transition-colors flex items-center gap-0.5 md:gap-1 shadow-sm"
                    >
                      <Globe size={9} className="md:hidden" />
                      <Globe size={10} className="hidden md:block" />
                      {language.toUpperCase()}
                    </button>
                    
                    {/* 设置按钮 - 移动端缩小 */}
                    <button
                        onClick={() => setIsSettingsOpen(true)}
                        className="p-1 md:p-1.5 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        title={t('settings')}
                    >
                        <Settings size={14} className="md:hidden" />
                        <Settings size={16} className="hidden md:block" />
                    </button>
                    
                    {/* 布局切换按钮 - 移动端缩小 */}
                    <button
                        onClick={() => setIsTemplateExpanded(!isTemplateExpanded)}
                        className="p-1 md:p-1.5 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        title={isTemplateExpanded ? t('collapse_view') : t('expand_view')}
                    >
                        {isTemplateExpanded ? (
                          <>
                            <Sidebar size={14} className="md:hidden" />
                            <Sidebar size={16} className="hidden md:block" />
                          </>
                        ) : (
                          <>
                            <LayoutGrid size={14} className="md:hidden" />
                            <LayoutGrid size={16} className="hidden md:block" />
                          </>
                        )}
                    </button>
               </div>
           </div>

           {/* Subtitle & Info (Collapsed Only) - Fade out when expanded */}
           <div className={`transition-all duration-500 overflow-hidden ${isTemplateExpanded ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'}`}>
              <div className="flex items-center gap-2 text-gray-800 mb-1">
                {/* Collapsed state title/subtitle logic removed, only showing unified header content */}
              </div>
           </div>
                  
           {/* Search & Tags Unified Container */}
           <div className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isTemplateExpanded ? 'max-w-2xl mx-auto mt-2' : 'mt-3'}`}>
                {/* Search Box */}
                <div className="relative group">
                    <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-500 ${isTemplateExpanded ? 'left-4 w-5 h-5' : 'left-3 w-0 h-0 opacity-0'}`} />
                    <input
                      type="text"
                      placeholder={t('search_templates')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`
                        w-full transition-all duration-500 ease-out
                        focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400
                        ${isTemplateExpanded 
                            ? 'pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full shadow-sm text-base' 
                            : 'px-3 py-2 text-sm bg-white/60 border border-gray-200/50 rounded-lg'
                        }
                      `}
                    />
                </div>
                
                {/* Tag Filters */}
                <div className={`mt-3 transition-all duration-500 ${isTemplateExpanded ? 'flex flex-col items-center gap-2' : ''}`}>
                    {!isTemplateExpanded && <p className="text-xs text-gray-500 mb-2">{t('filter_by_tags')}</p>}
                    
                    <div className={`flex flex-wrap gap-1.5 transition-all duration-500 ${isTemplateExpanded ? 'justify-center' : ''}`}>
                      <button
                        onClick={() => setSelectedTags("")}
                        className={`font-medium transition-all duration-300 ${
                          selectedTags === ""
                            ? 'bg-orange-500 text-white shadow-sm'
                            : 'bg-white/60 text-gray-500 hover:bg-white border border-gray-200/50'
                        } ${isTemplateExpanded ? 'px-4 py-1.5 rounded-full text-sm' : 'px-2.5 py-1 rounded-full text-xs'}`}
                      >
                        {t('all_templates')}
                      </button>
                      {TEMPLATE_TAGS.map(tag => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`font-medium transition-all duration-300 ${
                            selectedTags === tag
                              ? 'bg-orange-500 text-white shadow-sm'
                              : 'bg-white/60 text-gray-500 hover:bg-white border border-gray-200/50'
                          } ${isTemplateExpanded ? 'px-4 py-1.5 rounded-full text-sm' : 'px-2.5 py-1 rounded-full text-xs'}`}
                        >
                          {displayTag(tag)}
                        </button>
                      ))}
                    </div>
                </div>
           </div>
        </div>

        {/* Content Area */}
        <div className={`flex-1 overflow-y-auto custom-scrollbar transition-all duration-500 ${isTemplateExpanded ? 'p-8' : 'p-3 space-y-2'}`}>
          {isTemplateExpanded ? (
             /* --- Expanded Grid View --- */
             <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 pb-20">

                    {/* New Template Card (First Item) */}
                    <div 
                        onClick={() => {
                            handleAddTemplate();
                            setIsTemplateExpanded(false);
                        }}
                        className="break-inside-avoid rounded-[36px] hover:shadow-2xl transition-all duration-300 cursor-pointer group p-2.5 relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]"
                        style={{
                            background: 'rgba(200, 200, 200, 0.4)',
                            backdropFilter: 'blur(100px)',
                            WebkitBackdropFilter: 'blur(100px)',
                            border: '2px dashed transparent',
                            backgroundImage: 'linear-gradient(rgba(200, 200, 200, 0.4), rgba(200, 200, 200, 0.4)), linear-gradient(219deg, rgba(238, 162, 139, 0.5) -6%, rgba(255, 216, 204, 0.4) 8%, rgba(196, 196, 196, 0.05) 21%, rgba(196, 196, 196, 0.09) 77%, rgba(255, 255, 255, 0.35) 90%, rgba(251, 177, 69, 0.2) 100%, rgba(247, 189, 172, 0.5) 110%)',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'padding-box, border-box'
                        }}
                    >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-100/60 to-orange-200/60 backdrop-blur-sm text-orange-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md border border-white/40">
                            <Plus size={36} strokeWidth={2.5} />
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg group-hover:text-orange-600 transition-colors">{t('new_template')}</h3>
                    </div>

                    {/* Filtered Templates */}
                    {filteredTemplates.map(t_item => (
                        <div 
                            key={t_item.id}
                            onClick={() => {
                                setActiveTemplateId(t_item.id);
                                setIsTemplateExpanded(false);
                            }}
                            className="break-inside-avoid rounded-[36px] hover:shadow-2xl transition-all duration-300 cursor-pointer group p-2.5 relative overflow-hidden"
                            style={{
                                background: 'rgba(230, 230, 230, 0.4)',
                                backdropFilter: 'blur(40px)',
                                WebkitBackdropFilter: 'blur(40px)',
                                border: '2px solid transparent',
                                backgroundImage: 'linear-gradient(rgba(200, 200, 200, 0.4), rgba(200, 200, 200, 0.4)), linear-gradient(219deg, rgba(238, 162, 139, 0.6) -6%, rgba(255, 216, 204, 0.49) 8%, rgba(196, 196, 196, 0.05) 21%, rgba(196, 196, 196, 0.09) 77%, rgba(255, 255, 255, 0.38) 90%, rgba(251, 177, 69, 0.22) 100%, rgba(247, 189, 172, 0.6) 110%)',
                                backgroundOrigin: 'border-box',
                                backgroundClip: 'padding-box, border-box'
                            }}
                        >
                            {/* Image Area with Embedded Glass Effect */}
                            <div 
                                className="relative w-full overflow-hidden rounded-[28px] bg-gradient-to-br from-gray-100 to-gray-200"
                                style={{
                                    boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.15), 0 -2px 6px rgba(0, 0, 0, 0.08)'
                                }}
                            >
                                {t_item.imageUrl ? (
                                    <img 
                                        src={t_item.imageUrl} 
                                        alt={t_item.name} 
                                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 rounded-[28px]"
                                        style={{
                                            boxShadow: 'inset 0 4px 12px rgba(0, 0, 0, 0.12)'
                                        }}
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <div 
                                        className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-300 rounded-[28px]"
                                        style={{
                                            boxShadow: 'inset 0 4px 12px rgba(0, 0, 0, 0.12)'
                                        }}
                                    >
                                        <ImageIcon size={48} strokeWidth={1} />
                                    </div>
                                )}
                                {/* Overlay Actions */}
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10">
                                     <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setZoomedImage(t_item.imageUrl);
                                        }}
                                        className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 backdrop-blur-sm"
                                        title="查看大图"
                                     >
                                        <Maximize2 size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Info Area - Simplified for expanded view (hide author/date/tags) */}
                            <div className="px-3 pt-5 pb-6">
                                <h3 className="font-bold text-gray-800 text-lg leading-tight group-hover:text-orange-600 transition-colors">
                                    {t_item.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                 </div>
                 
                 {/* Expanded View Footer Author Info */}
                 <div className="w-full text-center py-8 text-xs opacity-60" style={{ color: 'rgb(220,220,220)' }}>
                    <p>{t('author_info')}</p>
                 </div>
             </div>
          ) : (
            /* --- Compact List View --- */
            filteredTemplates.map(t_item => (
             <div 
               key={t_item.id}
               onClick={() => {
                   setActiveTemplateId(t_item.id);
                   // On mobile, auto-switch to editor after selection
                   if (window.innerWidth < 768) {
                       setMobileTab('editor');
                   }
               }}
               className={`
                 group flex flex-col px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200
                 ${activeTemplateId === t_item.id 
                    ? 'bg-white shadow-md ring-1 ring-orange-50 border border-orange-100' 
                    : 'text-gray-600 hover:bg-white/50 hover:text-gray-900 border border-transparent'}
               `}
             >
               {editingTemplateNameId === t_item.id ? (
                 <input 
                   autoFocus
                   type="text"
                   value={tempTemplateName}
                   onChange={(e) => setTempTemplateName(e.target.value)}
                   onBlur={saveTemplateName}
                   onKeyDown={(e) => e.key === 'Enter' && saveTemplateName()}
                   className="bg-white text-gray-800 text-sm px-2 py-1 rounded-lg w-full outline-none border-2 border-orange-400/50 shadow-sm"
                   onClick={(e) => e.stopPropagation()}
                 />
               ) : (
                 <>
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2 overflow-hidden flex-1">
                       {/* Active Indicator */}
                       {activeTemplateId === t_item.id && (
                           <div className="w-1 h-4 bg-orange-500 rounded-full flex-shrink-0 animate-in fade-in zoom-in duration-300"></div>
                       )}
                       <span className={`truncate text-sm ${activeTemplateId === t_item.id ? 'font-bold text-gray-800' : 'font-medium'}`}>{t_item.name}</span>
                     </div>
                     <div className={`flex items-center gap-1 ${activeTemplateId === t_item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                       {INITIAL_TEMPLATES_CONFIG.some(cfg => cfg.id === t_item.id) && (
                         <button 
                           title={t('reset_template')}
                           onClick={(e) => handleResetTemplate(t_item.id, e)}
                           className="p-1 hover:bg-orange-50 rounded text-gray-400 hover:text-orange-500"
                         >
                           <RotateCcw size={12} />
                         </button>
                       )}
                       <button 
                         title={t('rename')}
                          onClick={(e) => startRenamingTemplate(t_item, e)}
                          className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-orange-600"
                        >
                          <Pencil size={12} />
                        </button>
                        <button 
                          title={t('duplicate')}
                          onClick={(e) => handleDuplicateTemplate(t_item, e)}
                          className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-orange-600"
                        >
                          <CopyIcon size={12} />
                        </button>
                        <button 
                          title={t('export_template')}
                          onClick={(e) => { e.stopPropagation(); handleExportTemplate(t_item); }}
                          className="p-1 hover:bg-blue-50 rounded text-gray-400 hover:text-blue-600"
                        >
                          <Download size={12} />
                        </button>
                        <button 
                          title={t('delete')}
                          onClick={(e) => handleDeleteTemplate(t_item.id, e)}
                          className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-500"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                   </div>
                   
                  {/* Template Tags: only show when active to keep rows compact */}
                  {editingTemplateTags?.id === t_item.id ? (
                    <div className="mt-2 flex flex-wrap gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {TEMPLATE_TAGS.map(tag => (
                        <button
                          key={tag}
                          onClick={(e) => {
                            e.stopPropagation();
                            const currentTags = editingTemplateTags.tags || [];
                            const newTags = currentTags.includes(tag)
                              ? currentTags.filter(t => t !== tag)
                              : [...currentTags, tag];
                            setEditingTemplateTags({ id: t_item.id, tags: newTags });
                          }}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-all border ${
                            (editingTemplateTags.tags || []).includes(tag)
                              ? 'bg-gray-800 text-white border-gray-800'
                              : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {displayTag(tag)}
                        </button>
                      ))}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateTemplateTags(t_item.id, editingTemplateTags.tags);
                          setEditingTemplateTags(null);
                        }}
                        className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-500 text-white hover:bg-green-600 border border-green-500"
                      >
                        ✓ {t('confirm')}
                      </button>
                    </div>
                  ) : (
                    (activeTemplateId === t_item.id) && (
                      <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                        {(t_item.tags || []).length > 0 ? (
                          <>
                            {t_item.tags.map(tag => (
                              <span
                                key={tag}
                                className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${TAG_STYLES[tag] || TAG_STYLES["default"]}`}
                              >
                                {displayTag(tag)}
                              </span>
                            ))}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingTemplateTags({ id: t_item.id, tags: t_item.tags || [] });
                              }}
                              className="px-2 py-0.5 rounded-full text-[10px] font-medium transition-all bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 border border-gray-100"
                              title={t('edit_tags')}
                            >
                              ✎
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingTemplateTags({ id: t_item.id, tags: [] });
                            }}
                            className="px-2 py-0.5 rounded-full text-[10px] font-medium transition-all bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 border border-gray-100"
                          >
                            + {t('add_tags')}
                          </button>
                        )}
                      </div>
                    )
                  )}
                 </>
               )}
             </div>
          )))}
        </div>

       {/* Create New Button (List View Only) */}
       {!isTemplateExpanded && (
            <>
               <div className="p-4 border-t border-gray-200/50 bg-white/30 backdrop-blur-sm pb-20 md:pb-4 space-y-3">
                <PremiumButton
                    onClick={handleAddTemplate}
                    icon={Plus}
                    color="orange"
                    active={true}
                    className="w-full !py-2.5 text-sm transition-all duration-300 transform hover:-translate-y-0.5"
                >
                    {t('new_template')}
                </PremiumButton>

                </div>
                
                {/* Footer Info (Replaced with translated Author Info) */}
                <div className="hidden md:block p-4 pt-0 border-t border-transparent text-[10px] leading-relaxed text-center opacity-60 hover:opacity-100 transition-opacity" style={{ color: 'rgb(220,220,220)' }}>
                    <p>{t('author_info')}</p>
                </div>
            </>
        )}
      </div>



      {/* --- 2. Main Editor (Middle) --- */}
      <div className={`
          ${mobileTab === 'editor' ? 'flex fixed inset-0 z-50 md:static' : 'hidden'} 
          md:flex flex-1 flex-col h-full overflow-hidden relative
          bg-white/80 backdrop-blur-xl md:rounded-3xl border border-white/40 shadow-xl
          transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] origin-left
          ${isTemplateExpanded ? 'md:max-w-0 md:opacity-0 md:p-0 md:border-0' : 'max-w-full opacity-100'}
      `}>
        
        {/* 顶部工具栏 */}
        <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-100/50 flex justify-between items-center z-20 h-auto min-h-[60px] md:min-h-[72px] bg-white/50 backdrop-blur-sm">
          <div className="min-w-0 flex-1 mr-2 flex flex-col justify-center">
            <h1 className="text-base md:text-lg font-bold text-gray-800 truncate">{activeTemplate.name}</h1>
            
            {/* 标签和状态栏 */}
            <div className="flex flex-wrap items-center gap-2 mt-1">
                {/* 状态指示器 */}
                <div className="hidden md:flex items-center gap-1.5 border-r border-gray-200 pr-2 mr-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isEditing ? 'bg-amber-400 animate-pulse' : 'bg-green-400'}`}></span>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">
                        {isEditing ? t('editing_status') : t('preview_status')}
                    </p>
                </div>

                {/* Tags */}
                {(activeTemplate.tags || []).map(tag => (
                    <span 
                        key={tag} 
                        className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${TAG_STYLES[tag] || TAG_STYLES["default"]}`}
                    >
                        {displayTag(tag)}
                    </span>
                ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3 self-start md:self-center">
             
             <div className="flex bg-gray-100/80 p-1 rounded-xl border border-gray-200 shadow-inner">
                <button
                    onClick={() => setIsEditing(false)}
                    className={`
                        p-1.5 md:px-3 md:py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1.5
                        ${!isEditing 
                            ? 'bg-white text-orange-600 shadow-sm ring-1 ring-black/5' 
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
                    `}
                    title={t('preview_mode')}
                >
                    <Eye size={16} /> <span className="hidden md:inline">{t('preview_mode')}</span>
                </button>
                <button
                    onClick={() => setIsEditing(true)}
                    className={`
                        p-1.5 md:px-3 md:py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1.5
                        ${isEditing 
                            ? 'bg-white text-orange-600 shadow-sm ring-1 ring-black/5' 
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
                    `}
                    title={t('edit_mode')}
                >
                    <Edit3 size={16} /> <span className="hidden md:inline">{t('edit_mode')}</span>
                </button>
             </div>

            <div className="h-6 w-px bg-gray-200 mx-1 hidden md:block"></div>

            <PremiumButton 
                onClick={handleExportImage} 
                disabled={isEditing || isExporting} 
                title={isExporting ? t('exporting') : t('export_image')} 
                icon={ImageIcon} 
                color="orange"
            >
                <span className="hidden sm:inline">{isExporting ? t('exporting') : t('export_image')}</span>
            </PremiumButton>

            <PremiumButton 
                onClick={handleCopy} 
                title={copied ? t('copied') : t('copy_result')} 
                icon={copied ? Check : CopyIcon} 
                color={copied ? "emerald" : "orange"}
                active={true} // Always active look for CTA
                className="transition-all duration-300 transform hover:-translate-y-0.5"
            >
                 <span className="hidden md:inline ml-1">{copied ? t('copied') : t('copy_result')}</span>
            </PremiumButton>
          </div>
        </div>

        {/* 核心内容区 */}
        <div className="flex-1 overflow-hidden relative pb-16 md:pb-0 flex flex-col bg-gradient-to-br from-white/60 to-gray-50/60">
            {isEditing && (
                <EditorToolbar 
                    onInsertClick={() => setIsInsertModalOpen(true)}
                    canUndo={historyPast.length > 0}
                    canRedo={historyFuture.length > 0}
                    onUndo={handleUndo}
                    onRedo={handleRedo}
                    t={t}
                />
            )}
            
            {isEditing ? (
                <div className="flex-1 relative overflow-hidden">
                    <VisualEditor
                        ref={textareaRef}
                        value={activeTemplate.content}
                        onChange={(e) => updateActiveTemplateContent(e.target.value)}
                        banks={banks}
                        categories={categories}
                    />
                </div>
            ) : (
                <div className="w-full h-full relative overflow-hidden group">
                     {/* Background Image Layer - Blurry Ambient Background */}
                     <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 opacity-60 blur-[80px] scale-125"
                        style={{ 
                            backgroundImage: activeTemplate.imageUrl ? `url(${activeTemplate.imageUrl})` : 'none',
                        }}
                     ></div>
                     <div className="absolute inset-0 bg-white/10 backdrop-blur-xl"></div> {/* Additional Overlay for smoothness */}

                     <div className="w-full h-full overflow-y-auto px-3 py-4 md:p-8 custom-scrollbar relative z-10">
                         <div 
                            id="preview-card"
                            className="max-w-4xl mx-auto bg-white/80 rounded-2xl md:rounded-[2rem] shadow-xl md:shadow-2xl shadow-orange-900/10 border border-white/60 p-4 sm:p-6 md:p-12 min-h-[500px] md:min-h-[600px] backdrop-blur-2xl transition-all duration-500 relative"
                         >
                            {/* --- Top Section: Title & Image --- */}
                            <div className="flex flex-col md:flex-row justify-between items-start mb-6 md:mb-10 relative">
                                {/* Left: Title & Meta Info */}
                                <div className="flex-1 min-w-0 pr-4 z-10 pt-2">
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 tracking-tight leading-tight">
                                        {activeTemplate.name}
                                    </h2>
                                    {/* Tags / Meta (Example) */}
                                    <div className="flex flex-wrap gap-2 mb-2">
<span className="px-2.5 py-1 rounded-md bg-orange-50 text-orange-600 text-xs font-bold tracking-wide border border-orange-100/50">
    V0.4.1
</span>
                                        <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-600 text-xs font-bold tracking-wide border border-amber-100/50">
                                            Prompt Template
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm font-medium mt-2">
                                        Made by "提示词填空器"
                                    </p>
                                </div>

                                {/* Right: Image (Overhanging) - 使用像素值偏移 */}
                                {/* Right: Image (Overhanging) - 使用像素值偏移 */}
                                <div 
                                    className="w-full md:w-auto mt-4 md:mt-0 relative md:-mr-[50px] md:-mt-[50px] z-20 flex-shrink-0"
                                    onMouseLeave={() => { setShowImageActionMenu(false); setShowImageUrlInput(false); }}
                                >
                                    <div 
                                        className="bg-white p-1.5 md:p-2 rounded-lg md:rounded-xl shadow-lg md:shadow-xl transform md:rotate-2 border border-gray-100/50 transition-all duration-300 hover:rotate-0 hover:scale-105 hover:shadow-2xl group/image w-full md:w-auto"
                                    >
                                        <div className={`relative overflow-hidden rounded-md md:rounded-lg bg-gray-50 flex items-center justify-center ${!activeTemplate.imageUrl || imageLoadError ? 'w-full md:w-[300px] h-[300px]' : ''}`}>
                                            {/* Smart Image Container - 移动端全宽，桌面端固定尺寸 */}
                                            {activeTemplate.imageUrl && !imageLoadError ? (
                                                <img 
                                                    src={activeTemplate.imageUrl} 
                                                    referrerPolicy="no-referrer" // 保持这个以绕过防盗链
                                                    alt="Template Preview" 
                                                    className="w-full md:w-auto md:max-w-[300px] md:max-h-[300px] h-auto object-contain block" 
                                                    onError={() => {
                                                        // 设置加载失败状态，触发显示占位符
                                                        setImageLoadError(true);
                                                    }}
                                                />
                                            ) : (
                                                <div 
                                                    className="flex flex-col items-center justify-center text-gray-300 p-4 text-center w-full h-full relative group/empty"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <ImageIcon size={48} strokeWidth={1.5} className="text-gray-300" />
                                                    {imageLoadError && (
                                                        <p className="text-xs text-red-400 mt-2">图片加载失败</p>
                                                    )}
                                                    {!imageLoadError && !activeTemplate.imageUrl && (
                                                        <p className="text-xs text-gray-400 mt-2">暂无图片</p>
                                                    )}
                                                    {/* Hover actions for empty/failed state */}
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none group-hover/empty:opacity-100 group-hover/empty:pointer-events-auto transition-opacity">
                                                        <div className="bg-white/95 border border-gray-200 rounded-lg shadow-lg p-3 flex flex-col gap-2 min-w-[180px]">
                                                            <button
                                                                onClick={() => fileInputRef.current?.click()}
                                                                className="w-full px-3 py-2 text-sm text-left bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all flex items-center gap-2 justify-center"
                                                            >
                                                                <ImageIcon size={16} />
                                                                {t('upload_image')}
                                                            </button>
                                                            <button
                                                                onClick={() => setShowImageUrlInput(true)}
                                                                className="w-full px-3 py-2 text-sm text-left bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all flex items-center gap-2 justify-center"
                                                            >
                                                                <Globe size={16} />
                                                                {t('image_url')}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {/* Hidden File Input */}
                                            <input 
                                                type="file" 
                                                ref={fileInputRef} 
                                                onChange={handleUploadImage} 
                                                className="hidden" 
                                                accept="image/*"
                                            />

                                            {/* Hover Overlay with Actions */}
                                            <div className={`absolute inset-0 bg-black/0 ${activeTemplate.imageUrl ? 'group-hover/image:bg-black/20' : 'group-hover/image:bg-black/5'} transition-colors duration-300 flex items-center justify-center gap-3 opacity-0 group-hover/image:opacity-100 backdrop-blur-[2px]`}>
                                                {/* View Big */}
                                                {activeTemplate.imageUrl && (
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); setZoomedImage(activeTemplate.imageUrl); }}
                                                        className="p-2 bg-white/90 text-gray-700 rounded-full hover:bg-white hover:text-orange-600 transition-all shadow-lg transform translate-y-4 group-hover/image:translate-y-0 duration-300 hover:scale-110"
                                                        title="查看大图"
                                                    >
                                                        <Maximize2 size={18} />
                                                    </button>
                                                )}
                                                
                                                {/* Change Image - With Menu */}
                                                <div className="relative">
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); setShowImageActionMenu(!showImageActionMenu); }}
                                                        className="p-2 bg-white/90 text-gray-700 rounded-full hover:bg-white hover:text-orange-600 transition-all shadow-lg transform translate-y-4 group-hover/image:translate-y-0 duration-300 delay-75 hover:scale-110"
                                                        title="更换图片"
                                                    >
                                                        <ImageIcon size={18} />
                                                    </button>
                                                    
                                                    {/* Dropdown Menu */}
                                                    {showImageActionMenu && (
                                                        <div 
                                                            className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 min-w-[140px]"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <button
                                                                onClick={() => {
                                                                    fileInputRef.current?.click();
                                                                    setShowImageActionMenu(false);
                                                                }}
                                                                className="w-full px-4 py-2 text-left text-sm hover:bg-orange-50 transition-colors flex items-center gap-2 text-gray-700"
                                                            >
                                                                <ImageIcon size={16} />
                                                                {t('upload_image')}
                                                            </button>
                                                            <div className="h-px bg-gray-100"></div>
                                                            <button
                                                                onClick={() => {
                                                                    setShowImageUrlInput(true);
                                                                    setShowImageActionMenu(false);
                                                                }}
                                                                className="w-full px-4 py-2 text-left text-sm hover:bg-blue-50 transition-colors flex items-center gap-2 text-gray-700"
                                                            >
                                                                <Globe size={16} />
                                                                {t('image_url')}
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                {/* Reset */}
                                                {activeTemplate.imageUrl && (
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); handleResetImage(); }}
                                                        className="p-2 bg-white/90 text-gray-700 rounded-full hover:bg-white hover:text-orange-600 transition-all shadow-lg transform translate-y-4 group-hover/image:translate-y-0 duration-300 delay-150 hover:scale-110"
                                                        title="重置默认图片"
                                                    >
                                                        <Undo size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* --- Bottom Section: Content --- */}
                            <div className="relative z-10 border-t border-gray-100 pt-8 mt-4">
                                <div id="final-prompt-content" className="prose prose-slate max-w-none text-base md:text-lg leading-relaxed text-gray-600">
                                    {renderTemplateContent()}
                                </div>
                            </div>
                         </div>
                         
                         {/* Bottom spacing for aesthetics */}
                         <div className="h-24"></div>
                     </div>
                     
                     {/* Image URL Input Modal */}
                     {showImageUrlInput && (
                         <div 
                             className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                             onClick={() => { setShowImageUrlInput(false); setImageUrlInput(""); }}
                         >
                             <div 
                                 className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full"
                                 onClick={(e) => e.stopPropagation()}
                             >
                                 <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                     <Globe size={20} className="text-blue-500" />
                                     {t('image_url')}
                                 </h3>
                                 <input
                                     autoFocus
                                     type="text"
                                     value={imageUrlInput}
                                     onChange={(e) => setImageUrlInput(e.target.value)}
                                     placeholder={t('image_url_placeholder')}
                                     className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                     onKeyDown={(e) => e.key === 'Enter' && handleSetImageUrl()}
                                 />
                                 <div className="flex gap-3">
                                     <button
                                         onClick={handleSetImageUrl}
                                         disabled={!imageUrlInput.trim()}
                                         className="flex-1 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                     >
                                         {t('use_url')}
                                     </button>
                                     <button
                                         onClick={() => { setShowImageUrlInput(false); setImageUrlInput(""); }}
                                         className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-all"
                                     >
                                         {t('cancel')}
                                     </button>
                                 </div>
                             </div>
                         </div>
                     )}
                </div>
            )}
        </div>
      </div>

      {/* --- Image View Modal --- */}
      {zoomedImage && (
        <div 
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300"
            onClick={() => setZoomedImage(null)}
        >
            <button 
                className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md"
                onClick={() => setZoomedImage(null)}
            >
                <X size={24} />
            </button>
            
            <div className="relative max-w-full max-h-full flex flex-col items-center">
                <img 
                    src={zoomedImage} 
                    alt="Zoomed Preview" 
                    className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
                    onClick={(e) => e.stopPropagation()}
                />
                
                {/* View Template Button */}
                <div className="mt-6 flex gap-4" onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={() => {
                            const template = INITIAL_TEMPLATES_CONFIG.find(t => t.imageUrl === zoomedImage) || 
                                           templates.find(t => t.imageUrl === zoomedImage);
                            
                            if (template) {
                                setActiveTemplateId(template.id);
                                setIsTemplateExpanded(false);
                            } else if (activeTemplate.imageUrl === zoomedImage) {
                                setIsTemplateExpanded(false);
                            }
                            setZoomedImage(null);
                        }}
                        className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium shadow-lg shadow-orange-500/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                    >
                        <LayoutGrid size={18} />
                        查看模板
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* --- 3. Bank Sidebar (Right) - UPDATED Resizable & Responsive Layout --- */}
      <div 
        ref={sidebarRef}
        className={`
            ${mobileTab === 'banks' ? 'flex fixed inset-0 z-50 bg-white md:static' : 'hidden'} 
            md:flex flex-col h-full flex-shrink-0 relative rounded-3xl overflow-hidden
            bg-white/40 backdrop-blur-md border border-white/30 shadow-lg
            transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${isTemplateExpanded ? 'md:max-w-0 md:opacity-0 md:border-0' : 'max-w-full opacity-100'}
        `}
        style={{ 
          width: isMobile ? '100%' : (isTemplateExpanded ? 0 : `${bankSidebarWidth}px`)
        }}
      >
        {/* Resizer Handle - Moved to Left for Right Sidebar */}
        <div 
            className="hidden md:flex absolute -left-2 top-0 bottom-0 w-4 cursor-col-resize z-40 group items-center justify-center"
            onMouseDown={startResizing}
        >
             {/* Visual handle indicator on hover */}
            <div className="h-12 w-1 rounded-full bg-gray-300/50 group-hover:bg-orange-400/80 transition-colors shadow-sm backdrop-blur-sm"></div>
        </div>

        <div className="p-5 border-b border-white/20 bg-white/40 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 text-gray-800">
                <div className="p-1.5 bg-white rounded-lg text-gray-600 shadow-sm border border-gray-100">
                    <Settings size={16} />
                </div>
                <h2 className="text-base font-bold">{t('bank_config')}</h2>
            </div>
            <button 
                onClick={() => setIsCategoryManagerOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/60 hover:bg-white text-gray-600 rounded-lg transition-all text-xs font-medium shadow-sm border border-transparent hover:border-gray-200 mr-1"
                title={t('manage_categories')}
            >
                <List size={14} />
                {t('manage_categories')}
            </button>
          </div>
          <p className="text-xs text-gray-500">{t('bank_subtitle')}</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-24 md:pb-20 custom-scrollbar">
          
          {bankSidebarWidth >= 520 || window.innerWidth < 768 ? (
             <div className="flex flex-col md:flex-row gap-4 items-start">
               {/* Left Column */}
               <div className="flex-1 flex flex-col gap-4 min-w-0 w-full">
                  {Object.keys(categories).filter((_, i) => i % 2 === 0).map(catId => (
                      <CategorySection 
                          key={catId}
                          catId={catId}
                          categories={categories}
                          banks={banks}
                          onInsert={(key) => {
                              insertVariableToTemplate(key);
                              // On mobile, maybe feedback or auto switch? Let's stay to allow multiple inserts
                          }}
                          onDeleteOption={handleDeleteOption}
                          onAddOption={handleAddOption}
                          onDeleteBank={handleDeleteBank}
                          onUpdateBankCategory={handleUpdateBankCategory}
                          t={t}
                      />
                  ))}
               </div>
               
               {/* Right Column */}
               <div className="flex-1 flex flex-col gap-4 min-w-0 w-full">
                  {Object.keys(categories).filter((_, i) => i % 2 === 1).map(catId => (
                      <CategorySection 
                          key={catId}
                          catId={catId}
                          categories={categories}
                          banks={banks}
                          onInsert={insertVariableToTemplate}
                          onDeleteOption={handleDeleteOption}
                          onAddOption={handleAddOption}
                          onDeleteBank={handleDeleteBank}
                          onUpdateBankCategory={handleUpdateBankCategory}
                          t={t}
                      />
                  ))}
               </div>
             </div>
          ) : (
            <div className="flex flex-col gap-4">
                {Object.keys(categories).map(catId => (
                    <CategorySection 
                        key={catId}
                        catId={catId}
                        categories={categories}
                        banks={banks}
                        onInsert={insertVariableToTemplate}
                        onDeleteOption={handleDeleteOption}
                        onAddOption={handleAddOption}
                        onDeleteBank={handleDeleteBank}
                        onUpdateBankCategory={handleUpdateBankCategory}
                        t={t}
                    />
                ))}
            </div>
          )}

            {isAddingBank ? (
                <div className="border border-dashed border-orange-300/50 rounded-xl p-4 bg-orange-50/30 mt-4 backdrop-blur-sm">
                    <h4 className="text-xs font-bold text-orange-900 mb-3 uppercase tracking-wide flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                        {t('add_bank_title')}
                    </h4>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1 font-medium">{t('label_name')}</label>
                            <input 
                                autoFocus
                                type="text" 
                                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none bg-white/80"
                                placeholder={t('label_placeholder')}
                                value={newBankLabel}
                                onChange={e => setNewBankLabel(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1 font-medium">{t('id_name')}</label>
                            <input 
                                type="text" 
                                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 font-mono focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none bg-white/80"
                                placeholder={t('id_placeholder')}
                                value={newBankKey}
                                onChange={e => setNewBankKey(e.target.value)} 
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1 font-medium">{t('category_label')}</label>
                            <select 
                                value={newBankCategory}
                                onChange={e => setNewBankCategory(e.target.value)}
                                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none bg-white/80"
                            >
                                {Object.values(categories).map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex gap-2 pt-2">
                            <button 
                                onClick={handleAddBank}
                                className="flex-1 bg-orange-600 text-white text-xs py-2 rounded-lg hover:bg-orange-700 font-medium shadow-md shadow-orange-500/20 transition-all"
                            >
                                {t('confirm_add')}
                            </button>
                            <button 
                                onClick={() => setIsAddingBank(false)}
                                className="flex-1 bg-white border border-gray-200 text-gray-600 text-xs py-2 rounded-lg hover:bg-gray-50 transition-all"
                            >
                                {t('cancel')}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <button 
                    onClick={() => setIsAddingBank(true)}
                    className="w-full py-4 mt-4 border border-dashed border-gray-300 rounded-xl text-gray-400 hover:text-orange-500 hover:border-orange-300 hover:bg-orange-50/30 transition-all flex items-center justify-center gap-2 font-medium text-sm backdrop-blur-sm"
                >
                    <Plus size={18} />
                    {t('add_bank_group')}
                </button>
            )}
        </div>
      </div>

      {/* --- Settings Modal --- */}
      {isSettingsOpen && (
        <div 
          className="fixed inset-0 z-[110] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={() => setIsSettingsOpen(false)}
        >
          <div 
            className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-gray-100 bg-white/80 backdrop-blur">
              <div className="flex items-center gap-2 text-gray-800">
                <div className="p-2 rounded-lg bg-orange-50 text-orange-500">
                  <Settings size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold">{t('settings')}</p>
                  <p className="text-xs text-gray-400">{t('app_title')}</p>
                </div>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-4 md:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              
              {/* Import / Export */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{t('import_template')} / {t('export_all_templates')}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="block">
                    <input 
                      type="file" 
                      accept=".json" 
                      onChange={handleImportTemplate}
                      className="hidden" 
                      id="import-template-input-modal"
                      disabled={isImporting}
                    />
                    <div 
                      onClick={() => !isImporting && document.getElementById('import-template-input-modal').click()}
                      className={`w-full text-center px-4 py-3 text-sm font-medium rounded-xl transition-all border flex items-center justify-center gap-2 shadow-sm ${
                        isImporting 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' 
                          : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200 cursor-pointer'
                      }`}
                    >
                      <Download size={16} className={`rotate-180 ${isImporting ? 'animate-pulse' : ''}`} />
                      {isImporting ? '导入中...' : t('import_template')}
                    </div>
                  </label>
                  <button
                    onClick={handleExportAllTemplates}
                    className="w-full text-center px-4 py-3 text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all border border-orange-500 flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Download size={16} />
                    {t('export_all_templates')}
                  </button>
                </div>
              </div>

              {/* Storage */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{t('storage_mode')}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={handleSwitchToLocalStorage}
                    className={`w-full px-4 py-3 text-sm font-medium rounded-xl transition-all border flex items-center justify-between ${storageMode === 'browser' ? 'bg-blue-500 text-white border-blue-500 shadow-sm' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-2">
                      <Globe size={16} />
                      <span>{t('use_browser_storage')}</span>
                    </div>
                    {storageMode === 'browser' && <Check size={16} />}
                  </button>
                  <button
                    onClick={handleSelectDirectory}
                    disabled={!isFileSystemSupported}
                    className={`w-full px-4 py-3 text-sm font-medium rounded-xl transition-all border flex items-center justify-between ${storageMode === 'folder' ? 'bg-green-500 text-white border-green-500 shadow-sm' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'}`}
                    title={!isFileSystemSupported ? t('browser_not_supported') : ''}
                  >
                    <div className="flex items-center gap-2">
                      <Download size={16} />
                      <span>{t('use_local_folder')}</span>
                    </div>
                    {storageMode === 'folder' && <Check size={16} />}
                  </button>
                </div>

                {storageMode === 'folder' && directoryHandle && (
                  <div className="px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-xs text-green-700 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Check size={14} />
                      {t('auto_save_enabled')}
                    </div>
                    <button
                      onClick={handleManualLoadFromFolder}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-xs font-medium transition-colors"
                    >
                      {t('load_from_folder')}
                    </button>
                  </div>
                )}

                {storageMode === 'browser' && (
                  <div className="text-xs text-gray-500">
                    {t('storage_used')}: {getStorageSize()} KB
                  </div>
                )}
              </div>

              {/* Danger Zone */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-red-500">{t('clear_all_data')}</p>
                <button
                  onClick={handleClearAllData}
                  className="w-full text-center px-4 py-3 text-sm font-semibold bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all border border-red-200 flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  {t('clear_all_data')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Image Lightbox --- */}
      {/* --- Image View Modal --- */}
      {zoomedImage && (
        <div 
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300"
            onClick={() => setZoomedImage(null)}
        >
            <button 
                className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md"
                onClick={() => setZoomedImage(null)}
            >
                <X size={24} />
            </button>
            
            <div className="relative max-w-full max-h-full flex flex-col items-center">
                <img 
                    src={zoomedImage} 
                    alt="Zoomed Preview" 
                    className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
                    onClick={(e) => e.stopPropagation()}
                />
                
                {/* View Template Button */}
                <div className="mt-6 flex gap-4" onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={() => {
                            const template = INITIAL_TEMPLATES_CONFIG.find(t => t.imageUrl === zoomedImage) || 
                                           templates.find(t => t.imageUrl === zoomedImage);
                            
                            if (template) {
                                setActiveTemplateId(template.id);
                                setIsTemplateExpanded(false);
                            } else if (activeTemplate.imageUrl === zoomedImage) {
                                setIsTemplateExpanded(false);
                            }
                            setZoomedImage(null);
                        }}
                        className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium shadow-lg shadow-orange-500/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                    >
                        <LayoutGrid size={18} />
                        查看模板
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* --- Mobile Bottom Navigation --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200 flex justify-around items-center z-50 h-16 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <button 
             onClick={() => setMobileTab('templates')}
             className={`flex flex-col items-center justify-center w-full h-full gap-1 ${mobileTab === 'templates' ? 'text-orange-600' : 'text-gray-400'}`}
          >
             <FileText size={20} />
             <span className="text-[10px] font-medium">{t('template_management')}</span>
          </button>
          
          <button 
             onClick={() => setMobileTab('banks')}
             className={`flex flex-col items-center justify-center w-full h-full gap-1 ${mobileTab === 'banks' ? 'text-orange-600' : 'text-gray-400'}`}
          >
             <Settings size={20} />
             <span className="text-[10px] font-medium">{t('bank_config')}</span>
          </button>
          
          <button
             onClick={() => activeTemplate && setMobileTab('editor')}
             disabled={!activeTemplate}
             className={`flex flex-col items-center justify-center w-full h-full gap-1 ${
               !activeTemplate
                 ? 'text-gray-300 cursor-not-allowed'
                 : mobileTab === 'editor' ? 'text-orange-600' : 'text-gray-400'
             }`}
          >
             <Edit3 size={20} />
             <span className="text-[10px] font-medium">Editor</span>
          </button>
      </div>

      {/* --- Category Manager Modal (Moved to bottom) --- */}
      <CategoryManager 
        isOpen={isCategoryManagerOpen} 
        onClose={() => setIsCategoryManagerOpen(false)}
        categories={categories}
        setCategories={setCategories}
        banks={banks}
        setBanks={setBanks}
        t={t}
      />

      {/* --- Insert Variable Modal (Moved to bottom) --- */}
      <InsertVariableModal
        isOpen={isInsertModalOpen}
        onClose={() => setIsInsertModalOpen(false)}
        categories={categories}
        banks={banks}
        onSelect={(key) => {
            insertVariableToTemplate(key);
            setIsInsertModalOpen(false);
        }}
        t={t}
      />

      {/* --- Toast 提示 --- */}
      {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[120] animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="bg-gray-900/95 text-white px-6 py-3 rounded-full shadow-2xl backdrop-blur-sm border border-white/10 flex items-center gap-2 max-w-sm">
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* --- 导入确认对话框 --- */}
      {importConfirmData && (
        <div className="fixed inset-0 z-[130] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Download size={24} className="text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">导入完整备份</h3>
                <p className="text-sm text-gray-500">检测到完整备份文件</p>
              </div>
            </div>
            
            <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-2">
              <p className="text-sm text-gray-600">此操作将覆盖当前所有数据：</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">• 模板数量：</span>
                  <span className="font-semibold text-gray-800">{importConfirmData.templatesCount} 个</span>
                </div>
                {importConfirmData.banksCount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">• 词库数量：</span>
                    <span className="font-semibold text-gray-800">{importConfirmData.banksCount} 个</span>
                  </div>
                )}
                {importConfirmData.categoriesCount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">• 分类数量：</span>
                    <span className="font-semibold text-gray-800">{importConfirmData.categoriesCount} 个</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-amber-800 font-medium">⚠️ 此操作无法撤销</p>
              <p className="text-xs text-amber-600 mt-1">建议先导出当前数据作为备份</p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setImportConfirmData(null)}
                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all"
              >
                取消
              </button>
              <button
                onClick={confirmImportFullBackup}
                className="flex-1 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-all shadow-lg shadow-orange-500/30"
              >
                确认导入
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;

