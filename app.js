const STORAGE_KEY = "time-efficiency-tasks-v1";
const CLOUD_IMPORT_MARKER_PREFIX = "time-efficiency-cloud-imported";

const CLOUDBASE_ENV_ID = "jieyou-3gr01mvob9ad92de";
const CLOUDBASE_TASKS_COLLECTION = "time_efficiency_user_tasks";
const CLOUDBASE_SYNC_DEBOUNCE_MS = 800;
const CODE_RESEND_SECONDS = 60;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CLOUDBASE_SDK_URLS = [
  "https://static.cloudbase.net/cloudbase-js-sdk/latest/cloudbase.full.js",
  "https://imgcache.qq.com/qcloud/tcbjs/1.6.7/tcb.js"
];

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
const CATEGORY_MAP = {
  work: "\uD83D\uDCBC \u5DE5\u4F5C",
  explore: "\uD83D\uDEA2 \u63A2\u7D22",
  topic: "\uD83D\uDCDA \u8BFE\u9898",
  dev: "\uD83D\uDCBB \u5F00\u53D1",
  inspiration: "\uD83D\uDCA1 \u7075\u611F",
  study: "\uD83D\uDCD8 \u5B66\u4E60",
  sport: "\uD83C\uDFC3 \u8FD0\u52A8",
  relax: "\uD83E\uDDD8 \u653E\u677E",
  sleep: "\uD83D\uDE34 \u7761\u89C9",
  meal: "\uD83C\uDF7D \u7528\u9910",
  record: "\uD83D\uDCDD \u8BB0\u5F55",
  entertainment: "\uD83C\uDFAE \u5A31\u4E50",
  other: "\uD83E\uDDE9 \u5176\u4ED6"
};
const CATEGORY_COLOR_MAP = {
  work: "#ffe51f",
  explore: "#3c79c3",
  topic: "#7f5abf",
  dev: "#d66b16",
  inspiration: "#9b5de5",
  study: "#d66b16",
  sport: "#2f9a72",
  relax: "#2f9a72",
  sleep: "#2f9a72",
  meal: "#52e145",
  record: "#8b6f47",
  entertainment: "#d94f7f",
  other: "#8c8c8c"
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
  optionalTagMode: DEFAULT_OPTIONAL_TAG_MODE,
  allocationMode: "day",
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
  taskCategories: document.querySelectorAll('input[name="task-categories"]'),
  taskCategoryPicker: document.getElementById("task-category-picker"),
  taskCategorySummary: document.getElementById("task-category-summary"),
  taskStatus: document.getElementById("task-status"),
  durationPreview: document.getElementById("duration-preview"),
  resetForm: document.getElementById("reset-form"),
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
  template: document.getElementById("task-card-template")
};

