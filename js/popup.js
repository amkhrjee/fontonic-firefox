// UI Elements
const applyButton = document.querySelector(".apply");
const supportPage = document.querySelector(".support-slide");
const mainPage = document.querySelector(".main");
const supportButton = document.querySelector(".support>button");
const supportButtonIcon = document.querySelector(".material-symbols-outlined");
const supportButtonText = document.querySelector(".support-btn-text");
const paymentButtons = document.querySelectorAll(".support-slide>button");
const control = document.querySelector(".control");
const serifPlaceholder = document.querySelector("#serif_placeholder");
const sansSerifPlaceholder = document.querySelector("#sans_serif_placeholder");
const monospacePlaceholder = document.querySelector("#monospace_placeholder");
const restoreButton = document.querySelector("#restore-btn");
const fontSelectionForm = document.forms["fonts"];
const serifSelect = fontSelectionForm.elements["serif"];
const sansSerifSelect = fontSelectionForm.elements["sans_serif"];
const monospaceSelect = fontSelectionForm.elements["monospace"];
// Show Support Page
let isSupportPageOpen = false;
supportButton.addEventListener("click", () => {
    if (!isSupportPageOpen) {
        supportButtonIcon.innerHTML = "arrow_back";
        supportButtonText.innerHTML = "Go Back";
        mainPage.style.opacity = "0";
        mainPage.style.visibility = "hidden";
        supportPage.style.display = "block";
        // This is to workaround the display: none animation limitation
        setTimeout(() => {
            supportPage.style.visibility = "visible";
            supportPage.style.transform = "translateX(0)";
            isSupportPageOpen = !isSupportPageOpen;
        }, 100);
    }
    else {
        supportButtonIcon.innerHTML = "favorite";
        supportButtonText.innerHTML = "Sponsor";
        supportPage.style.transform = "translateX(18rem)";
        setTimeout(() => {
            supportPage.style.visibility = "hidden";
            supportPage.style.display = "none";
            mainPage.style.visibility = "visible";
            mainPage.style.opacity = "1";
        }, 200);
        isSupportPageOpen = !isSupportPageOpen;
    }
});
