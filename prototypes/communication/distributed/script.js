document.documentElement.dataset.prototype = "variant-inline-panel";

const workspace = document.querySelector(".workspace");
const workspaceBody = document.querySelector(".workspace-body");
const leftPanel = document.getElementById("leftPanel");
const leftPanelTitle = document.getElementById("leftPanelTitle");
const leftModeButtons = document.querySelectorAll("[data-left-mode]");
const leftModePanels = document.querySelectorAll("[data-panel-mode]");
const personalViewButtons = document.querySelectorAll("[data-personal-view]");
const chatCreateMenu = document.querySelector("[data-chat-create-menu]");
const chatCreateToggle = document.querySelector("[data-chat-create-toggle]");
const collapseLeftPanel = document.getElementById("collapseLeftPanel");
const rightPanel = document.getElementById("rightPanel");
const rightPanelToolbarHead = document.getElementById("rightPanelToolbarHead");
const rightPanelToolbarTitle = document.getElementById("rightPanelToolbarTitle");
const toolbarHuddleButton = document.getElementById("toolbarHuddleButton");
const toolbarCloseRightPanel = document.getElementById("toolbarCloseRightPanel");
const activateUsersPanel = document.getElementById("activateUsersPanel");
const huddleTriggers = document.querySelectorAll("[data-huddle-trigger]");
const cardRailGroup = document.getElementById("cardRailGroup");
const cardRailButtons = document.querySelectorAll("[data-card-rail-target]");
const documentRailGroup = document.getElementById("documentRailGroup");
const documentRailButtons = document.querySelectorAll("[data-document-section-target]");
const boardTaskCards = document.querySelectorAll(".board .task-card");
const boardView = document.getElementById("boardView");
const recordingsView = document.getElementById("recordingsView");
const recordingOpenButtons = document.querySelectorAll("[data-open-recording]");
const taskHuddleButton = document.getElementById("taskHuddleButton");
const taskDetail = document.getElementById("taskDetail");
const taskDetailMain = document.querySelector(".task-detail-main");
const documentDetailMain = document.querySelector(".document-detail-main");
const taskDetailResizeHandle = document.getElementById("taskDetailResizeHandle");
const closeTaskDetailButtons = document.querySelectorAll("[data-close-task-detail]");
const closeCardSecondaryPanel = document.getElementById("closeCardSecondaryPanel");
const cardSectionTabs = document.querySelectorAll("[data-card-section-target]");
const cardSections = document.querySelectorAll("[data-card-section]");
const panelModes = document.querySelectorAll("[data-panel-mode-view]");
const spaceTimelineScroll = document.getElementById("spaceTimelineScroll");
const cardPanelScroll = document.querySelector(".panel-mode-card .card-panel-scroll");
const documentPanelScroll = document.getElementById("documentPanelScroll");
const documentSections = document.querySelectorAll("[data-document-section]");
const closeDocumentPanel = document.getElementById("closeDocumentPanel");
const chatPreviewTriggers = document.querySelectorAll("[data-chat-target]");
const closeSpaceChannelPreview = document.getElementById("closeSpaceChannelPreview");
const spaceChannelFloat = document.getElementById("spaceChannelFloat");
const openSpaceFromFloat = document.getElementById("openSpaceFromFloat");
const spaceChannelFloatBody = document.getElementById("spaceChannelFloatBody");
const floatChatKicker = document.getElementById("floatChatKicker");
const floatHuddleButton = document.getElementById("floatHuddleButton");
const floatComposerInput = document.getElementById("floatComposerInput");
const chatRailButton = document.getElementById("chatRailButton");
const chatRailNotification = document.getElementById("chatRailNotification");
const nodeHuddleDock = document.getElementById("nodeHuddleDock");
const nodeHuddleCard = document.querySelector(".node-huddle-card");
const nodeHuddlePeerAvatar = document.getElementById("nodeHuddlePeerAvatar");
const nodeHuddlePeerName = document.getElementById("nodeHuddlePeerName");
const nodeHuddlePeerStatus = document.getElementById("nodeHuddlePeerStatus");
const nodeHuddleWait = document.getElementById("nodeHuddleWait");
const nodeHuddlePeerStageAvatar = document.getElementById("nodeHuddlePeerStageAvatar");
const nodeHuddlePeerStageLabel = document.getElementById("nodeHuddlePeerStageLabel");
const expandNodeHuddle = document.getElementById("expandNodeHuddle");
const leaveNodeHuddle = document.getElementById("leaveNodeHuddle");
const huddleFullscreen = document.getElementById("huddleFullscreen");
const fullscreenHuddlePeerAvatar = document.getElementById("fullscreenHuddlePeerAvatar");
const fullscreenHuddlePeerName = document.getElementById("fullscreenHuddlePeerName");
const fullscreenHuddlePeerStatus = document.getElementById("fullscreenHuddlePeerStatus");
const fullscreenHuddleContextLink = document.getElementById("fullscreenHuddleContextLink");
const fullscreenHuddlePeerStageAvatar = document.getElementById("fullscreenHuddlePeerStageAvatar");
const fullscreenHuddlePeerStageLabel = document.getElementById("fullscreenHuddlePeerStageLabel");
const collapseFullscreenHuddle = document.getElementById("collapseFullscreenHuddle");
const leaveFullscreenHuddle = document.getElementById("leaveFullscreenHuddle");
const fullscreenHuddleStageShell = document.getElementById("huddleFullscreenStageShell");
const fullscreenHuddleChatButton = document.getElementById("fullscreenHuddleChatButton");
const huddleChatPanel = document.getElementById("huddleChatPanel");
const huddleChatScroll = document.getElementById("huddleChatScroll");
const documentOutlineSection = document.querySelector('[data-document-section="outline"]');

const leftModeTitles = {
  personal: "Р›РёС‡РЅРѕРµ",
  chat: "РЈР·РµР» СЃРІСЏР·Рё",
  favorites: "РР·Р±СЂР°РЅРЅРѕРµ",
  tree: "Р”РµСЂРµРІРѕ",
};

const state = {
  leftOpen: false,
  leftMode: "chat",
  personalView: "blockers",
  rightOpen: false,
  rightMode: "space",
  taskOpen: false,
  detailKind: "task",
  cardSection: "info",
  documentSection: "outline",
  previewOpen: false,
  taskWidth: null,
  previewChat: "space-channel",
  huddleOpen: false,
  huddleMode: "panel",
  huddleSource: "space-panel",
  huddleCounter: 0,
  huddleConnected: false,
  huddleChatOpen: false,
};

const TASK_MIN_WIDTH = 520;
const TASK_MAX_WIDTH = 1180;
let huddleTimer = null;
let activeHuddleMenu = null;
let activeHuddleControlMenu = null;
let activeComposerAttachMenu = null;
let isChatCreateMenuOpen = false;

