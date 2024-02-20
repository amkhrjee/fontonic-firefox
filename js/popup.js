// WARNING: TSC generated stuff don't touch
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next(),
            );
        });
    };

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
    } else {
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

// Handing main form
fontSelectionForm.addEventListener("submit", (e) =>
    __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const serifValue = serifSelect.value;
        const sansSerifValue = sansSerifSelect.value;
        const monospaceValue = monospaceSelect.value;
        if (
            !serifValue.length &&
            !sansSerifValue.length &&
            !monospaceValue.length
        ) {
            applyButton.innerHTML = "No Changes Made";
            applyButton.style.color = "#ffb6ad";
            setTimeout(() => {
                applyButton.innerHTML = "Apply Selection";
                applyButton.style.color = "#bccbaf";
            }, 1000);
        } else {
            applyButton.innerHTML = "✔ Applied";
            setTimeout(() => {
                applyButton.innerHTML = "Apply Selection";
            }, 2000);
        }
        console.log("MonoSpace Value", monospaceValue);
        browser.tabs.query(
            { active: true, lastFocusedWindow: true },
            (tabs) => {
                console.log("Popup.js -- tabs data", tabs);
                if (tabs) {
                    let message = {
                        type: "apply_font",
                        data: {
                            serif: serifValue.length ? serifValue : "Default",
                            sans_serif: sansSerifValue.length
                                ? sansSerifValue
                                : "Default",
                            monospace: monospaceValue.length
                                ? monospaceValue
                                : "Default",
                        },
                    };
                    const port = browser.tabs.connect(tabs[0].id);
                    port.postMessage(message);
                    // Saving in the local Storage
                    const domain = new URL(tabs[0].url).hostname;
                    const fontData = {
                        serif: message.data.serif,
                        sans_serif: message.data.sans_serif,
                        monospace: message.data.monospace,
                    };
                    console.log(
                        "Popup.js -- Saving font data into local Storage...",
                    );
                    if (
                        serifValue.length ||
                        sansSerifValue.length ||
                        monospaceValue.length
                    ) {
                        control.style.display = "flex";
                        browser.storage.local
                            .set({ [domain]: fontData })
                            .then(() => {
                                console.log("Stored in local Storage!");
                            });
                    }
                }
            },
        );
    }),
);

paymentButtons[0].addEventListener("click", () => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        const port = chrome.tabs.connect(tabs[0].id);
        port.postMessage({
            type: "redirect",
            data: {
                redirect_url:
                    "https://paypal.me/amkhrjee?country.x=IN&locale.x=en_GB",
            },
        });
    });
});
paymentButtons[1].addEventListener("click", () => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        const port = chrome.tabs.connect(tabs[0].id);
        port.postMessage({
            type: "redirect",
            data: {
                redirect_url: "https://www.buymeacoffee.com/amkhrjee",
            },
        });
    });
});
paymentButtons[2].addEventListener("click", () => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        const port = chrome.tabs.connect(tabs[0].id);
        port.postMessage({
            type: "redirect",
            data: {
                redirect_url: "https://twitter.com/amkhrjee",
            },
        });
    });
});
paymentButtons[3].addEventListener("click", () => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        const port = chrome.tabs.connect(tabs[0].id);
        port.postMessage({
            type: "redirect",
            data: {
                redirect_url: "https://linktr.ee/amkhrjee",
            },
        });
    });
});
