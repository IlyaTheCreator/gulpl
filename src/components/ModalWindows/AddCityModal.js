import Modal from "../ui/Modal";
import AddCityForm from "../AddCityForm";

const AddCityModal = () => {
  return (
    <Modal
      hasOverlay={true}
      overlayClassName="modal-overlay--add-city"
      modalClassName="add-city-modal"
    >
      <AddCityForm />
    </Modal>
  );
};

export default AddCityModal;
