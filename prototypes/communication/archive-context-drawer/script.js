document.documentElement.dataset.prototype = "variant-context-drawer";

const drawer = document.getElementById("contextDrawer");
const openDrawerButton = document.getElementById("openDrawerButton");
const openDrawerAction = document.getElementById("openDrawerAction");
const closeDrawerButton = document.getElementById("closeDrawerButton");

function setDrawerOpen(open) {
  if (!drawer) {
    return;
  }
  drawer.classList.toggle("is-open", open);
}

if (openDrawerButton) {
  openDrawerButton.addEventListener("click", () => {
    setDrawerOpen(true);
  });
}

if (openDrawerAction) {
  openDrawerAction.addEventListener("click", () => {
    setDrawerOpen(true);
  });
}

if (closeDrawerButton) {
  closeDrawerButton.addEventListener("click", () => {
    setDrawerOpen(false);
  });
}
