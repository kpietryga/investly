import createCurrencyChart from "../../components/chart";
import { fillCurrencyData } from "../../components/main-currencies";
import BudgetManager from "../budget/budget-manager";
import BugetSumary from "../budget/buget-sumary";
import { createCurrentGoldPrice } from "../../components/current-gold";
import { basicComponents } from "../../../services/instances";

/**
 * Initializes the home page for the budget and currency management dashboard,
 * including the display of current gold prices, main currency statistics,
 * chart statistics, and budget summary and management.
 *
 * @async
 * @function createHome
 */
export const createHome = async () => {

    // Create header for the central management area
    basicComponents.createH1("Centrum zarządania", "mainArea");
    basicComponents.addIconToHeading("fas fa-home color-2");

    // Get balance from localStorage and display a warning if balance is less than or equal to 0
    const balance = localStorage.getItem("balance");
    if (balance <= 0) {
        basicComponents.createP(`Kwota w twoim budżecie wynosi ${balance} dodaj przechody aby móc zainwetować. To powiadomienie zniknie po okresleniu bużetu.`, "alert alert-success m-0 mb-4 alert-dismissible fade show", "mainArea");
    }

    // Create header for the gold price section
    basicComponents.createH2("Cena złota", "mainArea", "text");
    // Fetch and display current gold price
    await createCurrentGoldPrice().catch((err) => console.log(err));

    // Create header for the currency section
    basicComponents.createH2("Najważniejsze waluty", "mainArea", "text");
    // Create container for currency data
    basicComponents.createActualCurrencyDataContainer();

    // Create header for the statistics section
    basicComponents.createH2("Statystyki", "mainArea", "text");
    // Create a container for charts
    basicComponents.createDoubleContainer("chart");

    // Create chart containers for currency statistics
    basicComponents.createCardChart("chart-left", "Waluty - ostatnie 250 notowań", "myAreaChart", "bar-chart");
    basicComponents.createCardChart("chart-right", "Waluty - Ostatnie 90 dni", "myBarChart", "bar-chart");

    // Generate and display charts for the currency statistics
    createCurrencyChart(250, "myAreaChart");
    createCurrencyChart(90, "myBarChart");

    // Fill currency data and handle errors if any
    fillCurrencyData().catch(error => console.log(error));

    // Create a budget summary section
    const sumary = new BugetSumary();
    sumary.createSumary();

    // Create a budget manager instance and count budget items and balance
    const budget = new BudgetManager();
    budget.countItems("budget-incomes");
    budget.countItems("budget-outgoings");
    budget.countBalance();
};
