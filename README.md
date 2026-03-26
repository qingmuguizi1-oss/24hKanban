# 24h 任务效率看板

一个纯前端本地项目，用于将每日 24 小时按任务切片展示，并提供三列任务看板。

## 功能

- 三列看板：未开始 / 进行中 / 已完成
- 任务卡片字段：
  - 任务名称
  - 任务标签（四象限，带 Logo）
  - 任务详情（选填）
  - 开始时间
  - 结束时间
  - 总用时（自动计算）
  - 任务类别（探索、课题、开发、娱乐、放松、睡觉、用餐）
  - 状态（未开始、进行中、已完成）
- 每日 24h 分配视图：
  - 48 个半小时切片
  - 每类任务累计时长
  - 已记录时长/空余时长
- 数据本地持久化（LocalStorage）

## 使用方法

1. 在浏览器中直接打开 `index.html`。
2. 录入任务并保存。
3. 在下方看板中切换状态、编辑或删除任务。
4. 在“每日24h分配”中选择日期查看时间切片。

## 文件结构

- `index.html` 页面结构
- `styles.css` 页面样式
- `app.js` 交互逻辑与数据存储

## UTF-8 防乱码基建

仓库已内置 UTF-8 防护（编辑器 + Git + 提交拦截 + CI）：

- `.editorconfig`：统一使用 UTF-8（无 BOM）与 LF。
- `.gitattributes`：明确文本/二进制文件类型，避免错误转换。
- `scripts/check-utf8.js`：检查 UTF-8 非法字节、BOM、常见乱码片段。
- `.githooks/pre-commit`：提交前仅检查暂存区文件（严格模式，会拦截可疑乱码词形）。
- `.github/workflows/utf8-guard.yml`：远端 CI 兜底。

### 一次性启用本地 pre-commit

在仓库根目录执行：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\setup-git-hooks.ps1
```

### 手动巡检（全仓）

```powershell
node .\scripts\check-utf8.js
```

### 手动巡检（仅暂存区，和 pre-commit 一致）

```powershell
git diff --cached --name-only --diff-filter=ACMRTUXB -z | node .\scripts\check-utf8.js --stdin-null
```

如需与 pre-commit 同样的严格检查，可加参数：

```powershell
git diff --cached --name-only --diff-filter=ACMRTUXB -z | node .\scripts\check-utf8.js --stdin-null --strict-suspicious
```

