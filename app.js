const STORAGE_KEY = "time-efficiency-tasks-v1";

const PRIORITY_MAP = {
  important_urgent: "\uD83D\uDD25 \u91CD\u8981\u4E14\u7D27\u6025",
  important_not_urgent: "\uD83C\uDFAF \u91CD\u8981\u4E0D\u7D27\u6025",
  not_important_urgent: "\u26A1 \u4E0D\u91CD\u8981\u4F46\u7D27\u6025",
  not_important_not_urgent: "\uD83E\uDDCA \u4E0D\u91CD\u8981\u4E5F\u4E0D\u7D27\u6025"
};
const IMPORTANCE_LEVEL_MAP = {
  level1: "1\u7EA7",
  level2: "2\u7EA7",
  level3: "3\u7EA7",
  level4: "4\u7EA7"
};
const DEFAULT_IMPORTANCE_LEVEL = "level2";
const CATEGORY_MAP = {
  work: "\uD83D\uDCBC \u5DE5\u4F5C",
  explore: "\uD83D\uDEA2 \u63A2\u7D22",
  topic: "\uD83D\uDCDA \u8BFE\u9898",
  dev: "\uD83D\uDCBB \u5F00\u53D1",
  entertainment: "\uD83C\uDFAE \u5A31\u4E50",
  relax: "\uD83E\uDDD8 \u653E\u677E",
  sleep: "\uD83D\uDE34 \u7761\u89C9",
  meal: "\uD83C\uDF7D \u7528\u9910",
  record: "\uD83D\uDCDD \u8BB0\u5F55",
  other: "\uD83E\uDDE9 \u5176\u4ED6"
};

const STATUS_COLUMNS = {
  todo: "col-todo",
  doing: "col-doing",
  done: "col-done"
};

const DONE_TIME_GROUPS = [
  { key: "morning", label: "\u4E0A\u5348" },
  { key: "afternoon", label: "\u4E0B\u5348" },
  { key: "evening", label: "\u665A\u4E0A" }
];

const SLOT_MINUTES = 30;

const PIE_COLORS = ["#d26a2d", "#4f63c6", "#d94f7f", "#2f9a72", "#b57d1d", "#7f5abf", "#3c79c3", "#66758d", "#b2562d", "#2f7f6d"];
const PIE_INNER_RADIUS_RATIO = 0.48;

const state = {
  tasks: [],
  selectedDate: toDateInputValue(new Date()),
  boardDate: toDateInputValue(new Date()),
  dailyView: "timeline",
  pieSegments: [],
  pieUsedMinutes: 0,
  pieDefaultCenterText: "\u6682\u65E0\u8BB0\u5F55",
  pieActiveIndex: -1,
  collapsedById: {},
  boardGroupCollapsed: Object.fromEntries(
    Object.keys(STATUS_COLUMNS).map((status) => [
      status,
      Object.fromEntries(DONE_TIME_GROUPS.map((group) => [group.key, true]))
    ])
  )
};

const refs = {
  form: document.getElementById("task-form"),
  taskId: document.getElementById("task-id"),
  taskName: document.getElementById("task-name"),
  taskPriority: document.getElementById("task-priority"),
  taskImportanceWrapper: document.getElementById("task-importance-wrapper"),
  taskImportanceLevels: document.querySelectorAll('input[name="task-importance-level"]'),
  taskDetail: document.getElementById("task-detail"),
  detailCount: document.getElementById("detail-count"),
  taskStart: document.getElementById("task-start"),
  taskEnd: document.getElementById("task-end"),
  taskCategories: document.querySelectorAll('input[name="task-categories"]'),
  taskCategoryPicker: document.getElementById("task-category-picker"),
  taskCategorySummary: document.getElementById("task-category-summary"),
  taskStatus: document.getElementById("task-status"),
  durationPreview: document.getElementById("duration-preview"),
  resetForm: document.getElementById("reset-form"),
  selectedDate: document.getElementById("selected-date"),
  boardDate: document.getElementById("board-date"),
  summaryUsed: document.getElementById("summary-used"),
  summaryFree: document.getElementById("summary-free"),
  timeline: document.getElementById("timeline"),
  timelineLegend: document.getElementById("timeline-legend"),
  viewTimelineBtn: document.getElementById("view-timeline"),
  viewPieBtn: document.getElementById("view-pie"),
  pieWrapper: document.getElementById("pie-wrapper"),
  taskPie: document.getElementById("task-pie"),
  taskPieCenter: document.getElementById("task-pie-center"),
  pieLegend: document.getElementById("pie-legend"),
  pieTooltip: document.getElementById("pie-tooltip"),
  countTodo: document.getElementById("count-todo"),
  countDoing: document.getElementById("count-doing"),
  countDone: document.getElementById("count-done"),
  quickAddButtons: document.querySelectorAll(".column-add"),
  template: document.getElementById("task-card-template")
};

