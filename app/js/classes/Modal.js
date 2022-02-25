/**
 * @namespace entities 
 */

/**
 * A class for managing modals 
 * @memberof entities
 */
export default class Modal {
    constructor(modalType, modalContentCreateMethod, classes, id) {
        /**
         * @property {String} modalType type of a modal (must match those in ModalService)   
         */
        this.modalType = modalType;
        /**
         * @property {Function} modalContentCreateMethod function for creating modal's content
         * @returns {Array<Object>}
         * It returns an array for convinience
         */
        this.modalContentCreateMethod = modalContentCreateMethod;
        /**
         * @property {Array<String>} classes additional classes for model's content
         */
        this.classes = classes;
        /**
         * @property {String} id id for modal
         */
        this.id = id;
    }

    /**
     * @property {Function} create creating a modal
     * @returns {Object}
     */
    create() {
        const modal = document.createElement("div");

        modal.classList.add("modal");
        modal.id = this.id;
        this.classes.forEach((className) => this.content.classList.add(className));
        this.modalContentCreateMethod().forEach((child) => modal.appendChild(child));

        return modal;
    }
};