function setupDocumentOutline() {
  if (!documentDetailMain || !documentOutlineSection) {
    return;
  }

  const mainTitle = documentDetailMain.querySelector("h2");
  if (mainTitle) {
    mainTitle.id = "document-main-title";
  }

  const contentBlocks = documentDetailMain.querySelectorAll(".document-main-block");
  const taskRows = documentDetailMain.querySelectorAll(".document-task-row:not(.is-head)");
  const transcriptParagraphs = documentDetailMain.querySelectorAll(".document-main-transcript p");

  if (contentBlocks[0]) {
    const title = contentBlocks[0].querySelector("h3");
    if (title) {
      title.id = "document-task-table";
    }
  }

  if (taskRows[0]) {
    taskRows[0].id = "document-task-row-1";
  }
  if (taskRows[1]) {
    taskRows[1].id = "document-task-row-2";
  }
  if (taskRows[2]) {
    taskRows[2].id = "document-task-row-3";
  }

  if (contentBlocks[1]) {
    const title = contentBlocks[1].querySelector("h3");
    if (title) {
      title.id = "document-brief-agenda";
    }
  }

  if (contentBlocks[2]) {
    const title = contentBlocks[2].querySelector("h3");
    if (title) {
      title.id = "document-agenda";
    }
    const firstSubsection = contentBlocks[2].querySelector("p");
    if (firstSubsection) {
      firstSubsection.id = "document-agenda-scenarios";
    }
  }

  if (contentBlocks[3]) {
    const title = contentBlocks[3].querySelector("h3");
    if (title) {
      title.id = "document-full-transcript";
    }
  }

  if (transcriptParagraphs[0]) {
    transcriptParagraphs[0].id = "document-transcript-part-1";
  }
  if (transcriptParagraphs[2]) {
    transcriptParagraphs[2].id = "document-transcript-part-2";
  }

  documentOutlineSection.innerHTML = `
    <div class="document-panel-header">
      <p class="document-kicker">AI Notes / Huddle recap</p>
      <h3>РЎРѕРґРµСЂР¶Р°РЅРёРµ</h3>
      <small>РђРІС‚РѕСЃРѕР±РёСЂР°РµРјРѕРµ РѕРіР»Р°РІР»РµРЅРёРµ РґРѕРєСѓРјРµРЅС‚Р° СЃ СЃРѕС…СЂР°РЅРµРЅРёРµРј СѓСЂРѕРІРЅРµР№ Р·Р°РіРѕР»РѕРІРєРѕРІ.</small>
    </div>
    <div class="document-block">
      <ul class="document-outline-list">
        <li><a href="#document-main-title">РўРµСЃС‚ С‚СЂР°РЅСЃРєСЂРёРїС†РёСЏ</a></li>
        <li>
          <a href="#document-task-table">Р—Р°С„РёРєСЃРёСЂСѓР№С‚Рµ Р·Р°РґР°С‡Рё</a>
          <ul>
            <li><a href="#document-task-row-1">РћР±СЃСѓРґРёС‚СЊ РїСЂРµРґР»РѕР¶РµРЅРЅС‹Р№ РЅР°Р±РѕСЂ СЃС†РµРЅР°СЂРёРµРІ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ СЃРѕР·РІРѕРЅРѕРІ Рё РІС‹СЏРІРёС‚СЊ РѕС‚СЃСѓС‚СЃС‚РІСѓСЋС‰РёРµ СЃС†РµРЅР°СЂРёРё</a></li>
            <li><a href="#document-task-row-2">Р Р°Р·СЂР°Р±РѕС‚Р°С‚СЊ РєРѕРЅС†РµРїС†РёСЋ РїСѓР±Р»РёРєР°С†РёРё РёС‚РѕРіРѕРІ СЃРѕР·РІРѕРЅР° РІ С‡Р°С‚, РєР°РЅР°Р» Рё РєР°СЂС‚РѕС‡РєСѓ</a></li>
            <li><a href="#document-task-row-3">РџСЂРёРґСѓРјР°С‚СЊ РµРґРёРЅС‹Р№ РїР°С‚С‚РµСЂРЅ СЂР°Р·Р»РёС‡РµРЅРёСЏ PDF, РєР°СЂС‚РѕС‡РµРє Kaiten Рё РґРѕРєСѓРјРµРЅС‚РѕРІ Kaiten</a></li>
          </ul>
        </li>
        <li><a href="#document-brief-agenda">РљСЂР°С‚РєР°СЏ РїРѕРІРµСЃС‚РєР°</a></li>
        <li>
          <a href="#document-agenda">РџРѕРІРµСЃС‚РєР°</a>
          <ul>
            <li><a href="#document-agenda-scenarios">РћР±Р·РѕСЂ СЃС†РµРЅР°СЂРёРµРІ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ СЃРѕР·РІРѕРЅРѕРІ Рё РёС… РёРЅС‚РµРіСЂР°С†РёСЏ СЃ Р·Р°РґР°С‡Р°РјРё Рё РєР°Р»РµРЅРґР°СЂСЏРјРё</a></li>
          </ul>
        </li>
        <li>
          <a href="#document-full-transcript">РўСЂР°РЅСЃРєСЂРёРїС‚</a>
          <ul>
            <li><a href="#document-transcript-part-1">1. РћР±Р·РѕСЂ СЃС†РµРЅР°СЂРёРµРІ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ СЃРѕР·РІРѕРЅРѕРІ Рё РёС… РєР»Р°СЃСЃРёС„РёРєР°С†РёСЏ</a></li>
            <li><a href="#document-transcript-part-2">2. РџСЂРѕР±Р»РµРјС‹ РёРЅС‚РµРіСЂР°С†РёРё СЃРѕР·РІРѕРЅРѕРІ СЃ РєР°Р»РµРЅРґР°СЂС‘Рј Рё РєР°СЂС‚РѕС‡РєР°РјРё РІ РљР°Р№С‚РѕРЅРµ</a></li>
          </ul>
        </li>
      </ul>
    </div>
  `;
}

function syncChatCreateMenu() {
  if (!chatCreateMenu) {
    return;
  }

  chatCreateMenu.classList.toggle("is-open", isChatCreateMenuOpen);
}

