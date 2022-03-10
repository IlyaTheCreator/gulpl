/**
 * simple number rounding by 1 decimal point after a comma
 * @param {number} num 
 * @returns {number}
 */
export default function(num) {
    return Math.round(num * 10) / 10;
}