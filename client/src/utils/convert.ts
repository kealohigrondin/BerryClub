import { UNITS } from "./CONSTANTS";
/**
 *  converts a quantity to g/ml based on the input unit
 * @param {Number} quantity
 * @param {String} inUnit
 * @param {String} outUnit
 * @returns the given quantity converted to either g or ml
 */
export function convert(quantity, unit) {
  const conversionRate = UNITS.find(
    ({ label }) => label.toUpperCase() === unit.toUpperCase()
  ).conversionRate;
  return Number((quantity * conversionRate).toFixed(4));
}