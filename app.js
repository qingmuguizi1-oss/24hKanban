const STORAGE_KEY = "time-efficiency-tasks-v1";
const TASKS_LAST_LOCAL_MUTATION_AT_STORAGE_KEY = "time-efficiency-tasks-last-local-mutation-at-v1";
const TASK_FORM_DRAFT_STORAGE_KEY = "time-efficiency-task-form-draft-v1";
const CATEGORY_DEFINITIONS_STORAGE_KEY = "time-efficiency-category-definitions-v1";
const TASK_CATEGORY_SUBCATEGORY_CONFIG_STORAGE_KEY = "time-efficiency-task-category-subcategory-config-v1";
const CLOUD_IMPORT_MARKER_PREFIX = "time-efficiency-cloud-imported";
const VOICE_EFFECTS_STORAGE_KEY = "time-efficiency-voice-effects-enabled";

const CLOUDBASE_ENV_ID = "jieyou-3gr01mvob9ad92de";
const CLOUDBASE_TASKS_COLLECTION = "time_efficiency_user_tasks";
const CLOUDBASE_SYNC_DEBOUNCE_MS = 800;
const CODE_RESEND_SECONDS = 60;
const PASSWORD_MIN_LENGTH = 6;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CLOUDBASE_SDK_URLS = [
  "https://static.cloudbase.net/cloudbase-js-sdk/latest/cloudbase.full.js",
  "https://imgcache.qq.com/qcloud/tcbjs/1.6.7/tcb.js"
];
const AUTH_MODE = {
  CODE: "code",
  PASSWORD: "password",
  SETUP: "setup"
};
const AUTH_MODE_COPY = {
  [AUTH_MODE.CODE]: {
    title: "\u9a8c\u8bc1\u7801\u767b\u5f55",
    description: "\u65e0\u9700\u8bb0\u5fc6\u5bc6\u7801\uff0c\u4f7f\u7528\u90ae\u7bb1\u9a8c\u8bc1\u7801\u5feb\u6377\u767b\u5f55",
    sendText: "\u53d1\u9001\u9a8c\u8bc1\u7801",
    resendText: "\u6ca1\u6709\u6536\u5230\uff1f\u91cd\u65b0\u53d1\u9001",
    submitText: "\u786e\u8ba4\u767b\u5f55",
    footnote: "\u672a\u6ce8\u518c\u7684\u90ae\u7bb1\u5c06\u81ea\u52a8\u521b\u5efa\u8d26\u53f7"
  },
  [AUTH_MODE.PASSWORD]: {
    title: "\u90ae\u7bb1\u5bc6\u7801\u767b\u5f55",
    description: "\u4f7f\u7528\u90ae\u7bb1\u548c\u5bc6\u7801\u76f4\u63a5\u767b\u5f55\uff0c\u4fdd\u6301\u73b0\u6709\u9879\u76ee\u7684\u8f7b\u91cf\u4f53\u9a8c",
    sendText: "",
    resendText: "",
    submitText: "\u767b\u5f55",
    footnote: "\u8fd8\u6ca1\u6709\u8bbe\u7f6e\u5bc6\u7801\uff1f\u5207\u6362\u5230\u201c\u8bbe\u7f6e\u5bc6\u7801\u201d\u5373\u53ef\u5b8c\u6210\u521d\u59cb\u5316\u6216\u91cd\u7f6e"
  },
  [AUTH_MODE.SETUP]: {
    title: "\u8bbe\u7f6e\u5bc6\u7801",
    description: "\u5148\u9a8c\u8bc1\u90ae\u7bb1\uff0c\u518d\u4e3a\u5f53\u524d\u8d26\u53f7\u8bbe\u7f6e\u6216\u91cd\u7f6e\u5bc6\u7801",
    sendText: "\u53d1\u9001\u9a8c\u8bc1\u90ae\u4ef6",
    resendText: "\u6ca1\u6709\u6536\u5230\uff1f\u91cd\u65b0\u53d1\u9001",
    submitText: "\u786e\u8ba4\u8bbe\u7f6e\u5bc6\u7801",
    footnote: "\u5efa\u8bae\u81f3\u5c11\u7528\u9a8c\u8bc1\u7801\u767b\u5f55\u8fc7\u4e00\u6b21\uff0c\u786e\u4fdd\u8be5\u90ae\u7bb1\u5df2\u5728 CloudBase \u4e2d\u5efa\u7acb\u8d26\u53f7"
  }
};

const DAILY_QUOTES = [
  { text: "\u957f\u98ce\u7834\u6d6a\u4f1a\u6709\u65f6\uff0c\u76f4\u6302\u4e91\u5e06\u6d4e\u6ca7\u6d77\u3002", source: "\u674e\u767d\u300a\u884c\u8def\u96be\u300b" },
  { text: "\u4e24\u5cb8\u733f\u58f0\u557c\u4e0d\u4f4f\uff0c\u8f7b\u821f\u5df2\u8fc7\u4e07\u91cd\u5c71\u3002", source: "\u674e\u767d\u300a\u65e9\u53d1\u767d\u5e1d\u57ce\u300b" },
  { text: "\u4f1a\u5f53\u51cc\u7edd\u9876\uff0c\u4e00\u89c8\u4f17\u5c71\u5c0f\u3002", source: "\u675c\u752b\u300a\u671b\u5cb3\u300b" },
  { text: "\u5343\u78e8\u4e07\u51fb\u8fd8\u575a\u52b2\uff0c\u4efb\u5c14\u4e1c\u897f\u5357\u5317\u98ce\u3002", source: "\u90d1\u71ee\u300a\u7af9\u77f3\u300b" },
  { text: "\u8def\u6f2b\u6f2b\u5176\u4fee\u8fdc\u516e\uff0c\u543e\u5c06\u4e0a\u4e0b\u800c\u6c42\u7d22\u3002", source: "\u5c48\u539f\u300a\u79bb\u9a9a\u300b" },
  { text: "\u5929\u884c\u5065\uff0c\u541b\u5b50\u4ee5\u81ea\u5f3a\u4e0d\u606f\u3002", source: "\u300a\u5468\u6613\u300b" },
  { text: "\u5c71\u91cd\u6c34\u590d\u7591\u65e0\u8def\uff0c\u67f3\u6697\u82b1\u660e\u53c8\u4e00\u6751\u3002", source: "\u9646\u6e38\u300a\u6e38\u5c71\u897f\u6751\u300b" },
  { text: "\u83ab\u542c\u7a7f\u6797\u6253\u53f6\u58f0\uff0c\u4f55\u59a8\u541f\u5578\u4e14\u5f90\u884c\u3002", source: "\u82cf\u8f7c\u300a\u5b9a\u98ce\u6ce2\u300b" },
  { text: "\u4e16\u4e0a\u65e0\u96be\u4e8b\uff0c\u53ea\u8981\u80af\u767b\u6500\u3002", source: "\u6bdb\u6cfd\u4e1c" },
  { text: "\u7eb5\u6709\u75be\u98ce\u8d77\uff0c\u4eba\u751f\u4e0d\u8a00\u5f03\u3002", source: "\u4f5a\u540d" }
];

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
const URGENT_LEVEL_MAP = {
  urgent1: "1\u7EA7",
  urgent2: "2\u7EA7",
  urgent3: "3\u7EA7"
};
const DEFAULT_IMPORTANCE_LEVEL = "level2";
const DEFAULT_URGENT_LEVEL = "urgent3";
const MOOD_MAP = {
  excited: "\uD83E\uDD29 \u5174\u594B",
  relaxed: "\uD83D\uDE0C \u8F7B\u677E",
  okay: "\uD83D\uDE42 \u5C1A\u53EF",
  tired: "\uD83D\uDE2B \u75B2\u60EB",
  painful: "\uD83D\uDE16 \u75DB\u82E6"
};
const DEFAULT_MOOD = "";
const PROCESS_MAP = {
  very_smooth: "\uD83D\uDE04 \u975E\u5E38\u987A\u5229",
  fairly_smooth: "\uD83D\uDE42 \u8F83\u4E3A\u987A\u5229",
  normal: "\uD83D\uDE10 \u4E00\u822C",
  fairly_unsmooth: "\uD83D\uDE23 \u8F83\u4E3A\u4E0D\u987A",
  very_unsmooth: "\uD83D\uDE2D \u975E\u5E38\u4E0D\u987A"
};
const DEFAULT_PROCESS = "";
const DEFAULT_OPTIONAL_TAG_MODE = "mood";
const AUTO_URGENT_ESCALATION_DAY_LEVELS = [
  { minDays: 5, level: "urgent1" },
  { minDays: 3, level: "urgent2" },
  { minDays: 1, level: "urgent3" }
];
const DEFAULT_CATEGORY_DEFINITIONS = [
  { key: "work", label: "\uD83D\uDCBC \u5DE5\u4F5C", color: "#ffe51f" },
  { key: "explore", label: "\uD83D\uDEA2 \u63A2\u7D22", color: "#3c79c3" },
  { key: "topic", label: "\uD83D\uDCDA \u8BFE\u9898", color: "#7f5abf" },
  { key: "dev", label: "\uD83D\uDCBB \u5F00\u53D1", color: "#d66b16" },
  { key: "inspiration", label: "\uD83D\uDCA1 \u7075\u611F", color: "#9b5de5" },
  { key: "study", label: "\uD83D\uDCD8 \u5B66\u4E60", color: "#d66b16" },
  { key: "sport", label: "\uD83C\uDFC3 \u8FD0\u52A8", color: "#2f9a72" },
  { key: "relax", label: "\uD83E\uDDD8 \u653E\u677E", color: "#2f9a72" },
  { key: "sleep", label: "\uD83D\uDE34 \u7761\u89C9", color: "#2f9a72" },
  { key: "meal", label: "\uD83C\uDF7D \u7528\u9910", color: "#52e145" },
  { key: "record", label: "\uD83D\uDCDD \u8BB0\u5F55", color: "#8b6f47" },
  { key: "entertainment", label: "\uD83C\uDFAE \u5A31\u4E50", color: "#d94f7f" },
  { key: "other", label: "\uD83E\uDDE9 \u5176\u4ED6", color: "#8c8c8c" }
];
const DEFAULT_CATEGORY_LABEL = "\uD83E\uDDE9 \u672A\u547D\u540D";
const DEFAULT_CATEGORY_COLOR = "#8c8c8c";
const TASK_CATEGORY_DEFAULT_PLANNED_MINUTES = 4 * 60;
const TASK_CATEGORY_GROUPS = [
  {
    key: "work",
    label: "\u5DE5\u4F5C",
    icon: "\uD83D\uDCBC",
    description: "\u805A\u7126\u4EA4\u4ED8\u3001\u534F\u540C\u4E0E\u7A33\u5B9A\u63A8\u8FDB",
    subcategories: [
      { key: "meeting", label: "\u4F1A\u8BAE", keywords: ["\u4F1A\u8BAE", "\u8BC4\u5BA1", "\u6C47\u62A5", "\u6C9F\u901A"] },
      { key: "coordination", label: "\u534F\u540C", keywords: ["\u5BF9\u63A5", "\u534F\u540C", "\u8DDF\u8FDB", "\u63A8\u8FDB"] },
      { key: "delivery", label: "\u4EA4\u4ED8", keywords: ["\u4EA4\u4ED8", "\u63D0\u4EA4", "\u8F93\u51FA", "\u4E0A\u7EBF"] },
      { key: "review", label: "\u590D\u76D8", keywords: ["\u590D\u76D8", "\u603B\u7ED3", "\u56DE\u987E", "\u6C47\u603B"] },
      { key: "other", label: "\u5176\u4ED6" }
    ]
  },
  {
    key: "explore",
    label: "\u63A2\u7D22",
    icon: "\uD83E\uDDED",
    description: "\u4EE5\u8C03\u7814\u548C\u8BD5\u9A8C\u4E3A\u4E3B\u7684\u65B0\u65B9\u5411\u6478\u7D22",
    subcategories: [
      { key: "research", label: "\u8C03\u7814", keywords: ["\u8C03\u7814", "\u7814\u7A76", "\u68C0\u7D22", "\u8D44\u6599"] },
      { key: "benchmark", label: "\u7ADE\u54C1", keywords: ["\u7ADE\u54C1", "\u5BF9\u6807", "\u53C2\u8003", "\u62C6\u89E3"] },
      { key: "experiment", label: "\u8BD5\u9A8C", keywords: ["\u8BD5\u9A8C", "demo", "proof", "poc", "\u9A8C\u8BC1"] },
      { key: "insight", label: "\u6D1E\u5BDF", keywords: ["\u6D1E\u5BDF", "\u7075\u611F", "\u53D1\u73B0", "\u5077\u5E08"] },
      { key: "other", label: "\u5176\u4ED6" }
    ]
  },
  {
    key: "topic",
    label: "\u8BFE\u9898",
    icon: "\uD83D\uDCD1",
    description: "\u56F4\u7ED5\u4E13\u9898\u8FDB\u884C\u62C6\u89E3\u3001\u5199\u4F5C\u548C\u6DF1\u5EA6\u601D\u8003",
    subcategories: [
      { key: "paper", label: "\u8D44\u6599", keywords: ["\u8D44\u6599", "\u6587\u6863", "\u6587\u732E", "\u8BBA\u6587"] },
      { key: "analysis", label: "\u62C6\u89E3", keywords: ["\u62C6\u89E3", "\u5206\u6790", "\u7ED3\u6784", "\u5927\u7EB2"] },
      { key: "writing", label: "\u5199\u4F5C", keywords: ["\u5199", "\u8349\u7A3F", "\u65B9\u6848", "\u7A3F"] },
      { key: "discussion", label: "\u7814\u8BA8", keywords: ["\u8BA8\u8BBA", "\u7814\u8BA8", "\u8BFE\u9898", "\u4E13\u9898"] },
      { key: "other", label: "\u5176\u4ED6" }
    ]
  },
  {
    key: "dev",
    label: "\u5F00\u53D1",
    icon: "\uD83D\uDCBB",
    description: "\u9762\u5411\u4EA7\u54C1\u6216\u5DE5\u5177\u7684\u8BBE\u8BA1\u3001\u5F00\u53D1\u548C\u4FEE\u590D",
    subcategories: [
      { key: "coding", label: "\u7F16\u7801", keywords: ["\u5F00\u53D1", "\u7F16\u7801", "code", "\u5B9E\u73B0"] },
      { key: "debug", label: "\u8C03\u8BD5", keywords: ["bug", "\u8C03\u8BD5", "\u4FEE\u590D", "\u62A5\u9519"] },
      { key: "refactor", label: "\u91CD\u6784", keywords: ["\u91CD\u6784", "\u4F18\u5316", "\u6574\u7406", "\u62BD\u8C61"] },
      { key: "testing", label: "\u8054\u8C03", keywords: ["\u6D4B\u8BD5", "\u8054\u8C03", "\u9A8C\u6536", "\u53D1\u5E03"] },
      { key: "other", label: "\u5176\u4ED6" }
    ]
  },
  {
    key: "study",
    label: "\u5B66\u4E60",
    icon: "\uD83D\uDCD8",
    description: "\u4EE5\u5438\u6536\u3001\u5185\u5316\u548C\u7EC3\u4E60\u4E3A\u76EE\u6807\u7684\u65F6\u95F4\u6295\u5165",
    subcategories: [
      { key: "reading", label: "\u9605\u8BFB", keywords: ["\u9605\u8BFB", "\u8BFB\u4E66", "\u8BFB", "\u7CBE\u8BFB"] },
      { key: "english", label: "\u82F1\u8BED", keywords: ["\u82F1\u8BED", "english", "\u5355\u8BCD", "\u53E3\u8BED"] },
      { key: "course", label: "\u8BFE\u7A0B", keywords: ["\u8BFE\u7A0B", "\u4E0A\u8BFE", "\u542C\u8BFE", "\u5B66\u4E60"] },
      { key: "practice", label: "\u7EC3\u4E60", keywords: ["\u7EC3\u4E60", "\u5237\u9898", "\u8BAD\u7EC3", "\u5B9E\u64CD"] },
      { key: "other", label: "\u5176\u4ED6" }
    ]
  }
];

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
const BEDTIME_REVIEW_BAD_PROCESS_KEYS = new Set(["fairly_unsmooth", "very_unsmooth"]);
const BEDTIME_REVIEW_WEEKDAY_LABELS = ["\u5468\u4E00", "\u5468\u4E8C", "\u5468\u4E09", "\u5468\u56DB", "\u5468\u4E94", "\u5468\u516D", "\u5468\u65E5"];

const SLOT_MINUTES = 30;
const PIE_COLORS = ["#d26a2d", "#4f63c6", "#d94f7f", "#2f9a72", "#b57d1d", "#7f5abf", "#3c79c3", "#66758d", "#b2562d", "#2f7f6d"];
const PIE_INNER_RADIUS_RATIO = 0.48;
const TASK_COMPLETION_FIXED_SOUND_SRC = "sounds/completion-fixed.wav";
const TASK_COMPLETION_RANDOM_SOUND_FILES = [
  "sounds/sound1.wav",
  "sounds/sound2.wav",
  "sounds/sound3.wav",
  "sounds/sound4.wav",
  "sounds/sound5.wav",
  "sounds/sound6.wav",
  "sounds/sound7.wav",
  "sounds/sound8.wav",
  "sounds/sound9.wav",
  "sounds/sound10.wav",
  "sounds/sound11.wav",
  "sounds/sound12.wav"
];
const TASK_COMPLETION_CONFETTI_COLORS = ["#f94144", "#f3722c", "#f8961e", "#f9c74f", "#90be6d", "#43aa8b", "#577590", "#9b5de5"];

const state = {
  tasks: [],
  categoryDefinitions: [],
  taskCategorySubcategoryConfig: createDefaultTaskCategorySubcategoryConfig(),
  selectedDate: toDateInputValue(new Date()),
  boardDate: toDateInputValue(new Date()),
  bedtimeReviewDate: toDateInputValue(new Date()),
  taskCategoryDate: toDateInputValue(new Date()),
  activePage: "dashboard",
  voiceEffectsEnabled: true,
  optionalTagMode: DEFAULT_OPTIONAL_TAG_MODE,
  allocationMode: "day",
  dailyView: "timeline",
  pieSegments: [],
  pieUsedMinutes: 0,
  pieDefaultCenterText: "\u6682\u65E0\u8BB0\u5F55",
  pieActiveIndex: -1,
  draggingCategoryKey: "",
  taskCategoryEditingGroupKey: "",
  taskSubcategorySelections: {},
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
  taskUrgentWrapper: document.getElementById("task-urgent-wrapper"),
  taskUrgentLevels: document.querySelectorAll('input[name="task-urgent-level"]'),
  switchMood: document.getElementById("switch-mood"),
  switchProcess: document.getElementById("switch-process"),
  panelMood: document.getElementById("panel-mood"),
  panelProcess: document.getElementById("panel-process"),
  taskMood: document.getElementById("task-mood"),
  taskMoodScore: document.getElementById("task-mood-score"),
  taskProcess: document.getElementById("task-process"),
  taskProcessScore: document.getElementById("task-process-score"),
  taskDetail: document.getElementById("task-detail"),
  detailCount: document.getElementById("detail-count"),
  taskStart: document.getElementById("task-start"),
  taskEnd: document.getElementById("task-end"),
  taskCategoryGroup: document.getElementById("task-category-group"),
  taskCategoryPicker: document.getElementById("task-category-picker"),
  taskCategorySummary: document.getElementById("task-category-summary"),
  openCategoryManagerFormBtn: document.getElementById("open-category-manager-form"),
  categoryManagerModal: document.getElementById("category-manager-modal"),
  categoryManagerDialog: document.getElementById("category-manager-dialog"),
  categoryManagerList: document.getElementById("category-manager-list"),
  addCategoryBtn: document.getElementById("add-category-btn"),
  closeCategoryManagerBtn: document.getElementById("close-category-manager-btn"),
  taskStatus: document.getElementById("task-status"),
  taskSubcategoryPanel: document.getElementById("task-subcategory-panel"),
  taskSubcategoryCaption: document.getElementById("task-subcategory-caption"),
  taskSubcategoryGroups: document.getElementById("task-subcategory-groups"),
  durationPreview: document.getElementById("duration-preview"),
  resetForm: document.getElementById("reset-form"),
  bedtimeReviewPage: document.getElementById("bedtime-review-page"),
  taskCategoryPage: document.getElementById("task-category-page"),
  bedtimeReviewWeekDisplay: document.getElementById("bedtime-review-week-display"),
  bedtimeReviewPrevWeekBtn: document.getElementById("bedtime-review-prev-week-btn"),
  bedtimeReviewNextWeekBtn: document.getElementById("bedtime-review-next-week-btn"),
  bedtimeReviewSummary: document.getElementById("bedtime-review-summary"),
  bedtimeReviewGroups: document.getElementById("bedtime-review-groups"),
  bedtimeReviewBackBtn: document.getElementById("bedtime-review-back-btn"),
  taskCategoryDate: document.getElementById("task-category-page-date"),
  taskCategorySummaryPanel: document.getElementById("task-category-page-summary"),
  taskCategoryCards: document.getElementById("task-category-page-cards"),
  taskCategoryBackBtn: document.getElementById("task-category-page-back-btn"),
  selectedDate: document.getElementById("selected-date"),
  selectedWeek: document.getElementById("selected-week"),
  modeDayBtn: document.getElementById("mode-day"),
  modeWeekBtn: document.getElementById("mode-week"),
  boardDate: document.getElementById("board-date"),
  summaryUsed: document.getElementById("summary-used"),
  summaryFree: document.getElementById("summary-free"),
  weekWrapper: document.getElementById("week-wrapper"),
  weekBars: document.getElementById("week-bars"),
  weekBarsScroll: document.getElementById("week-bars-scroll"),
  weekBarsScrollRange: document.getElementById("week-bars-scroll-range"),
  timeline: document.getElementById("timeline"),
  timelineLegend: document.getElementById("timeline-legend"),
  pieWrapper: document.getElementById("pie-wrapper"),
  taskPie: document.getElementById("task-pie"),
  taskPieCenter: document.getElementById("task-pie-center"),
  pieLegend: document.getElementById("pie-legend"),
  pieTooltip: document.getElementById("pie-tooltip"),
  countTodo: document.getElementById("count-todo"),
  countDoing: document.getElementById("count-doing"),
  countDone: document.getElementById("count-done"),
  quickAddButtons: document.querySelectorAll(".column-add"),
  template: document.getElementById("task-card-template"),
  completionConfettiCanvas: document.getElementById("completion-confetti-canvas"),
  fixedTaskCompletionSound: document.getElementById("fixed-task-completion-sound"),
  randomTaskCompletionSound: document.getElementById("random-task-completion-sound")
};

