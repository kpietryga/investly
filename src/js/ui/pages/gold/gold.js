import { createCurrentGoldPrice } from "../../components/current-gold";
import { fetchGoldData, fetchGoldRage } from "../../../api/get-data";
import ApexCharts from "apexcharts";
import { basicComponents, formComponents } from "../../../services/instances";

/**
 * Initializes the gold price section including the chart, buttons, and date range form.
 * This function loads initial data for the last 30 days and prepares the UI elements.
 *
 * @async
 * @function initGold
 */
export const initGold = async () => {
    // Create header for the gold section
    basicComponents.createH1("Złoto", "mainArea");

    // Add icon to the header
    basicComponents.addIconToHeading("fa-solid fa-coins color-2");

    // Create a paragraph for the section description
    basicComponents.createP(`Sprawdź ile w ostatnim czasie wrosła cena złota, dane udostepnione prze NBP`, "alert alert-success m-0 mb-4 alert-dismissible fade show", "mainArea");

    // Fetch and display current gold price
    await createCurrentGoldPrice().catch((err) => console.log(err));

    // Create a chart for the last 30 days gold price
    basicComponents.createCardChart("mainArea", "Złoto ostatnie 30 dni", "goldChart", "bar-chart");

    // Create buttons for different time periods
    basicComponents.createDiv("basicComponents-buttons", "row");
    basicComponents.createAndAppendDiv("1-year-wraper", "col-md-3", "basicComponents-buttons");
    basicComponents.createAndAppendDiv("6-months-wraper", "col-md-3", "basicComponents-buttons");
    basicComponents.createAndAppendDiv("3-months-wraper", "col-md-3", "basicComponents-buttons");
    basicComponents.createAndAppendDiv("1-month-wraper", "col-md-3", "basicComponents-buttons");

    // Create buttons for selecting time ranges
    formComponents.createButton("1-year-btn", "btn button bg-color-1 w-100 color-5  mb-4 ", "1 rok", "", "1-year-wraper");
    formComponents.createButton("6-month-btn", "btn button bg-color-1 w-100 color-5  mb-4 ", "6 miesięcy", "", "6-months-wraper");
    formComponents.createButton("3-month-btn", "btn button bg-color-1 w-100 color-5 mb-4 ", "3 miesiące", "", "3-months-wraper");
    formComponents.createButton("1-month-btn", "btn button bg-color-1 w-100 color-5 mb-4 ", "1 miesiąc", "", "1-month-wraper");

    // Create form for date range input
    basicComponents.createAndAppendDiv("formDateGold", "row", "mainArea");
    formComponents.createForm("basicComponents-form-date" , "mainArea" , "form row shadow rounded p-4 m-0 mb-4 color-1 bg-color-5");
    basicComponents.createH2("Podaj zakres dat", "basicComponents-form-date", "col-md-12 mb-4");
    basicComponents.createAndAppendDiv("left-form-basicComponents", "col-md-6", "basicComponents-form-date");
    formComponents.createLabel("Podaj zakres - Od", "goldLabelFrom", "left-form-basicComponents", "label", "");
    formComponents.createInput("startDate", "date", "form-control", 'left-form-basicComponents');
    basicComponents.createAndAppendDiv("right-form-basicComponents", "col-md-6", "basicComponents-form-date");
    formComponents.createLabel("Podaj zakres - Do", "goldLabelTo", "right-form-basicComponents", "label", "");
    formComponents.createInput("endDate", "date", "form-control", 'right-form-basicComponents');
    basicComponents.createAndAppendDiv("accept-form-basicComponents", "col-md-12", "basicComponents-form-date");
    formComponents.createButton("goldButton", "btn button bg-color-2 color-5 mt-4", "Zatwierdź", "submit", "accept-form-basicComponents");

    /**
     * Fetches gold price data for the specified period (in days) and updates the chart.
     * Handles updating the chart with new data for custom date ranges as well.
     *
     * @async
     * @function showData
     * @param {number} last - The number of days of data to display (e.g. 30, 60, 120, 250).
     */
    const showData = async (last) => {
        const goldData = await fetchGoldData(last);
        const dates = goldData.data.map(d => d.data);
        const Goldrates = goldData.data.map(c => c.cena);

        const chartSeries = [
            {
                name: `Gold`,
                data: Goldrates
            }
        ];

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
                }
            },
            colors:['#9DA65D','#202426', '#6C733D', '#BFAE2B']
        };

        // Create and render the chart
        const chart = new ApexCharts(document.getElementById("goldChart"), options);
        await chart.render();

        // Event listener for the date range form
        document.getElementById("basicComponents-form-date").addEventListener("submit", async (e) => {
            e.preventDefault();
            const startDate = document.getElementById("startDate").value;
            const endDate = document.getElementById("endDate").value;

            // Validate the selected date range
            if (startDate > endDate) {
                alert("Błędny zakres dat");
                return;
            }

            const goldData = await fetchGoldRage(startDate, endDate);

            if (goldData === null) {
                return;
            }

            const dates = goldData.data.map(d => d.data);
            const Goldrates = goldData.data.map(c => c.cena);

            await chart.updateSeries([
                {
                    name: `Gold`,
                    data: Goldrates
                }
            ]);

            await chart.updateOptions({
                xaxis: {
                    type: 'datetime',
                    categories: dates
                }
            });
        });

        // Handle button clicks for different time periods (1 year, 6 months, etc.)
        const getDataAndActual = async (last) => {
            const goldData = await fetchGoldData(last);

            const dates = goldData.data.map(d => d.data);
            const Goldrates = goldData.data.map(c => c.cena);

            await chart.updateSeries([
                {
                    name: `Gold`,
                    data: Goldrates
                }
            ]);

            await chart.updateOptions({
                xaxis: {
                    type: 'datetime',
                    categories: dates
                }
            });
        };

        document.getElementById("1-year-btn").addEventListener("click", async e => {
            const goldData = await fetchGoldData(250);
            const dates = goldData.data.map(d => d.data);
            const Goldrates = goldData.data.map(c => c.cena);

            await chart.updateSeries([
                {
                    name: `Gold`,
                    data: Goldrates
                }
            ]);

            await chart.updateOptions({
                xaxis: {
                    type: 'datetime',
                    categories: dates
                }
            });
        });

        document.getElementById("6-month-btn").addEventListener("click", async e => {
            await getDataAndActual(120);
        });

        document.getElementById("3-month-btn").addEventListener("click", e => {
            getDataAndActual(60);
        });

        document.getElementById("1-month-btn").addEventListener("click", async e => {
            await getDataAndActual(24);
        });
    };

    // Show data for the last 30 days by default
    showData(30).catch(error => {
        console.error('Wystąpił błąd!', error);
    });
};
