/**
 * Represents a single budget item with a name and a monetary value.
 */
export default class BudgetItem {
    /**
     * Creates an instance of BudgetItem.
     * @param {string} name - The name of the budget item.
     * @param {number} value - The monetary value of the budget item.
     */
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }

    /**
     * Returns a string representation of the budget item.
     * @returns {string} The name and value of the budget item in the format "name: value".
     */
    display() {
        return `${this.name}: ${this.value}`;
    }
}