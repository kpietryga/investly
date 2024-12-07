import axios from 'axios';


/**
 * Fetches the exchange rate data for a specific currency from the NBP API.
 *
 * @param {string} currency - The currency code (e.g., 'USD', 'EUR').
 * @param {number} last - The number of last exchange rates to fetch.
 * @returns {Promise<Object>} A promise that resolves with the response data from the API.
 * @throws {Error} If there is an error fetching the data.
 */

export async function fetchCurrencyData(currency, last) {
    try {
        return await axios.get(`https://api.nbp.pl/api/exchangerates/rates/a/${currency}/last/${last}/?format=json`)
    } catch (error) {
        console.error('Wystąpił błąd!', error);
    }
}

/**
 * Fetches the exchange rate table data for a specified table from the NBP API.
 *
 * @param {string} table - The table identifier (e.g., 'A', 'B').
 * @returns {Promise<Object>} A promise that resolves with the response data from the API.
 * @throws {Error} If there is an error fetching the data.
 */

export async function fetchTableData(table) {
    try {

        return await axios.get(`https://api.nbp.pl/api/exchangerates/tables/${table}`)
    } catch (error) {
        console.error('Wystąpił błąd!', error);
    }
}

/**
 * Fetches the exchange rate table data for the last specified number of days for a given table.
 *
 * @param {string} table - The table identifier (e.g., 'A', 'B').
 * @param {number} topCount - The number of recent entries to fetch.
 * @returns {Promise<Object>} A promise that resolves with the response data from the API.
 * @throws {Error} If there is an error fetching the data.
 */

export async function fetchTableDataLast(table, topCount) {
    try {

        return await axios.get(`https://api.nbp.pl/api/exchangerates/tables/${table}/last/${topCount}/`)
    } catch (error) {
        console.error('Wystąpił błąd!', error);
    }
}

/**
 * Fetches the last gold price data from the NBP API.
 *
 * @param {number} last - The number of last gold price entries to fetch.
 * @returns {Promise<Object>} A promise that resolves with the response data from the API.
 * @throws {Error} If there is an error fetching the data.
 */

export async function fetchGoldData(last) {
    try {
        return await axios.get(`https://api.nbp.pl/api/cenyzlota/last/${last}`)
    } catch (error) {
        console.error('Wystąpił błąd!', error);
    }
}

/**
 * Fetches the gold price data for a specific date from the NBP API.
 *
 * @param {string} dateGold - The date in the format 'YYYY-MM-DD' for which to fetch gold price data.
 * @returns {Promise<Object>} A promise that resolves with the response data from the API.
 * @throws {Error} If there is an error fetching the data.
 */

export async function fetchGoldDataFromDate(dateGold) {
    try {
        return await axios.get(`https://api.nbp.pl/api/cenyzlota/${dateGold}/?format=json`);
    } catch (error) {
        console.error('Wystąpił błąd!', error.response?.status);  // Upewniamy się, że mamy dostęp do statusu odpowiedzi

    }
}

/**
 * Fetches the gold price data for a specific range of dates from the NBP API.
 *
 * @param {string} startDate - The start date of the range in the format 'YYYY-MM-DD'.
 * @param {string} endDate - The end date of the range in the format 'YYYY-MM-DD'.
 * @returns {Promise<Object|null>} A promise that resolves with the response data or null in case of an error.
 * @throws {Error} If there is an error fetching the data.
 */
 
export async function fetchGoldRage(startDate, endDate) {
        
    try {
        return await axios.get(`https://api.nbp.pl/api/cenyzlota/${startDate}/${endDate}`)
    } catch (error) {
        if (error.response.statusText === "Przekroczony limit 367 dni / Limit of 367 days has been exceeded"){
           alert("Przekroczony limit 367 dni")
        }
        else if (error.response.statusText === "Not Found - Brak danych"){
            alert("Brak danych")
        }
        else if(error.response.data === "400 BadRequest - Błędny zakres dat / Invalid date range"){
            alert("Błędny zakres dat")
        } else {
            alert("Nieznany błąd")
        }

        return null 
    }
}

/**
 * Fetches the latest metal rates from the Metals API.
 *
 * @returns {Promise<Object>} A promise that resolves with the response data containing the latest metal rates.
 * @throws {Error} If there is an error fetching the data.
 */

export async function fetchMetalRates() {
    const url = 'https://api.metals.dev/v1/latest';

    try {
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json',
            },
            params: {
                api_key: 'Z6SO6ZODJBD2QQ1MOHHM7821MOHHM',
                currency: 'PLN',
                unit: 'g'
            },
        });

        console.log(response)

        return response.data
    } catch (error) {
        console.error('Error fetching metal rates:', error);
    }
}

