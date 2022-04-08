const AddCityBtn = ({ onClick }) => {
  return (
    <button onClick={onClick} className="btn widget screen__add-btn">
      <i className="icon-figma-plus" />
    </button>
  );
};

export default AddCityBtn;
