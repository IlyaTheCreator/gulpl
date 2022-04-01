import { useDispatch } from "react-redux";
import { toggleAddCity } from "../../store/ui";

const AddCityBtn = () => {
  const dispatch = useDispatch();
  
  const clickHandle = () => {
    console.log("hello")
    dispatch(toggleAddCity());
  }

  return (
    <button onClick={clickHandle} className="btn widget screen__add-btn">
      <i className="icon-figma-plus" />
    </button>
  );
};

export default AddCityBtn;