const authRefs = {
  loginPage: document.getElementById("login-page"),
  mainApp: document.getElementById("main-app"),
  menuWrap: document.getElementById("global-menu"),
  menuToggleBtn: document.getElementById("menu-toggle-btn"),
  menuDropdown: document.getElementById("menu-dropdown"),
  menuVoiceToggle: document.getElementById("menu-voice-toggle"),
  menuBedtimeReviewBtn: document.getElementById("menu-bedtime-review-btn"),
  menuTaskCategoryBtn: document.getElementById("menu-task-category-btn"),
  menuAuthBtn: document.getElementById("menu-auth-btn"),
  menuAccountValue: document.getElementById("menu-account-value"),
  loginCloseBtn: document.getElementById("login-close-btn"),
  loginLogo: document.getElementById("login-logo"),
  loginLogoFallback: document.getElementById("login-logo-fallback"),
  loginTitle: document.getElementById("login-title"),
  loginDescription: document.getElementById("login-description"),
  loginFootnote: document.getElementById("login-footnote"),
  modeCodeBtn: document.getElementById("login-mode-code"),
  modePasswordBtn: document.getElementById("login-mode-password"),
  modeSetupBtn: document.getElementById("login-mode-setup"),
  quoteText: document.getElementById("daily-quote-text"),
  quoteSource: document.getElementById("daily-quote-source"),
  loginForm: document.getElementById("login-form"),
  emailInput: document.getElementById("login-email"),
  codeField: document.getElementById("login-code-field"),
  codeInput: document.getElementById("login-code"),
  passwordField: document.getElementById("login-password-field"),
  passwordInput: document.getElementById("login-password"),
  newPasswordField: document.getElementById("login-new-password-field"),
  newPasswordInput: document.getElementById("login-new-password"),
  confirmPasswordField: document.getElementById("login-confirm-password-field"),
  confirmPasswordInput: document.getElementById("login-confirm-password"),
  message: document.getElementById("login-message"),
  sendBtn: document.getElementById("login-send-btn"),
  authActions: document.getElementById("login-auth-actions"),
  submitBtn: document.getElementById("login-submit-btn"),
  resendBtn: document.getElementById("login-resend-btn")
};

const authState = {
  app: null,
  auth: null,
  user: null,
  mode: AUTH_MODE.CODE,
  verificationContext: null,
  isLoading: false,
  codeSent: false,
  countdown: 0,
  countdownTimerId: null
};
const cloudSyncState = {
  db: null,
  activeUid: "",
  syncTimerId: null,
  syncInFlight: false
};
const completionFxState = {
  particles: [],
  animationId: 0
};

init();

function init() {
  state.categoryDefinitions = loadCategoryDefinitions();
  state.taskCategorySubcategoryConfig = loadTaskCategorySubcategoryConfig();
  state.tasks = loadTasks();
  ensureCategoryDefinitionsForTasks(state.tasks);
  setVoiceEffectsEnabled(loadVoiceEffectsPreference(), { skipPersist: true });
  refs.selectedDate.value = state.selectedDate;
  refs.boardDate.value = state.boardDate;
  if (refs.taskCategoryDate) {
    refs.taskCategoryDate.value = state.taskCategoryDate;
  }

  refs.form.addEventListener("submit", onSubmitTask);
  refs.resetForm.addEventListener("click", resetForm);
  refs.taskDetail.addEventListener("input", updateDetailCount);
  refs.taskPriority.addEventListener("change", handlePriorityChange);
  bindOptionalTagSwitch();
  bindCategoryManagerEvents();

  if (refs.taskStart && refs.taskEnd) {
    refs.taskStart.addEventListener("input", updateDurationPreview);
    refs.taskEnd.addEventListener("input", updateDurationPreview);
    bindDateTimePickerInteractions([refs.taskStart, refs.taskEnd]);
  } else {
    console.warn("Missing #task-start or #task-end fields in form.");
  }
  renderCategoryChecklist();
  if (refs.taskCategoryPicker) {
    refs.taskCategoryPicker.addEventListener("toggle", () => {
      renderCategorySummary();
    });
  }
  refs.selectedDate.addEventListener("input", () => {
    state.selectedDate = refs.selectedDate.value;
    renderAllocationOverview();
  });
  refs.boardDate.addEventListener("input", () => {
    state.boardDate = refs.boardDate.value;
    renderBoard();
  });
  if (refs.taskCategoryDate) {
    refs.taskCategoryDate.addEventListener("input", () => {
      const nextDate = normalizeDateInputValue(refs.taskCategoryDate.value);
      state.taskCategoryDate = nextDate;
      state.selectedDate = nextDate;
      if (refs.selectedDate) {
        refs.selectedDate.value = nextDate;
      }
      renderAllocationOverview();
      renderTaskCategoryPage();
    });
  }
  if (refs.bedtimeReviewPrevWeekBtn) {
    refs.bedtimeReviewPrevWeekBtn.addEventListener("click", () => {
      shiftBedtimeReviewWeek(-1);
    });
  }
  if (refs.bedtimeReviewNextWeekBtn) {
    refs.bedtimeReviewNextWeekBtn.addEventListener("click", () => {
      shiftBedtimeReviewWeek(1);
    });
  }
  if (refs.bedtimeReviewBackBtn) {
    refs.bedtimeReviewBackBtn.addEventListener("click", () => {
      setActivePage("dashboard");
    });
  }
  if (refs.taskCategoryBackBtn) {
    refs.taskCategoryBackBtn.addEventListener("click", () => {
      setActivePage("dashboard");
    });
  }

  refs.quickAddButtons.forEach((button) => {
    button.addEventListener("click", () => {
      quickCreateTask(button.dataset.quickStatus || "todo");
    });
  });

  if (refs.modeDayBtn) {
    refs.modeDayBtn.addEventListener("click", () => setAllocationMode("day"));
  }
  if (refs.modeWeekBtn) {
    refs.modeWeekBtn.addEventListener("click", () => setAllocationMode("week"));
  }
  bindWeekBarsScrollEvents();

  bindPieInteractions();
  initializeTaskCompletionEffects();
  setSelectedCategoriesToForm([]);
  setSelectedImportanceLevelToForm(DEFAULT_IMPORTANCE_LEVEL);
  handlePriorityChange();
  bindTaskFormDraftPersistence();
  restoreTaskFormDraft();
  applyAllocationMode();
  updateDetailCount();
  updateDurationPreview();
  renderAll();
  updateActivePageView();
  initEmailCodeLogin();
}

function initializeTaskCompletionEffects() {
  if (refs.completionConfettiCanvas) {
    resizeTaskCompletionConfettiCanvas();
    window.addEventListener("resize", resizeTaskCompletionConfettiCanvas);
  }
  if (refs.fixedTaskCompletionSound) {
    refs.fixedTaskCompletionSound.src = TASK_COMPLETION_FIXED_SOUND_SRC;
    refs.fixedTaskCompletionSound.preload = "auto";
  }
  if (refs.randomTaskCompletionSound) {
    refs.randomTaskCompletionSound.preload = "auto";
  }
  setVoiceEffectsEnabled(state.voiceEffectsEnabled, { skipPersist: true });
}

function loadVoiceEffectsPreference() {
  try {
    const raw = localStorage.getItem(VOICE_EFFECTS_STORAGE_KEY);
    if (raw === "0" || raw === "false") {
      return false;
    }
    if (raw === "1" || raw === "true") {
      return true;
    }
  } catch {
    // ignore preference read failures
  }
  return true;
}

function saveVoiceEffectsPreference(enabled) {
  try {
    localStorage.setItem(VOICE_EFFECTS_STORAGE_KEY, enabled ? "1" : "0");
  } catch {
    // ignore preference write failures
  }
}

function setVoiceEffectsEnabled(enabled, options = {}) {
  const nextValue = Boolean(enabled);
  state.voiceEffectsEnabled = nextValue;

  if (authRefs.menuVoiceToggle) {
    authRefs.menuVoiceToggle.checked = nextValue;
  }

  const muted = !nextValue;
  if (refs.fixedTaskCompletionSound) {
    refs.fixedTaskCompletionSound.muted = muted;
    if (muted) {
      refs.fixedTaskCompletionSound.pause();
      refs.fixedTaskCompletionSound.currentTime = 0;
    }
  }
  if (refs.randomTaskCompletionSound) {
    refs.randomTaskCompletionSound.muted = muted;
    if (muted) {
      refs.randomTaskCompletionSound.pause();
      refs.randomTaskCompletionSound.currentTime = 0;
    }
  }

  if (!options.skipPersist) {
    saveVoiceEffectsPreference(nextValue);
  }
}

function triggerTaskCompletionCelebration() {
  triggerTaskCompletionConfetti();
  playTaskCompletionSounds();
}

function playTaskCompletionSounds() {
  if (!state.voiceEffectsEnabled) {
    return;
  }

  if (refs.fixedTaskCompletionSound) {
    refs.fixedTaskCompletionSound.volume = 0.15;
    refs.fixedTaskCompletionSound.currentTime = 0;
    const fixedPromise = refs.fixedTaskCompletionSound.play();
    if (fixedPromise && typeof fixedPromise.catch === "function") {
      fixedPromise.catch(() => {});
    }
  }

  if (refs.randomTaskCompletionSound && TASK_COMPLETION_RANDOM_SOUND_FILES.length) {
    const randomIndex = Math.floor(Math.random() * TASK_COMPLETION_RANDOM_SOUND_FILES.length);
    refs.randomTaskCompletionSound.src = TASK_COMPLETION_RANDOM_SOUND_FILES[randomIndex];
    refs.randomTaskCompletionSound.currentTime = 0;
    const randomPromise = refs.randomTaskCompletionSound.play();
    if (randomPromise && typeof randomPromise.catch === "function") {
      randomPromise.catch(() => {});
    }
  }
}

function resizeTaskCompletionConfettiCanvas() {
  if (!refs.completionConfettiCanvas) {
    return;
  }
  const dpr = window.devicePixelRatio || 1;
  const width = Math.floor(window.innerWidth * dpr);
  const height = Math.floor(window.innerHeight * dpr);
  refs.completionConfettiCanvas.width = width;
  refs.completionConfettiCanvas.height = height;
  refs.completionConfettiCanvas.style.width = `${window.innerWidth}px`;
  refs.completionConfettiCanvas.style.height = `${window.innerHeight}px`;
}

function triggerTaskCompletionConfetti() {
  if (!refs.completionConfettiCanvas) {
    return;
  }
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  resizeTaskCompletionConfettiCanvas();
  spawnTaskCompletionConfettiBurst(150, 0.5, 0.62, -135, -45, 6, 12);
  spawnTaskCompletionConfettiBurst(50, 0.02, 0.78, -72, -28, 5, 11);
  spawnTaskCompletionConfettiBurst(50, 0.98, 0.78, -152, -108, 5, 11);
  startTaskCompletionConfettiLoop();
}

function spawnTaskCompletionConfettiBurst(count, originXRatio, originYRatio, minAngleDeg, maxAngleDeg, minSpeed, maxSpeed) {
  if (!refs.completionConfettiCanvas || count <= 0) {
    return;
  }
  const width = refs.completionConfettiCanvas.width;
  const height = refs.completionConfettiCanvas.height;
  const startX = width * originXRatio;
  const startY = height * originYRatio;

  for (let i = 0; i < count; i += 1) {
    const angleDeg = minAngleDeg + Math.random() * (maxAngleDeg - minAngleDeg);
    const angle = (angleDeg * Math.PI) / 180;
    const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
    const life = 56 + Math.floor(Math.random() * 36);
    completionFxState.particles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 6 + Math.random() * 6,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: -0.18 + Math.random() * 0.36,
      gravity: 0.22 + Math.random() * 0.08,
      drag: 0.987 + Math.random() * 0.008,
      life,
      maxLife: life,
      color: TASK_COMPLETION_CONFETTI_COLORS[Math.floor(Math.random() * TASK_COMPLETION_CONFETTI_COLORS.length)],
      shape: Math.random() > 0.22 ? "rect" : "circle"
    });
  }
}

function startTaskCompletionConfettiLoop() {
  if (completionFxState.animationId) {
    return;
  }
  completionFxState.animationId = window.requestAnimationFrame(stepTaskCompletionConfetti);
}

function stepTaskCompletionConfetti() {
  if (!refs.completionConfettiCanvas) {
    completionFxState.animationId = 0;
    completionFxState.particles = [];
    return;
  }

  const ctx = refs.completionConfettiCanvas.getContext("2d");
  if (!ctx) {
    completionFxState.animationId = 0;
    completionFxState.particles = [];
    return;
  }

  ctx.clearRect(0, 0, refs.completionConfettiCanvas.width, refs.completionConfettiCanvas.height);
  const width = refs.completionConfettiCanvas.width;
  const height = refs.completionConfettiCanvas.height;
  const nextParticles = [];

  completionFxState.particles.forEach((particle) => {
    particle.vx *= particle.drag;
    particle.vy = particle.vy * particle.drag + particle.gravity;
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.rotation += particle.rotationSpeed;
    particle.life -= 1;

    const alpha = Math.max(0, particle.life / particle.maxLife);
    const inBounds = particle.x > -80 && particle.x < width + 80 && particle.y < height + 100;
    if (particle.life > 0 && inBounds) {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = particle.color;
      if (particle.shape === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, particle.size * 0.42, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-particle.size * 0.5, -particle.size * 0.26, particle.size, particle.size * 0.52);
      }
      ctx.restore();
      nextParticles.push(particle);
    }
  });

  completionFxState.particles = nextParticles;
  if (completionFxState.particles.length) {
    completionFxState.animationId = window.requestAnimationFrame(stepTaskCompletionConfetti);
    return;
  }

  ctx.clearRect(0, 0, refs.completionConfettiCanvas.width, refs.completionConfettiCanvas.height);
  completionFxState.animationId = 0;
}

function initEmailCodeLogin() {
  if (!authRefs.loginPage || !authRefs.mainApp) {
    return;
  }

  renderDailyQuote();
  bindEmailCodeLoginEvents();
  bindGlobalMenuEvents();
  closeLoginOverlay();
  updateMenuAuthButton();
  updateLoginView();
  void initializeCloudbaseAuth();
}

function bindEmailCodeLoginEvents() {
  if (authRefs.loginLogo && authRefs.loginLogoFallback) {
    authRefs.loginLogo.addEventListener("error", () => {
      authRefs.loginLogo.classList.add("is-hidden");
      authRefs.loginLogoFallback.classList.remove("is-hidden");
    });
  }

  if (authRefs.sendBtn) {
    authRefs.sendBtn.addEventListener("click", () => {
      void handleSendCode();
    });
  }

  if (authRefs.resendBtn) {
    authRefs.resendBtn.addEventListener("click", () => {
      if (authState.countdown <= 0) {
        void handleSendCode();
      }
    });
  }

  if (authRefs.loginForm) {
    authRefs.loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      void handleLoginSubmit();
    });
  }

  if (authRefs.modeCodeBtn) {
    authRefs.modeCodeBtn.addEventListener("click", () => {
      setAuthMode(AUTH_MODE.CODE);
    });
  }

  if (authRefs.modePasswordBtn) {
    authRefs.modePasswordBtn.addEventListener("click", () => {
      setAuthMode(AUTH_MODE.PASSWORD);
    });
  }

  if (authRefs.modeSetupBtn) {
    authRefs.modeSetupBtn.addEventListener("click", () => {
      setAuthMode(AUTH_MODE.SETUP);
    });
  }

  if (authRefs.newPasswordInput) {
    authRefs.newPasswordInput.addEventListener("input", () => {
      clearLoginFieldInvalidState([authRefs.newPasswordField, authRefs.confirmPasswordField]);
    });
  }

  if (authRefs.confirmPasswordInput) {
    authRefs.confirmPasswordInput.addEventListener("input", () => {
      clearLoginFieldInvalidState([authRefs.newPasswordField, authRefs.confirmPasswordField]);
    });
  }

  if (authRefs.loginCloseBtn) {
    authRefs.loginCloseBtn.addEventListener("click", () => {
      closeLoginOverlay();
    });
  }

  if (authRefs.loginPage) {
    authRefs.loginPage.addEventListener("click", (event) => {
      if (event.target === authRefs.loginPage) {
        closeLoginOverlay();
      }
    });
  }

  window.addEventListener("beforeunload", clearCountdownTimer);
}

function setAuthMode(mode, options = {}) {
  if (!Object.values(AUTH_MODE).includes(mode)) {
    return;
  }

  authState.mode = mode;
  resetAuthFlowState();

  if (!options.preserveMessage) {
    setLoginMessage("", "info");
  }

  updateLoginView();
}

function resetAuthFlowState() {
  authState.verificationContext = null;
  authState.codeSent = false;
  authState.countdown = 0;
  clearCountdownTimer();
  clearLoginFieldInvalidState([authRefs.newPasswordField, authRefs.confirmPasswordField]);

  if (authRefs.codeInput) {
    authRefs.codeInput.value = "";
  }
  if (authRefs.passwordInput) {
    authRefs.passwordInput.value = "";
  }
  if (authRefs.newPasswordInput) {
    authRefs.newPasswordInput.value = "";
  }
  if (authRefs.confirmPasswordInput) {
    authRefs.confirmPasswordInput.value = "";
  }
}

async function handleLoginSubmit() {
  if (authState.mode === AUTH_MODE.PASSWORD) {
    await handleLoginWithPassword();
    return;
  }

  if (authState.mode === AUTH_MODE.SETUP) {
    await handleSetPassword();
    return;
  }

  await handleLoginWithCode();
}

