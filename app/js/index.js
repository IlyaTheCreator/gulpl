console.log("hello");
console.log("I am working!");

const dummyFunc = () => {
  const a = 2;
  const b = 43;

  return a + b;
};

const list = [1, 2, 3, 4, 5];
const newList = [...list, 6, 7];

const obj = {
  key1: 333,
  key2: 23,
};

const newObj = { ...obj, name: "what?" };