const floatChatTemplates = {
  "space-channel": {
    kicker: "Канал пространства",
    title: "Задачи на дизайн",
    composerPlaceholder: "Написать в канал пространства",
    huddleVisible: true,
    openToSpace: true,
    content: `
      <article class="float-chat-message system-message">
        <div class="float-chat-meta">
          <span class="float-avatar system-avatar">AI</span>
          <div>
            <strong>Kaiten AI</strong>
            <small>Сегодня, 10:14</small>
          </div>
        </div>
        <p>Транскрипция вчерашнего созвона собрана. Ключевые решения и action items уже разнесены по карточкам.</p>
      </article>
      <article class="float-chat-message">
        <div class="float-chat-meta">
          <span class="float-avatar">П</span>
          <div>
            <strong>Петя</strong>
            <small>Сегодня, 10:26</small>
          </div>
        </div>
        <p>Оставил комментарий к запущенным дизайнам. Посмотрите, пожалуйста, блок со сценариями входа в коммуникацию.</p>
      </article>
      <article class="float-chat-message">
        <div class="float-chat-meta">
          <span class="float-avatar accent">Ч</span>
          <div>
            <strong>Чапаев</strong>
            <small>Сегодня, 10:31</small>
          </div>
        </div>
        <p>Принял. Обновлю flow и верну сюда вариант с отдельным раскрытием канала пространства.</p>
      </article>
      <article class="float-chat-message system-message">
        <div class="float-chat-meta">
          <span class="float-avatar system-avatar">AI</span>
          <div>
            <strong>Kaiten AI</strong>
            <small>Сегодня, 10:44</small>
          </div>
        </div>
        <p>Созвон назначен на завтра, 14:00. Подключение будет доступно прямо из этого канала.</p>
        <div class="float-chat-attachments">
          <span class="attachment-tile">Ссылка на встречу</span>
        </div>
      </article>
    `,
  },
  "welcome-channel": {
    kicker: "Общий канал",
    title: "Welcome",
    composerPlaceholder: "Написать в Welcome",
    huddleVisible: true,
    openToSpace: false,
    content: `
      <article class="float-chat-message system-message">
        <div class="float-chat-meta">
          <span class="float-avatar system-avatar">AI</span>
          <div>
            <strong>Kaiten AI</strong>
            <small>Сегодня, 09:12</small>
          </div>
        </div>
        <p>Транскрипция onboarding-созвона готова. Полный документ с выводами доступен в knowledge base.</p>
      </article>
      <article class="float-chat-message">
        <div class="float-chat-meta">
          <span class="float-avatar">А</span>
          <div>
            <strong>Алексей</strong>
            <small>Сегодня, 09:18</small>
          </div>
        </div>
        <p>Добавил сюда короткую памятку по тому, как созвоны будут жить внутри каналов и личных чатов.</p>
      </article>
      <article class="float-chat-message">
        <div class="float-chat-meta">
          <span class="float-avatar accent">М</span>
          <div>
            <strong>Мария</strong>
            <small>Сегодня, 09:27</small>
          </div>
        </div>
        <p>Супер. Тогда я возьму сценарий для новых участников и посмотрю, где лучше показывать summary после встречи.</p>
      </article>
    `,
  },
  "system-notifications-channel": {
    kicker: "Системный канал",
    title: "Системные уведомления",
    composerPlaceholder: "Написать в системный канал",
    huddleVisible: false,
    openToSpace: false,
    content: `
      <article class="float-chat-message system-message">
        <div class="float-chat-meta">
          <span class="float-avatar system-avatar">AI</span>
          <div>
            <strong>Kaiten AI</strong>
            <small>Сегодня, 18:26</small>
          </div>
        </div>
        <p>Транскрипция созвона по задаче «Проработка пользовательского опыта работы ВКС в Kaiten» обработана. Итоговый документ опубликован в канал пространства.</p>
      </article>
      <article class="float-chat-message system-message">
        <div class="float-chat-meta">
          <span class="float-avatar system-avatar">AI</span>
          <div>
            <strong>Kaiten AI</strong>
            <small>Сегодня, 18:27</small>
          </div>
        </div>
        <p>В документе созданы AI-предложенные задачи, а доступ открыт участникам созвона.</p>
      </article>
    `,
  },
  "project-channel": {
    kicker: "Проектный канал",
    title: "R&D / Видео и встречи",
    composerPlaceholder: "Написать в проектный канал",
    huddleVisible: true,
    openToSpace: false,
    content: `
      <article class="float-chat-message">
        <div class="float-chat-meta">
          <span class="float-avatar">И</span>
          <div>
            <strong>Илья</strong>
            <small>Сегодня, 11:03</small>
          </div>
        </div>
        <p>Собрал новый сценарий для перехода из канала в созвон. Нужен фидбек по скорости входа во встречу.</p>
      </article>
      <article class="float-chat-message system-message">
        <div class="float-chat-meta">
          <span class="float-avatar system-avatar">AI</span>
          <div>
            <strong>Kaiten AI</strong>
            <small>Сегодня, 11:11</small>
          </div>
        </div>
        <p>Транскрипция встречи «Видео и встречи / weekly sync» сохранена. Краткое summary доступно по ссылке ниже.</p>
        <div class="float-chat-attachments">
          <span class="attachment-tile">meeting-summary.doc</span>
        </div>
      </article>
      <article class="float-chat-message">
        <div class="float-chat-meta">
          <span class="float-avatar accent">Р</span>
          <div>
            <strong>Рей Деккарт</strong>
            <small>Сегодня, 11:24</small>
          </div>
        </div>
        <p>Я бы оставил вход в запись звонка прямо в системном сообщении, так люди меньше теряют контекст.</p>
      </article>
    `,
  },
  "ux-channel": {
    kicker: "Проектный канал",
    title: "Проработка пользовательского опыта",
    composerPlaceholder: "Написать в канал про пользовательский опыт",
    huddleVisible: true,
    openToSpace: false,
    content: `
      <article class="float-chat-message">
        <div class="float-chat-meta">
          <span class="float-avatar">А</span>
          <div>
            <strong>Алексей</strong>
            <small>Сегодня, 16:42</small>
          </div>
        </div>
        <p>Сюда выносим коммуникацию по карточке про пользовательский опыт работы с ВКС, чтобы она не терялась в общем потоке канала пространства.</p>
      </article>
      <article class="float-chat-message system-message">
        <div class="float-chat-meta">
          <span class="float-avatar system-avatar">AI</span>
          <div>
            <strong>Kaiten AI</strong>
            <small>Сегодня, 16:48</small>
          </div>
        </div>
        <p>Собрал в канал материалы, комментарии и вопросы, связанные со сценарием использования ВКС. Могу отдельно вынести решения в summary после следующего созвона.</p>
      </article>
    `,
  },
  "ai-assistant-chat": {
    kicker: "Личный чат",
    title: "Kaiten AI Assistant",
    composerPlaceholder: "Спросить AI-ассистента",
    huddleVisible: false,
    openToSpace: false,
    content: `
      <article class="float-chat-message system-message">
        <div class="float-chat-meta">
          <span class="float-avatar system-avatar">AI</span>
          <div>
            <strong>Kaiten AI Assistant</strong>
            <small>Сегодня, 18:30</small>
          </div>
        </div>
        <p>Я собрал summary по последнему созвону и вынес предложения в документ. Могу ещё декомпозировать задачи или подготовить короткую выжимку для команды.</p>
      </article>
      <article class="float-chat-message">
        <div class="float-chat-meta">
          <span class="float-avatar">AE</span>
          <div>
            <strong>Вы</strong>
            <small>Сегодня, 18:31</small>
          </div>
        </div>
        <p>Проверь, пожалуйста, все ли внутренние ссылки на карточки и документы различаются от внешних файлов.</p>
      </article>
      <article class="float-chat-message system-message">
        <div class="float-chat-meta">
          <span class="float-avatar system-avatar">AI</span>
          <div>
            <strong>Kaiten AI Assistant</strong>
            <small>Сегодня, 18:31</small>
          </div>
        </div>
        <p>Да, в текущем прототипе карточки Kaiten и документы Kaiten выделены отдельно от PDF и внешних вложений.</p>
      </article>
    `,
  },
  "support-chat": {
    kicker: "Личный чат",
    title: "Техподдержка",
    composerPlaceholder: "Написать в техподдержку",
    huddleVisible: false,
    openToSpace: false,
    content: `
      <article class="float-chat-message">
        <div class="float-chat-meta">
          <span class="float-avatar accent-amber">TS</span>
          <div>
            <strong>Техподдержка</strong>
            <small>Сегодня, 17:42</small>
          </div>
        </div>
        <p>Проверьте, пожалуйста, обновлённый сценарий подключения второго участника в хаддле. Мы поправили состояние ожидания SIP.</p>
      </article>
      <article class="float-chat-message">
        <div class="float-chat-meta">
          <span class="float-avatar">AE</span>
          <div>
            <strong>Вы</strong>
            <small>Сегодня, 17:45</small>
          </div>
        </div>
        <p>Спасибо, проверю. Если будут проблемы с мини-видом звонка, вернусь с комментарием.</p>
      </article>
      <article class="float-chat-message">
        <div class="float-chat-meta">
          <span class="float-avatar accent-amber">TS</span>
          <div>
            <strong>Техподдержка</strong>
            <small>Сегодня, 17:46</small>
          </div>
        </div>
        <p>Хорошо. Мы ещё отдельно мониторим публикацию итогового документа в канал после завершения созвона.</p>
      </article>
    `,
  },
  "service-channel": {
    kicker: "Проектный канал",
    title: "Service Desk MVP",
    composerPlaceholder: "Написать в Service Desk MVP",
    huddleVisible: true,
    openToSpace: false,
    content: `
      <article class="float-chat-message">
        <div class="float-chat-meta">
          <span class="float-avatar">О</span>
          <div>
            <strong>Оля</strong>
            <small>Сегодня, 12:06</small>
          </div>
        </div>
        <p>Проверьте, пожалуйста, новый flow эскалации. Особенно момент, где из карточки можно уйти в быстрый созвон.</p>
      </article>
      <article class="float-chat-message">
        <div class="float-chat-meta">
          <span class="float-avatar accent">С</span>
          <div>
            <strong>Сергей</strong>
            <small>Сегодня, 12:18</small>
          </div>
        </div>
        <p>Да, и надо ещё решить, куда именно складывать итог встречи: в канал, карточку или в оба места сразу.</p>
      </article>
    `,
  },
  "group-direct-chat": {
    kicker: "Личный чат · 4 участника",
    title: "Алексей, Маша, Петя, Илья",
    composerPlaceholder: "Написать в личный чат",
    huddleVisible: true,
    openToSpace: false,
    content: `
      <article class="float-chat-message">
        <div class="float-chat-meta">
          <span class="float-avatar">П</span>
          <div>
            <strong>Петя</strong>
            <small>Сегодня, 12:42</small>
          </div>
        </div>
        <p>Скинул карточку с обновлённым сценарием входа в коммуникацию. Посмотрите, насколько ок выглядит второй drawer.</p>
        <div class="float-chat-attachments">
          <span class="attachment-tile">Карточка: Проработка UX VKS</span>
        </div>
      </article>
      <article class="float-chat-message">
        <div class="float-chat-meta">
          <span class="float-avatar accent">М</span>
          <div>
            <strong>Маша</strong>
            <small>Сегодня, 12:49</small>
          </div>
        </div>
        <p>И документ тоже приложила. Там заметки по тому, как вести итог созвона обратно в чат и карточку.</p>
        <div class="float-chat-attachments">
          <span class="attachment-tile">Документ: calls-inside-channels.pdf</span>
        </div>
      </article>
      <article class="float-chat-message system-message">
        <div class="float-chat-meta">
          <span class="float-avatar system-avatar">AI</span>
          <div>
            <strong>Kaiten AI</strong>
            <small>Сегодня, 13:02</small>
          </div>
        </div>
        <p>Хаддл завершён. Транскрипт и summary созвона готовы, ссылка на документ с полным содержанием встречи добавлена ниже.</p>
        <div class="float-chat-attachments">
          <span class="attachment-tile">Документ: transcript-and-summary.doc</span>
        </div>
      </article>
      <article class="float-chat-message">
        <div class="float-chat-meta">
          <span class="float-avatar accent-amber">И</span>
          <div>
            <strong>Илья</strong>
            <small>Сегодня, 13:09</small>
          </div>
        </div>
        <p>Отлично, тогда я от этого summary уже пойду собирать связанный сценарий для документа.</p>
      </article>
    `,
  },
};