function bindGlobalMenuEvents() {
  if (authRefs.menuToggleBtn) {
    authRefs.menuToggleBtn.setAttribute("aria-expanded", "false");
  }

  if (authRefs.menuToggleBtn) {
    authRefs.menuToggleBtn.addEventListener("click", () => {
      toggleGlobalMenu();
    });
  }

  if (authRefs.menuAuthBtn) {
    authRefs.menuAuthBtn.addEventListener("click", () => {
      void handleMenuAuthAction();
    });
  }
  if (authRefs.menuBedtimeReviewBtn) {
    authRefs.menuBedtimeReviewBtn.addEventListener("click", () => {
      handleOpenBedtimeReviewFromMenu();
    });
  }
  if (authRefs.menuTaskCategoryBtn) {
    authRefs.menuTaskCategoryBtn.addEventListener("click", () => {
      handleOpenTaskCategoryFromMenu();
    });
  }
  if (authRefs.menuVoiceToggle) {
    authRefs.menuVoiceToggle.addEventListener("change", (event) => {
      setVoiceEffectsEnabled(Boolean(event.target.checked));
    });
  }

  document.addEventListener("click", (event) => {
    if (!authRefs.menuWrap) {
      return;
    }
    if (!authRefs.menuWrap.contains(event.target)) {
      closeGlobalMenu();
    }
  });
}

function handleOpenBedtimeReviewFromMenu() {
  closeGlobalMenu();
  const preferredDate = (refs.selectedDate && refs.selectedDate.value) || state.selectedDate || toDateInputValue(new Date());
  state.bedtimeReviewDate = preferredDate;
  setActivePage("bedtime-review");
}

function handleOpenTaskCategoryFromMenu() {
  closeGlobalMenu();
  const preferredDate = (refs.selectedDate && refs.selectedDate.value) || state.selectedDate || toDateInputValue(new Date());
  state.taskCategoryDate = normalizeDateInputValue(preferredDate);
  if (refs.taskCategoryDate) {
    refs.taskCategoryDate.value = state.taskCategoryDate;
  }
  setActivePage("task-category");
}

async function handleMenuAuthAction() {
  closeGlobalMenu();
  if (!authState.auth) {
    setLoginMessage("\u8ba4\u8bc1\u670d\u52a1\u6b63\u5728\u521d\u59cb\u5316\uff0c\u8bf7\u7a0d\u5019\u3002", "error");
    openLoginOverlay();
    return;
  }

  if (authState.user && !authState.user.isAnonymous) {
    try {
      await authState.auth.signOut();
      try {
        await authState.auth.signInAnonymously();
      } catch (error) {
        console.warn("Anonymous sign-in after sign-out failed:", error);
      }
      authState.user = null;
      authState.verificationContext = null;
      authState.codeSent = false;
      authState.countdown = 0;
      clearCountdownTimer();
      clearCloudSyncState();
      updateLoginView();
      updateMenuAuthButton();
      setLoginMessage("\u5df2\u9000\u51fa\u767b\u5f55\u3002", "success");
      openLoginOverlay();
    } catch (error) {
      setLoginMessage(getErrorMessage(error, "\u9000\u51fa\u767b\u5f55\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\u3002"), "error");
    }
    return;
  }

  openLoginOverlay();
}

function toggleGlobalMenu(forceOpen) {
  if (!authRefs.menuDropdown) {
    return;
  }
  const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : authRefs.menuDropdown.classList.contains("is-hidden");
  authRefs.menuDropdown.classList.toggle("is-hidden", !shouldOpen);
  if (authRefs.menuToggleBtn) {
    authRefs.menuToggleBtn.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
  }
}

function closeGlobalMenu() {
  toggleGlobalMenu(false);
}

function updateMenuAuthButton() {
  if (!authRefs.menuAuthBtn || !authRefs.menuAccountValue) {
    return;
  }
  const loggedIn = Boolean(authState.user && !authState.user.isAnonymous);
  const email = loggedIn ? String(authState.user.email || "").trim() : "";
  const accountLabel = loggedIn
    ? (email || "\u5df2\u767b\u5f55")
    : "\u672a\u767b\u5f55";
  authRefs.menuAccountValue.textContent = accountLabel;
  authRefs.menuAuthBtn.textContent = loggedIn ? "\u9000\u51fa\u767b\u5f55" : "\u767b\u5f55";
  authRefs.menuAuthBtn.classList.toggle("is-danger", loggedIn);
  if (accountLabel === "\u672a\u767b\u5f55" || accountLabel === "\u5df2\u767b\u5f55") {
    openLoginOverlay();
  }
}

function renderDailyQuote() {
  if (!authRefs.quoteText || !authRefs.quoteSource || !DAILY_QUOTES.length) {
    return;
  }

  const now = new Date();
  const daySerial = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000);
  const quoteIndex = ((daySerial % DAILY_QUOTES.length) + DAILY_QUOTES.length) % DAILY_QUOTES.length;
  const quote = DAILY_QUOTES[quoteIndex];
  authRefs.quoteText.textContent = quote.text;
  authRefs.quoteSource.textContent = "\u2014\u2014 " + quote.source;
}

async function initializeCloudbaseAuth() {
  if (!authRefs.message) {
    return;
  }

  if (window.location.protocol === "file:") {
    setLoginMessage("\u68C0\u6D4B\u5230\u5F53\u524D\u4E3A file:// \u6253\u5F00\u9875\u9762\uff0c\u4F1A\u88AB\u6D4F\u89C8\u5668 CORS \u62E6\u622A\u3002\u8BF7\u6539\u4E3A http://localhost \u6216\u5DF2\u914D\u7F6E\u7684 HTTPS \u57DF\u540D\u8BBF\u95EE\u3002", "error");
    updateLoginView();
    return;
  }

  if (!CLOUDBASE_ENV_ID || CLOUDBASE_ENV_ID === "YOUR_CLOUDBASE_ENV_ID") {
    setLoginMessage("\u8bf7\u5148\u5728 app.js \u4e2d\u914d\u7f6e CLOUDBASE_ENV_ID\u3002", "error");
    updateLoginView();
    return;
  }

  setAuthLoading(true);
  setLoginMessage("\u6b63\u5728\u521d\u59cb\u5316\u767b\u5f55\u670d\u52a1\uff0c\u8bf7\u7a0d\u5019...", "success");

  try {
    const sdkLoaded = await ensureCloudbaseSdkLoaded();
    if (!sdkLoaded) {
      setLoginMessage("CloudBase SDK \u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u6216 CDN \u8bbf\u95ee\u3002", "error");
      return;
    }

    const cloudbaseLib = window.cloudbase || window.tcb;
    if (!cloudbaseLib || typeof cloudbaseLib.init !== "function") {
      setLoginMessage("CloudBase SDK \u52a0\u8f7d\u5f02\u5e38\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u540e\u91cd\u8bd5\u3002", "error");
      return;
    }

    authState.app = cloudbaseLib.init({ env: CLOUDBASE_ENV_ID });
    authState.auth = authState.app.auth({ persistence: "local" });

    authState.auth.onLoginStateChanged((loginState) => {
      void handleAuthLoginStateChanged(loginState);
    });

    const loginState = await authState.auth.getLoginState();
    if (!loginState || !loginState.user || loginState.user.isAnonymous) {
      try {
        await authState.auth.signInAnonymously();
      } catch (error) {
        console.warn("Anonymous sign-in failed:", error);
      }
      updateMenuAuthButton();
      return;
    }
    updateMenuAuthButton();
  } catch (error) {
    console.error("CloudBase init failed:", error);
    setLoginMessage(getErrorMessage(error, "CloudBase \u521d\u59cb\u5316\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u73af\u5883\u914d\u7f6e\u3002"), "error");
    openLoginOverlay();
  } finally {
    setAuthLoading(false);
  }
}

async function handleAuthLoginStateChanged(loginState) {
  try {
    if (loginState && loginState.user && !loginState.user.isAnonymous) {
      authState.user = {
        uid: loginState.user.uid,
        email: loginState.user.email,
        isAnonymous: Boolean(loginState.user.isAnonymous)
      };
      authState.verificationContext = null;
      authState.codeSent = false;
      authState.countdown = 0;
      clearCountdownTimer();
      updateLoginView();
      updateMenuAuthButton();
      closeLoginOverlay();
      await bootstrapCloudTaskSync();
      return;
    }

    authState.user = null;
    authState.verificationContext = null;
    authState.codeSent = false;
    authState.countdown = 0;
    clearCountdownTimer();
    clearCloudSyncState();
    updateLoginView();
    updateMenuAuthButton();
  } catch (error) {
    console.error("Handle login state change failed:", error);
  }
}

async function bootstrapCloudTaskSync() {
  if (!authState.app || !authState.user || authState.user.isAnonymous) {
    return;
  }
  if (typeof authState.app.database !== "function") {
    return;
  }

  cloudSyncState.db = authState.app.database();
  const uid = String(authState.user.uid || "");
  cloudSyncState.activeUid = uid;

  try {
    const localTasks = getNormalizedTaskList(state.tasks);
    const cloudSnapshot = await pullTasksFromCloud();
    if (cloudSnapshot && Array.isArray(cloudSnapshot.tasks)) {
      const cloudTasks = cloudSnapshot.tasks;
      const hasMarker = hasCloudImportMarker(uid);
      const localMutationAt = getLocalTaskMutationAt();
      const cloudUpdatedAt = getCloudSnapshotUpdatedAt(cloudSnapshot);
      const shouldPreferLocalSnapshot = hasMarker && localMutationAt > 0 && localMutationAt > cloudUpdatedAt;
      const mergedTasks = mergeTasksForCloudBootstrap(cloudTasks, localTasks);
      const hasLocalOnlyTasks = hasTasksNotInCloud(cloudTasks, localTasks);
      const shouldUploadMerged = shouldPreferLocalSnapshot || hasLocalOnlyTasks || (!hasMarker && localTasks.length > 0);

      console.info("[cloud-sync] bootstrap task snapshot", {
        localCount: localTasks.length,
        cloudCount: cloudTasks.length,
        hasMarker,
        localMutationAt,
        cloudUpdatedAt,
        shouldPreferLocalSnapshot,
        hasLocalOnlyTasks,
        shouldUploadMerged
      });

      state.tasks = shouldPreferLocalSnapshot ? localTasks : mergedTasks;
      saveTasks({ skipCloudSync: true, skipLocalMutationStamp: true });
      renderAll();

      if (shouldUploadMerged) {
        const uploaded = await syncTasksToCloud({ immediate: true });
        if (uploaded && state.tasks.length > 0) {
          setCloudImportMarker(uid);
        }
      }
      return;
    }

    const uploaded = await syncTasksToCloud({ immediate: true });
    if (uploaded && localTasks.length > 0) {
      setCloudImportMarker(uid);
    }
  } catch (error) {
    console.warn("Cloud task bootstrap sync failed:", error, buildCloudSyncFailureHint(error));
  }
}

function getNormalizedTaskList(tasks) {
  return (Array.isArray(tasks) ? tasks : [])
    .map(normalizeTask)
    .filter(Boolean);
}

function getLocalTaskMutationAt() {
  try {
    const raw = localStorage.getItem(TASKS_LAST_LOCAL_MUTATION_AT_STORAGE_KEY);
    const numeric = Number(raw);
    return Number.isFinite(numeric) && numeric > 0 ? numeric : 0;
  } catch {
    return 0;
  }
}

function setLocalTaskMutationAt(timestamp = Date.now()) {
  try {
    localStorage.setItem(TASKS_LAST_LOCAL_MUTATION_AT_STORAGE_KEY, String(Math.max(0, Number(timestamp) || Date.now())));
  } catch {
    // ignore mutation timestamp persistence failures
  }
}

function getCloudSnapshotUpdatedAt(snapshot) {
  if (!snapshot || typeof snapshot !== "object") {
    return 0;
  }
  const numeric = Number(snapshot.updatedAt);
  return Number.isFinite(numeric) && numeric > 0 ? numeric : 0;
}

function mergeTasksForCloudBootstrap(cloudTasks, localTasks) {
  const mergedById = new Map();
  getNormalizedTaskList(cloudTasks).forEach((task) => {
    mergedById.set(task.id, task);
  });
  getNormalizedTaskList(localTasks).forEach((task) => {
    if (!mergedById.has(task.id)) {
      mergedById.set(task.id, task);
    }
  });
  return Array.from(mergedById.values());
}

function hasTasksNotInCloud(cloudTasks, localTasks) {
  const cloudIds = new Set(
    getNormalizedTaskList(cloudTasks).map((task) => task.id)
  );
  return getNormalizedTaskList(localTasks).some((task) => !cloudIds.has(task.id));
}

function getCloudImportMarkerKey(uid) {
  return `${CLOUD_IMPORT_MARKER_PREFIX}-${uid}`;
}

function hasCloudImportMarker(uid) {
  try {
    return localStorage.getItem(getCloudImportMarkerKey(uid)) === "1";
  } catch {
    return false;
  }
}

function setCloudImportMarker(uid) {
  try {
    localStorage.setItem(getCloudImportMarkerKey(uid), "1");
  } catch {
    // ignore marker persistence failures
  }
}

function clearCloudSyncState() {
  if (cloudSyncState.syncTimerId) {
    window.clearTimeout(cloudSyncState.syncTimerId);
    cloudSyncState.syncTimerId = null;
  }
  cloudSyncState.syncInFlight = false;
  cloudSyncState.db = null;
  cloudSyncState.activeUid = "";
}

function isCloudSyncEnabled() {
  return Boolean(
    cloudSyncState.db
    && authState.user
    && !authState.user.isAnonymous
    && cloudSyncState.activeUid
    && cloudSyncState.activeUid === String(authState.user.uid || "")
  );
}

function getCloudTasksCollection() {
  if (!cloudSyncState.db) {
    return null;
  }
  return cloudSyncState.db.collection(CLOUDBASE_TASKS_COLLECTION);
}

function scheduleCloudTaskSync() {
  if (!isCloudSyncEnabled()) {
    return;
  }

  if (cloudSyncState.syncTimerId) {
    window.clearTimeout(cloudSyncState.syncTimerId);
  }

  cloudSyncState.syncTimerId = window.setTimeout(() => {
    cloudSyncState.syncTimerId = null;
    void syncTasksToCloud();
  }, CLOUDBASE_SYNC_DEBOUNCE_MS);
}

async function pullTasksFromCloud() {
  if (!isCloudSyncEnabled()) {
    return null;
  }

  const collection = getCloudTasksCollection();
  const uid = String(authState.user && authState.user.uid ? authState.user.uid : "");
  if (!collection || !uid) {
    return null;
  }

  const result = await collection
    .where({ uid })
    .limit(1)
    .get();
  const docs = extractCloudDocsFromQueryResult(result);
  if (!docs.length) {
    return null;
  }

  const firstDoc = docs[0] || null;
  const tasks = firstDoc && Array.isArray(firstDoc.tasks) ? firstDoc.tasks : null;
  if (!tasks) {
    return null;
  }

  if (ensureCategoryDefinitionsForRawTasks(tasks)) {
    renderCategoryChecklist();
  }

  return {
    tasks: tasks
      .map(normalizeTask)
      .filter(Boolean),
    updatedAt: firstDoc && Number.isFinite(Number(firstDoc.updatedAt)) ? Number(firstDoc.updatedAt) : 0
  };
}

function extractCloudDocsFromQueryResult(result) {
  if (!result || !Array.isArray(result.data)) {
    return [];
  }
  return result.data;
}

async function syncTasksToCloud(options = {}) {
  const immediate = Boolean(options.immediate);
  if (!isCloudSyncEnabled()) {
    return false;
  }

  if (cloudSyncState.syncInFlight) {
    if (!immediate) {
      scheduleCloudTaskSync();
    }
    return false;
  }

  const collection = getCloudTasksCollection();
  if (!collection || !authState.user) {
    return false;
  }

  cloudSyncState.syncInFlight = true;
  try {
    const uid = String(authState.user.uid || "");
    const tasks = state.tasks
      .map(normalizeTask)
      .filter(Boolean);
    const payload = {
      uid,
      email: authState.user.email || "",
      tasks,
      updatedAt: Date.now()
    };

    const updateResult = await collection
      .where({ uid })
      .update(payload);
    if (getUpdatedCountFromUpdateResult(updateResult) > 0) {
      return true;
    }

    await collection.add({
      _id: uid,
      ...payload
    });
    return true;
  } catch (error) {
    console.warn("Cloud task sync failed:", error, buildCloudSyncFailureHint(error));
    return false;
  } finally {
    cloudSyncState.syncInFlight = false;
  }
}

function buildCloudSyncFailureHint(error) {
  const message = getErrorMessage(error, "");
  const lowerMessage = String(message || "").toLowerCase();
  const maybeCorsError = lowerMessage.includes("network request error")
    || lowerMessage.includes("cors")
    || lowerMessage.includes("access-control-allow-origin");

  if (!maybeCorsError) {
    return "";
  }

  return `CloudBase 鍙兘鍙戠敓璺ㄥ煙鎷︽埅锛岃鍦ㄤ簯寮€鍙戞帶鍒跺彴灏嗗綋鍓嶅煙鍚嶅姞鍏?Web 瀹夊叏鍩熷悕锛?{window.location.origin}`;
}

function getUpdatedCountFromUpdateResult(result) {
  if (!result || typeof result !== "object") {
    return 0;
  }

  if (Number.isFinite(result.updated)) {
    return Number(result.updated);
  }
  if (result.stats && Number.isFinite(result.stats.updated)) {
    return Number(result.stats.updated);
  }
  return 0;
}

async function ensureCloudbaseSdkLoaded() {
  const existing = window.cloudbase || window.tcb;
  if (existing && typeof existing.init === "function") {
    return true;
  }

  for (const url of CLOUDBASE_SDK_URLS) {
    const loaded = await loadScriptByUrl(url);
    if (!loaded) {
      continue;
    }
    const lib = window.cloudbase || window.tcb;
    if (lib && typeof lib.init === "function") {
      return true;
    }
  }

  return false;
}

