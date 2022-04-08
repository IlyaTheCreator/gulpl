const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const capitalizeString = (str) => {
  return str
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
};

export default capitalizeString;
