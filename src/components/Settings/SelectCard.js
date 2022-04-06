const SelectCard = ({ title, options, type, onChange, initialValue }) => {
  return (
    <div className="card settings card-select">
      <h3>{title}</h3>
      <select onChange={(e) => onChange(e, type)} value={initialValue}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCard;
