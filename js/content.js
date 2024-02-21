let originalSerif, originalSansSerif, originalMonospace;
const changeFontFamily = (node, serif, sansSerif, monospace) => {
    if (node.nodeType === 1) {
        const computedStyle = window.getComputedStyle(node);
        const fontFamily = computedStyle.getPropertyValue("font-family");
        if (fontFamily) {
            if (fontFamily.includes("sans-serif")) {
                if (sansSerif != "Default") {
                    originalSansSerif = fontFamily;
                    node.style.fontFamily = `'${sansSerif}', ${originalSansSerif}`;
                } else {
                    node.style.fontFamily = `${originalSansSerif}`;
                }
            } else if (fontFamily.includes("serif")) {
                if (serif != "Default") {
                    originalSerif = fontFamily;
                    node.style.fontFamily = `'${serif}', ${originalSerif}`;
                } else {
                    node.style.fontFamily = `${originalSerif}`;
                }
            } else if (fontFamily.includes("monospace")) {
                if (monospace != "Default") {
                    originalMonospace = fontFamily;
                    node.style.fontFamily = `'${monospace}', ${originalMonospace}`;
                } else {
                    node.style.fontFamily = `${originalMonospace}`;
                }
            }
        }
    }
    // Recursively process child nodes
    for (const childNode of node.childNodes) {
        changeFontFamily(childNode, serif, sansSerif, monospace);
    }
};
let message = {
    action: "on-page-load",
    domain: window.location.hostname,
};
// Tries to load font when page is loaded
browser.runtime.sendMessage(message, undefined, (response) => {
    if (response.type === "apply_font") {
        console.log("Loading fonts from storage");
        const serif = response.data.serif;
        const sans_serif = response.data.sans_serif;
        const monospace = response.data.monospace;
        changeFontFamily(document.body, serif, sans_serif, monospace);
    } else if (response.type === "none") {
        console.log("Font not set for site");
    }
});
// Listens for the popup buttons
browser.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener((message) => {
        {
            if (message.type === "apply_font") {
                console.log("Request received from popup for applying fonts");
                const serif = message.data.serif;
                const sans_serif = message.data.sans_serif;
                const monospace = message.data.monospace;
                changeFontFamily(document.body, serif, sans_serif, monospace);
            } else if (message.type === "restore") {
                location.reload();
            } else if (message.type === "redirect") {
                window.open(message.data.redirect_url, "_blank");
            }
        }
    });
});