const huddleSourceTemplates = {
  "space-panel": { name: "Rick Deckard", avatar: "R", waiting: "Р–РґС‘Рј СѓС‡Р°СЃС‚РЅРёРєР° РёР· РїСЂРѕСЃС‚СЂР°РЅСЃС‚РІР°" },
  "space-channel": { name: "Rick Deckard", avatar: "R", waiting: "Р–РґС‘Рј СѓС‡Р°СЃС‚РЅРёРєР° РёР· РєР°РЅР°Р»Р° РїСЂРѕСЃС‚СЂР°РЅСЃС‚РІР°" },
  "project-channel": { name: "Rick Deckard", avatar: "R", waiting: "Р–РґС‘Рј СѓС‡Р°СЃС‚РЅРёРєР° РёР· РїСЂРѕРµРєС‚РЅРѕРіРѕ РєР°РЅР°Р»Р°" },
  "group-direct-chat": { name: "Rick Deckard", avatar: "R", waiting: "Р–РґС‘Рј SIP-РїРѕРґРєР»СЋС‡РµРЅРёРµ РІ Р»РёС‡РЅРѕРј С‡Р°С‚Рµ" },
  "chat-preview": { name: "Rick Deckard", avatar: "R", waiting: "Р–РґС‘Рј SIP-РїРѕРґРєР»СЋС‡РµРЅРёРµ" },
  "task-card": { name: "РџСЂРѕСЂР°Р±РѕС‚РєР° РїРѕР»СЊР·РѕРІР°С‚РµР»СЊСЃРєРѕРіРѕ РѕРїС‹С‚Р°", avatar: "Рџ", waiting: "Р–РґС‘Рј СѓС‡Р°СЃС‚РЅРёРєР° РїРѕ РєР°СЂС‚РѕС‡РєРµ" },
};

const HUDDLE_CONNECT_TICKS = 1;

