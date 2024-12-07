/**
 * Service class for managing budget data, including incomes and outgoings.
 */
export class BudgetService {

    static INCOMES = "budget-incomes";
    static OUTGOINGS = "budget-outgoings";

    /**
     * @param {StorageService} incomesStorage - Storage service for incomes.
     * @param {StorageService} outgoingStorage - Storage service for outgoings.
     */
    constructor(incomesStorage, outgoingStorage) {
        this.incomesStorage = incomesStorage; // new StorageService(BudgetService.INCOMES)
        this.outgoingsStorage = outgoingStorage; // new StorageService(BudgetService.OUTGOINGS)
    }

    /**
     * Retrieves all income items.
     * @returns {Array<Object>} List of income items.
     */
    getBudgetIncomes() {
        return this.incomesStorage.findAll();
    }

    /**
     * Retrieves all outgoing items.
     * @returns {Array<Object>} List of outgoing items.
     */
    getBudgetOutgoings() {
        return this.outgoingsStorage.findAll();
    }

    /**
     * Adds a new income item.
     * @param {Object} item - The income item to add.
     */
    addIncome(item) {
        this.incomesStorage.save(item);
    }

    /**
     * Adds a new outgoing item.
     * @param {Object} item - The outgoing item to add.
     */
    addOutgoing(item) {
        this.outgoingsStorage.save(item);
    }

    /**
     * Removes an income item by ID.
     * @param {number|string} id - The ID of the income item to remove.
     */
    removeIncome(id) {
        this.incomesStorage.remove(id);
    }

    /**
     * Removes an outgoing item by ID.
     * @param {number|string} id - The ID of the outgoing item to remove.
     */
    removeOutgoing(id) {
        this.outgoingsStorage.remove(id);
    }

    /**
     * Calculates the total value of all incomes.
     * @returns {number} Total sum of incomes.
     */
    sumIncomes() {
        return this.#sumItems(this.getBudgetIncomes());
    }

    /**
     * Calculates the total value of all outgoings.
     * @returns {number} Total sum of outgoings.
     */
    sumOutgoings() {
        return this.#sumItems(this.getBudgetOutgoings());
    }

    /**
     * Private method to calculate the sum of values from a list of items.
     * @param {Array<Object>} items - List of items to sum.
     * @returns {number} Sum of item values.
     */
    #sumItems(items) {
        return items.reduce((acc, curr) => {
            acc += curr.value;
            return acc;
        }, 0);
    }

    /**
     * Calculates the current balance (incomes - outgoings).
     * @returns {string} Current balance, formatted to 2 decimal places.
     */
    getBalace() {
        return (this.sumIncomes() - this.sumOutgoings()).toFixed(2);
    }

    /**
     * Clears all budget data from localStorage.
     */
    clearData() {
        localStorage.setItem("budget-incomes", "[]");
        localStorage.setItem("budget-outgoings", "[]");
    }
}
