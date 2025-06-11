function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

function openPop() {
    const popDialog = document.getElementById("popupDialog");
            popDialog.style.visibility = popDialog.style.visibility === "visible"? "hidden": "visible";
}
