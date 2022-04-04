export default function (num) {
  if (!num) {
    return false;
  }

  return Math.round(num * 10) / 10;
}
