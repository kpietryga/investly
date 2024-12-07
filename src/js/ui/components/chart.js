import {fetchCurrencyData} from "../../api/get-data";
import ApexCharts from 'apexcharts'

/**
 * Fetches historical currency data for multiple currencies (USD, EUR, CHF, GBP) and creates a line chart
 * to display the exchange rates over time.
 *
 * @param {number} last - The number of last data points to fetch for each currency.
 * @param {string} id - The ID of the HTML element where the chart will be rendered.
 * @returns {Promise<void>} - A promise that resolves when the chart is rendered.
 */
export default async function createCurrencyChart(last, id) {
    // Fetch data for multiple currencies
    const currencyDataUSD = await fetchCurrencyData("usd", last);
    const currencyDataEUR = await fetchCurrencyData("eur", last);
    const currencyDataCHF = await fetchCurrencyData("chf", last);
    const currencyDataGBP = await fetchCurrencyData("gbp", last);

    // Log the fetched data for USD (can be removed after debugging)
    console.log(currencyDataUSD);

    // Extract the dates and exchange rates from the fetched data
    const dates = currencyDataUSD.data.rates.map(rate => rate.effectiveDate);
    const USDrates = currencyDataUSD.data.rates.map(rate => rate.mid);
    const EURrates = currencyDataEUR.data.rates.map(rate => rate.mid);
    const CHFrates = currencyDataCHF.data.rates.map(rate => rate.mid);
    const GBPrates = currencyDataGBP.data.rates.map(rate => rate.mid);

    // Prepare data series for the chart
    const chartSeries = [
        {
            name: `GBP`,
            data: GBPrates
        },
        {
            name: `CHF`,
            data: CHFrates
        },
        {
            name: `EUR`,
            data: EURrates
        },
        {
            name: `USD`,
            data: USDrates
        },
    ];

    // Define chart options
    const options = {
        series: chartSeries,
        chart: {
            height: 350,
            type: 'line'
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: 'datetime',
            categories: dates
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy'
            },
        },
        colors: ['#202426', '#6C733D', '#9DA65D', '#BFAE2B']
    };

    // Create and render the chart using ApexCharts
    const chart = new ApexCharts(document.getElementById(id), options);
    await chart.render();
}