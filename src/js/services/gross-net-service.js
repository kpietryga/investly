/**
 * GrossNetService provides utility methods for calculating values related to
 * gross and net prices, including VAT (Value Added Tax) calculations.
 */
export default class GrossNetService {

    /**
     * Converts a gross value to its net equivalent.
     * @param {number} value - The gross value.
     * @param {number} vat - The VAT percentage rate.
     * @returns {string} - The net value, rounded to 2 decimal places.
     */
    grossToNet(value, vat) {
        return (value / (1 + vat / 100)).toFixed(2);
    }

    /**
     * Converts a net value to its gross equivalent.
     * @param {number} value - The net value.
     * @param {number} vat - The VAT percentage rate.
     * @returns {string} - The gross value, rounded to 2 decimal places.
     */
    netToGross(value, vat) {
        return (value * (1 + vat / 100)).toFixed(2);
    }

    /**
     * Calculates the VAT amount from a net value.
     * @param {number} value - The net value.
     * @param {number} vat - The VAT percentage rate.
     * @returns {number} - The VAT amount.
     */
    countVatNetToGross(value, vat) {
        return value * vat / 100;
    }

    /**
     * Calculates the VAT amount from a gross value.
     * @param {number} value - The gross value.
     * @param {number} vat - The VAT percentage rate.
     * @returns {string} - The VAT amount, rounded to 2 decimal places.
     */
    countVatGrossToNet(value, vat) {
        return (value - this.grossToNet(value, vat)).toFixed(2);
    }
}