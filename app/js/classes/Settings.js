export default class Settings {
    constructor() {
        this.app = null;
    }

    create() {
        const contentWrapper = document.createElement("div");

        contentWrapper.innerHTML = `
            <div class="modal-overlay modal-overlay--settings" id="settings-overlay"></div>
            <div class="modal" id="settings-modal">
                <div class="card settings" id="settings-card"></div>
            </div>
        `;

        this.app.rootElement.appendChild(contentWrapper);
        
        const lcData = this.app.lsManager.get(this.app.lcKey)

        Object.keys(lcData).forEach((key) => {
            const setting = lcData[key];
            const toggleValue = setting.isActive ? "on" : "off";

            const closeSettings = () => {
                this.app.closeSettings();
            };

            const toggleWidgetDisplay = (e) => {
                const newSettings = lcData;
                newSettings[key].isActive = !setting.isActive;
                
                this.app.lsManager.set(this.app.lcKey, newSettings);

                this.app.create();
                this.app.showSettings();
            };

            const settingItem = document.createElement("div");
            settingItem.classList.add("settings__item");
            
            settingItem.innerHTML = `
                <p class="settings__item-text">${setting.text}</p>
                <div 
                    id="setting-toggle-${key}"
                    class="settings__toggle-icon settings__toggle-icon--${toggleValue}"
                >
                    <i 
                        class="icon icon-toggle-${toggleValue}"
                    ></i>
                </div>
            `;

            document.getElementById("settings-card").appendChild(settingItem);
            document.getElementById(`setting-toggle-${key}`).addEventListener("click", toggleWidgetDisplay);
            document.getElementById("settings-overlay").addEventListener("click", closeSettings);
        });
    }
}; 