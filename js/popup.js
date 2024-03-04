// UI Elements
const applyButton = document.querySelector(".apply");
const supportPage = document.querySelector(".support-slide");
const mainPage = document.querySelector(".main");
const supportButton = document.querySelector(".support>button");
const supportButtonIcon = document.querySelector(".material-symbols-outlined");
const supportButtonText = document.querySelector(".support-btn-text");
const paymentButtons = document.querySelectorAll(".support-slide>button");
const control = document.querySelector(".control");
const restoreButton = document.querySelector("#restore-btn");
const fontSelectionForm = document.forms["fonts"];
const serifInput = fontSelectionForm.elements["serif"];
const sansSerifInput = fontSelectionForm.elements["sans_serif"];
const monospaceInput = fontSelectionForm.elements["monospace"];

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
fontSelectionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const serifValue = serifInput.value;
    const sansSerifValue = sansSerifInput.value;
    const monospaceValue = monospaceInput.value;
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
    // console.log("Hello from form");
    browser.tabs.query({ active: true, lastFocusedWindow: true }).then(
        (tabs) => {
            // console.log("Popup.js -- tabs data", tabs);
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
                // console.log(
                //     "Popup.js -- Saving font data into local Storage...",
                // );
                if (
                    serifValue.length ||
                    sansSerifValue.length ||
                    monospaceValue.length
                ) {
                    control.style.display = "block";
                    browser.storage.local
                        .set({ [domain]: fontData })
                        .then(() => {
                            console.log("Stored in local Storage!");
                        });
                }
            }
        },
        (error) => {
            console.error(error);
        },
    );
});

paymentButtons[0].addEventListener("click", () => {
    browser.tabs.query({ active: true, lastFocusedWindow: true }).then(
        (tabs) => {
            const port = browser.tabs.connect(tabs[0].id);
            port.postMessage({
                type: "redirect",
                data: {
                    redirect_url:
                        "https://paypal.me/amkhrjee?country.x=IN&locale.x=en_GB",
                },
            });
        },
        (error) => {
            console.error(error);
        },
    );
});
paymentButtons[1].addEventListener("click", () => {
    browser.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        const port = browser.tabs.connect(tabs[0].id);
        port.postMessage({
            type: "redirect",
            data: {
                redirect_url: "https://www.buymeacoffee.com/amkhrjee",
            },
        });
    });
});
paymentButtons[2].addEventListener("click", () => {
    browser.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        const port = browser.tabs.connect(tabs[0].id);
        port.postMessage({
            type: "redirect",
            data: {
                redirect_url: "https://github.com/amkhrjee/fontonic-firefox",
            },
        });
    });
});
paymentButtons[3].addEventListener("click", () => {
    browser.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        const port = browser.tabs.connect(tabs[0].id);
        port.postMessage({
            type: "redirect",
            data: {
                redirect_url: "https://linktr.ee/amkhrjee",
            },
        });
    });
});

const updatePlaceholders = (value) => {
    // Placeholder value
    serifInput.placeholder = value.serif;
    sansSerifInput.placeholder = value.sans_serif;
    monospaceInput.placeholder = value.monospace;
};
// Populating placeholder values
browser.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    tab_id = tabs[0].id;
    const domain = new URL(tabs[0].url).hostname;
    // console.log("From the popup: ", domain);
    browser.storage.local.get([domain]).then((result) => {
        const fontData = result[domain];
        // console.log(fontData);
        if (fontData) {
            updatePlaceholders(fontData);
            control.style.display = "block";
        }
    });
});
restoreButton.addEventListener("click", async () => {
    // Restoring the original fonts
    let [tab] = await browser.tabs.query({
        active: true,
        lastFocusedWindow: true,
    });
    if (tab) {
        let message = {
            type: "restore",
        };
        const port = browser.tabs.connect(tab.id);
        port.postMessage(message);
        // Delete the font from local Storage
        const domain = new URL(tab.url).hostname;
        browser.storage.local.remove(domain, () => {
            // console.log("Successfully removed entries for domain: ");
        });
        // Hide the Pause and Restore Buttons
        control.style.display = "none";
        // Revert the placeholders to default
        updatePlaceholders({
            serif: "Default",
            sans_serif: "Default",
            monospace: "Default",
        });
    }
});