function loadScriptByUrl(url) {
  return new Promise((resolve) => {
    const exists = document.querySelector(`script[src="${url}"]`);
    if (exists) {
      const lib = window.cloudbase || window.tcb;
      resolve(Boolean(lib && typeof lib.init === "function"));
      return;
    }

    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}

function openLoginOverlay() {
  if (!authRefs.loginPage) {
    return;
  }
  closeGlobalMenu();
  authRefs.loginPage.classList.remove("is-hidden");
  authRefs.loginPage.setAttribute("aria-hidden", "false");
}

function closeLoginOverlay() {
  if (!authRefs.loginPage) {
    return;
  }
  authRefs.loginPage.classList.add("is-hidden");
  authRefs.loginPage.setAttribute("aria-hidden", "true");
}

function showLoginPage() {
  openLoginOverlay();
}

function showMainApp() {
  closeLoginOverlay();
}

function setActivePage(page) {
  if (page === "bedtime-review" || page === "task-category") {
    state.activePage = page;
  } else {
    state.activePage = "dashboard";
  }
  updateActivePageView();
}

function updateActivePageView() {
  const showDashboard = state.activePage === "dashboard";
  const showBedtimeReview = state.activePage === "bedtime-review";
  const showTaskCategory = state.activePage === "task-category";
  if (authRefs.mainApp) {
    authRefs.mainApp.classList.toggle("is-hidden", !showDashboard);
    authRefs.mainApp.setAttribute("aria-hidden", showDashboard ? "false" : "true");
  }
  if (refs.bedtimeReviewPage) {
    refs.bedtimeReviewPage.classList.toggle("is-hidden", !showBedtimeReview);
    refs.bedtimeReviewPage.setAttribute("aria-hidden", showBedtimeReview ? "false" : "true");
  }
  if (refs.taskCategoryPage) {
    refs.taskCategoryPage.classList.toggle("is-hidden", !showTaskCategory);
    refs.taskCategoryPage.setAttribute("aria-hidden", showTaskCategory ? "false" : "true");
  }
  if (authRefs.menuBedtimeReviewBtn) {
    authRefs.menuBedtimeReviewBtn.classList.toggle("is-active", showBedtimeReview);
  }
  if (authRefs.menuTaskCategoryBtn) {
    authRefs.menuTaskCategoryBtn.classList.toggle("is-active", showTaskCategory);
  }
  if (showBedtimeReview) {
    renderBedtimeReview();
  }
  if (showTaskCategory) {
    renderTaskCategoryPage();
  }
}

function updateLoginView() {
  if (!authRefs.emailInput || !authRefs.codeField || !authRefs.sendBtn || !authRefs.authActions || !authRefs.resendBtn || !authRefs.submitBtn) {
    return;
  }

  const mode = authState.mode in AUTH_MODE_COPY ? authState.mode : AUTH_MODE.CODE;
  const copy = AUTH_MODE_COPY[mode];
  const authReady = Boolean(authState.auth);
  const usesVerificationCode = mode !== AUTH_MODE.PASSWORD;
  const shouldShowCode = usesVerificationCode && authState.codeSent;
  const shouldShowPassword = mode === AUTH_MODE.PASSWORD;
  const shouldShowNewPassword = mode === AUTH_MODE.SETUP;
  const shouldShowConfirmPassword = mode === AUTH_MODE.SETUP;
  const shouldShowSendButton = usesVerificationCode && !authState.codeSent;
  const shouldShowAuthActions = mode === AUTH_MODE.PASSWORD || authState.codeSent;
  const shouldShowResendButton = usesVerificationCode && authState.codeSent;

  if (authRefs.loginTitle) {
    authRefs.loginTitle.textContent = copy.title;
  }
  if (authRefs.loginDescription) {
    authRefs.loginDescription.textContent = copy.description;
  }
  if (authRefs.loginFootnote) {
    authRefs.loginFootnote.textContent = copy.footnote;
  }

  if (authRefs.modeCodeBtn) {
    authRefs.modeCodeBtn.classList.toggle("is-active", mode === AUTH_MODE.CODE);
    authRefs.modeCodeBtn.setAttribute("aria-selected", mode === AUTH_MODE.CODE ? "true" : "false");
  }
  if (authRefs.modePasswordBtn) {
    authRefs.modePasswordBtn.classList.toggle("is-active", mode === AUTH_MODE.PASSWORD);
    authRefs.modePasswordBtn.setAttribute("aria-selected", mode === AUTH_MODE.PASSWORD ? "true" : "false");
  }
  if (authRefs.modeSetupBtn) {
    authRefs.modeSetupBtn.classList.toggle("is-active", mode === AUTH_MODE.SETUP);
    authRefs.modeSetupBtn.setAttribute("aria-selected", mode === AUTH_MODE.SETUP ? "true" : "false");
  }

  authRefs.codeField.classList.toggle("is-hidden", !shouldShowCode);
  if (authRefs.passwordField) {
    authRefs.passwordField.classList.toggle("is-hidden", !shouldShowPassword);
  }
  if (authRefs.newPasswordField) {
    authRefs.newPasswordField.classList.toggle("is-hidden", !shouldShowNewPassword);
  }
  if (authRefs.confirmPasswordField) {
    authRefs.confirmPasswordField.classList.toggle("is-hidden", !shouldShowConfirmPassword);
  }
  authRefs.sendBtn.classList.toggle("is-hidden", !shouldShowSendButton);
  authRefs.authActions.classList.toggle("is-hidden", !shouldShowAuthActions);
  authRefs.resendBtn.classList.toggle("is-hidden", !shouldShowResendButton);

  const lockEmailInput = usesVerificationCode && authState.codeSent && authState.countdown > 0;
  authRefs.emailInput.disabled = lockEmailInput || authState.isLoading;
  authRefs.sendBtn.disabled = authState.isLoading || !authReady;
  authRefs.submitBtn.disabled = authState.isLoading || !authReady;
  authRefs.resendBtn.disabled = authState.isLoading || authState.countdown > 0 || !authReady;
  if (authRefs.passwordInput) {
    authRefs.passwordInput.disabled = authState.isLoading;
  }
  if (authRefs.newPasswordInput) {
    authRefs.newPasswordInput.disabled = authState.isLoading;
  }
  if (authRefs.confirmPasswordInput) {
    authRefs.confirmPasswordInput.disabled = authState.isLoading;
  }

  authRefs.submitBtn.textContent = copy.submitText;
  if (shouldShowSendButton) {
    authRefs.sendBtn.textContent = authReady ? copy.sendText : "\u521d\u59cb\u5316\u4e2d...";
  }

  if (shouldShowResendButton) {
    authRefs.resendBtn.textContent = authState.countdown > 0
      ? `${authState.countdown}\u79d2\u540e\u53ef\u91cd\u65b0\u53d1\u9001`
      : copy.resendText;
  }
}

function setLoginMessage(message, type) {
  if (!authRefs.message) {
    return;
  }

  authRefs.message.classList.remove("is-hidden", "is-error", "is-success");
  if (!message) {
    authRefs.message.textContent = "";
    authRefs.message.classList.add("is-hidden");
    return;
  }

  authRefs.message.textContent = message;
  if (type === "error") {
    authRefs.message.classList.add("is-error");
  }
  if (type === "success") {
    authRefs.message.classList.add("is-success");
  }
}

function setAuthLoading(isLoading) {
  authState.isLoading = Boolean(isLoading);
  updateLoginView();
}

async function handleSendCode() {
  if (!authState.auth) {
    setLoginMessage("\u8ba4\u8bc1\u670d\u52a1\u672a\u5c31\u7eea\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5\u3002", "error");
    return;
  }

  if (!authRefs.emailInput) {
    return;
  }

  const email = authRefs.emailInput.value.trim();
  if (!email) {
    setLoginMessage("\u8bf7\u8f93\u5165\u90ae\u7bb1\u5730\u5740\u3002", "error");
    return;
  }

  if (!EMAIL_REGEX.test(email)) {
    setLoginMessage("\u8bf7\u8f93\u5165\u6709\u6548\u7684\u90ae\u7bb1\u5730\u5740\u3002", "error");
    return;
  }

  setAuthLoading(true);
  setLoginMessage("", "info");

  try {
    const verificationInfo = await authState.auth.getVerification({ email });
    if (!verificationInfo) {
      setLoginMessage("\u9a8c\u8bc1\u7801\u53d1\u9001\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002", "error");
      return;
    }

    authState.verificationContext = verificationInfo;
    authState.codeSent = true;
    if (authRefs.codeInput) {
      authRefs.codeInput.value = "";
    }
    startCountdown(CODE_RESEND_SECONDS);
    setLoginMessage(
      authState.mode === AUTH_MODE.SETUP
        ? "\u9a8c\u8bc1\u90ae\u4ef6\u5df2\u53d1\u9001\uff0c\u8bf7\u586b\u5199\u9a8c\u8bc1\u7801\u540e\u8bbe\u7f6e\u65b0\u5bc6\u7801\u3002"
        : "\u9a8c\u8bc1\u7801\u5df2\u53d1\u9001\uff0c\u8bf7\u67e5\u6536\u90ae\u4ef6\u3002",
      "success"
    );
  } catch (error) {
    setLoginMessage(getErrorMessage(error, "\u9a8c\u8bc1\u7801\u53d1\u9001\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u90ae\u7bb1\u914d\u7f6e\u3002"), "error");
  } finally {
    setAuthLoading(false);
  }
}

async function handleLoginWithCode() {
  if (!authState.auth) {
    setLoginMessage("\u8ba4\u8bc1\u670d\u52a1\u672a\u5c31\u7eea\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5\u3002", "error");
    return;
  }

  if (!authRefs.emailInput || !authRefs.codeInput) {
    return;
  }

  const email = authRefs.emailInput.value.trim();
  const code = authRefs.codeInput.value.trim();

  if (!email || !EMAIL_REGEX.test(email)) {
    setLoginMessage("\u8bf7\u8f93\u5165\u6709\u6548\u7684\u90ae\u7bb1\u5730\u5740\u3002", "error");
    return;
  }

  if (!code) {
    setLoginMessage("\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801\u3002", "error");
    return;
  }

  if (!authState.verificationContext) {
    setLoginMessage("\u9a8c\u8bc1\u7801\u4e0a\u4e0b\u6587\u5931\u6548\uff0c\u8bf7\u91cd\u65b0\u53d1\u9001\u9a8c\u8bc1\u7801\u3002", "error");
    return;
  }

  setAuthLoading(true);
  setLoginMessage("", "info");

  try {
    await authState.auth.signInWithEmail({
      email,
      verificationCode: code,
      verificationInfo: authState.verificationContext
    });
    authState.verificationContext = null;
    setLoginMessage("\u767b\u5f55\u6210\u529f\uff0c\u6b63\u5728\u8fdb\u5165\u7cfb\u7edf...", "success");
  } catch (error) {
    setLoginMessage(getErrorMessage(error, "\u767b\u5f55\u5931\u8d25\uff0c\u8bf7\u786e\u8ba4\u9a8c\u8bc1\u7801\u662f\u5426\u6b63\u786e\u3002"), "error");
  } finally {
    setAuthLoading(false);
  }
}

async function handleLoginWithPassword() {
  if (!authState.auth) {
    setLoginMessage("\u8ba4\u8bc1\u670d\u52a1\u672a\u5c31\u7eea\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5\u3002", "error");
    return;
  }

  if (!authRefs.emailInput || !authRefs.passwordInput) {
    return;
  }

  const email = authRefs.emailInput.value.trim();
  const password = authRefs.passwordInput.value;

  if (!email || !EMAIL_REGEX.test(email)) {
    setLoginMessage("\u8bf7\u8f93\u5165\u6709\u6548\u7684\u90ae\u7bb1\u5730\u5740\u3002", "error");
    return;
  }

  if (!password) {
    setLoginMessage("\u8bf7\u8f93\u5165\u5bc6\u7801\u3002", "error");
    return;
  }

  setAuthLoading(true);
  setLoginMessage("", "info");

  try {
    await signInWithPasswordCompatible(email, password);
    setLoginMessage("\u767b\u5f55\u6210\u529f\uff0c\u6b63\u5728\u8fdb\u5165\u7cfb\u7edf...", "success");
  } catch (error) {
    if (isPasswordLoginDisabledError(error)) {
      setLoginMessage("\u5f53\u524d CloudBase \u63a7\u5236\u53f0\u8fd8\u672a\u5f00\u542f\u201c\u90ae\u7bb1\u5bc6\u7801\u767b\u5f55\u201d\uff0c\u8bf7\u5148\u5728\u767b\u5f55\u6388\u6743\u4e2d\u5f00\u542f\u3002", "error");
    } else {
      setLoginMessage(getErrorMessage(error, "\u90ae\u7bb1\u5bc6\u7801\u767b\u5f55\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u8d26\u53f7\u548c\u5bc6\u7801\u3002"), "error");
    }
  } finally {
    setAuthLoading(false);
  }
}

async function handleSetPassword() {
  if (!authState.auth) {
    setLoginMessage("\u8ba4\u8bc1\u670d\u52a1\u672a\u5c31\u7eea\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5\u3002", "error");
    return;
  }

  if (!authRefs.emailInput || !authRefs.codeInput || !authRefs.newPasswordInput || !authRefs.confirmPasswordInput) {
    return;
  }

  const email = authRefs.emailInput.value.trim();
  const code = authRefs.codeInput.value.trim();
  const newPassword = authRefs.newPasswordInput.value;
  const confirmPassword = authRefs.confirmPasswordInput.value;

  if (!email || !EMAIL_REGEX.test(email)) {
    setLoginMessage("\u8bf7\u8f93\u5165\u6709\u6548\u7684\u90ae\u7bb1\u5730\u5740\u3002", "error");
    return;
  }

  if (!code) {
    setLoginMessage("\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801\u3002", "error");
    return;
  }

  if (!newPassword || newPassword.length < PASSWORD_MIN_LENGTH) {
    setLoginMessage(`\u8bf7\u8f93\u5165\u81f3\u5c11 ${PASSWORD_MIN_LENGTH} \u4f4d\u7684\u65b0\u5bc6\u7801\u3002`, "error");
    return;
  }

  if (!confirmPassword) {
    setLoginFieldInvalidState([authRefs.confirmPasswordField]);
    setLoginMessage("\u8bf7\u518d\u6b21\u8f93\u5165\u65b0\u5bc6\u7801\u3002", "error");
    return;
  }

  if (newPassword !== confirmPassword) {
    setLoginFieldInvalidState([authRefs.newPasswordField, authRefs.confirmPasswordField]);
    setLoginMessage("\u4e24\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u4e00\u81f4\uff0c\u8bf7\u91cd\u65b0\u786e\u8ba4\u3002", "error");
    return;
  }

  clearLoginFieldInvalidState([authRefs.newPasswordField, authRefs.confirmPasswordField]);

  const verificationId = getVerificationId(authState.verificationContext);
  if (!verificationId) {
    setLoginMessage("\u9a8c\u8bc1\u4e0a\u4e0b\u6587\u5df2\u5931\u6548\uff0c\u8bf7\u91cd\u65b0\u53d1\u9001\u9a8c\u8bc1\u90ae\u4ef6\u3002", "error");
    return;
  }

  if (typeof authState.auth.verify !== "function" || typeof authState.auth.resetPassword !== "function") {
    setLoginMessage("\u5f53\u524d CloudBase SDK \u4e0d\u652f\u6301\u8bbe\u7f6e\u5bc6\u7801\uff0c\u8bf7\u68c0\u67e5 SDK \u7248\u672c\u3002", "error");
    return;
  }

  setAuthLoading(true);
  setLoginMessage("", "info");

  try {
    const verifyResult = await authState.auth.verify({
      verification_id: verificationId,
      verification_code: code
    });
    const verificationToken = getVerificationToken(verifyResult);
    if (!verificationToken) {
      throw new Error("\u9a8c\u8bc1\u6210\u529f\u4f46\u672a\u83b7\u53d6\u5230\u5bc6\u7801\u91cd\u7f6e\u4ee4\u724c\u3002");
    }

    await authState.auth.resetPassword({
      email,
      new_password: newPassword,
      verification_token: verificationToken
    });

    authState.verificationContext = null;
    authState.codeSent = false;
    authState.countdown = 0;
    clearCountdownTimer();

    try {
      await signInWithPasswordCompatible(email, newPassword);
      setLoginMessage("\u5bc6\u7801\u8bbe\u7f6e\u6210\u529f\uff0c\u6b63\u5728\u8fdb\u5165\u7cfb\u7edf...", "success");
    } catch (loginError) {
      if (authRefs.passwordInput) {
        authRefs.passwordInput.value = newPassword;
      }
      authState.mode = AUTH_MODE.PASSWORD;
      updateLoginView();
      if (isPasswordLoginDisabledError(loginError)) {
        setLoginMessage("\u5bc6\u7801\u5df2\u8bbe\u7f6e\u6210\u529f\uff0c\u4f46 CloudBase \u63a7\u5236\u53f0\u8fd8\u672a\u5f00\u542f\u90ae\u7bb1\u5bc6\u7801\u767b\u5f55\u3002", "success");
      } else {
        console.warn("Auto login after password setup failed:", loginError);
        setLoginMessage("\u5bc6\u7801\u5df2\u8bbe\u7f6e\u6210\u529f\uff0c\u8bf7\u5207\u6362\u5230\u201c\u90ae\u7bb1\u5bc6\u7801\u201d\u5b8c\u6210\u767b\u5f55\u3002", "success");
      }
    }
  } catch (error) {
    setLoginMessage(getErrorMessage(error, "\u8bbe\u7f6e\u5bc6\u7801\u5931\u8d25\uff0c\u8bf7\u786e\u8ba4\u9a8c\u8bc1\u7801\u548c\u90ae\u7bb1\u72b6\u6001\u3002"), "error");
  } finally {
    setAuthLoading(false);
  }
}

async function signInWithPasswordCompatible(email, password) {
  if (!authState.auth) {
    throw new Error("\u8ba4\u8bc1\u670d\u52a1\u672a\u521d\u59cb\u5316\u3002");
  }

  if (typeof authState.auth.signInWithPassword === "function") {
    const result = await authState.auth.signInWithPassword({ email, username: email, password });
    if (result && result.error) {
      throw result.error;
    }
    return result;
  }

  if (typeof authState.auth.signIn === "function") {
    const result = await authState.auth.signIn({ username: email, email, password });
    if (result && result.error) {
      throw result.error;
    }
    return result;
  }

  if (typeof authState.auth.signInWithEmailAndPassword === "function") {
    return authState.auth.signInWithEmailAndPassword(email, password);
  }

  throw new Error("\u5f53\u524d CloudBase SDK \u4e0d\u652f\u6301\u90ae\u7bb1\u5bc6\u7801\u767b\u5f55\uff0c\u8bf7\u68c0\u67e5 SDK \u7248\u672c\u3002");
}

function startCountdown(seconds) {
  clearCountdownTimer();
  authState.countdown = Math.max(0, Math.floor(seconds));
  updateLoginView();

  if (authState.countdown <= 0) {
    return;
  }

  const tick = () => {
    authState.countdown -= 1;
    updateLoginView();
    if (authState.countdown > 0) {
      authState.countdownTimerId = window.setTimeout(tick, 1000);
    } else {
      authState.countdownTimerId = null;
    }
  };

  authState.countdownTimerId = window.setTimeout(tick, 1000);
}

function clearCountdownTimer() {
  if (authState.countdownTimerId) {
    window.clearTimeout(authState.countdownTimerId);
    authState.countdownTimerId = null;
  }
}

function setLoginFieldInvalidState(fields) {
  fields.forEach((field) => {
    if (!field) {
      return;
    }
    field.classList.add("is-invalid");
  });
}

function clearLoginFieldInvalidState(fields) {
  fields.forEach((field) => {
    if (!field) {
      return;
    }
    field.classList.remove("is-invalid");
  });
}

function getVerificationId(verificationContext) {
  if (!verificationContext || typeof verificationContext !== "object") {
    return "";
  }
  return String(
    verificationContext.verification_id
    || verificationContext.verificationId
    || verificationContext.id
    || ""
  ).trim();
}

function getVerificationToken(verifyResult) {
  if (!verifyResult || typeof verifyResult !== "object") {
    return "";
  }
  return String(
    verifyResult.verification_token
    || verifyResult.verificationToken
    || verifyResult.token
    || ""
  ).trim();
}

function isPasswordLoginDisabledError(error) {
  const normalized = JSON.stringify(error || {}).toLowerCase();
  return normalized.includes("username/password")
    || normalized.includes("email/password")
    || normalized.includes("password login")
    || normalized.includes("identity source")
    || normalized.includes("sign_in_method_not_found");
}

function getErrorMessage(error, fallbackMessage) {
  if (!error) {
    return fallbackMessage;
  }
  if (typeof error === "string") {
    return error;
  }
  if (typeof error.message === "string" && error.message.trim()) {
    return error.message;
  }
  if (typeof error.msg === "string" && error.msg.trim()) {
    return error.msg;
  }
  return fallbackMessage;
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

    ensureCategoryDefinitionsForRawTasks(parsed);

    return parsed
      .map(normalizeTask)
      .filter(Boolean);
  } catch {
    return [];
  }
}

function bindTaskFormDraftPersistence() {
  if (!refs.form) {
    return;
  }
  refs.form.addEventListener("input", persistTaskFormDraft);
  refs.form.addEventListener("change", persistTaskFormDraft);
}

function restoreTaskFormDraft() {
  const draft = loadTaskFormDraft();
  if (!draft) {
    return;
  }

  refs.taskId.value = typeof draft.taskId === "string" ? draft.taskId : "";
  refs.taskName.value = typeof draft.name === "string" ? draft.name : "";
  refs.taskPriority.value = PRIORITY_MAP[draft.priority] ? draft.priority : "important_not_urgent";
  setSelectedImportanceLevelToForm(draft.importanceLevel);
  setSelectedUrgentLevelToForm(draft.urgentLevel);
  setSelectedMoodToForm(draft.mood);
  setSelectedMoodScoreToForm(draft.moodScore);
  setSelectedProcessToForm(draft.process);
  setSelectedProcessScoreToForm(draft.processScore);
  setOptionalTagMode(draft.optionalTagMode);
  handlePriorityChange();
  refs.taskDetail.value = typeof draft.detail === "string" ? draft.detail.slice(0, 200) : "";

  if (refs.taskStart && refs.taskEnd) {
    refs.taskStart.value = normalizeDateTimeInput(draft.startAt || "");
    refs.taskEnd.value = normalizeDateTimeInput(draft.endAt || "");
  }

  setSelectedTaskSubcategoriesToForm(draft.subcategories, draft.categories);
  setSelectedCategoriesToForm(Array.isArray(draft.categories) ? draft.categories : []);
  refs.taskStatus.value = Object.prototype.hasOwnProperty.call(STATUS_COLUMNS, draft.status) ? draft.status : "todo";
  updateDetailCount();
  updateDurationPreview();
}

function loadTaskFormDraft() {
  try {
    const raw = localStorage.getItem(TASK_FORM_DRAFT_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

function persistTaskFormDraft() {
  try {
    const draft = {
      taskId: refs.taskId.value || "",
      name: refs.taskName.value || "",
      priority: refs.taskPriority.value,
      importanceLevel: getSelectedImportanceLevelFromForm(),
      urgentLevel: getSelectedUrgentLevelFromForm(),
      mood: getSelectedMoodFromForm(),
      moodScore: getSelectedMoodScoreFromForm(),
      process: getSelectedProcessFromForm(),
      processScore: getSelectedProcessScoreFromForm(),
      optionalTagMode: state.optionalTagMode === "process" ? "process" : "mood",
      detail: refs.taskDetail.value || "",
      startAt: refs.taskStart ? normalizeDateTimeInput(refs.taskStart.value) : "",
      endAt: refs.taskEnd ? normalizeDateTimeInput(refs.taskEnd.value) : "",
      categories: getSelectedCategoriesFromForm(),
      subcategories: getSelectedTaskSubcategoriesFromForm(),
      status: refs.taskStatus.value
    };

    localStorage.setItem(TASK_FORM_DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // ignore draft persistence failures
  }
}

function clearTaskFormDraft() {
  try {
    localStorage.removeItem(TASK_FORM_DRAFT_STORAGE_KEY);
  } catch {
    // ignore draft cleanup failures
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

function createDefaultCategoryDefinitions() {
  return DEFAULT_CATEGORY_DEFINITIONS.map((item) => ({ ...item }));
}

function normalizeCategoryKey(value) {
  const raw = String(value || "").trim().toLowerCase();
  if (!raw) {
    return "";
  }
  return raw.replace(/[^a-z0-9_-]/g, "_").replace(/_+/g, "_").replace(/^_+|_+$/g, "");
}

function normalizeCategoryLabel(value, fallback = DEFAULT_CATEGORY_LABEL) {
  const raw = String(value || "").trim();
  if (!raw) {
    return fallback;
  }
  return raw.slice(0, 24);
}

function normalizeCategoryColor(value, fallback = DEFAULT_CATEGORY_COLOR) {
  const raw = String(value || "").trim();
  if (/^#[0-9a-fA-F]{6}$/.test(raw)) {
    return raw.toLowerCase();
  }
  return fallback;
}

function getCategoryDefinitionsMap(definitions = state.categoryDefinitions) {
  const map = new Map();
  (Array.isArray(definitions) ? definitions : []).forEach((item) => {
    if (item && typeof item.key === "string") {
      map.set(item.key, item);
    }
  });
  return map;
}

function getCategoryKeys(definitions = state.categoryDefinitions) {
  return (Array.isArray(definitions) ? definitions : [])
    .map((item) => item && item.key)
    .filter(Boolean);
}

function getDefaultCategoryKey(definitions = state.categoryDefinitions) {
  const keys = getCategoryKeys(definitions);
  if (keys.length) {
    return keys[0];
  }
  return DEFAULT_CATEGORY_DEFINITIONS[0].key;
}

function getCategoryLabelByKey(key, definitions = state.categoryDefinitions) {
  const map = getCategoryDefinitionsMap(definitions);
  const found = map.get(key);
  return found ? found.label : String(key || DEFAULT_CATEGORY_LABEL);
}

function getCategoryColorByKey(key, fallbackIndex = 0, definitions = state.categoryDefinitions) {
  const map = getCategoryDefinitionsMap(definitions);
  const found = map.get(key);
  if (found && found.color) {
    return found.color;
  }
  return PIE_COLORS[Math.abs(fallbackIndex) % PIE_COLORS.length] || DEFAULT_CATEGORY_COLOR;
}

function buildCategoryLabelFromKey(key) {
  const normalizedKey = normalizeCategoryKey(key);
  if (!normalizedKey) {
    return DEFAULT_CATEGORY_LABEL;
  }
  return `馃З ${normalizedKey.replace(/[_-]+/g, " ")}`;
}

function loadCategoryDefinitions() {
  const fallback = createDefaultCategoryDefinitions();
  try {
    const raw = localStorage.getItem(CATEGORY_DEFINITIONS_STORAGE_KEY);
    if (!raw) {
      return fallback;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return fallback;
    }

    const usedKeys = new Set();
    const normalized = parsed
      .map((item, index) => {
        if (!item || typeof item !== "object") {
          return null;
        }
        const key = normalizeCategoryKey(item.key);
        if (!key || usedKeys.has(key)) {
          return null;
        }
        usedKeys.add(key);
        return {
          key,
          label: normalizeCategoryLabel(item.label, buildCategoryLabelFromKey(key)),
          color: normalizeCategoryColor(item.color, PIE_COLORS[index % PIE_COLORS.length] || DEFAULT_CATEGORY_COLOR)
        };
      })
      .filter(Boolean);

    return normalized.length ? normalized : fallback;
  } catch {
    return fallback;
  }
}

function saveCategoryDefinitions() {
  try {
    localStorage.setItem(CATEGORY_DEFINITIONS_STORAGE_KEY, JSON.stringify(state.categoryDefinitions));
  } catch {
    // ignore category definition persistence failures
  }
}

function ensureCategoryDefinitionsForRawTasks(rawTasks) {
  if (!Array.isArray(rawTasks)) {
    return false;
  }

  const existing = new Set(getCategoryKeys());
  const additions = [];

  rawTasks.forEach((task) => {
    if (!task || typeof task !== "object") {
      return;
    }
    const rawValues = Array.isArray(task.categories) ? task.categories : [task.category];
    rawValues.forEach((value) => {
      const key = normalizeCategoryKey(value);
      if (!key || existing.has(key)) {
        return;
      }
      existing.add(key);
      additions.push({
        key,
        label: buildCategoryLabelFromKey(key),
        color: PIE_COLORS[(state.categoryDefinitions.length + additions.length) % PIE_COLORS.length] || DEFAULT_CATEGORY_COLOR
      });
    });
  });

  if (!additions.length) {
    return false;
  }

  state.categoryDefinitions = [...state.categoryDefinitions, ...additions];
  saveCategoryDefinitions();
  return true;
}

function ensureCategoryDefinitionsForTasks(tasks) {
  return ensureCategoryDefinitionsForRawTasks(tasks);
}

function sanitizeCategoryKeys(values, definitions = state.categoryDefinitions) {
  const keys = Array.isArray(values) ? values : [];
  const validKeys = new Set(getCategoryKeys(definitions));
  const unique = [];

  keys.forEach((value) => {
    const key = normalizeCategoryKey(value);
    if (validKeys.has(key) && !unique.includes(key)) {
      unique.push(key);
    }
  });

  return unique;
}

function getCategoryInputs() {
  if (!refs.taskCategoryGroup) {
    return [];
  }
  return Array.from(refs.taskCategoryGroup.querySelectorAll('input[name="task-categories"]'));
}

function renderCategoryChecklist() {
  if (!refs.taskCategoryGroup) {
    return;
  }

  const previousSelected = new Set(getSelectedCategoriesFromForm());
  refs.taskCategoryGroup.innerHTML = "";

  state.categoryDefinitions.forEach((definition) => {
    const item = document.createElement("label");
    item.className = "category-item";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "task-categories";
    input.value = definition.key;
    input.checked = previousSelected.has(definition.key);
    input.addEventListener("change", handleCategoryInputChanged);

    const dot = document.createElement("i");
    dot.className = "category-color-dot";
    dot.style.background = definition.color;

    const text = document.createElement("span");
    text.textContent = definition.label;

    item.appendChild(input);
    item.appendChild(dot);
    item.appendChild(text);
    refs.taskCategoryGroup.appendChild(item);
  });

  renderCategorySummary();
}

function handleCategoryInputChanged() {
  state.taskSubcategorySelections = sanitizeTaskSubcategorySelections(
    state.taskSubcategorySelections,
    getSelectedCategoriesFromForm()
  );
  renderCategorySummary();
  persistTaskFormDraft();
}

function getSelectedCategoriesFromForm() {
  const selected = [];
  getCategoryInputs().forEach((input) => {
    if (input.checked) {
      selected.push(input.value);
    }
  });
  return sanitizeCategoryKeys(selected);
}

function setSelectedCategoriesToForm(categoryKeys) {
  const selected = new Set(sanitizeCategoryKeys(categoryKeys));
  getCategoryInputs().forEach((input) => {
    input.checked = selected.has(input.value);
  });
  state.taskSubcategorySelections = sanitizeTaskSubcategorySelections(
    state.taskSubcategorySelections,
    Array.from(selected)
  );
  renderCategorySummary();
}

function getSelectedTaskSubcategoriesFromForm() {
  return sanitizeTaskSubcategorySelections(
    state.taskSubcategorySelections,
    getSelectedCategoriesFromForm()
  );
}

function setSelectedTaskSubcategoriesToForm(subcategorySelections, categoryKeys = getSelectedCategoriesFromForm()) {
  state.taskSubcategorySelections = sanitizeTaskSubcategorySelections(subcategorySelections, categoryKeys);
}

function renderCategorySummary() {
  const selected = getSelectedCategoriesFromForm();
  renderTaskSubcategoryPanel(selected);
  if (!refs.taskCategorySummary) {
    return;
  }

  if (!selected.length) {
    refs.taskCategorySummary.textContent = "\u8BF7\u9009\u62E9\u4EFB\u52A1\u7C7B\u522B";
    refs.taskCategorySummary.classList.add("is-empty");
    return;
  }

  refs.taskCategorySummary.textContent = selected.map((key) => getCategoryLabelByKey(key)).join(" / ");
  refs.taskCategorySummary.classList.remove("is-empty");
}

function renderTaskSubcategoryPanel(selectedKeys = getSelectedCategoriesFromForm()) {
  if (!refs.taskSubcategoryPanel || !refs.taskSubcategoryGroups || !refs.taskSubcategoryCaption) {
    return;
  }

  const isCategoryPickerOpen = !refs.taskCategoryPicker || refs.taskCategoryPicker.open;
  const groupMap = new Map(getTaskCategoryGroups().map((group) => [group.key, group]));
  const groups = selectedKeys
    .map((key) => groupMap.get(key))
    .filter(Boolean);

  refs.taskSubcategoryPanel.classList.toggle("is-hidden", groups.length === 0 || !isCategoryPickerOpen);
  refs.taskSubcategoryGroups.innerHTML = "";

  if (!groups.length) {
    refs.taskSubcategoryCaption.textContent = "选择上方 5 大类后显示";
    return;
  }

  if (!isCategoryPickerOpen) {
    refs.taskSubcategoryCaption.textContent = "展开“任务类别”后显示";
    return;
  }

  refs.taskSubcategoryCaption.textContent = `当前展示 ${groups.length} 个大类的小类`;

  groups.forEach((group, index) => {
    const section = document.createElement("section");
    section.className = "task-subcategory-group";
    section.style.setProperty("--task-subcategory-accent", getCategoryColorByKey(group.key, index));

    const heading = document.createElement("div");
    heading.className = "task-subcategory-group-head";

    const title = document.createElement("strong");
    title.textContent = `${group.icon} ${group.label}`;

    const hint = document.createElement("span");
    hint.textContent = `${group.subcategories.length} 个小类`;

    heading.appendChild(title);
    heading.appendChild(hint);

    const chipWrap = document.createElement("div");
    chipWrap.className = "task-subcategory-chip-wrap";
    const selectedSubcategories = getSelectedTaskSubcategoriesForGroup(group.key);

    group.subcategories.forEach((item) => {
      const chip = document.createElement("button");
      const selected = selectedSubcategories.includes(item.key);
      chip.type = "button";
      chip.className = "task-subcategory-chip";
      chip.classList.toggle("is-active", selected);
      chip.setAttribute("aria-pressed", selected ? "true" : "false");
      chip.textContent = item.label;
      chip.addEventListener("click", () => {
        toggleTaskSubcategorySelection(group.key, item.key);
      });
      chipWrap.appendChild(chip);
    });

    section.appendChild(heading);
    section.appendChild(chipWrap);
    refs.taskSubcategoryGroups.appendChild(section);
  });
}

function createDefaultTaskCategorySubcategoryConfig() {
  return Object.fromEntries(
    TASK_CATEGORY_GROUPS.map((group) => [
      group.key,
      group.subcategories.map((item) => ({
        key: item.key,
        label: item.label,
        keywords: Array.isArray(item.keywords) ? [...item.keywords] : []
      }))
    ])
  );
}

function getBaseTaskCategoryGroupByKey(groupKey) {
  return TASK_CATEGORY_GROUPS.find((group) => group.key === groupKey) || null;
}

function normalizeTaskCategorySubcategoryConfig(groupKey, subcategories, fallbackSubcategories = []) {
  const fallback = Array.isArray(fallbackSubcategories) && fallbackSubcategories.length
    ? fallbackSubcategories
    : [{ key: `${groupKey}_other`, label: "\u5176\u4ED6", keywords: [] }];
  const source = Array.isArray(subcategories) && subcategories.length ? subcategories : fallback;
  const usedKeys = new Set();
  const normalized = [];

  source.forEach((item, index) => {
    if (!item || typeof item !== "object") {
      return;
    }

    const label = normalizeCategoryLabel(item.label, `\u5C0F\u7C7B${index + 1}`);
    const seed = item.key || `${groupKey}_${label}`;
    let key = normalizeCategoryKey(seed) || `${groupKey}_item_${index + 1}`;
    let duplicateIndex = 1;
    while (usedKeys.has(key)) {
      key = `${normalizeCategoryKey(seed) || `${groupKey}_item`}_${duplicateIndex}`;
      duplicateIndex += 1;
    }
    usedKeys.add(key);

    const keywords = Array.isArray(item.keywords)
      ? item.keywords
        .map((keyword) => String(keyword || "").trim())
        .filter((keyword, keywordIndex, list) => keyword && list.indexOf(keyword) === keywordIndex)
        .slice(0, 8)
      : [];

    normalized.push({
      key,
      label,
      keywords
    });
  });

  if (normalized.length) {
    return normalized;
  }
  return fallback.map((item) => ({
    key: normalizeCategoryKey(item.key) || createUniqueTaskCategorySubcategoryKey(groupKey, item.label, normalized),
    label: normalizeCategoryLabel(item.label, "\u5176\u4ED6"),
    keywords: Array.isArray(item.keywords) ? [...item.keywords] : []
  }));
}

function loadTaskCategorySubcategoryConfig() {
  const fallback = createDefaultTaskCategorySubcategoryConfig();
  try {
    const raw = localStorage.getItem(TASK_CATEGORY_SUBCATEGORY_CONFIG_STORAGE_KEY);
    if (!raw) {
      return fallback;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return fallback;
    }

    const normalized = {};
    TASK_CATEGORY_GROUPS.forEach((group) => {
      normalized[group.key] = normalizeTaskCategorySubcategoryConfig(
        group.key,
        parsed[group.key],
        fallback[group.key]
      );
    });
    return normalized;
  } catch {
    return fallback;
  }
}

function saveTaskCategorySubcategoryConfig() {
  try {
    localStorage.setItem(
      TASK_CATEGORY_SUBCATEGORY_CONFIG_STORAGE_KEY,
      JSON.stringify(state.taskCategorySubcategoryConfig)
    );
  } catch {
    // ignore task category config persistence failures
  }
}

function getTaskCategorySubcategoriesConfigByGroupKey(groupKey) {
  const baseGroup = getBaseTaskCategoryGroupByKey(groupKey);
  if (!baseGroup) {
    return [];
  }

  const fallback = createDefaultTaskCategorySubcategoryConfig()[groupKey] || [];
  const current = state.taskCategorySubcategoryConfig && state.taskCategorySubcategoryConfig[groupKey];
  return normalizeTaskCategorySubcategoryConfig(groupKey, current, fallback);
}

function getTaskCategoryGroups() {
  return TASK_CATEGORY_GROUPS.map((group) => ({
    ...group,
    subcategories: getTaskCategorySubcategoriesConfigByGroupKey(group.key)
  }));
}

function getTaskCategoryGroupByKey(groupKey) {
  return getTaskCategoryGroups().find((group) => group.key === groupKey) || null;
}

function sanitizeTaskSubcategorySelections(subcategorySelections, categoryKeys = getSelectedCategoriesFromForm()) {
  const allowedCategoryKeys = new Set(sanitizeCategoryKeys(categoryKeys));
  const source = subcategorySelections && typeof subcategorySelections === "object" ? subcategorySelections : {};
  const normalized = {};

  allowedCategoryKeys.forEach((groupKey) => {
    const group = getTaskCategoryGroupByKey(groupKey);
    if (!group) {
      return;
    }

    const allowedSubcategories = new Set(group.subcategories.map((item) => item.key));
    const rawItems = Array.isArray(source[groupKey]) ? source[groupKey] : [];
    const selected = rawItems
      .map((item) => String(item || "").trim())
      .filter((item, index, list) => item && allowedSubcategories.has(item) && list.indexOf(item) === index);

    if (selected.length) {
      normalized[groupKey] = selected;
    }
  });

  return normalized;
}

function getSelectedTaskSubcategoriesForGroup(groupKey) {
  const selections = getSelectedTaskSubcategoriesFromForm();
  return Array.isArray(selections[groupKey]) ? selections[groupKey] : [];
}

function toggleTaskSubcategorySelection(groupKey, subcategoryKey) {
  const nextSelections = { ...getSelectedTaskSubcategoriesFromForm() };
  const current = Array.isArray(nextSelections[groupKey]) ? [...nextSelections[groupKey]] : [];
  const existingIndex = current.indexOf(subcategoryKey);

  if (existingIndex >= 0) {
    current.splice(existingIndex, 1);
  } else {
    current.push(subcategoryKey);
  }

  if (current.length) {
    nextSelections[groupKey] = current;
  } else {
    delete nextSelections[groupKey];
  }

  setSelectedTaskSubcategoriesToForm(nextSelections);
  renderTaskSubcategoryPanel();
  persistTaskFormDraft();
}

function createUniqueCategoryKey(seed = "custom") {
  const base = normalizeCategoryKey(seed) || "custom";
  const existing = new Set(getCategoryKeys());
  let candidate = base;
  let index = 1;
  while (existing.has(candidate)) {
    candidate = `${base}_${index}`;
    index += 1;
  }
  return candidate;
}

function bindCategoryManagerEvents() {
  if (refs.openCategoryManagerFormBtn) {
    refs.openCategoryManagerFormBtn.addEventListener("click", openCategoryManager);
  }
  if (refs.closeCategoryManagerBtn) {
    refs.closeCategoryManagerBtn.addEventListener("click", closeCategoryManager);
  }
  if (refs.addCategoryBtn) {
    refs.addCategoryBtn.addEventListener("click", addCategoryDefinition);
  }
  if (refs.categoryManagerList) {
    refs.categoryManagerList.addEventListener("dragover", (event) => {
      if (!state.draggingCategoryKey) {
        return;
      }
      event.preventDefault();
      const targetRow = event.target.closest(".category-manager-item");
      if (!targetRow) {
        clearCategoryManagerDragStyles();
      }
    });
    refs.categoryManagerList.addEventListener("drop", (event) => {
      if (!state.draggingCategoryKey) {
        return;
      }
      const targetRow = event.target.closest(".category-manager-item");
      if (targetRow) {
        return;
      }
      event.preventDefault();
      reorderCategoryDefinitions(state.draggingCategoryKey, "");
      state.draggingCategoryKey = "";
      clearCategoryManagerDragStyles();
      renderCategoryManager();
    });
  }
  if (refs.categoryManagerModal) {
    refs.categoryManagerModal.addEventListener("click", (event) => {
      if (event.target === refs.categoryManagerModal) {
        closeCategoryManager();
      }
    });
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && refs.categoryManagerModal && !refs.categoryManagerModal.classList.contains("is-hidden")) {
      closeCategoryManager();
    }
  });
}

function openCategoryManager() {
  if (!refs.categoryManagerModal) {
    return;
  }
  renderCategoryManager();
  refs.categoryManagerModal.classList.remove("is-hidden");
  refs.categoryManagerModal.setAttribute("aria-hidden", "false");
}

function closeCategoryManager() {
  if (!refs.categoryManagerModal) {
    return;
  }
  refs.categoryManagerModal.classList.add("is-hidden");
  refs.categoryManagerModal.setAttribute("aria-hidden", "true");
}

function renderCategoryManager() {
  if (!refs.categoryManagerList) {
    return;
  }
  refs.categoryManagerList.innerHTML = "";
  clearCategoryManagerDragStyles();

  state.categoryDefinitions.forEach((definition) => {
    const row = document.createElement("div");
    row.className = "category-manager-item";
    row.dataset.categoryKey = definition.key;

    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.className = "category-manager-color";
    colorInput.value = normalizeCategoryColor(definition.color, DEFAULT_CATEGORY_COLOR);
    colorInput.title = "类别颜色";
    colorInput.addEventListener("change", () => {
      updateCategoryDefinition(definition.key, { color: colorInput.value }, { skipManagerRerender: true });
    });

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.className = "category-manager-name";
    nameInput.maxLength = 24;
    nameInput.value = definition.label;
    nameInput.placeholder = "类别名称";
    nameInput.addEventListener("change", () => {
      updateCategoryDefinition(definition.key, { label: nameInput.value }, { skipManagerRerender: true });
    });

    const keyText = document.createElement("span");
    keyText.className = "category-manager-key";
    keyText.textContent = definition.key;

    const dragHandle = document.createElement("button");
    dragHandle.type = "button";
    dragHandle.className = "category-manager-drag-handle";
    dragHandle.textContent = "⋮⋮";
    dragHandle.title = "拖拽排序";
    dragHandle.setAttribute("draggable", "true");
    dragHandle.addEventListener("dragstart", (event) => {
      state.draggingCategoryKey = definition.key;
      row.classList.add("is-dragging");
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", definition.key);
      }
    });
    dragHandle.addEventListener("dragend", () => {
      state.draggingCategoryKey = "";
      clearCategoryManagerDragStyles();
    });

    const keyWrap = document.createElement("div");
    keyWrap.className = "category-manager-key-wrap";
    keyWrap.appendChild(dragHandle);
    keyWrap.appendChild(keyText);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "danger category-manager-delete";
    deleteBtn.textContent = "删除";
    deleteBtn.addEventListener("click", () => {
      deleteCategoryDefinition(definition.key);
    });

    row.addEventListener("dragover", (event) => {
      if (!state.draggingCategoryKey || state.draggingCategoryKey === definition.key) {
        return;
      }
      event.preventDefault();
      clearCategoryManagerDragStyles();
      row.classList.add("is-drag-over");
    });
    row.addEventListener("drop", (event) => {
      if (!state.draggingCategoryKey || state.draggingCategoryKey === definition.key) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      reorderCategoryDefinitions(state.draggingCategoryKey, definition.key);
      state.draggingCategoryKey = "";
      clearCategoryManagerDragStyles();
      renderCategoryManager();
    });
    row.addEventListener("dragleave", (event) => {
      if (event.currentTarget === row) {
        row.classList.remove("is-drag-over");
      }
    });

    row.appendChild(colorInput);
    row.appendChild(nameInput);
    row.appendChild(keyWrap);
    row.appendChild(deleteBtn);
    refs.categoryManagerList.appendChild(row);
  });
}

function clearCategoryManagerDragStyles() {
  if (!refs.categoryManagerList) {
    return;
  }
  refs.categoryManagerList.querySelectorAll(".category-manager-item").forEach((row) => {
    row.classList.remove("is-drag-over", "is-dragging");
  });
}

function reorderCategoryDefinitions(draggingKey, targetKey) {
  const dragKey = normalizeCategoryKey(draggingKey);
  if (!dragKey) {
    return;
  }

  const current = [...state.categoryDefinitions];
  const fromIndex = current.findIndex((item) => item.key === dragKey);
  if (fromIndex < 0) {
    return;
  }

  const [moved] = current.splice(fromIndex, 1);
  if (!targetKey) {
    current.push(moved);
  } else {
    const toIndex = current.findIndex((item) => item.key === targetKey);
    if (toIndex < 0) {
      current.push(moved);
    } else {
      current.splice(toIndex, 0, moved);
    }
  }

  const unchanged = current.every((item, index) => item.key === state.categoryDefinitions[index].key);
  if (unchanged) {
    return;
  }

  state.categoryDefinitions = current;
  saveCategoryDefinitions();
  renderCategoryChecklist();
  renderAll();
  persistTaskFormDraft();
}

function updateCategoryDefinition(key, updates, options = {}) {
  const definition = state.categoryDefinitions.find((item) => item.key === key);
  if (!definition || !updates || typeof updates !== "object") {
    return;
  }

  let changed = false;

  if (Object.prototype.hasOwnProperty.call(updates, "label")) {
    const nextLabel = normalizeCategoryLabel(updates.label, DEFAULT_CATEGORY_LABEL);
    if (nextLabel !== definition.label) {
      definition.label = nextLabel;
      changed = true;
    }
  }

  if (Object.prototype.hasOwnProperty.call(updates, "color")) {
    const nextColor = normalizeCategoryColor(updates.color, definition.color || DEFAULT_CATEGORY_COLOR);
    if (nextColor !== definition.color) {
      definition.color = nextColor;
      changed = true;
    }
  }

  if (!changed) {
    return;
  }

  saveCategoryDefinitions();
  renderCategoryChecklist();
  renderAll();
  persistTaskFormDraft();

  if (!options.skipManagerRerender) {
    renderCategoryManager();
  }
}

function hasSameCategorySequence(left, right) {
  if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length) {
    return false;
  }
  return left.every((item, idx) => item === right[idx]);
}

function deleteCategoryDefinition(targetKey) {
  if (state.categoryDefinitions.length <= 1) {
    alert("\u81F3\u5C11\u9700\u4FDD\u7559\u4E00\u4E2A\u4EFB\u52A1\u7C7B\u522B\u3002");
    return;
  }

  const nextDefinitions = state.categoryDefinitions.filter((item) => item.key !== targetKey);
  if (!nextDefinitions.length) {
    return;
  }

  const fallbackKey = getDefaultCategoryKey(nextDefinitions);
  let remappedTaskCount = 0;

  state.tasks = state.tasks.map((task) => {
    const currentCategories = sanitizeCategoryKeys(Array.isArray(task.categories) ? task.categories : [task.category]);
    const nextCategories = sanitizeCategoryKeys(currentCategories, nextDefinitions);
    if (!nextCategories.length) {
      nextCategories.push(fallbackKey);
    }
    if (hasSameCategorySequence(currentCategories, nextCategories)) {
      return task;
    }
    remappedTaskCount += 1;
    return {
      ...task,
      categories: nextCategories
    };
  });

  state.categoryDefinitions = nextDefinitions;
  saveCategoryDefinitions();
  saveTasks();

  renderCategoryChecklist();
  renderCategoryManager();
  renderAll();
  persistTaskFormDraft();

  if (remappedTaskCount > 0) {
    alert(`\u5DF2\u5220\u9664\u7C7B\u522B\uFF0C\u5E76\u5C06 ${remappedTaskCount} \u6761\u4EFB\u52A1\u81EA\u52A8\u5F52\u7C7B\u5230\u201C${getCategoryLabelByKey(fallbackKey)}\u201D\u3002`);
  }
}

function addCategoryDefinition() {
  const key = createUniqueCategoryKey("custom");
  const nextIndex = state.categoryDefinitions.length + 1;
  state.categoryDefinitions.push({
    key,
    label: `\uD83E\uDDE9 \u65B0\u7C7B\u522B${nextIndex}`,
    color: PIE_COLORS[state.categoryDefinitions.length % PIE_COLORS.length] || DEFAULT_CATEGORY_COLOR
  });

  saveCategoryDefinitions();
  renderCategoryChecklist();
  renderCategoryManager();
  renderAll();
  persistTaskFormDraft();

  if (refs.categoryManagerList) {
    const lastRowInput = refs.categoryManagerList.querySelector(`.category-manager-item[data-category-key="${key}"] .category-manager-name`);
    if (lastRowInput) {
      lastRowInput.focus();
      lastRowInput.select();
    }
  }
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
  const priority = PRIORITY_MAP[input.priority] ? input.priority : "important_not_urgent";
  const optionalTagTouched = input.optionalTagTouched === true;

  let mood = sanitizeMoodKey(input.mood);
  let moodScore = mood ? normalizeMoodScore(input.moodScore) : "";
  let process = sanitizeProcessKey(input.process);
  let processScore = process ? normalizeMoodScore(input.processScore) : "";

  if (!optionalTagTouched) {
    mood = "";
    moodScore = "";
    process = "";
    processScore = "";
  }

  return {
    id: String(input.id || createTaskId()),
    name: String(input.name || "").trim(),
    priority,
    importanceLevel: priority === "important_not_urgent" ? sanitizeImportanceLevel(input.importanceLevel) : "",
    urgentLevel: priority === "important_urgent" ? sanitizeUrgentLevel(input.urgentLevel) : "",
    mood,
    moodScore,
    process,
    processScore,
    optionalTagTouched,
    autoUrgentEscalation: input.autoUrgentEscalation === true,
    detail: String(input.detail || "").trim(),
    startAt,
    endAt,
    categories: categories.length ? categories : [getDefaultCategoryKey()],
    subcategories: sanitizeTaskSubcategorySelections(input.subcategories, categories),
    status: Object.prototype.hasOwnProperty.call(STATUS_COLUMNS, input.status) ? input.status : "todo"
  };
}

function sanitizeImportanceLevel(value) {
  if (Object.prototype.hasOwnProperty.call(IMPORTANCE_LEVEL_MAP, value)) {
    return value;
  }
  return DEFAULT_IMPORTANCE_LEVEL;
}

function sanitizeUrgentLevel(value) {
  if (Object.prototype.hasOwnProperty.call(URGENT_LEVEL_MAP, value)) {
    return value;
  }
  return DEFAULT_URGENT_LEVEL;
}

function sanitizeMoodKey(value) {
  if (Object.prototype.hasOwnProperty.call(MOOD_MAP, value)) {
    return value;
  }
  return DEFAULT_MOOD;
}

function sanitizeProcessKey(value) {
  if (Object.prototype.hasOwnProperty.call(PROCESS_MAP, value)) {
    return value;
  }
  return DEFAULT_PROCESS;
}

function normalizeMoodScore(value) {
  if (value === "" || value === null || typeof value === "undefined") {
    return "";
  }

  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return "";
  }

  const rounded = Math.round(numeric);
  if (rounded < 0) {
    return 0;
  }
  if (rounded > 100) {
    return 100;
  }
  return rounded;
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

function getSelectedUrgentLevelFromForm() {
  let selected = DEFAULT_URGENT_LEVEL;
  refs.taskUrgentLevels.forEach((input) => {
    if (input.checked) {
      selected = input.value;
    }
  });
  return sanitizeUrgentLevel(selected);
}

function setSelectedUrgentLevelToForm(level) {
  const selected = sanitizeUrgentLevel(level);
  refs.taskUrgentLevels.forEach((input) => {
    input.checked = input.value === selected;
  });
}

function getSelectedMoodFromForm() {
  if (!refs.taskMood) {
    return DEFAULT_MOOD;
  }
  return sanitizeMoodKey(refs.taskMood.value);
}

function setSelectedMoodToForm(mood) {
  if (!refs.taskMood) {
    return;
  }
  refs.taskMood.value = sanitizeMoodKey(mood);
}

function getSelectedMoodScoreFromForm() {
  if (!refs.taskMoodScore) {
    return "";
  }
  return normalizeMoodScore(refs.taskMoodScore.value);
}

function setSelectedMoodScoreToForm(score) {
  if (!refs.taskMoodScore) {
    return;
  }
  const normalized = normalizeMoodScore(score);
  refs.taskMoodScore.value = normalized === "" ? "" : String(normalized);
}

function getSelectedProcessFromForm() {
  if (!refs.taskProcess) {
    return DEFAULT_PROCESS;
  }
  return sanitizeProcessKey(refs.taskProcess.value);
}

function setSelectedProcessToForm(process) {
  if (!refs.taskProcess) {
    return;
  }
  refs.taskProcess.value = sanitizeProcessKey(process);
}

function getSelectedProcessScoreFromForm() {
  if (!refs.taskProcessScore) {
    return "";
  }
  return normalizeMoodScore(refs.taskProcessScore.value);
}

function setSelectedProcessScoreToForm(score) {
  if (!refs.taskProcessScore) {
    return;
  }
  const normalized = normalizeMoodScore(score);
  refs.taskProcessScore.value = normalized === "" ? "" : String(normalized);
}

function setOptionalTagMode(mode) {
  const nextMode = mode === "process" ? "process" : "mood";
  state.optionalTagMode = nextMode;

  if (refs.switchMood) {
    refs.switchMood.classList.toggle("is-active", nextMode === "mood");
  }
  if (refs.switchProcess) {
    refs.switchProcess.classList.toggle("is-active", nextMode === "process");
  }
  if (refs.panelMood) {
    refs.panelMood.classList.toggle("is-hidden", nextMode !== "mood");
  }
  if (refs.panelProcess) {
    refs.panelProcess.classList.toggle("is-hidden", nextMode !== "process");
  }
}

function bindOptionalTagSwitch() {
  if (refs.switchMood) {
    refs.switchMood.addEventListener("click", () => {
      setOptionalTagMode("mood");
      persistTaskFormDraft();
    });
  }
  if (refs.switchProcess) {
    refs.switchProcess.addEventListener("click", () => {
      setOptionalTagMode("process");
      persistTaskFormDraft();
    });
  }
  setOptionalTagMode(DEFAULT_OPTIONAL_TAG_MODE);
}

function handlePriorityChange() {
  if (!refs.taskImportanceWrapper || !refs.taskUrgentWrapper || !refs.taskPriority) {
    return;
  }
  const showImportanceLevel = refs.taskPriority.value === "important_not_urgent";
  const showUrgentLevel = refs.taskPriority.value === "important_urgent";
  refs.taskImportanceWrapper.classList.toggle("is-hidden", !showImportanceLevel);
  refs.taskUrgentWrapper.classList.toggle("is-hidden", !showUrgentLevel);
  if (showImportanceLevel) {
    setSelectedImportanceLevelToForm(getSelectedImportanceLevelFromForm());
  }
  if (showUrgentLevel) {
    setSelectedUrgentLevelToForm(getSelectedUrgentLevelFromForm());
  }
}

function formatPriorityLabel(task) {
  const base = PRIORITY_MAP[task.priority] || "-";
  if (task.priority === "important_not_urgent") {
    const level = sanitizeImportanceLevel(task.importanceLevel);
    return `${base} (${IMPORTANCE_LEVEL_MAP[level]})`;
  }
  if (task.priority === "important_urgent") {
    const level = sanitizeUrgentLevel(task.urgentLevel);
    return `${base} (${URGENT_LEVEL_MAP[level]})`;
  }
  return base;
}

function getPriorityPillClassName(priority) {
  if (!Object.prototype.hasOwnProperty.call(PRIORITY_MAP, priority)) {
    return "";
  }
  return `priority-pill--${priority}`;
}

function getPriorityVisualStyle(task) {
  if (task && task.priority === "important_not_urgent") {
    const level = sanitizeImportanceLevel(task.importanceLevel);
    const levelStyleMap = {
      level1: {
        pillBackground: "rgba(255, 138, 0, 0.9)",
        pillBorder: "rgba(201, 112, 16, 0.52)",
        pillText: "#fffaf2",
        accentColor: "rgba(255, 138, 0, 0.9)"
      },
      level2: {
        pillBackground: "rgba(255, 138, 0, 0.7)",
        pillBorder: "rgba(201, 112, 16, 0.44)",
        pillText: "#fffaf2",
        accentColor: "rgba(255, 138, 0, 0.7)"
      },
      level3: {
        pillBackground: "rgba(255, 138, 0, 0.5)",
        pillBorder: "rgba(201, 112, 16, 0.34)",
        pillText: "#7a4300",
        accentColor: "rgba(255, 138, 0, 0.5)"
      },
      level4: {
        pillBackground: "rgba(255, 138, 0, 0.3)",
        pillBorder: "rgba(201, 112, 16, 0.24)",
        pillText: "#7a4300",
        accentColor: "rgba(255, 138, 0, 0.3)"
      }
    };
    return levelStyleMap[level] || levelStyleMap.level2;
  }

  switch (task && task.priority) {
    case "important_urgent":
      return { accentColor: "#f2382e" };
    case "important_not_urgent":
      return { accentColor: "#ff8a00" };
    case "not_important_urgent":
      return { accentColor: "#ffbf00" };
    case "not_important_not_urgent":
      return { accentColor: "#9fd500" };
    default:
      return { accentColor: "#c06331" };
  }
}

function applyPriorityVisualStyle(task, priorityPill, card) {
  if (!priorityPill || !card) {
    return;
  }

  const visualStyle = getPriorityVisualStyle(task);
  priorityPill.style.removeProperty("background");
  priorityPill.style.removeProperty("border-color");
  priorityPill.style.removeProperty("color");

  if (visualStyle.pillBackground) {
    priorityPill.style.background = visualStyle.pillBackground;
  }
  if (visualStyle.pillBorder) {
    priorityPill.style.borderColor = visualStyle.pillBorder;
  }
  if (visualStyle.pillText) {
    priorityPill.style.color = visualStyle.pillText;
  }

  card.style.setProperty("--task-card-accent", visualStyle.accentColor || "#c06331");
}

function formatMoodLabel(task) {
  const moodKey = sanitizeMoodKey(task.mood);
  if (!moodKey) {
    return "";
  }
  const mood = MOOD_MAP[moodKey];
  const score = normalizeMoodScore(task.moodScore);
  if (score === "") {
    return mood;
  }
  return `${mood} ${score}`;
}

function formatProcessLabel(task) {
  const processKey = sanitizeProcessKey(task.process);
  if (!processKey) {
    return "";
  }
  const process = PROCESS_MAP[processKey];
  const score = normalizeMoodScore(task.processScore);
  if (score === "") {
    return process;
  }
  return `${process} ${score}`;
}

function getTaskCategories(task) {
  const categories = sanitizeCategoryKeys(
    Array.isArray(task.categories) ? task.categories : [task.category]
  );
  return categories.length ? categories : [getDefaultCategoryKey()];
}

function getPrimaryCategory(task) {
  const categories = getTaskCategories(task);
  return categories[0] || getDefaultCategoryKey();
}

function getCategoryLabels(task) {
  return getTaskCategories(task)
    .map((key) => getCategoryLabelByKey(key))
    .join(" / ");
}

function saveTasks(options = {}) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
  if (!options.skipLocalMutationStamp) {
    setLocalTaskMutationAt();
  }
  if (options.skipCloudSync) {
    return;
  }
  scheduleCloudTaskSync();
}

function getAutoUrgentLevelByTask(task, now = new Date()) {
  if (!task || task.status !== "doing") {
    return "";
  }

  const start = parseDateTime(task.startAt);
  if (!start) {
    return "";
  }

  const elapsedDays = (now.getTime() - start.getTime()) / (24 * 60 * 60 * 1000);
  if (elapsedDays < 1) {
    return "";
  }

  for (const rule of AUTO_URGENT_ESCALATION_DAY_LEVELS) {
    if (elapsedDays >= rule.minDays) {
      return rule.level;
    }
  }

  return "";
}

function applyAutoUrgentEscalation(now = new Date()) {
  let hasChange = false;

  state.tasks.forEach((task) => {
    const targetLevel = getAutoUrgentLevelByTask(task, now);
    if (!targetLevel) {
      return;
    }

    const canAutoEscalate = task.priority === "important_not_urgent" || task.autoUrgentEscalation === true;
    if (!canAutoEscalate) {
      return;
    }

    const normalizedCurrentLevel = sanitizeUrgentLevel(task.urgentLevel);
    if (
      task.priority !== "important_urgent"
      || normalizedCurrentLevel !== targetLevel
      || task.autoUrgentEscalation !== true
      || task.importanceLevel
    ) {
      task.priority = "important_urgent";
      task.urgentLevel = targetLevel;
      task.importanceLevel = "";
      task.autoUrgentEscalation = true;
      hasChange = true;
    }
  });

  return hasChange;
}

function onSubmitTask(event) {
  event.preventDefault();

  const categories = getSelectedCategoriesFromForm();
  const selectedMood = getSelectedMoodFromForm();
  const selectedProcess = getSelectedProcessFromForm();
  const existingTask = state.tasks.find((item) => item.id === refs.taskId.value);
  const shouldCelebrateCompletion = Boolean(existingTask && existingTask.status !== "done" && refs.taskStatus.value === "done");
  const task = {
    id: refs.taskId.value || createTaskId(),
    name: refs.taskName.value.trim(),
    priority: refs.taskPriority.value,
    importanceLevel: refs.taskPriority.value === "important_not_urgent" ? getSelectedImportanceLevelFromForm() : "",
    urgentLevel: refs.taskPriority.value === "important_urgent" ? getSelectedUrgentLevelFromForm() : "",
    mood: selectedMood,
    moodScore: selectedMood ? getSelectedMoodScoreFromForm() : "",
    process: selectedProcess,
    processScore: selectedProcess ? getSelectedProcessScoreFromForm() : "",
    optionalTagTouched: Boolean(selectedMood || selectedProcess),
    autoUrgentEscalation: false,
    detail: refs.taskDetail.value.trim(),
    startAt: normalizeDateTimeInput(refs.taskStart ? refs.taskStart.value : ""),
    endAt: normalizeDateTimeInput(refs.taskEnd ? refs.taskEnd.value : ""),
    categories,
    subcategories: getSelectedTaskSubcategoriesFromForm(),
    status: refs.taskStatus.value
  };

  if (
    task.priority === "important_urgent"
    && existingTask
    && existingTask.autoUrgentEscalation === true
    && existingTask.priority === "important_urgent"
    && sanitizeUrgentLevel(existingTask.urgentLevel) === task.urgentLevel
  ) {
    task.autoUrgentEscalation = true;
  }

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
  if (shouldCelebrateCompletion) {
    triggerTaskCompletionCelebration();
  }
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
  refs.taskPriority.value = "important_not_urgent";
  setSelectedImportanceLevelToForm(DEFAULT_IMPORTANCE_LEVEL);
  setSelectedUrgentLevelToForm(DEFAULT_URGENT_LEVEL);
  setSelectedMoodToForm(DEFAULT_MOOD);
  setSelectedMoodScoreToForm("");
  setSelectedProcessToForm(DEFAULT_PROCESS);
  setSelectedProcessScoreToForm("");
  setOptionalTagMode(DEFAULT_OPTIONAL_TAG_MODE);
  setSelectedTaskSubcategoriesToForm({});
  setSelectedCategoriesToForm([]);
  handlePriorityChange();
  if (refs.taskCategoryPicker) {
    refs.taskCategoryPicker.open = false;
  }
  updateDetailCount();
  updateDurationPreview();
  clearTaskFormDraft();
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
  const hasEscalationChange = applyAutoUrgentEscalation();
  if (hasEscalationChange) {
    saveTasks();
  }
  renderBoard();
  renderAllocationOverview();
  renderBedtimeReview();
  renderTaskCategoryPage();
}

function getBedtimeReviewDateValue() {
  const raw = state.bedtimeReviewDate || toDateInputValue(new Date());
  return normalizeDateTimeInput(`${raw}T00:00`).slice(0, 10) || toDateInputValue(new Date());
}

function shiftBedtimeReviewWeek(weekOffset) {
  const offset = Number(weekOffset);
  if (!Number.isFinite(offset) || offset === 0) {
    return;
  }
  const base = parseDateTime(`${getBedtimeReviewDateValue()}T00:00`) || new Date();
  base.setDate(base.getDate() + Math.trunc(offset) * 7);
  state.bedtimeReviewDate = toDateInputValue(base);
  renderBedtimeReview();
}

function getBedtimeReviewReasons(task) {
  const reasons = [];
  if (task && task.priority === "important_urgent") {
    reasons.push("\u7D27\u6025\u4E14\u91CD\u8981");
  }
  if (
    task
    && task.priority === "important_not_urgent"
    && sanitizeImportanceLevel(task.importanceLevel) === "level1"
  ) {
    reasons.push("\u91CD\u8981\u4E0D\u7D27\u6025(1\u7EA7)");
  }
  const processKey = sanitizeProcessKey(task && task.process ? task.process : "");
  if (BEDTIME_REVIEW_BAD_PROCESS_KEYS.has(processKey)) {
    reasons.push(processKey === "very_unsmooth" ? "\u8FC7\u7A0B\u5F88\u5DEE" : "\u8FC7\u7A0B\u8F83\u5DEE");
  }
  return reasons;
}

function getBedtimeReviewWeekDays(weekStart) {
  const dayMs = 24 * 60 * 60 * 1000;
  return Array.from({ length: 7 }, (_, index) => {
    const start = new Date(weekStart.getTime() + index * dayMs);
    const end = new Date(start.getTime() + dayMs);
    return {
      index,
      key: toDateInputValue(start),
      label: BEDTIME_REVIEW_WEEKDAY_LABELS[index] || `\u7B2C${index + 1}\u5929`,
      start,
      end
    };
  });
}

function renderBedtimeReview() {
  if (!refs.bedtimeReviewSummary || !refs.bedtimeReviewGroups || !refs.bedtimeReviewWeekDisplay) {
    return;
  }

  const anchorDay = getBedtimeReviewDateValue();
  state.bedtimeReviewDate = anchorDay;

  const weekRange = getWeekRangeFromDate(anchorDay);
  const weekInfo = getIsoWeekInfo(weekRange.start);
  refs.bedtimeReviewWeekDisplay.textContent = `${weekInfo.year}年第${weekInfo.week}周`;
  refs.bedtimeReviewWeekDisplay.title = `${weekInfo.year}年第${weekInfo.week}周`;

  const weekDays = getBedtimeReviewWeekDays(weekRange.start);
  const entriesByDay = Object.fromEntries(weekDays.map((day) => [day.key, []]));

  let urgentImportantCount = 0;
  let importantNotUrgentLevel1Count = 0;
  let badProcessCount = 0;
  let totalRiskCount = 0;

  state.tasks.forEach((task) => {
    const range = getTaskRange(task);
    if (!range) {
      return;
    }
    const overlap = getOverlapMinutes(range.start, range.end, weekRange.start, weekRange.end);
    if (overlap <= 0) {
      return;
    }

    const reasons = getBedtimeReviewReasons(task);
    if (!reasons.length) {
      return;
    }

    if (reasons.includes("\u7D27\u6025\u4E14\u91CD\u8981")) {
      urgentImportantCount += 1;
    }
    if (reasons.includes("\u91CD\u8981\u4E0D\u7D27\u6025(1\u7EA7)")) {
      importantNotUrgentLevel1Count += 1;
    }
    if (reasons.includes("\u8FC7\u7A0B\u8F83\u5DEE") || reasons.includes("\u8FC7\u7A0B\u5F88\u5DEE")) {
      badProcessCount += 1;
    }
    totalRiskCount += 1;

    weekDays.forEach((day) => {
      const dayOverlap = getOverlapMinutes(range.start, range.end, day.start, day.end);
      if (dayOverlap <= 0) {
        return;
      }
      entriesByDay[day.key].push({ task, reasons });
    });
  });

  Object.values(entriesByDay).forEach((items) => {
    items.sort((left, right) => {
      const leftTime = parseDateTime(left.task.startAt);
      const rightTime = parseDateTime(right.task.startAt);
      const leftTs = leftTime ? leftTime.getTime() : Number.MAX_SAFE_INTEGER;
      const rightTs = rightTime ? rightTime.getTime() : Number.MAX_SAFE_INTEGER;
      return leftTs - rightTs;
    });
  });

  refs.bedtimeReviewSummary.innerHTML = "";
  const summaryItems = [
    { label: "\u603B\u9700\u56DE\u987E", value: String(totalRiskCount) },
    { label: "\u7D27\u6025\u4E14\u91CD\u8981", value: String(urgentImportantCount) },
    { label: "\u91CD\u8981\u4E0D\u7D27\u6025(1\u7EA7)", value: String(importantNotUrgentLevel1Count) },
    { label: "\u8FC7\u7A0B\u8F83\u5DEE/\u5F88\u5DEE", value: String(badProcessCount) }
  ];
  summaryItems.forEach((item) => {
    const card = document.createElement("div");
    card.className = "summary-item";
    const label = document.createElement("span");
    label.textContent = item.label;
    const value = document.createElement("strong");
    value.textContent = item.value;
    card.appendChild(label);
    card.appendChild(value);
    refs.bedtimeReviewSummary.appendChild(card);
  });

  refs.bedtimeReviewGroups.innerHTML = "";
  weekDays.forEach((day) => {
    const items = entriesByDay[day.key] || [];

    const section = document.createElement("details");
    section.className = "bedtime-review-group";

    const heading = document.createElement("summary");
    heading.className = "bedtime-review-group-summary";
    heading.textContent = `${day.label} ${day.key} (${items.length})`;
    section.appendChild(heading);

    const list = document.createElement("div");
    list.className = "bedtime-review-list";

    if (!items.length) {
      const emptyDay = document.createElement("p");
      emptyDay.className = "bedtime-review-day-empty";
      emptyDay.textContent = "\u5F53\u65E5\u65E0\u5165\u56F4\u4EFB\u52A1";
      list.appendChild(emptyDay);
      section.appendChild(list);
      refs.bedtimeReviewGroups.appendChild(section);
      return;
    }

    items.forEach((entry) => {
      const card = document.createElement("article");
      card.className = "bedtime-review-item";

      const title = document.createElement("h4");
      title.textContent = entry.task.name || "\u672A\u547D\u540D\u4EFB\u52A1";

      const meta = document.createElement("p");
      meta.className = "bedtime-review-meta";
      meta.textContent = `${formatCardTimeRange(entry.task.startAt, entry.task.endAt)} | ${getCategoryLabels(entry.task)} | ${formatDuration(getDurationMinutes(entry.task.startAt, entry.task.endAt))}`;

      const tags = document.createElement("div");
      tags.className = "bedtime-review-tags";
      entry.reasons.forEach((reason) => {
        const tag = document.createElement("span");
        tag.className = "bedtime-review-tag";
        tag.textContent = reason;
        tags.appendChild(tag);
      });

      card.appendChild(title);
      card.appendChild(meta);
      card.appendChild(tags);

      if (entry.task.detail) {
        const detail = document.createElement("p");
        detail.className = "bedtime-review-detail";
        detail.textContent = entry.task.detail;
        card.appendChild(detail);
      }

      list.appendChild(card);
    });

    section.appendChild(list);
    refs.bedtimeReviewGroups.appendChild(section);
  });

  if (totalRiskCount <= 0) {
    const weekEmpty = document.createElement("p");
    weekEmpty.className = "bedtime-review-empty";
    weekEmpty.textContent = "\u672C\u5468\u5165\u56F4\u4EFB\u52A1\u4E3A 0\uff0c\u5DF2\u5728\u5404\u65E5\u677F\u5757\u4E2D\u6807\u6CE8\u3002";
    refs.bedtimeReviewGroups.appendChild(weekEmpty);
  }
}

function getTaskCategoryDateValue() {
  const raw = state.taskCategoryDate || state.selectedDate || toDateInputValue(new Date());
  return normalizeDateInputValue(raw);
}

function renderTaskCategoryPage() {
  if (!refs.taskCategorySummaryPanel || !refs.taskCategoryCards || !refs.taskCategoryDate) {
    return;
  }

  const day = getTaskCategoryDateValue();
  state.taskCategoryDate = day;
  refs.taskCategoryDate.value = day;

  const stats = computeTaskCategoryStats(day);
  renderTaskCategorySummary(stats);
  renderTaskCategoryCards(stats.groups);
}

function computeTaskCategoryStats(day) {
  const dayStart = new Date(`${day}T00:00`);
  const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
  const groups = getTaskCategoryGroups().map((group) => ({
    ...group,
    totalMinutes: 0,
    subcategoryTotals: Object.fromEntries(group.subcategories.map((item) => [item.key, 0]))
  }));

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
    const taskCategories = getTaskCategories(task);
    const taskText = `${task.name || ""} ${task.detail || ""}`;

    groups.forEach((group) => {
      if (!taskCategories.includes(group.key)) {
        return;
      }

      const share = overlap / taskCategories.length;
      group.totalMinutes += share;

      const selectedSubcategories = getTaskSubcategoriesForGroup(task, group.key);
      const matchedSubcategories = selectedSubcategories.length
        ? selectedSubcategories
        : matchTaskSubcategories(group, taskText);
      const fallbackKey = getTaskCategoryFallbackKey(group);
      const targets = matchedSubcategories.length
        ? matchedSubcategories
        : (fallbackKey ? [fallbackKey] : []);
      if (!targets.length) {
        return;
      }
      const subShare = share / targets.length;

      targets.forEach((subcategoryKey) => {
        if (Object.prototype.hasOwnProperty.call(group.subcategoryTotals, subcategoryKey)) {
          group.subcategoryTotals[subcategoryKey] += subShare;
        }
      });
    });
  });

  const normalizedGroups = groups.map((group) => ({
    ...group,
    percent: usedMinutes > 0 ? (group.totalMinutes / usedMinutes) * 100 : 0,
    subcategories: group.subcategories.map((item) => ({
      ...item,
      minutes: group.subcategoryTotals[item.key] || 0
    }))
  }));

  const activeGroups = normalizedGroups.filter((group) => group.totalMinutes > 0);
  const topGroup = normalizedGroups
    .slice()
    .sort((left, right) => right.totalMinutes - left.totalMinutes)[0] || null;

  return {
    day,
    usedMinutes,
    activeGroupCount: activeGroups.length,
    topGroup,
    groups: normalizedGroups
  };
}

