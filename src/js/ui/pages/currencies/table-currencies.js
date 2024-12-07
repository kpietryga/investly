import {fetchTableData} from "../../../api/get-data";
import {DataTable} from "simple-datatables";

/**
 * Fills the currency data table with the exchange rates retrieved from the API.
 * This function fetches the currency exchange data and formats it to be displayed
 * in a table with search functionality and custom labels for pagination and results.
 *
 * @async
 * @function fillData
 * @returns {void}
 */
export const fillData = async () => {

        /**
         * Fetches the exchange rate data from the API.
         * This data contains the currency rates for the specified table (A).
         */
        const res = await fetchTableData("A");

        /**
         * Formats the fetched data into an array of arrays suitable for the DataTable.
         * Each entry in the array contains the ID, code, currency name, and the exchange rate (mid).
         *
         * @constant
         * @type {Array<Array>}
         */
        const arr = res.data[0].rates.reduce((acc, cur, i) => {
            acc.push([i + 1, cur.code, cur.currency, cur.mid]);
            return acc;
        }, []);

        // Todo: Add functionality to underline a variable (e.g., highlight or underline certain data)

        /**
         * Initializes and configures the DataTable with the formatted data.
         * Sets up search functionality, pagination, and custom labels for the table.
         *
         * @constant
         * @type {DataTable}
         */
        const datatable = new DataTable("#ex", {
            searchable: true,
            fixedHeight: true,
            data: {
                headings: ["id", "kod", "waluta", "kurs"],
                data: arr
            },
            labels: {
                searchTitle: "test", // Temporary label, should be updated
                placeholder: "Wyszukaj",
                perPage: "wyników na stronę",
                noResults: "Brak wyników wyszukiwania",
                info: `Wyświetlanie od {start} do {end} z {rows} wpisów`
            }
        });
    };



