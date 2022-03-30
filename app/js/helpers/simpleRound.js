/**
 * simple number rounding by 1 decimal point after a comma
 * @param {number} num
 * @returns {number}
 */
export default function (num) {
  if (!num) return false;

  return Math.round(num * 10) / 10;
}
