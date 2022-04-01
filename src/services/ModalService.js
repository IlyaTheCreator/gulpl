import React from "react";

import Modal from "../components/Modal";
import { modalTypes } from "../constants";

class ModalService {
  constructor() {
    this.availableModalTypes = Object.values(modalTypes);
    this.registeredModals = [];
  }

  createModal(modalType, modalContentCreateMethod, classes, id) {
    const availableModal = this.checkAvailableModal(modalType);

    if (!availableModal) {
      console.warn(`There is no available modal of type ${modalType}`);
      return React.createElement("div");
    }

    let registeredModal = this.checkRegisteredModal(modalType);

    if (!registeredModal) {
      this.registeredModals.push(
        <Modal
          modalType={modalType}
          modalContentCreateMethod={modalContentCreateMethod}
          classes={classes}
          id={id}
        />
      );

      registeredModal = this.registeredModals[this.registeredModals.length - 1];
    }

    // in case modal already exists
    registeredModal.modalContentCreateMethod = modalContentCreateMethod;

    return registeredModal.create();
  }

  checkAvailableModal(modalType) {
    return this.availableModalTypes.find((type) => type === modalType);
  }

  checkRegisteredModal(modalType) {
    return this.registeredModals.find((modal) => modal.modalType === modalType);
  }
}

export default ModalService;
