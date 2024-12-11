import InvestmentTable from "./investment-table";
import {
    planingService,
    basicComponents,
    currencyStorage,
    formComponents,
    metalsStorage
} from "../../../services/instances";

/**
 * Initializes the investment planning section by creating and displaying
 * components such as headings, cards for amounts, and displaying saved values.
 */
export const initPlaning = async () => {

    // Create the header for the investment section
    basicComponents.createH1("Inwestycje", "mainArea"); // Create the main heading "Investments"
    basicComponents.addIconToHeading("fas fa-money-bill-trend-up color-3"); // Add an icon to the heading
    basicComponents.createP("Zaplanuj ile chcesz wydac na inwestycje", "alert alert-success m-0", "mainArea"); // Create a paragraph with the description "Plan how much you want to spend on investments"

    // Create the container for displaying investment amounts
    basicComponents.createAndAppendDiv('ivest-row', 'row mt-4', "mainArea");

    /**
     * Helper function to create and append a card for displaying investment information.
     * @param {string} divId - The ID of the card's container.
     * @param {string} text - The text to display on the card (e.g., "Do wydania").
     * @param {string} AmountId - The ID where the amount will be displayed on the card.
     */
    const createCard = (divId, text, AmountId) => {
        basicComponents.createAndAppendDiv(divId, 'col-md-4', "ivest-row"); // Create a column for the card
        basicComponents.createAndAppendDiv(divId + '-wrap', 'card shadow text-center', divId); // Create a card container with shadow effect
        basicComponents.createH2(text, divId + '-wrap', "mt-4"); // Add the heading (text) on the card
        basicComponents.createAndAppendDiv(AmountId, "mb-3", divId + '-wrap'); // Add a div for displaying the amount
    }

    // Create individual cards for each investment amount
    createCard("card-one", "Do wydania", "start-amont"); // Card for available funds
    createCard("card-two", "Zainwestowana kwota", "invested-amout"); // Card for invested amount
    createCard("card-three", "Zysk/strata", "sum-profit"); // Card for profit/loss

    // Set the initial values of the amounts from localStorage
    document.getElementById("start-amont").innerText = localStorage.getItem("saves") || "0";
    document.getElementById("sum-profit").innerText = localStorage.getItem("sum-profit") || "0";

    // ----------------------------- koniec kwot ----------------------------

    // ----------------------------- formularz ----------------------------
    // Create the main form container with styling and positioning
    formComponents.createFormDiv("wallet-container", "container-fluid basicComponents p-4 mt-4 bg-light shadow mb-4 rounded bg-color-3", "mainArea");

    // Create the form inside the wallet container
    formComponents.createForm("wallet-form", "wallet-container");

    // Create the label for entering the investment amount
    formComponents.createLabel("Tutaj podaj jaka kwotę chcesz zainwestować", "labPodaj", "wallet-form", "choose", "form-label");

    // Create a number input field for the amount
    formComponents.createNumberInput("choose", "input form-control mb-4", "wallet-form");

    // Create the label for selecting the investment option
    formComponents.createLabel("Tutaj wybierz opcje w co chcesz zainwestować", "labPodaj", "wallet-form", "", "form-label");

    // Get the form element for later use (e.g., for validation or submission)
    const wf = document.getElementById("wallet-form");

    // Create horizontal rules to separate sections visually
    const hr = document.createElement("hr");
    const hr2 = document.createElement("hr");
    wf.appendChild(hr)

    // first radio button
    const radio1 = document.createElement('input');
    radio1.type = 'radio';
    radio1.name = 'RadioInvestGroup';
    radio1.id = 'metals-radio';
    radio1.value = 'metals';
    radio1.checked = true;


    const label1 = document.createElement('label');
    label1.setAttribute('for', 'metals-radio');
    label1.textContent = 'Metale';

    // second radio button
    const radio2 = document.createElement('input');
    radio2.type = 'radio';
    radio2.name = 'RadioInvestGroup';
    radio2.id = 'currencies';
    radio2.value = 'currencies';

    // Create a label for the second radio button
    const label2 = document.createElement('label');
    label2.setAttribute('for', 'currencies');
    label2.textContent = 'Waluty';

    // Add radio buttons and labels to the document
    wf.appendChild(radio1);
    wf.appendChild(label1);
    wf.appendChild(document.createElement('br'));
    wf.appendChild(radio2);
    wf.appendChild(label2);
    wf.appendChild(hr2)

    // Create a select dropdown for choosing a metal from available keys in the metalsStorage
    formComponents.createSelect("investSelect", "form-control mb-4", "wallet-form", metalsStorage.getAllKeys());
    formComponents.createFormDiv("metal-price", "price mb-4 bg-color-2 p-4 color-5", "wallet-form");
    document.getElementById("metal-price").textContent = `Cena za gram wynosi: ${metalsStorage.findOne("aluminium")}`
    document.getElementById("investSelect").addEventListener("change", function () {
        document.getElementById("metal-price").textContent = `Cena za gram wynosi: ${metalsStorage.findOne(this.value)}`
    });

    const currForSelect = [...currencyStorage.findAll()].map((item) => {
        return (item.currency);
    })



    console.log("aaaa", currencyStorage, currForSelect);

    formComponents.createSelect("investCurrenciesSelect", "form-control mb-4", "wallet-form", currForSelect);
    formComponents.createFormDiv("curr-price", "price mb-4 bg-color-2 p-4 color-5", "wallet-form");
    document.getElementById("curr-price").textContent = `Cena waluty: ${currencyStorage.findOne("bat (Tajlandia)").mid}`
    document.getElementById("investCurrenciesSelect").addEventListener("change", function () {
        document.getElementById("curr-price").textContent = `Cena waluty ${currencyStorage.findOne(this.value).mid}`
    });

    // Get all elements from form
    const radios = document.getElementsByName('RadioInvestGroup');
    const metalsSelect = document.getElementById('investSelect');
    const currenciesSelect = document.getElementById('investCurrenciesSelect');
    const metalPriceDiv = document.getElementById('metal-price');
    const currPriceDiv = document.getElementById('curr-price');


    /**
     * Toggles between displaying the metal selection and currency selection
     * based on the selected radio button. Initially, the metal selection and
     * its price information are displayed, while the currency selection is hidden.
     *
     * When a radio button is clicked, the corresponding section (metals or currencies)
     * will be shown, and the other section will be hidden. The event listener listens
     * for changes to the radio button group and adjusts the display accordingly.
     */
    metalsSelect.style.display = 'block';
    metalPriceDiv.style.display = 'block';
    currenciesSelect.style.display = 'none';
    currPriceDiv.style.display = 'none';

    // Add event listeners to each radio button to toggle between metal and currency options
    for (const radio of radios) {
        radio.addEventListener('change', (event) => {
            if (event.target.checked) {  // If the radio button is checked
                if (event.target.value === "metals") {  // If "metals" option is selected
                    metalsSelect.style.display = 'block';
                    metalPriceDiv.style.display = 'block';
                    currenciesSelect.style.display = 'none';
                    currPriceDiv.style.display = 'none';
                } else {
                    metalsSelect.style.display = 'none';
                    metalPriceDiv.style.display = 'none';
                    currenciesSelect.style.display = 'block';
                    currPriceDiv.style.display = 'block';
                }
            }
        });
    }

    formComponents.createButton("submit-invest", "btn btn-secondary mb-4", "Zatwierdź", "submit", "wallet-form")

    //form end

    const inputElement = document.getElementById("choose")

    inputElement.setAttribute('required', true);
    inputElement.setAttribute('step', '0.01');

    //Container for investments
    basicComponents.createAndAppendDiv("investContainer", "table-responsive", "mainArea")
    basicComponents.createH2("Twoje inwestycje", "investContainer", "mt-4")


    // Investment archive
    basicComponents.createAndAppendDiv("archiveContainer", "table-responsive", "mainArea")
    basicComponents.createH2("Archiwum investycji", "archiveContainer", "mt-4")

    // Clear Button
    formComponents.createButton("clear-button", "btn btn-secondary mb-4", "wyczyść archiwum", "submit", "mainArea")

    /**
     * Initializes and manages investment and archive tables.
     * Creates a table to display current investments and another table to show archived investments.
     * Clears the archive when the "clear-button" is clicked.
     */


        // Create an instance of InvestmentTable for current investments and generate the table
    const table = new InvestmentTable("investContainer")
    table.createTable("invest-body", "Nazwa", "Rodzaj", "Wartość inwestycji", "Cena zakupu", "Data zakupu", "Obecna cena sprzedazy", "Obecna Wartość inwestycji", "Zysk/strata", "Sprzedaj")

    // Create an instance of InvestmentTable for archived investments and generate the table
    const archive = new InvestmentTable("archiveContainer")
    archive.createTable("archive-body", "Nazwa", "Rodzaj", "Wartość investycji", "Cena zakupu", "Data zakupu", "Data sprzedazy", "cena sprzedazy", "zysk/strata")

    document.getElementById("clear-button").addEventListener("click", e => {
        e.preventDefault()
        planingService.clearArchive()
        document.getElementById("archive-body").innerHTML = "";
    })

    const form = document.getElementById("wallet-form")
    const inBody = document.getElementById("invest-body")


    /**
     * Creates an investment entry and calculates the profit or loss.
     * The calculation differs depending on whether the investment is in metals or currencies.
     *
     * @param {Object} investment - The investment data object, containing details about the investment.
     * @param {string} investment.name - The name of the investment (metal or currency).
     * @param {number} investment.amount - The amount of the investment.
     * @param {number} investment.price - The price at which the investment was made.
     * @param {string} investment.activeRadio - The type of investment ("metals" or "currencies").
     */

    const createInvestment = (investment) => {

        let profit, currentPrice

        console.log(investment)

        if (investment.activeRadio === "metals") {
            profit = ((investment.amount / investment.price - investment.amount / metalsStorage.findOne(investment.name)) * metalsStorage.findOne(investment.name)).toFixed(2)
            currentPrice = metalsStorage.findOne(investment.name)
        } else {
            profit = ((investment.amount / investment.price - investment.amount / currencyStorage.findOne(investment.name).mid) * currencyStorage.findOne(investment.name).mid).toFixed(2)
            currentPrice = currencyStorage.findOne(investment.name).mid
        }


        const btn = table.addInvestRow(
            investment.id,
            `${investment.name}`,
            `${investment.activeRadio === "metals" ? "metal" : "waluta"}`,
            `${investment.amount}`,
            `${investment.price}`,
            `${investment.date}`,
            // `${(investment.quantity).toFixed(2)}`,
            `${currentPrice}`,
            `${Number.parseFloat(investment.amount) + Number.parseFloat(profit)}`,
            `${profit}`
        )

        btn.onclick = () => {
            document.getElementById("invest-body").innerHTML = ""
            document.getElementById("archive-body").innerHTML = ""
            planingService.sellInvestment(investment)
            document.getElementById("start-amont").innerText = `${localStorage.getItem("saves") || "0"}`
            document.getElementById("sum-profit").innerText = `${localStorage.getItem("sum-profit") || "0"}`
            initInvestments()
            initArchive()
        }
    }

    /**
     * Creates an archive entry for an investment.
     * This function adds a new row to the archive table with the investment details.
     *
     * @param {Object} investment - The investment data object to be archived.
     * @param {string} investment.name - The name of the investment (metal or currency).
     * @param {string} investment.activeRadio - The type of investment ("metals" or "currencies").
     * @param {number} investment.amount - The amount of the investment.
     * @param {number} investment.price - The price at which the investment was made.
     * @param {string} investment.date - The date the investment was made.
     * @param {string} investment.dateOfSell - The date the investment was sold (if applicable).
     * @param {number} investment.currentPrice - The current price of the investment.
     * @param {number} investment.profit - The profit or loss from the investment.
     */

    const createArchive = (investment) => {

        archive.addArchiveRow(
            `${investment.name}`,
            `${investment.activeRadio === "metals" ? "metal" : "waluta"}`,
            `${investment.amount}`,
            `${investment.price}`,
            `${investment.date}`,
            `${investment.dateOfSell}`,
            // `${(investment.quantity).toFixed(2)}`,
            `${investment.currentPrice}`,
            `${investment.profit}`)
    }

    /**
     * Initializes the investments by fetching all investments from the planning service,
     * creating investment elements, and calculating the total invested amount.
     * The total invested amount is stored in localStorage and displayed in the DOM.
     */
    function initInvestments() {
        if (planingService.getAllInvestments()) {
            planingService.getAllInvestments().forEach((investment) => {
                createInvestment(investment)
            })
        }

        const sumInvest = planingService.getAllInvestments().reduce((acc, current) => {
            console.log("to jes curr", acc, current);
            return acc + Number.parseFloat(current.amount)
        }, 0)

        localStorage.setItem("invested-amout", sumInvest.toFixed(2))
        document.getElementById("invested-amout").innerText = localStorage.getItem("invested-amout") || "0"
    }

    /**
     * Initializes the archives by fetching all archives from the planning service,
     * creating archive elements, and calculating the total invested amount.
     * The total invested amount is stored in localStorage and displayed in the DOM.
     */
    function initArchive() {
        if (planingService.getAllArchives()) {
            planingService.getAllArchives()
                .forEach((investment) => {
                    createArchive(investment)
                })
        }

        const sumInvest = planingService.getAllInvestments().reduce((acc, current) => {
            console.log("to jes curr", acc, current);
            return acc + Number.parseFloat(current.amount)
        }, 0)

        localStorage.setItem("invested-amout", sumInvest.toFixed(2))
        document.getElementById("invested-amout").innerText = localStorage.getItem("invested-amout") || "0"
    }

    initInvestments()
    initArchive()

    /**
     * Handles the form submission for investment creation. It prevents the default form submission,
     * checks if the user has sufficient savings, and validates the input amount. If the validation passes:
     * 1. Updates the savings in localStorage.
     * 2. Retrieves the selected investment type (metals or currencies) and associated value.
     * 3. Adds the new investment using the planning service.
     * 4. Re-initializes the investments section to reflect the new state.
     * 5. Updates the displayed savings amount in the DOM.
     */

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const saves = Number.parseFloat(localStorage.getItem("saves") || 0)

        if (saves <= 0) {
            alert("Wartoś saves musi być wieksza od zera")
        } else if (saves - inputElement.value < 0) {
            alert("Wartoś podanej inwestycji przekracza oszczednosci")
        } else {
            localStorage.setItem("saves", (saves - inputElement.value).toFixed(2))
            const activeRadio = document.querySelector('input[name="RadioInvestGroup"]:checked');
            let value;

            if (activeRadio) {
                if (activeRadio.value === "metals") {
                    value = document.getElementById("investSelect").value; // Zmienna metali
                } else {
                    value = document.getElementById("investCurrenciesSelect").value; // Zmienna waluty
                }
            }

            planingService.addInvestment(inputElement.value, value, activeRadio.value);
            inBody.innerHTML = "";
            initInvestments();

            document.getElementById("start-amont").innerText = localStorage.getItem("saves") || "0"

        }
    })
}