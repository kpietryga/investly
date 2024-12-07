import date from "date-and-time";
import {fetchTableData} from "./get-data";
import {currencyStorage} from "../services/instances";

/**
 * Fetches the latest currency exchange rates and stores them in the `currencyStorage` service.
 * It checks whether the rates have been fetched today by comparing the current date with the
 * `lastFetchDate` stored in `localStorage`. If the data is not available or the date doesn't match,
 * it fetches the data from the API and updates `currencyStorage` with the new rates.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves once the currencies have been fetched and stored.
 */


export async function fetchAndStoreCurrencies() {
    const today = new Date();
    const formattedDate = date.format(today, 'YYYY-MM-DD');

    if (localStorage.getItem('lastFetchDate') !== formattedDate || !localStorage.getItem('currencies-today')) {
        const res = await fetchTableData("A");

        res.data[0].rates.forEach((rate) => {
            console.log(rate);
            currencyStorage.saveWithId(rate.currency, rate);
        })
    }
}