const huddleContextTemplates = {
  "space-panel": { icon: "#", title: "Р—Р°РґР°С‡Рё РЅР° РґРёР·Р°Р№РЅ", meta: "РљР°РЅР°Р» РїСЂРѕСЃС‚СЂР°РЅСЃС‚РІР° В· РѕС‚РєСЂС‹С‚СЊ РєРѕРЅС‚РµРєСЃС‚" },
  "space-channel": { icon: "#", title: "Р—Р°РґР°С‡Рё РЅР° РґРёР·Р°Р№РЅ", meta: "РљР°РЅР°Р» РїСЂРѕСЃС‚СЂР°РЅСЃС‚РІР° В· РѕС‚РєСЂС‹С‚СЊ РєРѕРЅС‚РµРєСЃС‚" },
  "project-channel": { icon: "#", title: "R&D / Р’РёРґРµРѕ Рё РІСЃС‚СЂРµС‡Рё", meta: "РџСЂРѕРµРєС‚РЅС‹Р№ РєР°РЅР°Р» В· РѕС‚РєСЂС‹С‚СЊ РєРѕРЅС‚РµРєСЃС‚" },
  "group-direct-chat": { icon: "R", title: "Rick Deckard", meta: "Р›РёС‡РЅС‹Р№ С‡Р°С‚ В· РѕС‚РєСЂС‹С‚СЊ РєРѕРЅС‚РµРєСЃС‚" },
  "chat-preview": { icon: "#", title: "Р—Р°РґР°С‡Рё РЅР° РґРёР·Р°Р№РЅ", meta: "РљР°РЅР°Р» В· РѕС‚РєСЂС‹С‚СЊ РєРѕРЅС‚РµРєСЃС‚" },
  "task-card": { icon: "#", title: "РџСЂРѕСЂР°Р±РѕС‚РєР° РїРѕР»СЊР·РѕРІР°С‚РµР»СЊСЃРєРѕРіРѕ РѕРїС‹С‚Р° СЂР°Р±РѕС‚С‹ Р’РљРЎ РІ Kaiten", meta: "РљР°СЂС‚РѕС‡РєР° Р·Р°РґР°С‡Рё В· РѕС‚РєСЂС‹С‚СЊ РєРѕРЅС‚РµРєСЃС‚" },
};

function clampTaskWidth(width) {
  return Math.min(TASK_MAX_WIDTH, Math.max(TASK_MIN_WIDTH, width));
}

function scrollToBottom(element) {
  if (!element) {
    return;
  }

  requestAnimationFrame(() => {
    element.scrollTop = element.scrollHeight;
  });
}

function closeHuddleMenus() {
  document.querySelectorAll(".huddle-split").forEach((group) => {
    group.classList.remove("is-menu-open");
  });
  activeHuddleMenu = null;
}

function closeHuddleControlMenus() {
  document.querySelectorAll("[data-huddle-control-split]").forEach((group) => {
    group.classList.remove("is-open");
  });
  activeHuddleControlMenu = null;
}

function initializeHuddleControlMenus() {
  document.querySelectorAll("[data-huddle-control-toggle]").forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const group = toggle.closest("[data-huddle-control-split]");
      if (!group) {
        return;
      }

      const shouldOpen = activeHuddleControlMenu !== group;
      closeHuddleControlMenus();

      if (shouldOpen) {
        group.classList.add("is-open");
        activeHuddleControlMenu = group;
      }
    });
  });

  document.querySelectorAll(".huddle-control-menu-item").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeHuddleControlMenus();
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-huddle-control-split]")) {
      return;
    }
    closeHuddleControlMenus();
  });
}

function closeComposerAttachMenus() {
  document.querySelectorAll("[data-composer-attach]").forEach((group) => {
    group.classList.remove("is-open");
  });
  activeComposerAttachMenu = null;
}

function initializeComposerAttachMenus() {
  document.querySelectorAll("[data-composer-attach-toggle]").forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const group = toggle.closest("[data-composer-attach]");
      if (!group) {
        return;
      }

      const shouldOpen = activeComposerAttachMenu !== group;
      closeComposerAttachMenus();

      if (shouldOpen) {
        group.classList.add("is-open");
        activeComposerAttachMenu = group;
      }
    });
  });

  document.querySelectorAll(".composer-attach-item").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeComposerAttachMenus();
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-composer-attach]")) {
      return;
    }
    closeComposerAttachMenus();
  });
}

function initializeHuddleSplitButtons() {
  huddleTriggers.forEach((trigger) => {
    if (trigger.closest(".huddle-split")) {
      return;
    }

    const group = document.createElement("span");
    group.className = "huddle-split";

    if (trigger.classList.contains("panel-head-btn")) {
      group.classList.add("is-toolbar");
    } else if (trigger.classList.contains("circle-btn")) {
      group.classList.add("is-task-action");
    } else if (trigger.classList.contains("chat-row-huddle-btn")) {
      group.classList.add("is-chat-row");
    }

    trigger.parentNode.insertBefore(group, trigger);
    group.appendChild(trigger);

    const arrowButton = document.createElement("button");
    arrowButton.type = "button";
    arrowButton.className = "huddle-menu-toggle";
    arrowButton.setAttribute("aria-label", "РћС‚РєСЂС‹С‚СЊ РјРµРЅСЋ С…Р°РґРґР»Р°");
    arrowButton.innerHTML = '<span class="huddle-menu-caret">в–ѕ</span>';
    group.appendChild(arrowButton);

    const menu = document.createElement("div");
    menu.className = "huddle-menu";
    menu.innerHTML = `
      <button type="button" class="huddle-menu-item">РќР°С‡Р°С‚СЊ Huddle РїСЂСЏРјРѕ СЃРµР№С‡Р°СЃ</button>
      <button type="button" class="huddle-menu-item">Р—Р°РїР»Р°РЅРёСЂРѕРІР°С‚СЊ Huddle</button>
      <button type="button" class="huddle-menu-item">РџРѕСЃРјРѕС‚СЂРµС‚СЊ Р·Р°РїРёСЃРё Huddle</button>
    `;
    group.appendChild(menu);

    arrowButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const shouldOpen = activeHuddleMenu !== group;
      closeHuddleMenus();
      if (shouldOpen) {
        group.classList.add("is-menu-open");
        activeHuddleMenu = group;
      }
    });

    menu.querySelectorAll(".huddle-menu-item").forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        closeHuddleMenus();
      });
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest(".huddle-split")) {
      return;
    }
    closeHuddleMenus();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeHuddleMenus();
    }
  });
}

function getActiveHuddleTemplate() {
  if (state.huddleSource === "chat-preview") {
    if (state.previewChat === "group-direct-chat") {
      return huddleSourceTemplates["group-direct-chat"];
    }

    if (state.previewChat === "space-channel") {
      return huddleSourceTemplates["space-channel"];
    }

    if (state.previewChat === "ux-channel") {
      return huddleSourceTemplates["task-card"];
    }

    if (state.previewChat === "project-channel" || state.previewChat === "service-channel") {
      return huddleSourceTemplates["project-channel"];
    }
  }

  return huddleSourceTemplates[state.huddleSource] || huddleSourceTemplates["space-panel"];
}

