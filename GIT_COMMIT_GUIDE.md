# Git 提交指南 - Version 0.4.1

## 📋 提交前检查清单

- [x] 更新 `package.json` 版本号 (0.4.0 → 0.4.1)
- [x] 更新 `index.html` 标题版本号
- [x] 更新 `src/App.jsx` 中的显示版本号（2处）
- [x] 更新 `README.md` 版本徽章和更新日志
- [x] 创建 `CHANGELOG.md` 文件
- [x] 创建 `RELEASE_NOTES_v0.4.1.md` 发布说明
- [ ] 测试所有新功能是否正常工作
- [ ] 确认没有 lint 错误

## 🚀 Git 提交步骤

### 1. 查看修改的文件
```bash
git status
```

### 2. 添加所有修改的文件
```bash
git add .
```

或者分别添加：
```bash
git add package.json
git add index.html
git add src/App.jsx
git add README.md
git add CHANGELOG.md
git add RELEASE_NOTES_v0.4.1.md
git add GIT_COMMIT_GUIDE.md
```

### 3. 提交更改
```bash
git commit -m "Release v0.4.1: 导出优化、移动端改进、导入体验提升

主要更新：
- 导出格式改为 JPG，文件大小减少 60-70%
- 添加模糊背景效果，提升视觉质感
- 重新设计导出卡片布局
- 优化移动端顶部布局和导入体验
- 修复图片加载失败后无法替换的问题
- 底部水印添加版本号和二维码

详见 CHANGELOG.md 和 RELEASE_NOTES_v0.4.1.md"
```

### 4. 推送到远程仓库
```bash
# 推送到 main 分支
git push origin main
```

如果是首次推送或需要设置上游分支：
```bash
git push -u origin main
```

### 5. 创建 Git Tag（推荐）
```bash
# 创建带注释的标签
git tag -a v0.4.1 -m "Version 0.4.1: 导出优化、移动端改进、导入体验提升"

# 推送标签到远程
git push origin v0.4.1
```

或推送所有标签：
```bash
git push --tags
```

## 📝 提交信息格式建议

### 标准格式
```
<type>(<scope>): <subject>

<body>

<footer>
```

### 本次提交示例
```
feat(export): 优化导出功能并改进移动端体验

主要变更：
- 导出格式从 PNG 改为 JPG，文件大小减少 60-70%
- 添加模糊背景效果
- 重新设计卡片布局：图片置顶、信息优化
- 导出按钮显示加载状态
- 底部添加版本号和二维码

fix(mobile): 修复移动端导入和图片问题
- 修复导入模板时无反馈的问题
- 修复图片加载失败后无法替换
- 优化顶部布局，减少拥挤感

BREAKING CHANGES: None

Closes #12, #15
```

## 🏷️ Commit Type 说明

- **feat**: 新功能
- **fix**: Bug 修复
- **docs**: 文档更新
- **style**: 代码格式调整（不影响功能）
- **refactor**: 代码重构
- **perf**: 性能优化
- **test**: 测试相关
- **chore**: 构建工具或辅助工具的变动

## 📊 发布到 GitHub Release（可选）

### 通过 GitHub 网页创建 Release
1. 访问仓库页面：https://github.com/TanShilongMario/PromptFill
2. 点击右侧 "Releases" → "Create a new release"
3. 选择标签：`v0.4.1`
4. 填写 Release title：`Version 0.4.1 - 导出优化与移动端改进`
5. 复制 `RELEASE_NOTES_v0.4.1.md` 的内容到描述框
6. 点击 "Publish release"

### 使用 GitHub CLI（需要安装 gh）
```bash
gh release create v0.4.1 \
  --title "Version 0.4.1 - 导出优化与移动端改进" \
  --notes-file RELEASE_NOTES_v0.4.1.md
```

## 🔍 验证推送

### 检查远程仓库
```bash
# 查看远程分支
git branch -r

# 查看所有标签
git tag -l

# 查看最近的提交
git log --oneline -5
```

### 在 GitHub 上确认
1. 访问 https://github.com/TanShilongMario/PromptFill
2. 确认最新提交已显示
3. 检查 Tags 页面是否有 v0.4.1
4. 如果创建了 Release，检查 Releases 页面

## ⚠️ 常见问题

### 推送被拒绝
```bash
# 先拉取远程更改
git pull --rebase origin main

# 然后再推送
git push origin main
```

### 修改最后一次提交
```bash
# 修改提交信息
git commit --amend -m "新的提交信息"

# 强制推送（谨慎使用）
git push --force-with-lease origin main
```

### 忘记添加文件
```bash
# 添加遗漏的文件
git add forgotten_file.txt

# 修改最后一次提交（不改变提交信息）
git commit --amend --no-edit

# 推送
git push --force-with-lease origin main
```

## ✅ 完成

所有准备工作已完成！现在可以执行上述步骤将 v0.4.1 推送到 Git 仓库了。

---

**注意**：推送前请确保已经测试过所有新功能，并且没有明显的 bug。

