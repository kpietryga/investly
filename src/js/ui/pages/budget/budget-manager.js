import BudgetItem from "../../../models/budget-item";
import { budgetService } from "../../../services/instances";
import { BudgetService } from "../../../services/budget-service";

/**
 * BudgetManager class handles the core functionality of managing budget items (incomes and outgoings).
 *
 * This class interacts with the `budgetService` to:
 * - Add, remove, and display budget items.
 * - Calculate and display the balance.
 * - Handle form submissions for incomes and outgoings.
 * - Save the budget state and clear data.
 */
export default class BudgetManager {
    constructor() {
        // Initialize references to DOM elements used for budget management
        this.incomesList = document.getElementById("incomes-list");
        this.formIncomes = document.getElementById("form-incomes");
        this.outgoingList = document.getElementById("outgoings-list");
        this.formOutgoing = document.getElementById("form-outgoings");
        this.balance = document.querySelector(".balance");
    }

    /**
     * Creates a new budget item (income or outgoing) in the DOM.
     * @param {string} idItem - Unique ID of the budget item.
     * @param {object} item - The budget item containing `name` and `value`.
     * @param {string} key - Specifies whether the item is an income or outgoing.
     */
    createItem(idItem, item, key) {
        const div = document.createElement("div");
        div.innerText = `${item.name}: ${item.value}`;
        div.className = `single-item shadow p-2 ${key}`;
        div.id = idItem;

        // Append to the appropriate list
        const list = key === "budget-incomes"
            ? document.getElementById("incomes-list")
            : document.getElementById("outgoings-list");
        list.appendChild(div);

        // Add delete button
        const button = document.createElement("button");
        button.innerText = "x";
        button.className = "button btn bg-color-2 text-light";
        button.onclick = () => this.deleteItem(idItem, key, list);
        div.appendChild(button);
    }

    /**
     * Deletes a budget item and updates the DOM.
     * @param {string} idItem - ID of the item to delete.
     * @param {string} key - Specifies whether the item is an income or outgoing.
     * @param {HTMLElement} list - The list DOM element to update.
     */
    deleteItem(idItem, key, list) {
        list.innerHTML = ""; // Clear the list
        if (key === "budget-incomes") {
            budgetService.removeIncome(idItem);
            this.initIncomes();
        } else {
            budgetService.removeOutgoing(idItem);
            this.initOutgoings();
        }
        this.countBalance();
        this.countItems();
    }

    /**
     * Initializes and displays the list of incomes.
     */
    initIncomes() {
        budgetService.getBudgetIncomes().forEach(item => {
            this.createItem(item.id, item, BudgetService.INCOMES);
        });
    }

    /**
     * Initializes and displays the list of outgoings.
     */
    initOutgoings() {
        budgetService.getBudgetOutgoings().forEach(item => {
            this.createItem(item.id, item, BudgetService.OUTGOINGS);
        });
    }

    /**
     * Updates and displays the total sums of incomes and outgoings.
     */
    countItems() {
        const sumIn = document.querySelector(".sum-in");
        const sumOut = document.querySelector(".sum-out");
        sumIn.innerText = budgetService.sumIncomes();
        sumOut.innerText = budgetService.sumOutgoings();
    }

    /**
     * Handles the submission of the income form.
     * Adds a new income item and updates the display.
     */
    submitIncome() {
        this.formIncomes.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("input-name-incomes").value;
            const value = Number(document.getElementById("input-value-incomes").value);
            budgetService.addIncome(new BudgetItem(name, value));
            this.incomesList.innerHTML = ""; // Clear list
            this.initIncomes();
            this.countItems();
            this.countBalance();
        });
    }

    /**
     * Handles the submission of the outgoing form.
     * Adds a new outgoing item and updates the display.
     */
    submitOutgoing() {
        this.formOutgoing.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("input-name-outgoings").value;
            const value = Number(document.getElementById("input-value-outgoings").value);
            budgetService.addOutgoing(new BudgetItem(name, value));
            this.outgoingList.innerHTML = ""; // Clear list
            this.initOutgoings();
            this.countItems();
            this.countBalance();
        });
    }

    /**
     * Calculates and updates the balance.
     * @returns {number} The current balance.
     */
    countBalance() {
        this.balance.innerText = budgetService.getBalace();
        return budgetService.getBalace();
    }

    /**
     * Saves the current budget balance to local storage.
     */
    aceptBudget() {
        localStorage.setItem("saves", this.countBalance().toString());
    }

    /**
     * Clears all budget data and resets the display.
     */
    clearBudget() {
        budgetService.clearData();
    }
}