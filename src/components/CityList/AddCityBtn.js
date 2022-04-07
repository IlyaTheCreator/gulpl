import { appActionTypes } from "../../appStateManager";

const AddCityBtn = ({ appDispatch }) => {
  const clickHandle = () => {
    appDispatch({ type: appActionTypes.OPEN_ADD_CITY });
  };

  return (
    <button onClick={clickHandle} className="btn widget screen__add-btn">
      <i className="icon-figma-plus" />
    </button>
  );
};

export default AddCityBtn;
