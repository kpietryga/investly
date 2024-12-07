import {fetchTableData, fetchTableDataLast} from "../../api/get-data";

/**
 * Fills the currency data cards with the current and previous currency rates.
 * It fetches currency data for the current and previous periods, calculates the differences,
 * and updates the UI with the results.
 */
export const fillCurrencyData = async () => {

    // Fetch the current and previous currency data for the specified currency table ("A").
    const res = await fetchTableData("A");
    const resLast = await fetchTableDataLast("A", "2");

    // Get the DOM elements that represent the currency cards to display the data
    const firstCard = document.getElementById("curr-card-firts")
    const secondCard = document.getElementById("curr-card-seconds")
    const thirdCard = document.getElementById("curr-card-thirds")
    const fourthCard = document.getElementById("curr-card-fourth")

    // Calculate the differences in exchange rates for the currencies
    const funt = (res.data[0].rates[10].mid - resLast.data[0].rates[10].mid).toFixed(2)
    const euro = (res.data[0].rates[7].mid - resLast.data[0].rates[7].mid).toFixed(2)
    const frank = (res.data[0].rates[9].mid - resLast.data[0].rates[9].mid).toFixed(2)
    const dolar = (res.data[0].rates[1].mid - resLast.data[0].rates[1].mid).toFixed(2)

    /**
     * Determines the trend (increase, decrease, or no change) based on the currency difference.
     * @param {number} curr - The difference in the currency exchange rate.
     * @returns {string} - A string representing the trend, including an icon for visual representation.
     */
    const trend = (curr) => {
        if(curr > 0) {
            return curr + ' <i class="fa-solid fa-arrow-trend-up text-success"></i>'
        } else if (curr < 0){
            return curr + ' <i class="fa-solid fa-arrow-trend-down text-danger"></i>'
        }else {
            return curr + ' -'
        }
    }

    // Update the content of each currency card with the current value and trend
    firstCard.innerHTML = `<p class="m-0"> <i class="fas fa-sterling-sign"></i> Funt: ${res.data[0].rates[10].mid} <br> ${trend(funt)} </p>`
    secondCard.innerHTML = `<p class="m-0"> <i class="fas fa-euro-sign"></i> Euro: ${res.data[0].rates[7].mid} <br> ${trend(euro)} </p>`
    thirdCard.innerHTML = `<p class="m-0"> <i class="fas fa-franc-sign"></i> Frank: ${res.data[0].rates[9].mid} <br> ${trend(frank)} </p>`
    fourthCard.innerHTML = `<p class="m-0"> <i class="fas fa-dollar-sign"></i> Dolar: ${res.data[0].rates[1].mid} <br> ${trend(dolar)}</p>`
}