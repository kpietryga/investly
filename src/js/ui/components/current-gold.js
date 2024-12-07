import {fetchGoldData} from "../../api/get-data";
import {basicComponents} from "../../services/instances";

/**
 * Fetches the current and previous gold prices, calculates the difference,
 * and creates HTML elements to display the current price, previous price,
 * and the difference in a structured layout.
 *
 * @returns {Promise<void>} - A promise that resolves when the gold price information is rendered.
 */
export const createCurrentGoldPrice = async () => {

    // Fetch the current and previous gold prices
    const currGoldPrice = await fetchGoldData(2);

    // Format the current and previous prices to two decimal places
    const curr = ((currGoldPrice.data[1].cena).toFixed(2)).toString();
    const before = ((currGoldPrice.data[0].cena).toFixed(2)).toString();

    // Calculate the difference between the current and previous prices
    const status = ((currGoldPrice.data[1].cena).toFixed(2) - (currGoldPrice.data[0].cena).toFixed(2)).toFixed(2);

    // Create and append div containers for displaying gold price data
    basicComponents.createAndAppendDiv("gold-price", "gold-price-wrap row", "mainArea");
    basicComponents.createAndAppendDiv("gold-price-1", "gold-price-wrap  col-xl-4 ", "gold-price");
    basicComponents.createAndAppendDiv("gold-price-2", "gold-price-wrap  col-xl-4 ", "gold-price");
    basicComponents.createAndAppendDiv("gold-price-3", "gold-price-wrap  col-xl-4 ", "gold-price");

    // Create and append paragraphs and spans for the current, previous, and status (difference) of the gold price
    basicComponents.createPWithId("Aktualna cena złota wynosi: \n", "actual-gold", "color-1 text-center bg-color-5 p-4 rounded shadow", "gold-price-1");
    basicComponents.createSpan(curr + " zł", "fw-bold", "current-gold-price", "actual-gold");

    basicComponents.createPWithId("Poprzednia cena złota wynosi: \n", "before-gold", "color-1 text-center bg-color-5 p-4 rounded shadow", "gold-price-2");
    basicComponents.createSpan(before + " zł", "fw-bold", "before-gold-price", "before-gold");

    basicComponents.createPWithId("Róznica do dnia poprzedniego \n", "status-gold", "color-1  text-center p-4 rounded shadow bg-color-5", "gold-price-3");
    basicComponents.createSpan(status + " zł ", "fw-bold", "status-gold-price", "status-gold");

    // Get the status element to modify its appearance based on the price difference
    const statusGoldPrice = document.getElementById("status-gold-price");

    // If the status (difference) is negative, display a downward arrow and apply a red color
    if (status < 0) {
        statusGoldPrice.classList.add("text-danger");
        const icon = document.createElement("i");
        icon.className = "fas fa-arrow-trend-down";
        statusGoldPrice.append(icon);
    }

    // If the status (difference) is positive, display an upward arrow and apply a green color
    if (status > 0) {
        statusGoldPrice.classList.add("text-success");
        const icon = document.createElement("i");
        icon.className = "fas fa-arrow-trend-up";
        statusGoldPrice.append(icon);
    }
}