function getActiveHuddleContextTemplate() {
  if (state.huddleSource === "chat-preview") {
    if (state.previewChat === "group-direct-chat") {
      return huddleContextTemplates["group-direct-chat"];
    }

    if (state.previewChat === "space-channel") {
      return huddleContextTemplates["space-channel"];
    }

    if (state.previewChat === "ux-channel") {
      return huddleContextTemplates["task-card"];
    }

    if (state.previewChat === "project-channel" || state.previewChat === "service-channel") {
      return huddleContextTemplates["project-channel"];
    }
  }

  return huddleContextTemplates[state.huddleSource] || huddleContextTemplates["task-card"];
}

function syncHuddleView() {
  const template = getActiveHuddleTemplate();
  const contextTemplate = getActiveHuddleContextTemplate();
  const waitingLabel = state.huddleConnected
    ? `${template.name} РІ СЃРѕР·РІРѕРЅРµ`
    : template.waiting;
  const counterLabel = state.huddleConnected
    ? "РЎРѕР·РІРѕРЅ Р°РєС‚РёРІРµРЅ В· РґРІР° СѓС‡Р°СЃС‚РЅРёРєР° РІ Р»РёРЅРёРё"
    : `РџРѕРґРєР»СЋС‡Р°РµРј SIP В· ${state.huddleCounter}/${HUDDLE_CONNECT_TICKS}`;
  const stageInitials = template.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (nodeHuddlePeerAvatar) nodeHuddlePeerAvatar.textContent = template.avatar;
  if (nodeHuddlePeerName) nodeHuddlePeerName.textContent = template.name;
  if (nodeHuddlePeerStatus) nodeHuddlePeerStatus.textContent = waitingLabel;
  if (nodeHuddleWait) nodeHuddleWait.textContent = counterLabel;
  if (nodeHuddlePeerStageAvatar) nodeHuddlePeerStageAvatar.textContent = stageInitials;
  if (nodeHuddlePeerStageLabel) nodeHuddlePeerStageLabel.textContent = `${template.name} В· рџ”‡`;
  if (nodeHuddleCard) nodeHuddleCard.classList.toggle("is-connected", state.huddleConnected);

  if (fullscreenHuddlePeerAvatar) fullscreenHuddlePeerAvatar.textContent = contextTemplate.icon;
  if (fullscreenHuddleContextLink) fullscreenHuddleContextLink.textContent = contextTemplate.title;
  if (fullscreenHuddlePeerStatus) fullscreenHuddlePeerStatus.textContent = contextTemplate.meta;
  if (fullscreenHuddlePeerStageAvatar) fullscreenHuddlePeerStageAvatar.textContent = stageInitials;
  if (fullscreenHuddlePeerStageLabel) fullscreenHuddlePeerStageLabel.textContent = `${template.name} В· рџ”‡`;
  if (huddleFullscreen) huddleFullscreen.classList.toggle("is-connected", state.huddleConnected);
}

function stopHuddleTimer() {
  if (huddleTimer) {
    window.clearInterval(huddleTimer);
    huddleTimer = null;
  }
}

function startHuddleSequence() {
  stopHuddleTimer();
  state.huddleCounter = 0;
  state.huddleConnected = false;
  syncHuddleView();

  huddleTimer = window.setInterval(() => {
    if (state.huddleCounter >= HUDDLE_CONNECT_TICKS) {
      state.huddleConnected = true;
      stopHuddleTimer();
      syncHuddleView();
      return;
    }

    state.huddleCounter += 1;
    syncHuddleView();
  }, 1000);
}

function closeHuddle() {
  stopHuddleTimer();
  state.huddleOpen = false;
  state.huddleCounter = 0;
  state.huddleConnected = false;
  state.huddleChatOpen = false;
}

function openHuddle(source) {
  state.huddleSource = source;
  state.huddleOpen = true;
  state.huddleMode = state.leftOpen ? "panel" : "fullscreen";
  state.huddleChatOpen = false;

  if (state.huddleMode === "panel") {
    state.leftMode = "chat";
    state.previewOpen = false;
  } else {
    state.leftOpen = false;
    state.previewOpen = false;
  }

  startHuddleSequence();
}

function renderFloatChat() {
  if (!spaceChannelFloatBody || !openSpaceFromFloat || !floatChatKicker || !floatComposerInput || !floatHuddleButton) {
    return;
  }

  const template = floatChatTemplates[state.previewChat] || floatChatTemplates["space-channel"];
  floatChatKicker.textContent = template.kicker;
  openSpaceFromFloat.textContent = template.title;
  openSpaceFromFloat.disabled = !template.openToSpace;
  openSpaceFromFloat.classList.toggle("is-disabled", !template.openToSpace);
  floatComposerInput.placeholder = template.composerPlaceholder;
  floatHuddleButton.hidden = !template.huddleVisible;
  spaceChannelFloatBody.innerHTML = template.content;
}

