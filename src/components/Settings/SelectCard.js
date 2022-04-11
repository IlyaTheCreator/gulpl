import Selector from "../ui/Selector";

const SelectCard = ({ title, options, type, onChange, initialValue }) => {
  return (
    <div className="card settings card-select">
      <h3>{title}</h3>
      <Selector
        data={options}
        currentIndex={options.findIndex(
          (option) => option.value === initialValue
        )}
        onChange={(value) => onChange(type, value)}
      />
    </div>
  );
};

export default SelectCard;
