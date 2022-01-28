import addWrapperClass from "./wrapperClassScript";
import LsManager from "./LsManager";

const settingsOverlay = document.getElementById("settings-overlay");
const settingsModal = document.getElementById("settings-modal");
const settingsToggleBtn = document.getElementById("settings-toggle-btn");
const settingsCard = document.getElementById("settings-card");
const cityContainer = document.getElementById("city-container");

const lsManager = new LsManager();

const settingsData = {
    minTemp: {
        text: "Min. Temp.",
        value: true
    },
    maxTemp: {
        text: "Max. Temp.",
        value: true
    },
    uvIndicator: {
        text: "Uv Indicator",
        value: true
    },
    feltTemp: {
        text: "Felt Temp",
        value: false
    },
    pressure: {
        text: "Pressure",
        value: false
    },
    airQuality: {
        text: "Air quality",
        value: false
    },
};

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
    for (let setting in LsManager.list()) {
        const cityItem = document.getElementById(`${setting}Widget`);

        const settingsItemData = lsManager.get(setting);

        if (!settingsItemData.value) {
            cityItem.classList.add("widget--hidden");
        } else {
            cityItem.classList.remove("widget--hidden");
        }
    }
};

const renderSettingsItems = () => {
    settingsCard.innerHTML = "";

    for (let setting in LsManager.list()) {
        const settingsItemData = lsManager.get(setting);
        const toggleValue = settingsItemData.value ? "on" : "off";

        const toggleSetting = () => {
            lsManager.set(setting, { ...settingsItemData, value: !settingsItemData.value});
            renderSettingsItems();
            renderCityData();
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
    lsManager.init("weather", settingsData);

    settingsToggleBtn && settingsToggleBtn.addEventListener("click", openSettingsModal);
    settingsOverlay && settingsOverlay.addEventListener("click", closeSettingsModal);

    settingsCard && renderSettingsItems();
    cityContainer && renderCityData();
    addWrapperClass();
};