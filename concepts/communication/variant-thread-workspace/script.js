(() => {
  document.documentElement.dataset.prototype = "variant-b";

  const workspace = document.querySelector(".workspace");
  const workspaceBody = document.querySelector(".workspace-body");
  const leftPanel = document.getElementById("leftPanel");
  const leftPanelTitle = document.getElementById("leftPanelTitle");
  const leftModeButtons = document.querySelectorAll("[data-left-mode]");
  const leftModePanels = document.querySelectorAll("[data-panel-mode]");
  const personalViewButtons = document.querySelectorAll("[data-personal-view]");
  const collapseLeftPanel = document.getElementById("collapseLeftPanel");
  const rightPanel = document.getElementById("rightPanel");
  const rightPanelToolbarHead = document.getElementById("rightPanelToolbarHead");
  const rightPanelToolbarTitle = document.getElementById("rightPanelToolbarTitle");
  const toolbarCloseRightPanel = document.getElementById("toolbarCloseRightPanel");
  const activateUsersPanel = document.getElementById("activateUsersPanel");
  const boardTaskCards = document.querySelectorAll(".board .task-card");
  const taskDetail = document.getElementById("taskDetail");
  const taskDetailResizeHandle = document.getElementById("taskDetailResizeHandle");
  const closeTaskDetailButtons = document.querySelectorAll("[data-close-task-detail]");
  const taskDetailMain = document.querySelector(".task-detail-main");
  const documentDetailMain = document.querySelector(".document-detail-main");
  const detailComments = document.querySelector(".detail-comments");
  const cardRailGroup = document.getElementById("cardRailGroup");
  const cardRailButtons = document.querySelectorAll("[data-card-rail-target]");
  const closeCardSecondaryPanel = document.getElementById("closeCardSecondaryPanel");
  const panelModes = document.querySelectorAll("[data-panel-mode-view]");
  const cardSectionTabs = document.querySelectorAll("[data-card-section-target]");
  const cardSections = document.querySelectorAll("[data-card-section]");
  const communicationTabButtons = document.querySelectorAll("[data-communication-tab]");
  const communicationPanels = document.querySelectorAll("[data-communication-panel]");
  const joinNearestMeeting = document.getElementById("joinNearestMeeting");
  const openCommunicationFullscreen = document.getElementById("openCommunicationFullscreen");
  const communicationFullscreen = document.getElementById("communicationFullscreen");
  const communicationFullscreenTitle = document.getElementById("communicationFullscreenTitle");
  const communicationFullscreenSubtitle = document.getElementById("communicationFullscreenSubtitle");
  const communicationFullscreenBody = document.getElementById("communicationFullscreenBody");
  const closeCommunicationFullscreen = document.getElementById("closeCommunicationFullscreen");
  const documentRailGroup = document.getElementById("documentRailGroup");
  const documentRailButtons = document.querySelectorAll("[data-document-section-target]");
  const documentSections = document.querySelectorAll("[data-document-section]");
  const closeDocumentPanel = document.getElementById("closeDocumentPanel");
  const huddleFullscreen = document.getElementById("huddleFullscreen");
  const closeFullscreenHuddle = document.getElementById("closeFullscreenHuddle");
  const leaveFullscreenHuddle = document.getElementById("leaveFullscreenHuddle");
  const fullscreenHuddlePeerAvatar = document.getElementById("fullscreenHuddlePeerAvatar");
  const fullscreenHuddleContextLink = document.getElementById("fullscreenHuddleContextLink");
  const fullscreenHuddlePeerStatus = document.getElementById("fullscreenHuddlePeerStatus");
  const fullscreenHuddlePeerStageAvatar = document.getElementById("fullscreenHuddlePeerStageAvatar");
  const fullscreenHuddlePeerStageLabel = document.getElementById("fullscreenHuddlePeerStageLabel");
  const fullscreenHuddleWait = document.getElementById("fullscreenHuddleWait");
  const huddleFullscreenStageShell = document.getElementById("huddleFullscreenStageShell");
  const huddleChatPanel = document.getElementById("huddleChatPanel");
  const fullscreenHuddleChatButton = document.getElementById("fullscreenHuddleChatButton");
  const meetingSideTabButtons = document.querySelectorAll("[data-meeting-side-tab]");
  const meetingSideSections = document.querySelectorAll("[data-meeting-side-section]");
  const meetingSidePanelTitle = document.getElementById("meetingSidePanelTitle");
  const meetingSidePanelSubtitle = document.getElementById("meetingSidePanelSubtitle");

  const leftModeTitles = {
    personal: "Личное",
    chat: "Дашборд",
    favorites: "Избранное",
    tree: "Дерево",
  };
  const communicationTabTitles = {
    dashboard: "Дашборд",
    planner: "Планировщик",
    artifacts: "Артефакты",
  };

  const state = {
    leftOpen: true,
    leftMode: "chat",
    personalView: "blockers",
    rightOpen: false,
    rightMode: "space",
    taskOpen: false,
    detailKind: "task",
    cardSection: "info",
    documentSection: "outline",
    taskWidth: null,
    communicationTab: "dashboard",
    communicationFullscreen: null,
    meetingOpen: false,
    meetingConnected: false,
    meetingCounter: 0,
    meetingSideOpen: false,
    meetingSideTab: "chat",
  };

  const TASK_MIN_WIDTH = 520;
  const TASK_MAX_WIDTH = 1180;
  let meetingTimer = null;
  const communicationFullscreenTemplates = {
    dashboard: {
      title: "Дашборд коммуникации",
      subtitle: "Запланированное, новое, присоединение к идущей встрече и ближайшие планы в одном месте.",
      body: `
        <div class="communication-fullscreen-layout">
          <section class="communication-fullscreen-section">
            <h3>Главные действия</h3>
            <ul>
              <li>Создать новую ВКС прямо из модуля.</li>
              <li>Запланировать встречу на слот из календаря.</li>
              <li>Разобрать приглашения и быстро подтвердить участие.</li>
              <li>Присоединиться к идущей встрече одним действием.</li>
            </ul>
          </section>
          <div class="communication-fullscreen-grid">
            <section class="communication-fullscreen-section">
              <h3>Сегодня</h3>
              <p>16:30 — Design review по сценарию ВКС, 5 участников, есть связанные артефакты.</p>
            </section>
            <section class="communication-fullscreen-section">
              <h3>Приглашения</h3>
              <p>2 ожидают ответа, один слот требует подтверждения времени.</p>
            </section>
            <section class="communication-fullscreen-section">
              <h3>Ближайшие планы</h3>
              <p>Завтра weekly planning, в пятницу созвон по архитектуре communication module.</p>
            </section>
          </div>
        </div>
      `,
    },
    planner: {
      title: "Планировщик",
      subtitle: "Минимальный календарный интерфейс для создания и просмотра встреч.",
      body: `
        <div class="communication-fullscreen-layout">
          <section class="communication-fullscreen-section">
            <h3>Режимы</h3>
            <ul>
              <li>Календарный обзор по дням и неделям.</li>
              <li>Список ближайших планов и слотов.</li>
              <li>Точка назначения участников и контекста встречи.</li>
            </ul>
          </section>
          <div class="communication-fullscreen-grid">
            <section class="communication-fullscreen-section">
              <h3>Календарь</h3>
              <p>Вид по неделе с акцентом на свободные и занятые слоты.</p>
            </section>
            <section class="communication-fullscreen-section">
              <h3>Список</h3>
              <p>Сегодня 16:30 — Design review, завтра 11:00 — Weekly planning.</p>
            </section>
            <section class="communication-fullscreen-section">
              <h3>Новый слот</h3>
              <p>Форма планирования может открываться поверх календаря или справа как composer.</p>
            </section>
          </div>
        </div>
      `,
    },
    artifacts: {
      title: "Артефакты коммуникации",
      subtitle: "Материалы, записи, summary и документы как самостоятельный слой после встречи.",
      body: `
        <div class="communication-fullscreen-layout">
          <section class="communication-fullscreen-section">
            <h3>Что собираем</h3>
            <ul>
              <li>AI summary по встречам и тредам.</li>
              <li>Документы, записи и связанные карточки.</li>
              <li>Историю решений и публикаций.</li>
            </ul>
          </section>
          <div class="communication-fullscreen-grid">
            <section class="communication-fullscreen-section">
              <h3>Последний summary</h3>
              <p>Design sync / recap: 4 решения, 3 следующих шага, 2 связанных документа.</p>
            </section>
            <section class="communication-fullscreen-section">
              <h3>Документы</h3>
              <p>Meeting notes, decision log и материалы по centralized workspace.</p>
            </section>
            <section class="communication-fullscreen-section">
              <h3>История</h3>
              <p>Публикации в карточки, пространства и календарные события.</p>
            </section>
          </div>
        </div>
      `,
    },
  };

  function clampTaskWidth(width) {
    return Math.max(TASK_MIN_WIDTH, Math.min(TASK_MAX_WIDTH, width));
  }

  function syncMeetingView() {
    const participantName = "Виктор";
    const participantMeta = state.meetingConnected
      ? "Созвон активен · встреча из дашборда коммуникации"
      : "Ближайшая встреча · дашборд коммуникации";
    const waitLabel = state.meetingConnected
      ? "Собеседник подключен"
      : `Подключаем собеседника · ${state.meetingCounter}/2`;

    if (fullscreenHuddlePeerAvatar) fullscreenHuddlePeerAvatar.textContent = "Q";
    if (fullscreenHuddleContextLink) fullscreenHuddleContextLink.textContent = "Квалификация 4.0";
    if (fullscreenHuddlePeerStatus) fullscreenHuddlePeerStatus.textContent = participantMeta;
    if (fullscreenHuddlePeerStageAvatar) fullscreenHuddlePeerStageAvatar.textContent = "VK";
    if (fullscreenHuddlePeerStageLabel) {
      fullscreenHuddlePeerStageLabel.textContent = state.meetingConnected
        ? `${participantName} · 🎙`
        : `${participantName} · 🔇`;
    }
    if (fullscreenHuddleWait) {
      fullscreenHuddleWait.textContent = waitLabel;
      fullscreenHuddleWait.hidden = state.meetingConnected;
    }
    if (meetingSidePanelTitle) {
      meetingSidePanelTitle.textContent = state.meetingSideTab === "chat" ? "Чат созвона" : "Содержание встречи";
    }
    if (meetingSidePanelSubtitle) {
      meetingSidePanelSubtitle.textContent = state.meetingSideTab === "chat"
        ? "Все сообщения и материалы по этой встрече"
        : "Повестка и связанные сущности встречи";
    }
    if (huddleFullscreen) {
      huddleFullscreen.classList.toggle("is-connected", state.meetingConnected);
    }
  }

  function stopMeetingTimer() {
    if (meetingTimer) {
      window.clearInterval(meetingTimer);
      meetingTimer = null;
    }
  }

  function startMeetingSequence() {
    stopMeetingTimer();
    state.meetingCounter = 0;
    state.meetingConnected = false;
    syncMeetingView();

    meetingTimer = window.setInterval(() => {
      if (state.meetingCounter >= 2) {
        state.meetingConnected = true;
        stopMeetingTimer();
        syncMeetingView();
        render();
        return;
      }

      state.meetingCounter += 1;
      syncMeetingView();
      render();
    }, 1000);
  }

  function closeMeeting() {
    stopMeetingTimer();
    state.meetingOpen = false;
    state.meetingConnected = false;
    state.meetingCounter = 0;
    state.meetingSideOpen = false;
    state.meetingSideTab = "chat";
  }

  function openMeeting() {
    state.meetingOpen = true;
    state.meetingSideOpen = false;
    state.meetingSideTab = "chat";
    startMeetingSequence();
  }

  function openMeetingDocument() {
    closeMeeting();
    state.taskOpen = true;
    state.detailKind = "document";
    state.rightOpen = true;
    state.rightMode = "document";
    state.documentSection = "outline";
    render();
  }

  function render() {
    if (leftPanel) {
      leftPanel.hidden = !state.leftOpen;
    }

    if (leftPanelTitle) {
      const chatTitle = communicationTabTitles[state.communicationTab] || "Дашборд";
      leftPanelTitle.textContent = state.leftMode === "chat"
        ? chatTitle
        : (leftModeTitles[state.leftMode] || "Дерево");
    }

    leftModeButtons.forEach((button) => {
      const isActive = state.leftOpen && button.dataset.leftMode === state.leftMode;
      button.classList.toggle("is-active", isActive);
    });

    leftModePanels.forEach((panel) => {
      panel.hidden = panel.dataset.panelMode !== state.leftMode;
    });

    personalViewButtons.forEach((button) => {
      button.classList.toggle("is-current", state.leftMode === "personal" && button.dataset.personalView === state.personalView);
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

    if (detailComments) {
      detailComments.hidden = !state.taskOpen || state.detailKind !== "task";
    }

    if (rightPanel) {
      rightPanel.hidden = !state.rightOpen;
    }

    if (rightPanelToolbarHead) {
      rightPanelToolbarHead.hidden = !state.rightOpen || state.taskOpen;
    }

    if (rightPanelToolbarTitle) {
      rightPanelToolbarTitle.textContent = state.rightMode === "card" ? "Карточка" : "Обзор пространства";
    }

    if (activateUsersPanel) {
      activateUsersPanel.classList.toggle("is-active", !state.taskOpen && state.rightOpen && state.rightMode === "space");
    }

    if (cardRailGroup) {
      cardRailGroup.hidden = !(state.taskOpen && state.detailKind === "task");
    }

    if (documentRailGroup) {
      documentRailGroup.hidden = !(state.taskOpen && state.detailKind === "document" && state.rightOpen && state.rightMode === "document");
    }

    cardRailButtons.forEach((button) => {
      const isActive = state.taskOpen && state.detailKind === "task" && state.rightOpen && state.rightMode === "card" && button.dataset.cardRailTarget === state.cardSection;
      button.classList.toggle("is-active", isActive);
    });

    documentRailButtons.forEach((button) => {
      const isActive = state.taskOpen && state.detailKind === "document" && state.rightOpen && state.rightMode === "document" && button.dataset.documentSectionTarget === state.documentSection;
      button.classList.toggle("is-active", isActive);
    });

    communicationTabButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.communicationTab === state.communicationTab);
    });

    communicationPanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.communicationPanel === state.communicationTab);
    });

    panelModes.forEach((panelMode) => {
      const isActive = panelMode.dataset.panelModeView === state.rightMode;
      panelMode.hidden = !isActive;
      panelMode.classList.toggle("is-active", isActive);
    });

    cardSectionTabs.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.cardSectionTarget === state.cardSection);
    });

    cardSections.forEach((section) => {
      section.classList.toggle("is-active", section.dataset.cardSection === state.cardSection);
    });

    documentSections.forEach((section) => {
      const isActive = section.dataset.documentSection === state.documentSection;
      section.classList.toggle("is-active", isActive);
    });

    meetingSideTabButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.meetingSideTab === state.meetingSideTab);
    });

    meetingSideSections.forEach((section) => {
      const isActive = section.dataset.meetingSideSection === state.meetingSideTab;
      section.hidden = !isActive;
      section.classList.toggle("is-active", isActive);
    });

    if (communicationFullscreen) {
      communicationFullscreen.hidden = !state.communicationFullscreen;
    }

    if (state.communicationFullscreen) {
      const template = communicationFullscreenTemplates[state.communicationFullscreen];
      if (template && communicationFullscreenTitle && communicationFullscreenSubtitle && communicationFullscreenBody) {
        communicationFullscreenTitle.textContent = template.title;
        communicationFullscreenSubtitle.textContent = template.subtitle;
        communicationFullscreenBody.innerHTML = template.body;
      }
    }

    if (huddleFullscreen) {
      huddleFullscreen.hidden = !state.meetingOpen;
    }

    if (huddleFullscreenStageShell) {
      huddleFullscreenStageShell.classList.toggle("is-chat-open", state.meetingOpen && state.meetingSideOpen);
    }

    if (huddleChatPanel) {
      huddleChatPanel.hidden = !(state.meetingOpen && state.meetingSideOpen);
    }

    if (fullscreenHuddleChatButton) {
      fullscreenHuddleChatButton.classList.toggle("is-active", state.meetingSideOpen);
    }

    if (rightPanelToolbarTitle) {
      rightPanelToolbarTitle.textContent = state.rightMode === "document"
        ? "Документ созвона"
        : state.rightMode === "card"
          ? "Карточка"
          : "Обзор пространства";
    }

    syncMeetingView();
  }

  if (activateUsersPanel) {
    activateUsersPanel.addEventListener("click", () => {
      const shouldClose = state.rightOpen && state.rightMode === "space" && !state.taskOpen;
      state.taskOpen = false;
      state.rightOpen = !shouldClose;
      state.rightMode = "space";
      render();
    });
  }

  if (toolbarCloseRightPanel) {
    toolbarCloseRightPanel.addEventListener("click", () => {
      state.rightOpen = false;
      render();
    });
  }

  if (collapseLeftPanel) {
    collapseLeftPanel.addEventListener("click", () => {
      state.leftOpen = false;
      render();
    });
  }

  leftModeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const requestedMode = button.dataset.leftMode;
      const shouldClose = state.leftOpen && state.leftMode === requestedMode;

      if (shouldClose) {
        state.leftOpen = false;
        render();
        return;
      }

      state.leftMode = requestedMode;
      state.leftOpen = true;
      render();
    });
  });

  personalViewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.leftMode = "personal";
      state.leftOpen = true;
      state.personalView = button.dataset.personalView || "blockers";
      render();
    });
  });

  boardTaskCards.forEach((card) => {
    card.addEventListener("click", () => {
      state.taskOpen = true;
      state.detailKind = "task";
      state.rightOpen = false;
      state.rightMode = "card";
      state.cardSection = "info";
      render();
    });
  });

  closeTaskDetailButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.taskOpen = false;
      state.detailKind = "task";
      state.rightOpen = false;
      render();
    });
  });

  if (closeCardSecondaryPanel) {
    closeCardSecondaryPanel.addEventListener("click", () => {
      state.rightOpen = false;
      render();
    });
  }

  cardRailButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const requestedSection = button.dataset.cardRailTarget;
      const shouldClose = state.taskOpen && state.detailKind === "task" && state.rightOpen && state.rightMode === "card" && state.cardSection === requestedSection;

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

  communicationTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.communicationTab = button.dataset.communicationTab || "dashboard";
      render();
    });
  });

  if (joinNearestMeeting) {
    joinNearestMeeting.addEventListener("click", () => {
      openMeeting();
      render();
    });
  }

  if (openCommunicationFullscreen) {
    openCommunicationFullscreen.addEventListener("click", () => {
      state.communicationFullscreen = state.communicationTab || "dashboard";
      render();
    });
  }

  if (closeCommunicationFullscreen) {
    closeCommunicationFullscreen.addEventListener("click", () => {
      state.communicationFullscreen = null;
      render();
    });
  }

  if (closeFullscreenHuddle) {
    closeFullscreenHuddle.addEventListener("click", () => {
      closeMeeting();
      render();
    });
  }

  if (leaveFullscreenHuddle) {
    leaveFullscreenHuddle.addEventListener("click", () => {
      openMeetingDocument();
    });
  }

  if (fullscreenHuddleChatButton) {
    fullscreenHuddleChatButton.addEventListener("click", () => {
      state.meetingSideOpen = !state.meetingSideOpen;
      render();
    });
  }

  meetingSideTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.meetingSideOpen = true;
      state.meetingSideTab = button.dataset.meetingSideTab || "chat";
      render();
    });
  });

  if (fullscreenHuddleContextLink) {
    fullscreenHuddleContextLink.addEventListener("click", () => {
      closeMeeting();
      render();
    });
  }

  documentRailButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const requestedSection = button.dataset.documentSectionTarget || "outline";
      const shouldClose = state.taskOpen && state.detailKind === "document" && state.rightOpen && state.rightMode === "document" && state.documentSection === requestedSection;

      state.taskOpen = true;
      state.detailKind = "document";
      state.rightOpen = !shouldClose;
      state.rightMode = "document";
      state.documentSection = requestedSection;
      render();
    });
  });

  if (closeDocumentPanel) {
    closeDocumentPanel.addEventListener("click", () => {
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

  window.addEventListener("load", render);
})();
