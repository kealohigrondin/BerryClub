import { UNITS } from "./CONSTANTS";
/**
 *  converts a quantity to g/ml based on the input unit
 * @param {number} quantity
 * @param {string} unit
 * @returns the given quantity converted to either g or ml
 */
export function convert(quantity: number, unit: string): number {
  const conversionRate = UNITS.find(
    ({ label }) => label.toUpperCase() === unit.toUpperCase()
  )?.conversionRate;
  return conversionRate ? Number((quantity * conversionRate).toFixed(4)) : 0;
}