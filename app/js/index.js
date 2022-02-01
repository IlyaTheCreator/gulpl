import addWrapperClass from "./wrapperClassScript";
import LsManager from "./LsManager";

const settingsOverlay = document.getElementById("settings-overlay");
const settingsModal = document.getElementById("settings-modal");
const settingsToggleBtn = document.getElementById("settings-toggle-btn");
const settingsCard = document.getElementById("settings-card");
const cityContainer = document.getElementById("city-container");
const screen = document.querySelector(".screen");

const APP_KEY = "weather";
const lsManager = new LsManager();

const settingsData = {
    minTemp: {
        text: "Min. Temp.",
        isActive: true
    },
    maxTemp: {
        text: "Max. Temp.",
        isActive: true
    },
    uvIndicator: {
        text: "Uv Indicator",
        isActive: true
    },
    feltTemp: {
        text: "Felt Temp",
        isActive: false
    },
    pressure: {
        text: "Pressure",
        isActive: false
    },
    airQuality: {
        text: "Air quality",
        isActive: false
    },
};

const checkScreenWidth = () => {
    if (screen.scrollHeight > screen.clientHeight) {
        console.log(screen.offsetWidth)
        screen.classList.add("screen--wider");
    } else {
        screen.classList.remove("screen--wider");
    }
}

const openSettingsModal = () => {
    document.querySelector("body").style.overflow = "hidden";
    settingsOverlay.classList.add("modal-overlay--visible");
    settingsModal.classList.add("modal--visible");
};

const closeSettingsModal = () => {
    document.querySelector("body").style.overflow = "visible";
    settingsOverlay.classList.remove("modal-overlay--visible");
    settingsModal.classList.remove("modal--visible");
};

const renderCityData = () => {
    for (let setting in lsManager.get(APP_KEY)) {
        const cityItem = document.getElementById(`${setting}Widget`);
        const settingsItemData = lsManager.get(APP_KEY)[setting];

        if (!settingsItemData.isActive) {
            cityItem.classList.add("widget--hidden");
        } else {
            cityItem.classList.remove("widget--hidden");
        }
    }
};

const renderSettingsItems = () => {
    settingsCard.innerHTML = "";

    for (let setting in lsManager.get(APP_KEY)) {
        const settingsItemData = lsManager.get(APP_KEY)[setting];
        const toggleValue = settingsItemData.isActive ? "on" : "off";

        const toggleSetting = () => {
            const appData = lsManager.get(APP_KEY);

            appData[setting].isActive = !appData[setting].isActive;
            lsManager.set(APP_KEY, appData);

            renderSettingsItems();
            renderCityData();
            checkScreenWidth();
        };

        const settingsItemInnerHTML = `
            <p class="settings__item-text">${settingsItemData.text}</p>
            <div 
                class="settings__toggle-icon settings__toggle-icon--${toggleValue}"
            >
                <i 
                    class="icon icon-toggle-${toggleValue}"
                ></i>
            </div>
        `;

        const settingsItem = document.createElement("div");

        settingsItem.classList.add("settings__item");
        settingsItem.innerHTML = settingsItemInnerHTML;
        settingsItem.addEventListener("click", toggleSetting);

        settingsCard.appendChild(settingsItem);
    }
};

window.onload = () => {
    addWrapperClass();

    if (!lsManager.get(APP_KEY)) {
        lsManager.init(APP_KEY, settingsData);
    }

    settingsToggleBtn && settingsToggleBtn.addEventListener("click", openSettingsModal);
    settingsOverlay && settingsOverlay.addEventListener("click", closeSettingsModal);
    settingsCard && renderSettingsItems();
    cityContainer && renderCityData();
    cityContainer && checkScreenWidth();
};