function renderTaskCategorySummary(stats) {
  refs.taskCategorySummaryPanel.innerHTML = "";

  const topLabel = stats.topGroup && stats.topGroup.totalMinutes > 0
    ? `${stats.topGroup.icon} ${stats.topGroup.label}`
    : "\u6682\u65E0";
  const topDuration = stats.topGroup && stats.topGroup.totalMinutes > 0
    ? formatDuration(stats.topGroup.totalMinutes)
    : "--";

  const items = [
    { label: "\u5DF2\u8BB0\u5F55\u65F6\u957F", value: formatDuration(stats.usedMinutes) },
    { label: "\u5DF2\u6FC0\u6D3B\u5927\u7C7B", value: `${stats.activeGroupCount}/${getTaskCategoryGroups().length}` },
    { label: "\u4ECA\u65E5\u4E3B\u7EBF", value: `${topLabel} ${topDuration}` }
  ];

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "summary-item";
    const label = document.createElement("span");
    label.textContent = item.label;
    const value = document.createElement("strong");
    value.textContent = item.value;
    card.appendChild(label);
    card.appendChild(value);
    refs.taskCategorySummaryPanel.appendChild(card);
  });
}

function renderTaskCategoryCards(groups) {
  refs.taskCategoryCards.innerHTML = "";

  groups.forEach((group, index) => {
    const isEditing = state.taskCategoryEditingGroupKey === group.key;
    const card = document.createElement("article");
    card.className = "task-category-card";
    card.classList.toggle("is-editing", isEditing);
    card.style.setProperty("--task-category-accent", getCategoryColorByKey(group.key, index));
    card.addEventListener("dblclick", (event) => {
      if (event.target && event.target.closest && event.target.closest(".task-category-editor")) {
        return;
      }
      if (state.taskCategoryEditingGroupKey === group.key) {
        exitTaskCategoryEditMode();
        return;
      }
      enterTaskCategoryEditMode(group.key);
    });

    const head = document.createElement("div");
    head.className = "task-category-card-head";

    const titleWrap = document.createElement("div");
    titleWrap.className = "task-category-card-title-wrap";

    const title = document.createElement("h3");
    title.textContent = `${group.icon} ${group.label}`;

    const description = document.createElement("p");
    description.className = "task-category-card-description";
    description.textContent = group.description;

    titleWrap.appendChild(title);
    titleWrap.appendChild(description);

    if (isEditing) {
      const toolbar = document.createElement("div");
      toolbar.className = "task-category-card-toolbar";

      const editingTag = document.createElement("span");
      editingTag.className = "task-category-edit-tag";
      editingTag.textContent = "\u7F16\u8F91\u4E2D";

      const finishBtn = document.createElement("button");
      finishBtn.type = "button";
      finishBtn.className = "secondary task-category-editor-btn";
      finishBtn.textContent = "\u5B8C\u6210";
      finishBtn.addEventListener("click", () => {
        exitTaskCategoryEditMode();
      });

      toolbar.appendChild(editingTag);
      toolbar.appendChild(finishBtn);

      head.appendChild(titleWrap);
      head.appendChild(toolbar);
    } else {
      head.appendChild(titleWrap);
    }

    const metric = document.createElement("div");
    metric.className = "task-category-card-metric";

    const duration = document.createElement("strong");
    duration.textContent = formatDuration(group.totalMinutes);

    const planned = document.createElement("span");
    planned.textContent = `\u8BA1\u5212\u8FDB\u884C ${formatDuration(TASK_CATEGORY_DEFAULT_PLANNED_MINUTES)}`;

    metric.appendChild(duration);
    metric.appendChild(planned);

    head.appendChild(metric);

    const meta = document.createElement("div");
    meta.className = "task-category-card-meta";

    const share = document.createElement("span");
    share.className = "task-category-meta-pill";
    share.textContent = `\u5360\u5DF2\u8BB0\u5F55 ${group.percent.toFixed(1)}%`;

    meta.appendChild(share);

    const subTitle = document.createElement("p");
    subTitle.className = "task-category-subtitle";
    subTitle.textContent = "\u5C0F\u7C7B\u5206\u5E03";

    const subList = document.createElement("div");
    subList.className = "task-category-subgrid";

    if (isEditing) {
      subList.appendChild(createTaskCategoryEditor(group));
    } else {
      group.subcategories.forEach((item) => {
        const chip = document.createElement("div");
        chip.className = "task-category-subitem";
        if (item.minutes > 0) {
          chip.classList.add("is-active");
        }

        const label = document.createElement("span");
        label.textContent = item.label;

        const minutes = document.createElement("strong");
        minutes.textContent = item.minutes > 0 ? formatDuration(item.minutes) : "--";

        chip.appendChild(label);
        chip.appendChild(minutes);
        subList.appendChild(chip);
      });
    }

    card.appendChild(head);
    card.appendChild(meta);
    card.appendChild(subTitle);
    card.appendChild(subList);
    refs.taskCategoryCards.appendChild(card);
  });
}

