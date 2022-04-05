import { useDispatch } from "react-redux";
import { openAddCity } from "../../store/ui";

const AddCityBtn = ({ belongsToNoCitiesBlock }) => {
  const dispatch = useDispatch();
  
  const clickHandle = () => {
    dispatch(openAddCity());
  }

  return (
    <button onClick={clickHandle} className="btn widget screen__add-btn">
      <i className="icon-figma-plus" />
    </button>
  );
};

export default AddCityBtn;
