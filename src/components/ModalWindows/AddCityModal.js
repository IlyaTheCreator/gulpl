import Overlay from "../Layout/Overlay";
import AddCityForm from "../AddCityForm";

const AddCityModal = () => {
  return (
    <>
      <Overlay className="modal-overlay--add-city"/>
      <div className="modal add-city-modal">
        <AddCityForm />
      </div>
    </>
  );
};

export default AddCityModal;