function createTaskCategoryEditor(group) {
  const wrap = document.createElement("div");
  wrap.className = "task-category-editor";

  const actions = document.createElement("div");
  actions.className = "task-category-editor-actions";

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className = "secondary task-category-editor-btn";
  addBtn.textContent = "\u65B0\u589E\u5C0F\u7C7B";
  addBtn.addEventListener("click", () => {
    addTaskCategorySubcategory(group.key);
  });

  actions.appendChild(addBtn);
  wrap.appendChild(actions);

  const list = document.createElement("div");
  list.className = "task-category-editor-list";

  group.subcategories.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "task-category-editor-row";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "task-category-editor-input";
    input.maxLength = 24;
    input.value = item.label;
    input.setAttribute("aria-label", `${group.label}\u5C0F\u7C7B\u540D\u79F0`);
    input.addEventListener("change", () => {
      renameTaskCategorySubcategory(group.key, item.key, input.value);
    });
    input.addEventListener("blur", () => {
      if (input.value !== item.label) {
        renameTaskCategorySubcategory(group.key, item.key, input.value);
      }
    });

    const rowActions = document.createElement("div");
    rowActions.className = "task-category-editor-row-actions";

    const upBtn = document.createElement("button");
    upBtn.type = "button";
    upBtn.className = "secondary task-category-editor-icon-btn";
    upBtn.textContent = "\u2191";
    upBtn.disabled = index === 0;
    upBtn.addEventListener("click", () => {
      moveTaskCategorySubcategory(group.key, item.key, -1);
    });

    const downBtn = document.createElement("button");
    downBtn.type = "button";
    downBtn.className = "secondary task-category-editor-icon-btn";
    downBtn.textContent = "\u2193";
    downBtn.disabled = index === group.subcategories.length - 1;
    downBtn.addEventListener("click", () => {
      moveTaskCategorySubcategory(group.key, item.key, 1);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "secondary task-category-editor-icon-btn";
    deleteBtn.textContent = "\u5220\u9664";
    deleteBtn.addEventListener("click", () => {
      deleteTaskCategorySubcategory(group.key, item.key);
    });

    rowActions.appendChild(upBtn);
    rowActions.appendChild(downBtn);
    rowActions.appendChild(deleteBtn);

    row.appendChild(input);
    row.appendChild(rowActions);
    list.appendChild(row);
  });

  wrap.appendChild(list);
  return wrap;
}

