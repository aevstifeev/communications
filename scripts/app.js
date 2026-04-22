const workspace = document.querySelector(".workspace");
const workspaceBody = document.querySelector(".workspace-body");
const leftPanel = document.getElementById("leftPanel");
const rightPanel = document.getElementById("rightPanel");
const taskDetail = document.getElementById("taskDetail");

const leftPanelTitle = document.getElementById("leftPanelTitle");
const leftModeButtons = document.querySelectorAll("[data-left-mode]");
const leftModePanels = document.querySelectorAll("[data-panel-mode]");

const toggleLeftPanel = document.getElementById("toggleLeftPanel");
const collapseLeftPanel = document.getElementById("collapseLeftPanel");
const peekLeftPanel = document.getElementById("peekLeftPanel");

const toggleRightPanel = document.getElementById("toggleRightPanel");
const collapseRightPanel = document.getElementById("collapseRightPanel");
const activateUsersPanel = document.getElementById("activateUsersPanel");
const rightPanelToolbarHead = document.getElementById("rightPanelToolbarHead");
const toolbarCloseRightPanel = document.getElementById("toolbarCloseRightPanel");

const openTaskCard = document.getElementById("openTaskCard");
const closeTaskDetail = document.getElementById("closeTaskDetail");
const closeTaskDetailButtons = document.querySelectorAll("[data-close-task-detail]");

const leftModeTitles = {
  personal: "Личное",
  favorites: "Избранное (11)",
  tree: "Дерево",
};

function syncLayoutState() {
  const leftOpen = !leftPanel.hidden;
  const rightOpen = !rightPanel.hidden;

  workspaceBody.classList.toggle("left-open", leftOpen);
  workspaceBody.classList.toggle("right-open", rightOpen);

  if (workspace) {
    workspace.classList.toggle("left-open", leftOpen);
    workspace.classList.toggle("right-open", rightOpen);
  }
}

function setLeftPanel(open) {
  leftPanel.hidden = !open;
  syncLayoutState();
}

function setRightPanel(open) {
  rightPanel.hidden = !open;
  if (rightPanelToolbarHead) {
    rightPanelToolbarHead.hidden = !open;
  }
  if (activateUsersPanel) {
    activateUsersPanel.classList.toggle("is-active", open);
  }
  syncLayoutState();
}

function setTaskDetail(open) {
  taskDetail.classList.toggle("is-open", open);
}

function setLeftMode(mode) {
  leftModeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.leftMode === mode);
  });

  leftModePanels.forEach((panel) => {
    panel.hidden = panel.dataset.panelMode !== mode;
  });

  const title = leftModeTitles[mode] || "Дерево";
  leftPanelTitle.textContent = title;
  if (toggleLeftPanel) {
    toggleLeftPanel.textContent = title;
  }
}

if (toggleLeftPanel) {
  toggleLeftPanel.addEventListener("click", () => {
    setLeftPanel(leftPanel.hidden);
  });
}

if (collapseLeftPanel) {
  collapseLeftPanel.addEventListener("click", () => {
    setLeftPanel(false);
  });
}

if (peekLeftPanel) {
  peekLeftPanel.addEventListener("click", () => {
    setLeftPanel(false);
  });
}

if (toggleRightPanel) {
  toggleRightPanel.addEventListener("click", () => {
    setRightPanel(rightPanel.hidden);
  });
}

if (collapseRightPanel) {
  collapseRightPanel.addEventListener("click", () => {
    setRightPanel(false);
  });
}

if (toolbarCloseRightPanel) {
  toolbarCloseRightPanel.addEventListener("click", () => {
    setRightPanel(false);
  });
}

if (activateUsersPanel) {
  activateUsersPanel.addEventListener("click", () => {
    const isPanelOpen = !rightPanel.hidden;
    const isSameMode = activateUsersPanel.classList.contains("is-active");

    if (isSameMode && isPanelOpen) {
      setRightPanel(false);
      return;
    }

    setRightPanel(true);
  });
}

leftModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const clickedMode = button.dataset.leftMode;
    const isSameMode = button.classList.contains("is-active");
    const isPanelOpen = !leftPanel.hidden;

    if (isSameMode && isPanelOpen) {
      setLeftPanel(false);
      return;
    }

    setLeftMode(clickedMode);
    setLeftPanel(true);
  });
});

if (openTaskCard) {
  openTaskCard.addEventListener("click", () => {
    setTaskDetail(true);
  });
}

if (closeTaskDetail) {
  closeTaskDetail.addEventListener("click", () => {
    setTaskDetail(false);
  });
}

closeTaskDetailButtons.forEach((button) => {
  if (button !== closeTaskDetail) {
    button.addEventListener("click", () => {
      setTaskDetail(false);
    });
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setTaskDetail(false);
  }
});

setLeftMode("tree");
setLeftPanel(false);
setRightPanel(false);
setTaskDetail(false);
