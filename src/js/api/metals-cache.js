import date from "date-and-time";
import {fetchMetalRates} from "./get-data";
import {metalsStorage} from "../services/instances";

/**
 * Fetches the latest metal rates and stores them in localStorage,
 * only if the data has not already been fetched today.
 *
 * The function checks if the data has been fetched today by comparing
 * the current date with the last fetch date stored in localStorage.
 * If the data has not been fetched today, it retrieves the latest
 * metal rates from the API and stores them in localStorage for later use.
 *
 * @returns {Promise<void>} A promise that resolves when the data is successfully fetched and stored.
 */

export async function fetchAndStoreMetals() {
    const today = new Date();
    const formattedDate = date.format(today, 'YYYY-MM-DD');

    // Check if the last fetch date is different from today
    if (localStorage.getItem('lastFetchDate') !== formattedDate || !localStorage.getItem('metals')) {
        const res = await fetchMetalRates(); // Assume you have a function fetchMetalRates that fetches data from the API

        // Helper function to save metals
        const getMetalFromApiAndLocalSave = (key, metalPL) => {
            metalsStorage.saveWithId(metalPL, res.metals[key]);
        };

        // Save metals to localStorage
        getMetalFromApiAndLocalSave('aluminum', 'aluminium');
        getMetalFromApiAndLocalSave('copper', 'miedź');
        getMetalFromApiAndLocalSave('gold', 'złoto');
        getMetalFromApiAndLocalSave('lead', 'ołów');
        getMetalFromApiAndLocalSave('nickel', 'nikiel');
        getMetalFromApiAndLocalSave('palladium', 'palad');
        getMetalFromApiAndLocalSave('platinum', 'platyna');
        getMetalFromApiAndLocalSave('silver', 'srebro');
        getMetalFromApiAndLocalSave('zinc', 'cynk');
        // Save the date of the last fetch
        localStorage.setItem('lastFetchDate', formattedDate);
    }
}