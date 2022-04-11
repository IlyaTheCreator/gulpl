import { useState, useEffect, useRef } from "react";

const Selector = ({ data, currentIndex = 0, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(data[currentIndex]);
  const selectRef = useRef();

  useEffect(() => {
    const listener = document.addEventListener("click", (e) => {
      if (!e.target.contains(selectRef.current)) {
        return;
      }

      setIsOpen(false);
    });

    return () => {
      document.removeEventListener("click", listener);
    };
  }, []);

  const currentClickHandler = () => {
    setIsOpen(true);
  };

  const valueClickHandler = (value) => {
    setIsOpen(false);
    setCurrent(data.find((option) => option.value === value));
    onChange(value);
  };

  const options = (
    <div className="custom-selector__options">
      {data.map((option) => (
        <div
          onClick={() => valueClickHandler(option.value)}
          className="custom-selector__option"
          key={option.value}
        >
          {option.text}
        </div>
      ))}
    </div>
  );

  return (
    <div className="custom-selector" ref={selectRef}>
      <div
        className="custom-seletor__current-value"
        onClick={currentClickHandler}
      >
        {current.text}
      </div>
      {isOpen && options}
    </div>
  );
};

export default Selector;
