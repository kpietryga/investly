import {fillCurrencyData} from "../../components/main-currencies";
import {fillData} from "./table-currencies";
import createCurrencyChart from "../../components/chart";
import {basicComponents} from "../../../services/instances";

/**
 * Initializes the currencies page, creating all necessary UI elements and fetching data.
 * This function generates the structure for the currency-related content, including
 * headers, charts, and tables, and fills them with dynamic data from external sources.
 *
 * @function initCurrencies
 * @returns {void}
 */
export const initCurrencies = () => {
    /**
     * Creates the main header and description for the currency page.
     * Adds an icon to the header and a success message.
     */
    basicComponents.createH1("Waluty", "mainArea");
    basicComponents.addIconToHeading("fa-solid fa-dollar-sign color-2 ");
    basicComponents.createP(
        `Sprawdz aktualne kursy walut.`,
        "alert alert-success m-0 mb-4 alert-dismissible fade show",
        "mainArea"
    );

    /**
     * Creates containers for displaying currency data and charts.
     * Initializes two containers for charts and prepares the chart UI.
     */
    basicComponents.createActualCurrencyDataContainer();
    basicComponents.createDoubleContainer("chart");
    basicComponents.createCardChart("chart-left", "Waluty - Ostatni rok", "myAreaChart", "bar-chart");
    basicComponents.createCardChart("chart-right", "Waluty - Ostatnie 90 notowań", "myBarChart", "bar-chart");

    /**
     * Generates currency charts for the last 250 days and 90 days.
     * Each chart is displayed in the corresponding container.
     */
    createCurrencyChart(250, "myAreaChart");
    createCurrencyChart(90, "myBarChart");

    /**
     * Fetches and fills in currency data on the page.
     * Catches and logs any potential errors during the fetching process.
     */
    fillCurrencyData().catch(error => console.log(error));

    /**
     * Creates a table for displaying the currency exchange rates.
     * Fills the table with data fetched from an external source.
     */
    basicComponents.createTable("mainArea", "ex");
    fillData().catch(error => console.log(error));
};
