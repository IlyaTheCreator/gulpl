import Modal from "../ui/Modal";
import SelectAPISourceForm from "../forms/SelectAPISourceForm";

const SelectAPISourceModal = ({ zIndex, appDispatch }) => {
  return (
    <Modal
      zIndex={zIndex}
      hasOverlay={true}
      overlayClassName="modal-overlay--select-api-source"
      modalClassName="select-api-source-modal"
    >
      <SelectAPISourceForm appDispatch={appDispatch} />
    </Modal>
  );
};

export default SelectAPISourceModal;