function enterTaskCategoryEditMode(groupKey) {
  if (!getTaskCategoryGroupByKey(groupKey)) {
    return;
  }
  state.taskCategoryEditingGroupKey = groupKey;
  renderTaskCategoryPage();
}

function exitTaskCategoryEditMode() {
  if (!state.taskCategoryEditingGroupKey) {
    return;
  }
  state.taskCategoryEditingGroupKey = "";
  renderTaskCategoryPage();
}

function createUniqueTaskCategorySubcategoryKey(groupKey, seed, subcategories = getTaskCategorySubcategoriesConfigByGroupKey(groupKey)) {
  const existing = new Set((Array.isArray(subcategories) ? subcategories : []).map((item) => item && item.key).filter(Boolean));
  const base = normalizeCategoryKey(`${groupKey}_${seed}`) || `${groupKey}_custom`;
  let candidate = base;
  let index = 1;
  while (existing.has(candidate)) {
    candidate = `${base}_${index}`;
    index += 1;
  }
  return candidate;
}

function syncTaskSubcategoryConfigChanges() {
  let tasksChanged = false;

  state.tasks = state.tasks.map((task) => {
    const nextSubcategories = sanitizeTaskSubcategorySelections(task.subcategories, getTaskCategories(task));
    const prevSerialized = JSON.stringify(task.subcategories || {});
    const nextSerialized = JSON.stringify(nextSubcategories);
    if (prevSerialized !== nextSerialized) {
      tasksChanged = true;
      return {
        ...task,
        subcategories: nextSubcategories
      };
    }
    return task;
  });

  state.taskSubcategorySelections = sanitizeTaskSubcategorySelections(
    state.taskSubcategorySelections,
    getSelectedCategoriesFromForm()
  );

  if (tasksChanged) {
    saveTasks();
  }
  persistTaskFormDraft();
}

