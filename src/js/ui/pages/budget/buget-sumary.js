import {basicComponents} from "../../../services/instances";

/**
 * Represents a budget summary component that displays total incomes, remaining balance, and total outgoings.
 */
export default class BugetSumary {
    /**
     * Creates and appends the budget summary elements to the page.
     * It includes three sections: total incomes, remaining balance, and total outgoings.
     * Each section displays a label and a value, initially set to "0".
     */
    createSumary() {
        // Create the main summary container
        basicComponents.createAndAppendDiv("summary", "summary container-fluid", "mainArea");

        // Create the title of the summary
        basicComponents.createH2("Podsumowanie Budżetu", "summary", "summary-title mt-4");

        // Create the row for holding the income, balance, and outgoing sections
        basicComponents.createAndAppendDiv("row-summary", "row", "summary");

        // Create the left column for incomes
        basicComponents.createAndAppendDiv("col-summary-left", "col-md-4 text-center", "row-summary");
        basicComponents.createP("Przychody razem", "p-2 bg-color-2 text-light rounded fw-bold", "col-summary-left");
        basicComponents.createP("0", "sum-in color-2", "col-summary-left");

        // Create the center column for balance
        basicComponents.createAndAppendDiv("col-summary-center", "col-md-4 text-center", "row-summary");
        basicComponents.createP("Pozostała kwota", "bil p-2 bg-color-6 text-light rounded bold fw-bold", "col-summary-center");
        basicComponents.createP("0", "balance color-6", "col-summary-center");

        // Create the right column for outgoings
        basicComponents.createAndAppendDiv("col-summary-right", "col-md-4 text-center", "row-summary");
        basicComponents.createP("Wydatki razem: ", "p-2 bg-color-7 text-light rounded fw-bold", "col-summary-right");
        basicComponents.createP("0", "sum-out color-7", "col-summary-right");
    }
}