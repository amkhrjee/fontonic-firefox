// UI Elements
const applyButton = document.querySelector(".apply") as HTMLButtonElement;
const supportPage = document.querySelector(".support-slide") as HTMLDivElement;
const mainPage = document.querySelector(".main") as HTMLDivElement;
const supportButton = document.querySelector(
    ".support>button",
) as HTMLButtonElement;
const supportButtonIcon = document.querySelector(".material-symbols-outlined");
const supportButtonText = document.querySelector(
    ".support-btn-text",
) as HTMLSpanElement;
const paymentButtons = document.querySelectorAll(
    ".support-slide>button",
) as NodeListOf<HTMLButtonElement>;
const control = document.querySelector(".control") as HTMLDivElement;
const serifPlaceholder = document.querySelector(
    "#serif_placeholder",
) as HTMLOptionElement;
const sansSerifPlaceholder = document.querySelector(
    "#sans_serif_placeholder",
) as HTMLOptionElement;
const monospacePlaceholder = document.querySelector(
    "#monospace_placeholder",
) as HTMLOptionElement;
const restoreButton = document.querySelector(
    "#restore-btn",
) as HTMLButtonElement;
const fontSelectionForm = document.forms["fonts"] as HTMLFormElement;
const serifSelect = fontSelectionForm.elements["serif"] as HTMLSelectElement;
const sansSerifSelect = fontSelectionForm.elements[
    "sans_serif"
] as HTMLSelectElement;
const monospaceSelect = fontSelectionForm.elements[
    "monospace"
] as HTMLSelectElement;

// Show Support Page
let isSupportPageOpen = false;
supportButton.addEventListener("click", () => {
    if (!isSupportPageOpen) {
        supportButtonIcon!.innerHTML = "arrow_back";
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
    } else {
        supportButtonIcon!.innerHTML = "favorite";
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
