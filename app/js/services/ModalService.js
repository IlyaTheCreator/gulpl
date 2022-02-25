/**
 * @namespace services 
 */

import Modal from "../classes/Modal";

/**
 * A class for managing modal windows 
 * @memberof services
 */
export default class ModalService {
    constructor() {
        /**
         * @property {Array<String>} availableModalTypes these types match element's ids in the dom
         */
        this.availableModalTypes = ["city-list", "settings"];
        /**
         * @property {Array<Object>} registeredModals registered modals
         */
        this.registeredModals = [];
    }

    /**
     * You can find arguments' description in Modal class properties
     * @property {Function} createModal 
     * @returns {Object}
     */
    createModal(modalType, modalContentCreateMethod, classes, id) {
        const availableModal = this.checkAvailableModal(modalType);

        if (!availableModal) {
            console.warn(`There is no available modal of type ${modalType}`);
            return document.createElement("div");
        } 

        let registeredModal = this.checkRegisteredModal(modalType);

        if (!registeredModal) {
            this.registeredModals.push(
                new Modal(modalType, modalContentCreateMethod, classes, id)
            );

            registeredModal = this.registeredModals[this.registeredModals.length - 1];
        }

        return registeredModal.create();
    }

    /**
     * @property {Function} checkAvailableModal
     */
    checkAvailableModal(modalType) {
        return this.availableModalTypes.find((type) => type === modalType);
    }

    /**
     * @property {Function} checkRegisteredModal
     */
    checkRegisteredModal(modalType) {
        return this.registeredModals.find((modal) => modal.modalType === modalType);
    }
};