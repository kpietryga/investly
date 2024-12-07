/**
 * CurrCalculatorService provides methods for converting values between PLN (Polish Zloty)
 * and foreign currencies using specified exchange rates.
 */
export default class CurrCalculatorService {

    /**
     * Converts a value in PLN to a foreign currency.
     * @param {number} value - The amount in PLN to be converted.
     * @param {number} currency - The exchange rate of the foreign currency (units per 1 PLN).
     * @returns {string} - The equivalent value in the foreign currency, rounded to 2 decimal places.
     */
    plnToForeign(value, currency) {
        return (value / currency).toFixed(2);
    }

    /**
     * Converts a value in a foreign currency to PLN.
     * @param {number} value - The amount in the foreign currency to be converted.
     * @param {number} currency - The exchange rate of the foreign currency (units per 1 PLN).
     * @returns {string} - The equivalent value in PLN, rounded to 2 decimal places.
     */
    foreignToPln(value, currency) {
        return (value * currency).toFixed(2);
    }
}