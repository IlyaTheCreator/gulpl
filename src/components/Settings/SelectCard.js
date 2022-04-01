const SelectCard = ({ title, options }) => {
  return (
    <div className="card settings card-select">
      <h3>{title}</h3>
      <select>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.text}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectCard;
