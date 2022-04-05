const simpleRound = (num) => {
  if (!num) {
    return false;
  }

  return Math.round(num * 10) / 10;
}

export default simpleRound;
