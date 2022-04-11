const simpleRound = (num) => {
  if (typeof num !== "number") {
    return false;
  }

  return Math.round(num * 10) / 10;
}

export default simpleRound;
