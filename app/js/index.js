import addWrapperClass from "./wrapperClassScript";
import LsManager from "./LsManager";

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