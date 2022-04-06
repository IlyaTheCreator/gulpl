import Modal from "../ui/Modal";
import SelectAPISourceForm from "../forms/SelectAPISourceForm";

const SelectAPISourceModal = () => {
  return (
    <Modal
      hasOverlay={true}
      overlayClassName="modal-overlay--select-api-source"
      modalClassName="select-api-source-modal"
    >
      <SelectAPISourceForm />
    </Modal>
  );
};

export default SelectAPISourceModal;