init();

function init() {
  state.tasks = loadTasks();
  refs.selectedDate.value = state.selectedDate;
  refs.boardDate.value = state.boardDate;

  refs.form.addEventListener("submit", onSubmitTask);
  refs.resetForm.addEventListener("click", resetForm);
  refs.taskDetail.addEventListener("input", updateDetailCount);
  refs.taskPriority.addEventListener("change", handlePriorityChange);

  if (refs.taskStart && refs.taskEnd) {
    refs.taskStart.addEventListener("input", updateDurationPreview);
    refs.taskEnd.addEventListener("input", updateDurationPreview);
  } else {
    console.warn("Missing #task-start or #task-end fields in form.");
  }
  refs.taskCategories.forEach((input) => {
    input.addEventListener("change", renderCategorySummary);
  });
  refs.selectedDate.addEventListener("input", () => {
    state.selectedDate = refs.selectedDate.value;
    renderDailyOverview();
  });
  refs.boardDate.addEventListener("input", () => {
    state.boardDate = refs.boardDate.value;
    renderBoard();
  });

  refs.quickAddButtons.forEach((button) => {
    button.addEventListener("click", () => {
      quickCreateTask(button.dataset.quickStatus || "todo");
    });
  });

  refs.viewTimelineBtn.addEventListener("click", () => setDailyView("timeline"));
  refs.viewPieBtn.addEventListener("click", () => setDailyView("pie"));

  bindPieInteractions();
  setSelectedCategoriesToForm([]);
  setSelectedImportanceLevelToForm(DEFAULT_IMPORTANCE_LEVEL);
  handlePriorityChange();
  applyDailyViewMode();
  updateDetailCount();
  updateDurationPreview();
  renderAll();
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map(normalizeTask)
      .filter(Boolean);
  } catch {
    return [];
  }
}

function createTaskId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeDateTimeInput(value) {
  const raw = typeof value === "string" ? value.trim() : String(value || "").trim();
  if (!raw) {
    return "";
  }

  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}T${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
}