const authRefs = {
  loginPage: document.getElementById("login-page"),
  mainApp: document.getElementById("main-app"),
  menuWrap: document.getElementById("global-menu"),
  menuToggleBtn: document.getElementById("menu-toggle-btn"),
  menuDropdown: document.getElementById("menu-dropdown"),
  menuAuthBtn: document.getElementById("menu-auth-btn"),
  menuAccountValue: document.getElementById("menu-account-value"),
  loginCloseBtn: document.getElementById("login-close-btn"),
  loginLogo: document.getElementById("login-logo"),
  loginLogoFallback: document.getElementById("login-logo-fallback"),
  quoteText: document.getElementById("daily-quote-text"),
  quoteSource: document.getElementById("daily-quote-source"),
  loginForm: document.getElementById("login-form"),
  emailInput: document.getElementById("login-email"),
  codeField: document.getElementById("login-code-field"),
  codeInput: document.getElementById("login-code"),
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

init();

function init() {
  state.tasks = loadTasks();
  refs.selectedDate.value = state.selectedDate;
  refs.boardDate.value = state.boardDate;

  refs.form.addEventListener("submit", onSubmitTask);
  refs.resetForm.addEventListener("click", resetForm);
  refs.taskDetail.addEventListener("input", updateDetailCount);
  refs.taskPriority.addEventListener("change", handlePriorityChange);
  bindOptionalTagSwitch();

  if (refs.taskStart && refs.taskEnd) {
    refs.taskStart.addEventListener("input", updateDurationPreview);
    refs.taskEnd.addEventListener("input", updateDurationPreview);
    bindDateTimePickerInteractions([refs.taskStart, refs.taskEnd]);
  } else {
    console.warn("Missing #task-start or #task-end fields in form.");
  }
  refs.taskCategories.forEach((input) => {
    input.addEventListener("change", renderCategorySummary);
  });
  refs.selectedDate.addEventListener("input", () => {
    state.selectedDate = refs.selectedDate.value;
    renderAllocationOverview();
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

  if (refs.modeDayBtn) {
    refs.modeDayBtn.addEventListener("click", () => setAllocationMode("day"));
  }
  if (refs.modeWeekBtn) {
    refs.modeWeekBtn.addEventListener("click", () => setAllocationMode("week"));
  }
  bindWeekBarsScrollEvents();

  bindPieInteractions();
  setSelectedCategoriesToForm([]);
  setSelectedImportanceLevelToForm(DEFAULT_IMPORTANCE_LEVEL);
  handlePriorityChange();
  applyAllocationMode();
  updateDetailCount();
  updateDurationPreview();
  renderAll();
  initEmailCodeLogin();
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
      void handleLoginWithCode();
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

  document.addEventListener("click", (event) => {
    if (!authRefs.menuWrap) {
      return;
    }
    if (!authRefs.menuWrap.contains(event.target)) {
      closeGlobalMenu();
    }
  });
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
  authRefs.menuAccountValue.textContent = loggedIn
    ? (authState.user.email || "\u5df2\u767b\u5f55")
    : "\u672a\u767b\u5f55";
  authRefs.menuAuthBtn.textContent = loggedIn ? "\u9000\u51fa\u767b\u5f55" : "\u767b\u5f55";
  authRefs.menuAuthBtn.classList.toggle("is-danger", loggedIn);
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
    clearCloudSyncState();
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
    const cloudTasks = await pullTasksFromCloud();
    if (Array.isArray(cloudTasks)) {
      const shouldImportLocal = !hasCloudImportMarker(uid) && localTasks.length > 0;
      const mergedTasks = shouldImportLocal ? mergeTasksForCloudBootstrap(cloudTasks, localTasks) : cloudTasks;

      state.tasks = mergedTasks;
      saveTasks({ skipCloudSync: true });
      renderAll();

      if (shouldImportLocal) {
        const uploaded = await syncTasksToCloud({ immediate: true });
        if (uploaded) {
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

  const tasks = docs[0] && Array.isArray(docs[0].tasks) ? docs[0].tasks : null;
  if (!tasks) {
    return null;
  }

  return tasks
    .map(normalizeTask)
    .filter(Boolean);
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

  return `CloudBase 可能发生跨域拦截，请在云开发控制台将当前域名加入 Web 安全域名：${window.location.origin}`;
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

function updateLoginView() {
  if (!authRefs.emailInput || !authRefs.codeField || !authRefs.sendBtn || !authRefs.authActions || !authRefs.resendBtn || !authRefs.submitBtn) {
    return;
  }

  const authReady = Boolean(authState.auth);
  const shouldShowCode = authState.codeSent;
  authRefs.codeField.classList.toggle("is-hidden", !shouldShowCode);
  authRefs.sendBtn.classList.toggle("is-hidden", shouldShowCode);
  authRefs.authActions.classList.toggle("is-hidden", !shouldShowCode);

  const lockEmailInput = shouldShowCode && authState.countdown > 0;
  authRefs.emailInput.disabled = lockEmailInput || authState.isLoading;
  authRefs.sendBtn.disabled = authState.isLoading || !authReady;
  authRefs.submitBtn.disabled = authState.isLoading || !authReady;
  authRefs.resendBtn.disabled = authState.isLoading || authState.countdown > 0 || !authReady;

  if (!shouldShowCode) {
    authRefs.sendBtn.textContent = authReady ? "\u53d1\u9001\u9a8c\u8bc1\u7801" : "\u521d\u59cb\u5316\u4e2d...";
  }

  authRefs.resendBtn.textContent = authState.countdown > 0
    ? `${authState.countdown}\u79d2\u540e\u53ef\u91cd\u65b0\u53d1\u9001`
    : "\u6ca1\u6709\u6536\u5230\uff1f\u91cd\u65b0\u53d1\u9001";
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
    setLoginMessage("\u9a8c\u8bc1\u7801\u5df2\u53d1\u9001\uff0c\u8bf7\u67e5\u6536\u90ae\u4ef6\u3002", "success");
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
    });
  }
  if (refs.switchProcess) {
    refs.switchProcess.addEventListener("click", () => {
      setOptionalTagMode("process");
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

function saveTasks(options = {}) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
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
  const hasEscalationChange = applyAutoUrgentEscalation();
  if (hasEscalationChange) {
    saveTasks();
  }
  renderBoard();
  renderAllocationOverview();
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
    task.status = event.target.value;
    saveTasks();
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
  setSelectedCategoriesToForm(getTaskCategories(task));
  refs.taskStatus.value = task.status;
  updateDetailCount();
  updateDurationPreview();
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
  const categoryTotals = Object.fromEntries(Object.keys(CATEGORY_MAP).map((key) => [key, 0]));
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
    .map(([key, minutes]) => ({ key, minutes, label: CATEGORY_MAP[key] || key }))
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
    empty.textContent = "本周暂无类别用时记录";
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
    fill.style.background = `var(--${category.key})`;
    fill.classList.add(`slot-${category.key}`);

    const hourText = document.createElement("span");
    hourText.className = "week-bar-hours";
    hourText.textContent = `${(category.minutes / 60).toFixed(1)}h`;

    track.appendChild(fill);
    item.appendChild(rankLabel);
    item.appendChild(track);
    item.appendChild(hourText);
    item.appendChild(categoryLabel);
    item.title = `${category.label} | 本周累计 ${formatDuration(category.minutes)} | 排名 #${index + 1}`;

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
    const primaryCategory = item.categories[0] || "explore";
    const color = CATEGORY_COLOR_MAP[primaryCategory] || PIE_COLORS[idx % PIE_COLORS.length];
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