function render() {
  if (leftPanel) {
    leftPanel.hidden = !state.leftOpen;
  }

  syncChatCreateMenu();

  const activeModeButton = document.querySelector(`[data-left-mode="${state.leftMode}"]`);
  const activeModeLabel = activeModeButton?.getAttribute("aria-label");

  if (leftPanelTitle) {
    leftPanelTitle.textContent = activeModeLabel || leftModeTitles[state.leftMode] || "Узел связи";
  }

  personalViewButtons.forEach((button) => {
    button.classList.toggle("is-current", state.leftMode === "personal" && button.dataset.personalView === state.personalView);
  });

  const showRecordings = state.leftMode === "personal" && state.personalView === "recordings" && !state.taskOpen;
  if (boardView) {
    boardView.hidden = showRecordings;
  }
  if (recordingsView) {
    recordingsView.hidden = !showRecordings;
  }

  leftModeButtons.forEach((button) => {
    const isActive = state.leftOpen && button.dataset.leftMode === state.leftMode;
    button.classList.toggle("is-active", isActive);
  });

  if (chatRailButton) {
    chatRailButton.classList.toggle("is-call-live", state.huddleOpen);
  }

  if (chatRailNotification) {
    chatRailNotification.classList.toggle("is-call-live", state.huddleOpen);
    chatRailNotification.textContent = state.huddleOpen ? "" : "2";
    chatRailNotification.setAttribute("aria-label", state.huddleOpen ? "РРґРµС‚ СЃРѕР·РІРѕРЅ" : "2 РЅРµРїСЂРѕС‡РёС‚Р°РЅРЅС‹С…");
  }

  leftModePanels.forEach((panel) => {
    panel.hidden = panel.dataset.panelMode !== state.leftMode;
  });

  chatPreviewTriggers.forEach((trigger) => {
    const target = trigger.dataset.chatTarget;
    const isPreviewActive = state.previewOpen && target === state.previewChat;
    const isTaskContextActive = state.taskOpen && state.detailKind === "task" && target === "ux-channel";
    trigger.classList.toggle("is-active", isPreviewActive || isTaskContextActive);
  });

  const isSpaceRightOpen = state.rightOpen && !state.taskOpen;

  if (workspace) {
    workspace.classList.toggle("left-open", state.leftOpen);
    workspace.classList.toggle("right-open", isSpaceRightOpen);
  }

  if (workspaceBody) {
    workspaceBody.classList.toggle("left-open", state.leftOpen);
    workspaceBody.classList.toggle("right-open", isSpaceRightOpen);
    workspaceBody.classList.toggle("task-open", state.taskOpen);
    workspaceBody.classList.toggle("task-secondary-open", state.taskOpen && state.rightOpen && (state.rightMode === "card" || state.rightMode === "document"));
    workspaceBody.classList.toggle("document-open", state.rightOpen && state.rightMode === "document");
  }

  if (taskDetail) {
    taskDetail.classList.toggle("is-open", state.taskOpen);
    taskDetail.style.width = state.taskWidth ? `${state.taskWidth}px` : "";
  }

  if (taskDetailMain) {
    taskDetailMain.hidden = !state.taskOpen || state.detailKind !== "task";
  }

  if (documentDetailMain) {
    documentDetailMain.hidden = !state.taskOpen || state.detailKind !== "document";
  }

  if (rightPanel) {
    rightPanel.hidden = !state.rightOpen;
  }

  if (rightPanelToolbarHead) {
    rightPanelToolbarHead.hidden = !state.rightOpen || state.taskOpen;
  }

  if (activateUsersPanel) {
    activateUsersPanel.classList.toggle("is-active", !state.taskOpen && state.rightOpen && state.rightMode === "space");
  }

  if (cardRailGroup) {
    cardRailGroup.hidden = !(state.taskOpen && state.detailKind === "task");
  }

  if (documentRailGroup) {
    documentRailGroup.hidden = !(state.taskOpen && state.detailKind === "document");
  }

  cardRailButtons.forEach((button) => {
    const isActive = state.taskOpen && state.detailKind === "task" && state.rightOpen && state.rightMode === "card" && button.dataset.cardRailTarget === state.cardSection;
    button.classList.toggle("is-active", isActive);
  });

  documentRailButtons.forEach((button) => {
    const isActive = state.taskOpen && state.detailKind === "document" && state.rightOpen && state.rightMode === "document" && button.dataset.documentSectionTarget === state.documentSection;
    button.classList.toggle("is-active", isActive);
  });

  panelModes.forEach((panelMode) => {
    const isActive = panelMode.dataset.panelModeView === state.rightMode;
    panelMode.hidden = !isActive;
    panelMode.classList.toggle("is-active", isActive);
  });

  if (rightPanelToolbarTitle) {
    rightPanelToolbarTitle.textContent = state.rightMode === "card"
      ? "РљР°СЂС‚РѕС‡РєР°"
      : state.rightMode === "document"
        ? "Р”РѕРєСѓРјРµРЅС‚ СЃРѕР·РІРѕРЅР°"
        : "Р—Р°РґР°С‡Рё РЅР° РґРёР·Р°Р№РЅ";
  }

  if (toolbarHuddleButton) {
    toolbarHuddleButton.hidden = state.rightMode === "card" || state.rightMode === "document" || state.taskOpen;
  }

  cardSectionTabs.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.cardSectionTarget === state.cardSection);
  });

  cardSections.forEach((section) => {
    section.classList.toggle("is-active", section.dataset.cardSection === state.cardSection);
  });

  documentSections.forEach((section) => {
    section.classList.toggle("is-active", section.dataset.documentSection === state.documentSection);
  });

  if (spaceChannelFloat) {
    spaceChannelFloat.hidden = !state.previewOpen;
  }

  renderFloatChat();
  syncHuddleView();

  if (nodeHuddleDock) {
    nodeHuddleDock.hidden = !(state.huddleOpen && state.huddleMode === "panel");
  }

  if (huddleFullscreen) {
    huddleFullscreen.hidden = !(state.huddleOpen && state.huddleMode === "fullscreen");
  }

  if (fullscreenHuddleStageShell) {
    fullscreenHuddleStageShell.classList.toggle("is-chat-open", state.huddleOpen && state.huddleMode === "fullscreen" && state.huddleChatOpen);
  }

  if (huddleChatPanel) {
    huddleChatPanel.hidden = !(state.huddleOpen && state.huddleMode === "fullscreen" && state.huddleChatOpen);
  }

  if (fullscreenHuddleChatButton) {
    fullscreenHuddleChatButton.classList.toggle("is-active", state.huddleChatOpen);
  }

  if (state.rightOpen && state.rightMode === "space") {
    scrollToBottom(spaceTimelineScroll);
  }

  if (state.rightOpen && state.rightMode === "card" && state.cardSection === "communication") {
    scrollToBottom(cardPanelScroll);
  }

  if (state.rightOpen && state.rightMode === "document" && documentPanelScroll) {
    documentPanelScroll.scrollTop = 0;
  }

  if (state.previewOpen) {
    scrollToBottom(spaceChannelFloatBody);
  }

  if (state.huddleOpen && state.huddleMode === "fullscreen" && state.huddleChatOpen) {
    scrollToBottom(huddleChatScroll);
  }
}

if (activateUsersPanel) {
  activateUsersPanel.addEventListener("click", () => {
    const shouldClose = state.rightOpen && state.rightMode === "space" && !state.taskOpen;
    state.taskOpen = false;
    state.rightOpen = !shouldClose;
    state.rightMode = "space";
    state.previewOpen = false;
    render();
  });
}

if (toolbarCloseRightPanel) {
  toolbarCloseRightPanel.addEventListener("click", () => {
    state.rightOpen = false;
    state.previewOpen = false;
    render();
  });
}

if (collapseLeftPanel) {
  collapseLeftPanel.addEventListener("click", () => {
    state.leftOpen = false;
    state.previewOpen = false;
    render();
  });
}

leftModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const requestedMode = button.dataset.leftMode;
    const shouldClose = state.leftOpen && state.leftMode === requestedMode;

    if (shouldClose) {
      if (state.huddleOpen && state.huddleMode === "panel") {
        state.huddleMode = "fullscreen";
      }
      state.leftOpen = false;
      state.previewOpen = false;
      render();
      return;
    }

    state.leftMode = requestedMode;
    state.leftOpen = true;
    state.previewOpen = false;
    render();
  });
});

huddleTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    openHuddle(trigger.dataset.huddleTrigger || "space-panel");
    render();
  });

  if (trigger.getAttribute("role") === "button") {
    trigger.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      event.preventDefault();
      openHuddle(trigger.dataset.huddleTrigger || "space-panel");
      render();
    });
  }
});

