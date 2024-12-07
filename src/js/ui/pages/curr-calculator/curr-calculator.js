import {currCalcService, basicComponents, formComponents} from "../../../services/instances";
import {fetchTableData} from "../../../api/get-data";

/**
 * Initializes a currency calculator using exchange rates from the NBP API.
 * This function dynamically creates the UI for the calculator, fetches exchange rates,
 * and handles the logic for converting values between PLN and other currencies.
 *
 * @async
 * @function initCurrCalculator
 * @returns {void}
 */
export const initCurrCalculator = async () => {
    /**
     * Fetches exchange rate data from the NBP API and maps currency names to their rates.
     * @type {Object} res - API response containing exchange rate data.
     * @type {Array} options - Array of available currency names.
     * @type {Map} currMap - A map where keys are currency names and values are exchange rates.
     */
    const res = await fetchTableData("A");
    const options = res.data[0].rates.map(e => e = e.currency);
    const currMap = new Map();
    res.data[0].rates.forEach(e => {
        currMap.set(e.currency, e.mid);
    });

    console.log(currMap);

    // Create main heading and description
    basicComponents.createH1("Przelicznik Walut", "mainArea");
    basicComponents.addIconToHeading("fas fa-calculator color-3");
    basicComponents.createP(
        "Przelicznk walut korzysta z aktualnych kursów NBP",
        "alert m-0 bg-color-3 color-5",
        "mainArea"
    );

    // Create main container structure
    basicComponents.createDiv("mainCurrCalc", "row g-3");
    basicComponents.createAndAppendDiv("bruttoNetto", "col-md-6", "mainCurrCalc");
    basicComponents.createAndAppendDiv("results-curr", "col-md-6", "mainCurrCalc");
    basicComponents.createAndAppendDiv("form-wrapper", "shadow p-4 rounded mt-4 mb-4 col", "bruttoNetto");
    basicComponents.createAndAppendDiv("re", "shadow p-4 rounded mt-4 mb-4 col bg-color-1 text-light", "results-curr");

    // Create form for input
    formComponents.createForm("formComponents", "form-wrapper");
    basicComponents.createH2("Wypełnij poniższy formularz", "formComponents", "mt-0 pt-0 color-1");
    formComponents.createLabel("Wpisz kwotę, którą chcesz obliczyć", "curr-label", "formComponents", "form-amount-input", "form-label mt-4");
    formComponents.createNumberInput("form-amount-input", "form-control mb-4", "formComponents");
    document.getElementById("form-amount-input").setAttribute('required', true);
    basicComponents.createP("Wybierz sposób obliczenia", "text m-0", "formComponents");

    // Create radio buttons for conversion direction
    formComponents.createRadioButton("gross-to-net", "radio", "złotówki na inną walutę", "złotówki na inną walutę", "formComponents");
    formComponents.createRadioButton("net-to-gross", "radio", "inna waluta na złotówki", "inna waluta na złotówki", "formComponents");
    document.getElementById("gross-to-net").checked = true;

    // Create dropdown for currency selection
    formComponents.createLabel("Wybierz walutę", "curr-label", "formComponents", "curr-select", "form-label mt-4");
    formComponents.createSelect("curr-select", "form-control mb-4", "formComponents", options);

    // Submit button
    formComponents.createButton("form-form-wrapper-submit", "button btn bg-color-3 w-100 text-light", "Zatwierdź", "submit", "formComponents");

    // Create result display containers
    basicComponents.createPWithId("Wybrana opcja: ", "check-options", "mb-4 p-3 shadow rounded text-light bg-color-4", "re");
    basicComponents.createSpan(" ", "color-1", "output", "check-options");
    basicComponents.createPWithId("Kwota do obliczenia: ", "amout-to-count", "mb-4 p-3 shadow rounded bg-color-4", "re");
    basicComponents.createSpan(" ", "color-1", "display-amount", "amout-to-count");
    basicComponents.createPWithId("Wybrana waluta: ", "curr-percent", "mb-4 p-3 shadow rounded bg-color-4", "re");
    basicComponents.createSpan(" ", "color-1", "display-curr-percent", "curr-percent");
    basicComponents.createPWithId("Cena waluty: ", "value-wrap-curr", "mb-4 p-3 shadow rounded bg-color-5 color-1", "re");
    basicComponents.createSpan(" ", "color-1", "value-curr", "value-wrap-curr");
    basicComponents.createPWithId("Obliczona kwota: ", "main-value-wrap", "mb-0 p-3 shadow rounded bg-color-5 color-1 fw-bold", "re");
    basicComponents.createSpan(" ", "color-success", "main-value", "main-value-wrap");

    // Form submission logic
    const form = document.getElementById("formComponents");
    const amount = document.getElementById("form-amount-input");
    const currency = document.getElementById("curr-select");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Update result fields
        document.getElementById("display-amount").textContent = amount.value;
        document.getElementById("display-curr-percent").textContent = currency.value;

        const option = formComponents.getRadioValue();
        const currDisplay = document.getElementById("value-curr");
        const mainValue = document.getElementById("main-value");

        const valueOfCurr = currMap.get(currency.value);

        // Calculate conversion result
        if (option === "złotówki na inną walutę") {
            currDisplay.textContent = valueOfCurr;
            mainValue.textContent = currCalcService.plnToForeign(amount.value, valueOfCurr);
        } else {
            currDisplay.textContent = valueOfCurr;
            mainValue.textContent = currCalcService.foreignToPln(amount.value, valueOfCurr);
        }
    });
};
