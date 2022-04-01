const AddCityForm = () => {
  return (
    <div className="card add-city">
      <form className="add-city-form">
        <div className="input-wrapper">
          <input type="text" placeholder="Enter City Name..." />
          <div className="icon-wrapper">
            <i className="icon-map" />
          </div>
        </div>
        <button className="btn">Add</button>
        <button className="close-add-city-btn">Cancel</button>
      </form>
    </div>
  );
};

export default AddCityForm;