boardTaskCards.forEach((card) => {
  card.addEventListener("click", () => {
    state.taskOpen = true;
    state.detailKind = "task";
    state.rightOpen = false;
    state.rightMode = "card";
    state.cardSection = "info";
    state.previewOpen = false;
    render();
  });
});

personalViewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.leftMode = "personal";
    state.leftOpen = true;
    state.personalView = button.dataset.personalView || "blockers";
    state.previewOpen = false;
    state.taskOpen = false;
    state.rightOpen = false;
    state.detailKind = "task";
    render();
  });
});

recordingOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.taskOpen = true;
    state.detailKind = "document";
    state.rightOpen = true;
    state.rightMode = "document";
    state.documentSection = "outline";
    state.previewOpen = false;
    render();
  });
});

if (chatCreateToggle && chatCreateMenu) {
  chatCreateToggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    isChatCreateMenuOpen = !isChatCreateMenuOpen;
    render();
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-chat-create-menu]")) {
      return;
    }

    if (!isChatCreateMenuOpen) {
      return;
    }

    isChatCreateMenuOpen = false;
    render();
  });
}

closeTaskDetailButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.taskOpen = false;
    state.detailKind = "task";
    state.rightOpen = false;
    state.previewOpen = false;
    render();
  });
});

chatPreviewTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    state.leftMode = "chat";
    state.leftOpen = true;
    state.taskOpen = false;
    state.detailKind = "task";
    state.rightOpen = false;
    state.previewChat = trigger.dataset.chatTarget || "space-channel";
    state.previewOpen = true;
    render();
  });
});

if (closeSpaceChannelPreview) {
  closeSpaceChannelPreview.addEventListener("click", () => {
    state.previewOpen = false;
    render();
  });
}

if (openSpaceFromFloat) {
  openSpaceFromFloat.addEventListener("click", () => {
    const template = floatChatTemplates[state.previewChat] || floatChatTemplates["space-channel"];
    if (!template.openToSpace) {
      return;
    }
    state.leftOpen = false;
    state.taskOpen = false;
    state.detailKind = "task";
    state.rightOpen = true;
    state.rightMode = "space";
    state.previewOpen = false;
    render();
  });
}

if (expandNodeHuddle) {
  expandNodeHuddle.addEventListener("click", () => {
    state.huddleMode = "fullscreen";
    state.leftOpen = false;
    render();
  });
}

if (collapseFullscreenHuddle) {
  collapseFullscreenHuddle.addEventListener("click", () => {
    state.leftOpen = true;
    state.leftMode = "chat";
    state.huddleMode = "panel";
    state.huddleChatOpen = false;
    state.previewOpen = false;
    render();
  });
}

if (fullscreenHuddleChatButton) {
  fullscreenHuddleChatButton.addEventListener("click", () => {
    state.huddleChatOpen = !state.huddleChatOpen;
    render();
  });
}

if (fullscreenHuddleContextLink) {
  fullscreenHuddleContextLink.addEventListener("click", () => {
    closeHuddle();

    if (state.huddleSource === "task-card") {
      state.taskOpen = true;
      state.detailKind = "task";
      state.rightOpen = false;
      state.rightMode = "card";
      state.cardSection = "info";
      render();
      return;
    }

    if (state.huddleSource === "space-panel" || state.huddleSource === "space-channel" || (state.huddleSource === "chat-preview" && state.previewChat === "space-channel")) {
      state.taskOpen = false;
      state.detailKind = "task";
      state.leftOpen = false;
      state.rightOpen = true;
      state.rightMode = "space";
      state.previewOpen = false;
      render();
      return;
    }

    if (state.huddleSource === "group-direct-chat" || (state.huddleSource === "chat-preview" && state.previewChat === "group-direct-chat")) {
      state.leftMode = "chat";
      state.leftOpen = true;
      state.previewOpen = true;
      state.taskOpen = false;
      state.detailKind = "task";
      state.rightOpen = false;
      state.previewChat = "group-direct-chat";
      render();
    }
  });
}

if (leaveNodeHuddle) {
  leaveNodeHuddle.addEventListener("click", () => {
    closeHuddle();
    state.taskOpen = true;
    state.detailKind = "document";
    state.rightOpen = true;
    state.rightMode = "document";
    state.documentSection = "outline";
    state.previewOpen = false;
    state.leftOpen = false;
    render();
  });
}

if (leaveFullscreenHuddle) {
  leaveFullscreenHuddle.addEventListener("click", () => {
    closeHuddle();
    state.taskOpen = true;
    state.detailKind = "document";
    state.rightOpen = true;
    state.rightMode = "document";
    state.documentSection = "outline";
    state.previewOpen = false;
    state.leftOpen = false;
    render();
  });
}

if (closeDocumentPanel) {
  closeDocumentPanel.addEventListener("click", () => {
    state.rightOpen = false;
    render();
  });
}

if (closeCardSecondaryPanel) {
  closeCardSecondaryPanel.addEventListener("click", () => {
    state.rightOpen = false;
    render();
  });
}

if (taskDetailResizeHandle && taskDetail) {
  const startResize = (event) => {
    event.preventDefault();

    const startX = event.clientX;
    const startWidth = taskDetail.getBoundingClientRect().width;

    if (workspace) {
      workspace.classList.add("is-resizing");
    }

    const handleMove = (moveEvent) => {
      const delta = startX - moveEvent.clientX;
      state.taskWidth = clampTaskWidth(Math.round(startWidth + delta));
      render();
    };

    const stopResize = () => {
      if (workspace) {
        workspace.classList.remove("is-resizing");
      }

      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", stopResize);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", stopResize);
  };

  taskDetailResizeHandle.addEventListener("pointerdown", startResize);
}

cardRailButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const requestedSection = button.dataset.cardRailTarget;
    const shouldClose = state.taskOpen && state.rightOpen && state.rightMode === "card" && state.cardSection === requestedSection;

    state.detailKind = "task";
    state.rightMode = "card";
    state.cardSection = requestedSection;
    state.rightOpen = !shouldClose;
    render();
  });
});

cardSectionTabs.forEach((button) => {
  button.addEventListener("click", () => {
    state.cardSection = button.dataset.cardSectionTarget;
    render();
  });
});

documentRailButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const requestedSection = button.dataset.documentSectionTarget;
    const shouldClose = state.taskOpen && state.detailKind === "document" && state.rightOpen && state.rightMode === "document" && state.documentSection === requestedSection;

    state.taskOpen = true;
    state.detailKind = "document";
    state.rightMode = "document";
    state.documentSection = requestedSection;
    state.rightOpen = !shouldClose;
    render();
  });
});

initializeHuddleSplitButtons();
initializeHuddleControlMenus();
initializeComposerAttachMenus();
setupDocumentOutline();

window.addEventListener("load", render);