function parseDateTime(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getTaskRange(task) {
  const start = parseDateTime(task.startAt);
  const end = parseDateTime(task.endAt);
  if (!start || !end || end <= start) {
    return null;
  }
  return { start, end };
}

function normalizeTask(input) {
  if (!input || typeof input !== "object") {
    return null;
  }

  const categories = sanitizeCategoryKeys(
    Array.isArray(input.categories) ? input.categories : [input.category]
  );

  const startAt = normalizeDateTimeInput(input.startAt || input.start || "");
  const endAt = normalizeDateTimeInput(input.endAt || input.end || "");
  const priority = PRIORITY_MAP[input.priority] ? input.priority : "important_urgent";

  return {
    id: String(input.id || createTaskId()),
    name: String(input.name || "").trim(),
    priority,
    importanceLevel: priority === "important_not_urgent" ? sanitizeImportanceLevel(input.importanceLevel) : "",
    detail: String(input.detail || "").trim(),
    startAt,
    endAt,
    categories: categories.length ? categories : ["explore"],
    status: Object.prototype.hasOwnProperty.call(STATUS_COLUMNS, input.status) ? input.status : "todo"
  };
}

function sanitizeCategoryKeys(values) {
  const keys = Array.isArray(values) ? values : [];
  const unique = [];

  keys.forEach((value) => {
    if (Object.prototype.hasOwnProperty.call(CATEGORY_MAP, value) && !unique.includes(value)) {
      unique.push(value);
    }
  });

  return unique;
}

function getSelectedCategoriesFromForm() {
  const selected = [];
  refs.taskCategories.forEach((input) => {
    if (input.checked) {
      selected.push(input.value);
    }
  });
  return sanitizeCategoryKeys(selected);
}

function setSelectedCategoriesToForm(categoryKeys) {
  const selected = new Set(sanitizeCategoryKeys(categoryKeys));
  refs.taskCategories.forEach((input) => {
    input.checked = selected.has(input.value);
  });
  renderCategorySummary();
}

function renderCategorySummary() {
  const selected = getSelectedCategoriesFromForm();
  if (!refs.taskCategorySummary) {
    return;
  }

  if (!selected.length) {
    refs.taskCategorySummary.textContent = "\u8BF7\u9009\u62E9\u4EFB\u52A1\u7C7B\u522B";
    refs.taskCategorySummary.classList.add("is-empty");
    return;
  }

  refs.taskCategorySummary.textContent = selected.map((key) => CATEGORY_MAP[key] || "-").join(" / ");
  refs.taskCategorySummary.classList.remove("is-empty");
}
function sanitizeImportanceLevel(value) {
  if (Object.prototype.hasOwnProperty.call(IMPORTANCE_LEVEL_MAP, value)) {
    return value;
  }
  return DEFAULT_IMPORTANCE_LEVEL;
}

function getSelectedImportanceLevelFromForm() {
  let selected = DEFAULT_IMPORTANCE_LEVEL;
  refs.taskImportanceLevels.forEach((input) => {
    if (input.checked) {
      selected = input.value;
    }
  });
  return sanitizeImportanceLevel(selected);
}

function setSelectedImportanceLevelToForm(level) {
  const selected = sanitizeImportanceLevel(level);
  refs.taskImportanceLevels.forEach((input) => {
    input.checked = input.value === selected;
  });
}

function handlePriorityChange() {
  if (!refs.taskImportanceWrapper || !refs.taskPriority) {
    return;
  }
  const showImportanceLevel = refs.taskPriority.value === "important_not_urgent";
  refs.taskImportanceWrapper.classList.toggle("is-hidden", !showImportanceLevel);
  if (showImportanceLevel) {
    setSelectedImportanceLevelToForm(getSelectedImportanceLevelFromForm());
  }
}

function formatPriorityLabel(task) {
  const base = PRIORITY_MAP[task.priority] || "-";
  if (task.priority !== "important_not_urgent") {
    return base;
  }
  const level = sanitizeImportanceLevel(task.importanceLevel);
  return `${base} (${IMPORTANCE_LEVEL_MAP[level]})`;
}

function getTaskCategories(task) {
  const categories = sanitizeCategoryKeys(
    Array.isArray(task.categories) ? task.categories : [task.category]
  );
  return categories.length ? categories : ["explore"];
}

function getPrimaryCategory(task) {
  const categories = getTaskCategories(task);
  return categories[0] || "explore";
}

function getCategoryLabels(task) {
  return getTaskCategories(task)
    .map((key) => CATEGORY_MAP[key] || "-")
    .join(" / ");
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
}

function onSubmitTask(event) {
  event.preventDefault();

  const categories = getSelectedCategoriesFromForm();
  const task = {
    id: refs.taskId.value || createTaskId(),
    name: refs.taskName.value.trim(),
    priority: refs.taskPriority.value,
    importanceLevel: refs.taskPriority.value === "important_not_urgent" ? getSelectedImportanceLevelFromForm() : "",
    detail: refs.taskDetail.value.trim(),
    startAt: normalizeDateTimeInput(refs.taskStart ? refs.taskStart.value : ""),
    endAt: normalizeDateTimeInput(refs.taskEnd ? refs.taskEnd.value : ""),
    categories,
    status: refs.taskStatus.value
  };

  if (!task.name) {
    alert("\u8BF7\u8F93\u5165\u4EFB\u52A1\u540D\u79F0\u3002");
    return;
  }

  if (!task.categories.length) {
    alert("\u8BF7\u81F3\u5C11\u9009\u62E9\u4E00\u4E2A\u4EFB\u52A1\u7C7B\u522B\u3002");
    return;
  }

  if (task.detail.length > 200) {
    alert("\u4EFB\u52A1\u8BE6\u60C5\u4E0D\u80FD\u8D85\u8FC7200\u5B57\u3002");
    return;
  }

  if (!task.startAt || !task.endAt) {
    alert("\u8BF7\u586B\u5199\u5F00\u59CB\u548C\u7ED3\u675F\u65F6\u95F4\u3002");
    return;
  }

  const duration = getDurationMinutes(task.startAt, task.endAt);
  if (duration <= 0) {
    alert("\u7ED3\u675F\u65F6\u95F4\u5FC5\u987B\u665A\u4E8E\u5F00\u59CB\u65F6\u95F4\u3002");
    return;
  }

  const existingIndex = state.tasks.findIndex((t) => t.id === task.id);
  if (existingIndex > -1) {
    state.tasks[existingIndex] = task;
  } else {
    state.tasks.push(task);
  }

  saveTasks();
  if (refs.taskCategoryPicker) {
    refs.taskCategoryPicker.open = false;
  }
  resetForm();
  renderAll();
}

function resetForm() {
  refs.form.reset();
  refs.taskId.value = "";
  refs.taskStatus.value = "todo";
  refs.taskPriority.value = "important_urgent";
  setSelectedImportanceLevelToForm(DEFAULT_IMPORTANCE_LEVEL);
  setSelectedCategoriesToForm([]);
  handlePriorityChange();
  if (refs.taskCategoryPicker) {
    refs.taskCategoryPicker.open = false;
  }
  updateDetailCount();
  updateDurationPreview();
}

function updateDetailCount() {
  refs.detailCount.textContent = `${refs.taskDetail.value.length}/200`;
}

function updateDurationPreview() {
  if (!refs.taskStart || !refs.taskEnd || !refs.durationPreview) {
    return;
  }
  const minutes = getDurationMinutes(refs.taskStart.value, refs.taskEnd.value);
  refs.durationPreview.textContent = minutes > 0 ? formatDuration(minutes) : "--";
}

function renderAll() {
  renderBoard();
  renderDailyOverview();
}

function setDailyView(view) {
  if (view !== "timeline" && view !== "pie") {
    return;
  }
  state.dailyView = view;
  applyDailyViewMode();
  renderDailyOverview();
}

function applyDailyViewMode() {
  const showTimeline = state.dailyView === "timeline";
  refs.timeline.classList.toggle("is-hidden", !showTimeline);
  refs.timelineLegend.classList.toggle("is-hidden", !showTimeline);
  refs.pieWrapper.classList.toggle("is-hidden", showTimeline);
  refs.viewTimelineBtn.classList.toggle("is-active", showTimeline);
  refs.viewPieBtn.classList.toggle("is-active", !showTimeline);
  if (showTimeline) {
    hidePieTooltip();
  }
}

function renderBoard() {
  Object.values(STATUS_COLUMNS).forEach((columnId) => {
    const column = document.getElementById(columnId);
    column.innerHTML = "";
  });

  const statusCount = { todo: 0, doing: 0, done: 0 };
  const groupedTasksByStatus = Object.fromEntries(
    Object.keys(STATUS_COLUMNS).map((status) => [
      status,
      Object.fromEntries(DONE_TIME_GROUPS.map((group) => [group.key, []]))
    ])
  );
  const sortedTasks = [...state.tasks]
    .filter((task) => isTaskInDate(task, state.boardDate))
    .sort((a, b) => {
      const aStart = parseDateTime(a.startAt);
      const bStart = parseDateTime(b.startAt);
      const aTs = aStart ? aStart.getTime() : Number.MAX_SAFE_INTEGER;
      const bTs = bStart ? bStart.getTime() : Number.MAX_SAFE_INTEGER;
      return aTs - bTs;
    });

  sortedTasks.forEach((task) => {
    const status = Object.prototype.hasOwnProperty.call(STATUS_COLUMNS, task.status) ? task.status : "todo";
    const groupKey = getTaskTimeGroup(task, state.boardDate);
    groupedTasksByStatus[status][groupKey].push(task);

    statusCount[status] += 1;
  });

  Object.entries(STATUS_COLUMNS).forEach(([status, columnId]) => {
    const column = document.getElementById(columnId);
    renderTimeGroupsByStatus(column, status, groupedTasksByStatus[status]);
  });

  refs.countTodo.textContent = String(statusCount.todo);
  refs.countDoing.textContent = String(statusCount.doing);
  refs.countDone.textContent = String(statusCount.done);
}

function renderTimeGroupsByStatus(column, status, groupedTasks) {
  DONE_TIME_GROUPS.forEach((group) => {
    const count = groupedTasks[group.key].length;
    const isCollapsed = getBoardTimeGroupCollapsed(status, group.key);

    const section = document.createElement("section");
    section.className = "done-time-group";

    const list = document.createElement("div");
    list.className = "done-time-list";
    list.id = `time-list-${status}-${group.key}`;
    list.hidden = isCollapsed;
    if (!count) {
      const empty = document.createElement("div");
      empty.className = "empty-done-time-group";
      empty.textContent = "\u6682\u65E0\u4EFB\u52A1";
      list.appendChild(empty);
    } else {
      groupedTasks[group.key].forEach((task) => {
        list.appendChild(createTaskCard(task));
      });
    }

    const title = document.createElement("h4");
    title.className = "done-time-group-title";

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "done-time-group-toggle secondary";
    toggle.setAttribute("aria-controls", list.id);
    applyDoneTimeGroupCollapsedState(toggle, isCollapsed, group.label, count);
    toggle.addEventListener("click", () => {
      const next = !getBoardTimeGroupCollapsed(status, group.key);
      state.boardGroupCollapsed[status][group.key] = next;
      applyDoneTimeGroupCollapsedState(toggle, next, group.label, count);
      list.hidden = next;
    });

    title.appendChild(toggle);
    section.appendChild(title);

    section.appendChild(list);
    column.appendChild(section);
  });
}

function getBoardTimeGroupCollapsed(status, groupKey) {
  const safeStatus = Object.prototype.hasOwnProperty.call(STATUS_COLUMNS, status) ? status : "todo";
  if (!Object.prototype.hasOwnProperty.call(state.boardGroupCollapsed, safeStatus)) {
    state.boardGroupCollapsed[safeStatus] = Object.fromEntries(
      DONE_TIME_GROUPS.map((group) => [group.key, true])
    );
  }
  if (!Object.prototype.hasOwnProperty.call(state.boardGroupCollapsed[safeStatus], groupKey)) {
    state.boardGroupCollapsed[safeStatus][groupKey] = true;
  }
  return state.boardGroupCollapsed[safeStatus][groupKey];
}

function applyDoneTimeGroupCollapsedState(toggleButton, isCollapsed, label, count) {
  const icon = isCollapsed ? "\u25B6" : "\u25BC";
  const actionText = isCollapsed ? "\u5C55\u5F00" : "\u6298\u53E0";
  toggleButton.textContent = `${icon} ${label} (${count})`;
  toggleButton.setAttribute("aria-expanded", String(!isCollapsed));
  toggleButton.setAttribute("aria-label", `${actionText}${label}`);
}

function getTaskTimeGroup(task, dateValue) {
  const effectiveStart = getTaskEffectiveStartOnDate(task, dateValue);
  if (!effectiveStart) {
    return "evening";
  }

  const hour = effectiveStart.getHours();
  if (hour < 12) {
    return "morning";
  }
  if (hour < 18) {
    return "afternoon";
  }
  return "evening";
}

function getTaskEffectiveStartOnDate(task, dateValue) {
  const range = getTaskRange(task);
  if (!range) {
    return parseDateTime(task.startAt);
  }

  if (!dateValue) {
    return range.start;
  }

  const dayStart = new Date(`${dateValue}T00:00`);
  const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
  if (range.end <= dayStart || range.start >= dayEnd) {
    return null;
  }

  return new Date(Math.max(range.start.getTime(), dayStart.getTime()));
}

function isTaskInDate(task, dateValue) {
  if (!dateValue) {
    return true;
  }
  const dayStart = new Date(`${dateValue}T00:00`);
  const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
  return intersects(task, dayStart, dayEnd);
}

function quickCreateTask(status) {
  refs.taskId.value = "";
  refs.taskStatus.value = Object.prototype.hasOwnProperty.call(STATUS_COLUMNS, status) ? status : "todo";

  if (!refs.taskStart || !refs.taskEnd) {
    refs.taskName.scrollIntoView({ behavior: "smooth", block: "center" });
    refs.taskName.focus();
    return;
  }

  if (!refs.taskStart.value && !refs.taskEnd.value) {
    const baseDate = refs.boardDate.value || state.boardDate || toDateInputValue(new Date());
    refs.taskStart.value = `${baseDate}T09:00`;
    refs.taskEnd.value = `${baseDate}T09:30`;
  }

  updateDurationPreview();
  refs.taskName.scrollIntoView({ behavior: "smooth", block: "center" });
  refs.taskName.focus();
}

function createTaskCard(task) {
  const fragment = refs.template.content.cloneNode(true);
  const card = fragment.querySelector(".task-card");
  const toggleButton = fragment.querySelector(".card-toggle");

  fragment.querySelector(".card-title").textContent = task.name;
  fragment.querySelector(".card-time-range").textContent = `(${formatCardTimeRange(task.startAt, task.endAt)})`;
  fragment.querySelector(".priority-pill").textContent = formatPriorityLabel(task);
  fragment.querySelector(".card-detail").textContent = task.detail || "\u65E0\u8BE6\u60C5";
  fragment.querySelector(".card-start").textContent = formatDateTime(task.startAt);
  fragment.querySelector(".card-end").textContent = formatDateTime(task.endAt);
  fragment.querySelector(".card-duration").textContent = formatDuration(getDurationMinutes(task.startAt, task.endAt));
  fragment.querySelector(".card-category").textContent = getCategoryLabels(task);

  const isCollapsed = getCardCollapsed(task.id);
  applyCardCollapsedState(card, toggleButton, isCollapsed);

  toggleButton.addEventListener("click", () => {
    const next = !getCardCollapsed(task.id);
    state.collapsedById[task.id] = next;
    applyCardCollapsedState(card, toggleButton, next);
  });

  const statusSelect = fragment.querySelector(".card-status");
  statusSelect.value = task.status;
  statusSelect.addEventListener("change", (event) => {
    task.status = event.target.value;
    saveTasks();
    renderBoard();
  });

  fragment.querySelector(".card-edit").addEventListener("click", () => fillForm(task));
  fragment.querySelector(".card-delete").addEventListener("click", () => deleteTask(task.id));

  return fragment;
}

function getCardCollapsed(taskId) {
  if (!Object.prototype.hasOwnProperty.call(state.collapsedById, taskId)) {
    state.collapsedById[taskId] = true;
  }
  return state.collapsedById[taskId];
}

function applyCardCollapsedState(card, toggleButton, isCollapsed) {
  card.classList.toggle("is-collapsed", isCollapsed);
  toggleButton.textContent = isCollapsed ? "\u5C55\u5F00" : "\u6298\u53E0";
  toggleButton.setAttribute("aria-expanded", String(!isCollapsed));
}

function fillForm(task) {
  refs.taskId.value = task.id;
  refs.taskName.value = task.name;
  refs.taskPriority.value = task.priority;
  setSelectedImportanceLevelToForm(task.importanceLevel);
  handlePriorityChange();
  refs.taskDetail.value = task.detail;
  if (refs.taskStart && refs.taskEnd) {
    refs.taskStart.value = task.startAt;
    refs.taskEnd.value = task.endAt;
  }
  setSelectedCategoriesToForm(getTaskCategories(task));
  refs.taskStatus.value = task.status;
  updateDetailCount();
  updateDurationPreview();
  refs.taskName.scrollIntoView({ behavior: "smooth", block: "center" });
  refs.taskName.focus();
}

function deleteTask(taskId) {
  if (!confirm("\u786E\u8BA4\u5220\u9664\u8BE5\u4EFB\u52A1\u5417\uFF1F")) {
    return;
  }
  state.tasks = state.tasks.filter((task) => task.id !== taskId);
  delete state.collapsedById[taskId];
  saveTasks();
  renderAll();
}

function renderDailyOverview() {
  const day = refs.selectedDate.value || state.selectedDate;
  const dayStart = new Date(`${day}T00:00`);
  const totalSlots = (24 * 60) / SLOT_MINUTES;
  const slots = Array.from({ length: totalSlots }, (_, idx) => {
    const start = new Date(dayStart.getTime() + idx * SLOT_MINUTES * 60 * 1000);
    const end = new Date(start.getTime() + SLOT_MINUTES * 60 * 1000);
    return { start, end };
  });

  refs.timeline.innerHTML = "";

  slots.forEach((slot, idx) => {
    const el = document.createElement("div");
    el.className = "slot";

    const segments = getSlotSegments(slot.start, slot.end);
    const startText = formatShortTime(slot.start);
    const endText = formatShortTime(slot.end);

    if (segments.length) {
      const tooltipParts = [];
      segments.forEach((segment) => {
        const fill = document.createElement("span");
        fill.className = `slot-fill slot-${getPrimaryCategory(segment.task)}`;
        fill.style.left = `${(segment.offsetMinutes / SLOT_MINUTES) * 100}%`;
        fill.style.width = `${(segment.overlapMinutes / SLOT_MINUTES) * 100}%`;
        el.appendChild(fill);

        tooltipParts.push(`${segment.task.name} (${getCategoryLabels(segment.task)} ${Math.round(segment.overlapMinutes)}m)`);
      });
      el.title = `${startText}-${endText} | ${tooltipParts.join("\uFF1B")}`;
    } else {
      el.title = `${startText}-${endText} | \u7A7A\u4F59`;
    }

    if (idx % (60 / SLOT_MINUTES) === 0) {
      el.dataset.label = `${slot.start.getHours()}:00`;
    }

    refs.timeline.appendChild(el);
  });

  const stats = computeDailyStats(day);
  refs.summaryUsed.textContent = formatDuration(stats.usedMinutes);
  refs.summaryFree.textContent = formatDuration(stats.freeMinutes);
  renderLegend(stats.categoryTotals, stats.freeMinutes);
  renderTaskPie(stats.taskTotals, stats.usedMinutes);
  applyDailyViewMode();
}

function getSlotSegments(slotStart, slotEnd) {
  return state.tasks
    .map((task) => {
      const range = getTaskRange(task);
      if (!range) {
        return null;
      }

      const overlapStart = Math.max(range.start.getTime(), slotStart.getTime());
      const overlapEnd = Math.min(range.end.getTime(), slotEnd.getTime());
      if (overlapEnd <= overlapStart) {
        return null;
      }

      return {
        task,
        offsetMinutes: (overlapStart - slotStart.getTime()) / 60000,
        overlapMinutes: (overlapEnd - overlapStart) / 60000
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.offsetMinutes - b.offsetMinutes);
}

function computeDailyStats(day) {
  const dayStart = new Date(`${day}T00:00`);
  const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
  const totals = Object.fromEntries(Object.keys(CATEGORY_MAP).map((key) => [key, 0]));
  const taskTotals = [];
  let usedMinutes = 0;

  state.tasks.forEach((task) => {
    const range = getTaskRange(task);
    if (!range) {
      return;
    }

    const overlap = getOverlapMinutes(range.start, range.end, dayStart, dayEnd);
    if (overlap <= 0) {
      return;
    }

    usedMinutes += overlap;

    const categories = getTaskCategories(task);
    const share = overlap / categories.length;
    categories.forEach((category) => {
      if (Object.prototype.hasOwnProperty.call(totals, category)) {
        totals[category] += share;
      }
    });

    taskTotals.push({
      id: task.id,
      name: task.name,
      categories,
      minutes: overlap
    });
  });

  taskTotals.sort((a, b) => b.minutes - a.minutes);

  return {
    usedMinutes,
    freeMinutes: Math.max(0, 24 * 60 - usedMinutes),
    categoryTotals: totals,
    taskTotals
  };
}

function renderTaskPie(taskTotals, usedMinutes) {
  refs.pieLegend.innerHTML = "";

  if (!usedMinutes || !taskTotals.length) {
    state.pieSegments = [];
    state.pieUsedMinutes = 0;
    state.pieDefaultCenterText = "\u6682\u65E0\u8BB0\u5F55";
    refs.taskPie.style.background = "conic-gradient(var(--empty) 0 100%)";
    refs.taskPieCenter.textContent = state.pieDefaultCenterText;

    const emptyItem = document.createElement("p");
    emptyItem.className = "pie-legend-empty";
    emptyItem.textContent = "\u5F53\u524D\u65E5\u671F\u6682\u65E0\u4EFB\u52A1\u7528\u65F6\u8BB0\u5F55";
    refs.pieLegend.appendChild(emptyItem);
    hidePieTooltip();
    return;
  }

  const segments = [];
  let cursor = 0;

  taskTotals.forEach((item, idx) => {
    const color = PIE_COLORS[idx % PIE_COLORS.length];
    const percent = (item.minutes / usedMinutes) * 100;
    const end = cursor + percent;

    segments.push({
      ...item,
      color,
      percent,
      start: cursor,
      end
    });

    const row = document.createElement("div");
    row.className = "pie-legend-item";
    row.dataset.segmentIndex = String(idx);

    const dot = document.createElement("i");
    dot.className = "pie-legend-dot";
    dot.style.background = color;

    const categoryText = item.categories.map((key) => CATEGORY_MAP[key] || "-").join(" / ");
    const text = document.createElement("span");
    text.textContent = `${item.name} (${categoryText}) \u00B7 ${formatDuration(item.minutes)} \u00B7 ${percent.toFixed(1)}%`;

    row.appendChild(dot);
    row.appendChild(text);
    row.addEventListener("mouseenter", () => {
      setActivePieSegment(idx);
    });
    row.addEventListener("mouseleave", () => {
      clearPieHover();
    });
    refs.pieLegend.appendChild(row);

    cursor = end;
  });

  state.pieSegments = segments;
  state.pieUsedMinutes = usedMinutes;
  state.pieDefaultCenterText = `\u5DF2\u8BB0\u5F55 ${formatDuration(usedMinutes)}`;
  refs.taskPieCenter.textContent = state.pieDefaultCenterText;
  setActivePieSegment(-1);
  hidePieTooltip();
}

function bindPieInteractions() {
  refs.taskPie.addEventListener("mousemove", onPiePointerMove);
  refs.taskPie.addEventListener("mouseleave", clearPieHover);
}

function onPiePointerMove(event) {
  if (!state.pieSegments.length) {
    clearPieHover();
    return;
  }

  const hit = getPieSegmentHit(event);
  if (!hit) {
    clearPieHover();
    return;
  }

  setActivePieSegment(hit.index);
  showPieTooltip(event, state.pieSegments[hit.index]);

  const rect = refs.taskPie.getBoundingClientRect();
  const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
  const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
  refs.taskPie.style.transform = `translate(${offsetX * 6}px, ${offsetY * 6}px) scale(1.03)`;
  refs.taskPieCenter.style.transform = `translate(${offsetX * -4}px, ${offsetY * -4}px)`;
}

function getPieSegmentHit(event) {
  const rect = refs.taskPie.getBoundingClientRect();
  const x = event.clientX - rect.left - rect.width / 2;
  const y = event.clientY - rect.top - rect.height / 2;
  const distance = Math.sqrt(x * x + y * y);
  const outerRadius = rect.width / 2;
  const innerRadius = outerRadius * PIE_INNER_RADIUS_RATIO;

  if (distance < innerRadius || distance > outerRadius) {
    return null;
  }

  let deg = (Math.atan2(y, x) * 180) / Math.PI + 90;
  if (deg < 0) {
    deg += 360;
  }

  const percent = (deg / 360) * 100;
  const index = state.pieSegments.findIndex((segment) => {
    if (segment.end >= 100 && percent === 100) {
      return true;
    }
    return percent >= segment.start && percent < segment.end;
  });

  if (index < 0) {
    return null;
  }

  return { index, percent };
}

function setActivePieSegment(index) {
  const active = Number.isInteger(index) ? index : -1;
  state.pieActiveIndex = active;
  refs.taskPie.style.background = buildPieGradient(active);

  const legendRows = refs.pieLegend.querySelectorAll(".pie-legend-item");
  legendRows.forEach((row, rowIdx) => {
    row.classList.toggle("is-active", rowIdx === active);
  });

  if (active >= 0 && state.pieSegments[active]) {
    const segment = state.pieSegments[active];
    const categoryText = segment.categories.map((key) => CATEGORY_MAP[key] || "-").join(" / ");
    refs.taskPieCenter.textContent = `${segment.name}` + "\n" + categoryText + "\n" + `${formatDuration(segment.minutes)} \u00B7 ${segment.percent.toFixed(1)}%`;
  } else {
    refs.taskPieCenter.textContent = state.pieDefaultCenterText;
  }
}

function buildPieGradient(activeIndex) {
  if (!state.pieSegments.length) {
    return "conic-gradient(var(--empty) 0 100%)";
  }

  const stops = state.pieSegments.map((segment, idx) => {
    const color = idx === activeIndex ? lightenHex(segment.color, 0.2) : segment.color;
    return `${color} ${segment.start}% ${segment.end}%`;
  });

  return `conic-gradient(${stops.join(",")})`;
}

function clearPieHover() {
  setActivePieSegment(-1);
  refs.taskPie.style.transform = "";
  refs.taskPieCenter.style.transform = "";
  hidePieTooltip();
}

function showPieTooltip(event, segment) {
  refs.pieTooltip.textContent = `${segment.name} \u00B7 ${formatDuration(segment.minutes)} \u00B7 ${segment.percent.toFixed(1)}%`;
  refs.pieTooltip.classList.remove("is-hidden");
  refs.pieTooltip.style.left = `${event.clientX + 14}px`;
  refs.pieTooltip.style.top = `${event.clientY - 30}px`;
}

function hidePieTooltip() {
  refs.pieTooltip.classList.add("is-hidden");
}

function lightenHex(hex, ratio) {
  const value = hex.replace("#", "");
  if (value.length !== 6) {
    return hex;
  }

  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);

  const nr = Math.round(r + (255 - r) * ratio);
  const ng = Math.round(g + (255 - g) * ratio);
  const nb = Math.round(b + (255 - b) * ratio);

  return `#${toHex(nr)}${toHex(ng)}${toHex(nb)}`;
}

function toHex(value) {
  return value.toString(16).padStart(2, "0");
}

function renderLegend(categoryTotals, freeMinutes) {
  refs.timelineLegend.innerHTML = "";
  Object.entries(CATEGORY_MAP).forEach(([key, label]) => {
    const item = document.createElement("span");
    item.className = "legend-item";
    item.innerHTML = `<i class="legend-dot slot-${key}"></i>${label}: ${formatDuration(Math.round(categoryTotals[key] || 0))}`;
    refs.timelineLegend.appendChild(item);
  });

  const empty = document.createElement("span");
  empty.className = "legend-item";
  empty.innerHTML = `<i class="legend-dot" style="background: var(--empty)"></i>\u7A7A\u4F59: ${formatDuration(freeMinutes)}`;
  refs.timelineLegend.appendChild(empty);
}

function getDurationMinutes(startAt, endAt) {
  const start = parseDateTime(startAt);
  const end = parseDateTime(endAt);
  if (!start || !end) {
    return 0;
  }
  const diff = Math.round((end.getTime() - start.getTime()) / 60000);
  return Number.isFinite(diff) ? diff : 0;
}

function intersects(task, slotStart, slotEnd) {
  const range = getTaskRange(task);
  if (!range) {
    return false;
  }
  return range.end > slotStart && range.start < slotEnd;
}

function getOverlapMinutes(startA, endA, startB, endB) {
  const start = Math.max(startA.getTime(), startB.getTime());
  const end = Math.min(endA.getTime(), endB.getTime());
  if (!Number.isFinite(start) || !Number.isFinite(end)) {
    return 0;
  }
  if (end <= start) {
    return 0;
  }
  return Math.round((end - start) / 60000);
}

function formatDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())} ${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
}

function formatShortTime(value) {
  const date = new Date(value);
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
}

function formatCardTimeRange(startAt, endAt) {
  const start = parseDateTime(startAt);
  const end = parseDateTime(endAt);
  if (!start || !end) {
    return "-";
  }
  return `${formatHourMinute(start)}-${formatHourMinute(end)}`;
}

function formatHourMinute(date) {
  return `${date.getHours()}:${pad2(date.getMinutes())}`;
}

function formatDuration(minutes) {
  const totalMinutes = Math.max(0, Math.round(minutes));
  if (!Number.isFinite(totalMinutes) || totalMinutes <= 0) {
    return "0h 0m";
  }
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h}h ${m}m`;
}

function toDateInputValue(date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function pad2(num) {
  return String(num).padStart(2, "0");
}









