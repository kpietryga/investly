/**
 * @module PlaningService
 * @description Service for managing investments, archives, and financial data storage.
 */
import date from 'date-and-time';

export default class PlaningService {
    /**
     * @constructor
     * @param {Object} investStorage - Storage handler for investment data.
     * @param {Object} metalsStorage - Storage handler for metal prices.
     * @param {Object} currencyStorage - Storage handler for currency exchange rates.
     * @param {Object} archiveStorage - Storage handler for archived investments.
     */
    constructor(investStorage, metalsStorage, currencyStorage, archiveStorage) {
        this.saves = localStorage.getItem("saves");
        this.investStorage = investStorage;
        this.metalsStorage = metalsStorage;
        this.currStorage = currencyStorage;
        this.archiveStorage = archiveStorage;
        console.log("to jest to ", currencyStorage);
    }

    /**
     * Retrieves the current saved amount from local storage.
     * @returns {string|null} The saved amount or null if not set.
     */
    getCurrentSaves() {
        return this.saves;
    }

    /**
     * Retrieves all investment records from the investment storage.
     * @returns {Array} An array of all investments.
     */
    getAllInvestments() {
        return this.investStorage.findAll();
    }

    /**
     * Retrieves all archived investments from the archive storage.
     * @returns {Array} An array of all archived investments.
     */
    getAllArchives() {
        return this.archiveStorage.findAll();
    }

    /**
     * Adds a new investment to the storage.
     * @param {number} [amount=0] - The amount invested.
     * @param {string} [name=""] - The name of the investment.
     * @param {string} [active="metals"] - The category of the investment (e.g., metals or currency).
     */
    addInvestment(amount = 0, name = "", active = "metals") {
        const investDate = new Date();
        const value = {
            name,
            date: date.format(investDate, 'DD/MM/YYYY'),
            amount,
            price: this.metalsStorage.findOne(name) || this.currStorage.findOne(name).mid,
            activeRadio: active,
        };

        this.investStorage.save(value);
    }

    /**
     * Retrieves a single investment from local storage by its key.
     * @param {Object} keyInvestment - An object representing the investment key.
     * @returns {string|null} The investment data or null if not found.
     */
    getSingleInvestment(keyInvestment) {
        console.log(localStorage.getItem(keyInvestment.value()));
        return localStorage.getItem(keyInvestment.value());
    }

    /**
     * Sells an investment and calculates the profit, updates the archive, and adjusts financial data.
     * @param {Object} investment - The investment to sell.
     */
    sellInvestment(investment) {
        let profit, currentPrice;

        if (investment.activeRadio === "metals") {
            profit = (
                (investment.amount / investment.price - investment.amount / this.metalsStorage.findOne(investment.name)) *
                this.metalsStorage.findOne(investment.name)
            ).toFixed(2);
            currentPrice = this.metalsStorage.findOne(investment.name);
        } else {
            profit = (
                (investment.amount / investment.price - investment.amount / this.currStorage.findOne(investment.name).mid) *
                this.currStorage.findOne(investment.name).mid
            ).toFixed(2);
            currentPrice = this.currStorage.findOne(investment.name).mid;
        }

        this.investStorage.remove(investment.id);
        investment.dateOfSell = date.format(new Date(), "DD/MM/YYYY");
        investment.profit = profit;
        investment.currentPrice = currentPrice;
        this.archiveStorage.save(investment);

        const updatedSaves = `${Number.parseFloat(localStorage.getItem("saves")) +
        Number.parseFloat(investment.amount) +
        Number.parseFloat(profit)}`;
        localStorage.setItem("saves", updatedSaves);

        const updatedProfit = `${Number.parseFloat(localStorage.getItem("current-profit") || "0") + Number.parseFloat(profit)}`;
        localStorage.setItem("current-profit", updatedProfit);
    }

    /**
     * Clears all archived investments from the archive storage.
     */
    clearArchive() {
        this.archiveStorage.clear();
    }
}
