export default class Settings {
  createContentWrapper() {
    const contentWrapper = document.createElement("div");

    contentWrapper.innerHTML = `
            <div class="modal-overlay modal-overlay--settings" id="settings-overlay"></div>
            <div class="modal" id="settings-modal">
                <div class="card settings" id="settings-card"></div>
            </div>
        `;

    return contentWrapper;
  }

  createSettingItem(setting, key) {
    const toggleValue = setting.isActive ? "on" : "off";
    const settingItem = document.createElement("div");

    settingItem.classList.add("settings__item");

    settingItem.innerHTML = `
                <p class="settings__item-text">${setting.text}</p>
                <div 
                    class="settings__toggle-icon settings__toggle-icon--${toggleValue}"
                >
                    <i 
                        id="setting-toggle-${key}"
                        class="icon icon-toggle-${toggleValue}"
                    ></i>
                </div>
            `;

    return settingItem;
  }

  createSettings(lcData) {
    return Object.keys(lcData).map((key) => {
      const setting = lcData[key];

      return this.createSettingItem(setting, key);
    });
  }
}
