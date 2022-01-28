import addWrapperClass from "./wrapperClassScript";
import LsManager from "./LsManager";

const settingsOverlay = document.getElementById("settings-overlay");
const settingsModal = document.getElementById("settings-modal");
const settingsToggleBtn = document.getElementById("settings-toggle-btn");

const openSettingsModal = () => {
    settingsOverlay.classList.add("modal-overlay--visible");
    settingsModal.classList.add("modal--visible");
};

const closeSettingsModal = () => {
    settingsOverlay.classList.remove("modal-overlay--visible");
    settingsModal.classList.remove("modal--visible");
};

settingsToggleBtn.addEventListener("click", openSettingsModal);
settingsOverlay.addEventListener("click", closeSettingsModal);




// Adding css class to screen-wrapper based on device operating system and width
addWrapperClass();

// Working with localStorage 
// const lsManager = new LsManager();

// lsManager.init("weather", {
//     keyFirst: false,
//     keySecond: false,
//     keyThird: false,
//     keyFourth: false
// });

// lsManager.set("keyFirst", "valueFirst");
// lsManager.set("keySecond", "valueSecond");
// lsManager.set("keyThird", "valueThird");
// lsManager.set("keyFourth", "valueFourth");

// lsManager.delete("keySecond");
// // alert(lsManager.get("keySecond"));

// console.log(LsManager.list());
// // lsManager.clear();

// // LsManager.reset();