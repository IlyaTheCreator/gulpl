export default class LsManager {
    constructor() {
        this.appKey = "";
    }

    init(appKey, data = {}) {  
        this.appKey = appKey;
        
        if (!localStorage.getItem(appKey)) {
            localStorage.setItem(appKey, JSON.stringify(data));
        }
    }

    get(key) {
        return JSON.parse(localStorage.getItem(this.appKey))[key];
    }

    set(key, value) {
        const newData = JSON.parse(localStorage.getItem(this.appKey));

        newData[key] = value;
        localStorage.setItem(this.appKey, JSON.stringify(newData));
    }

    delete(key) {
        const newData = JSON.parse(localStorage.getItem(this.appKey));

        delete newData[key];
        localStorage.setItem(this.appKey, JSON.stringify(newData));
    }

    clear() {
        localStorage.setItem(this.appKey, JSON.stringify({}));
    }

    static list() {
        const output = {};

        for (let jsonItem in localStorage) {
            if (jsonItem === "length") {
                break;
            }

            const item = JSON.parse(localStorage.getItem(jsonItem))

            for (let key in item) {
                output[key] = JSON.parse(localStorage.getItem(jsonItem))[key];
            }
        }

        return output;
    }

    static reset() {
        localStorage.clear();
    }
}