function updateTaskCategorySubcategoryConfig(groupKey, nextSubcategories) {
  const baseGroup = getBaseTaskCategoryGroupByKey(groupKey);
  if (!baseGroup) {
    return;
  }

  state.taskCategorySubcategoryConfig = {
    ...state.taskCategorySubcategoryConfig,
    [groupKey]: normalizeTaskCategorySubcategoryConfig(
      groupKey,
      nextSubcategories,
      baseGroup.subcategories
    )
  };

  saveTaskCategorySubcategoryConfig();
  syncTaskSubcategoryConfigChanges();
  renderCategorySummary();
  renderAll();
}

function addTaskCategorySubcategory(groupKey) {
  const current = getTaskCategorySubcategoriesConfigByGroupKey(groupKey).map((item) => ({
    ...item,
    keywords: Array.isArray(item.keywords) ? [...item.keywords] : []
  }));
  const label = `\u65B0\u5C0F\u7C7B${current.length + 1}`;
  current.push({
    key: createUniqueTaskCategorySubcategoryKey(groupKey, label, current),
    label,
    keywords: []
  });
  state.taskCategoryEditingGroupKey = groupKey;
  updateTaskCategorySubcategoryConfig(groupKey, current);
}

function renameTaskCategorySubcategory(groupKey, subcategoryKey, nextLabel) {
  const current = getTaskCategorySubcategoriesConfigByGroupKey(groupKey).map((item) => ({ ...item }));
  const normalizedLabel = normalizeCategoryLabel(nextLabel, "");
  const target = current.find((item) => item.key === subcategoryKey);
  if (!target || !normalizedLabel || target.label === normalizedLabel) {
    renderTaskCategoryPage();
    return;
  }

  target.label = normalizedLabel;
  state.taskCategoryEditingGroupKey = groupKey;
  updateTaskCategorySubcategoryConfig(groupKey, current);
}

function moveTaskCategorySubcategory(groupKey, subcategoryKey, offset) {
  const current = getTaskCategorySubcategoriesConfigByGroupKey(groupKey).map((item) => ({ ...item }));
  const currentIndex = current.findIndex((item) => item.key === subcategoryKey);
  const targetIndex = currentIndex + Number(offset || 0);
  if (currentIndex < 0 || targetIndex < 0 || targetIndex >= current.length) {
    return;
  }

  const [moved] = current.splice(currentIndex, 1);
  current.splice(targetIndex, 0, moved);
  state.taskCategoryEditingGroupKey = groupKey;
  updateTaskCategorySubcategoryConfig(groupKey, current);
}

function deleteTaskCategorySubcategory(groupKey, subcategoryKey) {
  const current = getTaskCategorySubcategoriesConfigByGroupKey(groupKey).map((item) => ({ ...item }));
  if (current.length <= 1) {
    alert("\u81F3\u5C11\u9700\u4FDD\u7559 1 \u4E2A\u5C0F\u7C7B\u3002");
    return;
  }

  const next = current.filter((item) => item.key !== subcategoryKey);
  state.taskCategoryEditingGroupKey = groupKey;
  updateTaskCategorySubcategoryConfig(groupKey, next);
}

function matchTaskSubcategories(group, text) {
  const normalizedText = normalizeKeywordText(text);
  if (!normalizedText) {
    return [];
  }

  return group.subcategories
    .filter((item) => Array.isArray(item.keywords) && item.keywords.some((keyword) => normalizedText.includes(normalizeKeywordText(keyword))))
    .map((item) => item.key);
}

function getTaskSubcategoriesForGroup(task, groupKey) {
  if (!task || !task.subcategories || typeof task.subcategories !== "object") {
    return [];
  }

  const group = getTaskCategoryGroupByKey(groupKey);
  if (!group) {
    return [];
  }

  const allowedKeys = new Set(group.subcategories.map((item) => item.key));
  const rawItems = Array.isArray(task.subcategories[groupKey]) ? task.subcategories[groupKey] : [];
  return rawItems.filter((item, index) => allowedKeys.has(item) && rawItems.indexOf(item) === index);
}

function getTaskCategoryFallbackKey(group) {
  if (!group || !Array.isArray(group.subcategories)) {
    return "";
  }
  const fallback = group.subcategories.find((item) => {
    const key = String(item && item.key ? item.key : "");
    return key === "other" || key.endsWith("_other");
  });
  return fallback ? fallback.key : "";
}

function normalizeKeywordText(value) {
  return String(value || "").trim().toLowerCase();
}

function setAllocationMode(mode) {
  if (mode !== "day" && mode !== "week") {
    return;
  }
  state.allocationMode = mode;
  applyAllocationMode();
  renderAllocationOverview();
}

function renderAllocationOverview() {
  if (state.allocationMode === "week") {
    renderWeeklyOverview();
  } else {
    renderDailyOverview();
  }
}

function applyAllocationMode() {
  const isWeekMode = state.allocationMode === "week";

  if (refs.modeDayBtn) {
    refs.modeDayBtn.classList.toggle("is-active", !isWeekMode);
  }
  if (refs.modeWeekBtn) {
    refs.modeWeekBtn.classList.toggle("is-active", isWeekMode);
  }
  if (refs.selectedDate) {
    refs.selectedDate.classList.toggle("is-hidden", isWeekMode);
  }
  if (refs.selectedWeek) {
    refs.selectedWeek.classList.toggle("is-hidden", !isWeekMode);
  }
  if (refs.weekWrapper) {
    refs.weekWrapper.classList.toggle("is-hidden", !isWeekMode);
  }
  if (refs.weekBarsScroll) {
    refs.weekBarsScroll.classList.toggle("is-hidden", !isWeekMode);
  }

  if (isWeekMode) {
    refs.timeline.classList.add("is-hidden");
    if (refs.pieWrapper) {
      refs.pieWrapper.classList.add("is-hidden");
    }
    refs.timelineLegend.classList.remove("is-hidden");
    hidePieTooltip();
    return;
  }

  if (refs.weekWrapper) {
    refs.weekWrapper.classList.add("is-hidden");
  }
  if (refs.weekBarsScroll) {
    refs.weekBarsScroll.classList.add("is-hidden");
  }
  refs.timeline.classList.remove("is-hidden");
  refs.timelineLegend.classList.remove("is-hidden");
  if (refs.pieWrapper) {
    refs.pieWrapper.classList.add("is-hidden");
  }
  hidePieTooltip();
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
    .filter((task) => shouldShowTaskOnBoard(task, state.boardDate))
    .sort((a, b) => {
      const aStart = parseDateTime(a.startAt);
      const bStart = parseDateTime(b.startAt);
      const aTs = aStart ? aStart.getTime() : Number.MAX_SAFE_INTEGER;
      const bTs = bStart ? bStart.getTime() : Number.MAX_SAFE_INTEGER;
      return aTs - bTs;
    });

  sortedTasks.forEach((task) => {
    const status = Object.prototype.hasOwnProperty.call(STATUS_COLUMNS, task.status) ? task.status : "todo";
    const groupDateValue = shouldIgnoreBoardDateForStatus(status) ? "" : state.boardDate;
    const groupKey = getTaskTimeGroup(task, groupDateValue);
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

function shouldIgnoreBoardDateForStatus(status) {
  return status === "todo" || status === "doing";
}

function shouldShowTaskOnBoard(task, dateValue) {
  const status = Object.prototype.hasOwnProperty.call(STATUS_COLUMNS, task.status) ? task.status : "todo";
  if (shouldIgnoreBoardDateForStatus(status)) {
    return true;
  }
  return isTaskInDate(task, dateValue);
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
  persistTaskFormDraft();
  refs.taskName.scrollIntoView({ behavior: "smooth", block: "center" });
  refs.taskName.focus();
}

function createTaskCard(task) {
  const fragment = refs.template.content.cloneNode(true);
  const card = fragment.querySelector(".task-card");
  const toggleButton = fragment.querySelector(".card-toggle");
  const priorityPill = fragment.querySelector(".priority-pill");

  fragment.querySelector(".card-title").textContent = task.name;
  fragment.querySelector(".card-time-range").textContent = `(${formatCardTimeRange(task.startAt, task.endAt)})`;
  priorityPill.textContent = formatPriorityLabel(task);
  priorityPill.classList.remove(
    "priority-pill--important_urgent",
    "priority-pill--important_not_urgent",
    "priority-pill--not_important_urgent",
    "priority-pill--not_important_not_urgent"
  );
  const priorityPillClassName = getPriorityPillClassName(task.priority);
  if (priorityPillClassName) {
    priorityPill.classList.add(priorityPillClassName);
  }
  applyPriorityVisualStyle(task, priorityPill, card);
  const moodPill = fragment.querySelector(".mood-pill");
  const moodLabel = formatMoodLabel(task);
  moodPill.textContent = moodLabel;
  moodPill.classList.toggle("is-hidden", !moodLabel);
  const processPill = fragment.querySelector(".process-pill");
  const processLabel = formatProcessLabel(task);
  processPill.textContent = processLabel;
  processPill.classList.toggle("is-hidden", !processLabel);
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
    const previousStatus = task.status;
    const nextStatus = event.target.value;
    task.status = nextStatus;
    saveTasks();
    if (nextStatus === "done" && previousStatus !== "done") {
      triggerTaskCompletionCelebration();
    }
    renderAll();
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
  setSelectedUrgentLevelToForm(task.urgentLevel);
  setSelectedMoodToForm(task.mood);
  setSelectedMoodScoreToForm(task.moodScore);
  setSelectedProcessToForm(task.process);
  setSelectedProcessScoreToForm(task.processScore);
  setOptionalTagMode(task.process ? "process" : "mood");
  handlePriorityChange();
  refs.taskDetail.value = task.detail;
  if (refs.taskStart && refs.taskEnd) {
    refs.taskStart.value = task.startAt;
    refs.taskEnd.value = task.endAt;
  }
  setSelectedTaskSubcategoriesToForm(task.subcategories, getTaskCategories(task));
  setSelectedCategoriesToForm(getTaskCategories(task));
  refs.taskStatus.value = task.status;
  updateDetailCount();
  updateDurationPreview();
  persistTaskFormDraft();
  refs.taskName.scrollIntoView({ behavior: "smooth", block: "center" });
  refs.taskName.focus();
}

function bindDateTimePickerInteractions(inputs) {
  inputs.forEach((input) => {
    if (!input || input.dataset.pickerBound === "1") {
      return;
    }
    input.dataset.pickerBound = "1";
    input.addEventListener("click", () => {
      openNativeDateTimePicker(input);
    });
  });
}

function openNativeDateTimePicker(input) {
  if (!input || input.disabled || input.readOnly) {
    return;
  }
  if (typeof input.showPicker === "function") {
    try {
      input.showPicker();
      return;
    } catch (error) {
      // Ignore and fall back to focus for browsers that reject showPicker in some cases.
    }
  }
  input.focus();
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
  state.selectedDate = day;
  updateSelectedWeekBadge(day);
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
        fill.className = "slot-fill";
        fill.style.background = getCategoryColorByKey(getPrimaryCategory(segment.task), idx);
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
  applyAllocationMode();
}

function renderWeeklyOverview() {
  const day = refs.selectedDate.value || state.selectedDate;
  state.selectedDate = day;
  updateSelectedWeekBadge(day);

  const weekStats = computeWeeklyStats(day);
  refs.summaryUsed.textContent = formatDuration(weekStats.usedMinutes);
  refs.summaryFree.textContent = formatDuration(weekStats.freeMinutes);
  renderLegend(weekStats.categoryTotals, weekStats.freeMinutes);
  renderWeekBars(weekStats.categoryRanking);
  applyAllocationMode();
}

function computeWeeklyStats(day) {
  const weekRange = getWeekRangeFromDate(day);
  const categoryTotals = Object.fromEntries(getCategoryKeys().map((key) => [key, 0]));
  let usedMinutes = 0;

  state.tasks.forEach((task) => {
    const range = getTaskRange(task);
    if (!range) {
      return;
    }

    const overlap = getOverlapMinutes(range.start, range.end, weekRange.start, weekRange.end);
    if (overlap <= 0) {
      return;
    }

    usedMinutes += overlap;

    const categories = getTaskCategories(task);
    const share = overlap / categories.length;
    categories.forEach((category) => {
      if (Object.prototype.hasOwnProperty.call(categoryTotals, category)) {
        categoryTotals[category] += share;
      }
    });
  });

  const categoryRanking = Object.entries(categoryTotals)
    .map(([key, minutes]) => ({ key, minutes, label: getCategoryLabelByKey(key) }))
    .sort((a, b) => b.minutes - a.minutes);

  return {
    categoryRanking,
    usedMinutes,
    freeMinutes: Math.max(0, 7 * 24 * 60 - usedMinutes),
    categoryTotals
  };
}

function renderWeekBars(categoryRanking) {
  if (!refs.weekBars) {
    return;
  }
  refs.weekBars.innerHTML = "";
  refs.weekBars.scrollLeft = 0;

  if (!categoryRanking.length) {
    const empty = document.createElement("p");
    empty.className = "week-bars-empty";
    empty.textContent = "鏈懆鏆傛棤绫诲埆鐢ㄦ椂璁板綍";
    refs.weekBars.appendChild(empty);
    updateWeekBarsScrollState();
    return;
  }

  const maxMinutes = categoryRanking.reduce((max, category) => Math.max(max, category.minutes), 0);
  const effectiveMaxMinutes = maxMinutes > 0 ? maxMinutes : 1;

  categoryRanking.forEach((category, index) => {
    const item = document.createElement("article");
    item.className = "week-bar-item";

    const rankLabel = document.createElement("span");
    rankLabel.className = "week-bar-rank";
    rankLabel.textContent = `#${index + 1}`;

    const categoryLabel = document.createElement("span");
    categoryLabel.className = "week-bar-project";
    categoryLabel.textContent = category.label;

    const track = document.createElement("div");
    track.className = "week-bar-track";

    const fill = document.createElement("div");
    fill.className = "week-bar-fill";
    const ratio = category.minutes / effectiveMaxMinutes;
    fill.style.height = `${Math.max(0, Math.round(ratio * 100))}%`;
    fill.style.background = getCategoryColorByKey(category.key, index);

    const hourText = document.createElement("span");
    hourText.className = "week-bar-hours";
    hourText.textContent = `${(category.minutes / 60).toFixed(1)}h`;

    track.appendChild(fill);
    item.appendChild(rankLabel);
    item.appendChild(track);
    item.appendChild(hourText);
    item.appendChild(categoryLabel);
    item.title = `${category.label} | 鏈懆绱 ${formatDuration(category.minutes)} | 鎺掑悕 #${index + 1}`;

    refs.weekBars.appendChild(item);
  });

  updateWeekBarsScrollState();
}

function getWeekRangeFromDate(dayValue) {
  const base = parseDateTime(`${dayValue}T00:00`) || new Date();
  const monday = new Date(base);
  const dayIndex = (monday.getDay() + 6) % 7;
  monday.setDate(monday.getDate() - dayIndex);
  monday.setHours(0, 0, 0, 0);
  const sundayEnd = new Date(monday.getTime() + 7 * 24 * 60 * 60 * 1000);
  return { start: monday, end: sundayEnd };
}

function bindWeekBarsScrollEvents() {
  if (!refs.weekBars || !refs.weekBarsScrollRange) {
    return;
  }

  refs.weekBars.addEventListener("scroll", syncWeekBarsScrollRangeValue);
  refs.weekBarsScrollRange.addEventListener("input", () => {
    refs.weekBars.scrollLeft = Number(refs.weekBarsScrollRange.value || 0);
  });
  window.addEventListener("resize", updateWeekBarsScrollState);
}

function syncWeekBarsScrollRangeValue() {
  if (!refs.weekBars || !refs.weekBarsScrollRange) {
    return;
  }
  refs.weekBarsScrollRange.value = String(Math.round(refs.weekBars.scrollLeft));
}

function updateWeekBarsScrollState() {
  if (!refs.weekBars || !refs.weekBarsScroll || !refs.weekBarsScrollRange) {
    return;
  }

  const maxScroll = Math.max(0, Math.round(refs.weekBars.scrollWidth - refs.weekBars.clientWidth));
  if (maxScroll <= 0) {
    refs.weekBars.scrollLeft = 0;
    refs.weekBarsScrollRange.min = "0";
    refs.weekBarsScrollRange.max = "0";
    refs.weekBarsScrollRange.value = "0";
    refs.weekBarsScroll.classList.add("is-hidden");
    return;
  }

  refs.weekBarsScrollRange.min = "0";
  refs.weekBarsScrollRange.max = String(maxScroll);
  refs.weekBarsScrollRange.value = String(Math.min(maxScroll, Math.max(0, Math.round(refs.weekBars.scrollLeft))));
  refs.weekBarsScroll.classList.remove("is-hidden");
}

function updateSelectedWeekBadge(dayValue) {
  if (!refs.selectedWeek) {
    return;
  }

  const base = parseDateTime(`${dayValue}T00:00`) || new Date();
  const weekInfo = getIsoWeekInfo(base);
  refs.selectedWeek.textContent = `第${weekInfo.week}周`;
  refs.selectedWeek.title = `${weekInfo.year}年第${weekInfo.week}周`;
}

function getIsoWeekInfo(date) {
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const weekDay = utcDate.getUTCDay() || 7;
  utcDate.setUTCDate(utcDate.getUTCDate() + 4 - weekDay);
  const yearStart = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((utcDate - yearStart) / 86400000) + 1) / 7);
  return { year: utcDate.getUTCFullYear(), week };
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
  const totals = Object.fromEntries(getCategoryKeys().map((key) => [key, 0]));
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
    const primaryCategory = item.categories[0] || getDefaultCategoryKey();
    const color = getCategoryColorByKey(primaryCategory, idx);
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

    const categoryText = item.categories.map((key) => getCategoryLabelByKey(key)).join(" / ");
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
  if (!refs.taskPie) {
    return;
  }
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
    const categoryText = segment.categories.map((key) => getCategoryLabelByKey(key)).join(" / ");
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
  if (!refs.pieTooltip) {
    return;
  }
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
  state.categoryDefinitions.forEach((definition) => {
    const item = document.createElement("span");
    item.className = "legend-item";
    const dot = document.createElement("i");
    dot.className = "legend-dot";
    dot.style.background = definition.color;

    const text = document.createElement("span");
    text.textContent = `${definition.label}: ${formatDuration(Math.round(categoryTotals[definition.key] || 0))}`;

    item.appendChild(dot);
    item.appendChild(text);
    refs.timelineLegend.appendChild(item);
  });

  const empty = document.createElement("span");
  empty.className = "legend-item";
  const emptyDot = document.createElement("i");
  emptyDot.className = "legend-dot";
  emptyDot.style.background = "var(--empty)";
  const emptyText = document.createElement("span");
  emptyText.textContent = `\u7A7A\u4F59: ${formatDuration(freeMinutes)}`;
  empty.appendChild(emptyDot);
  empty.appendChild(emptyText);
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

function normalizeDateInputValue(value) {
  const normalized = normalizeDateTimeInput(`${value || ""}T00:00`).slice(0, 10);
  return normalized || toDateInputValue(new Date());
}

function pad2(num) {
  return String(num).padStart(2, "0");
}










