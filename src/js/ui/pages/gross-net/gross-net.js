import { grossNetServices, basicComponents, formComponents } from "../../../services/instances";

/**
 * Initializes the VAT calculator section, creates UI elements for user input,
 * handles form submission and updates the output with calculated values.
 *
 * @function initBruttoNetto
 */
export const initBruttoNetto = () => {
    // Create header for the VAT calculator section
    basicComponents.createH1("Kalkulator VAT", "mainArea");

    // Add icon to the header
    basicComponents.addIconToHeading("fas fa-calculator color-3");

    // Create main container and sub-containers for input and results
    basicComponents.createDiv("mainGrossNet", "row g-3");
    basicComponents.createAndAppendDiv("bruttoNetto", "col-md-6", "mainGrossNet");
    basicComponents.createAndAppendDiv("results-vat", "col-md-6", "mainGrossNet");
    basicComponents.createAndAppendDiv("bN", "shadow p-4 rounded mt-4 mb-4 col", "bruttoNetto");
    basicComponents.createAndAppendDiv("re", "shadow p-4 rounded mt-4 mb-4 col bg-color-2 text-light", "results-vat");

    // Create the form for user input
    formComponents.createForm("formComponents", "bN");

    // Add form elements such as labels, input fields, radio buttons, and select
    basicComponents.createH2("Wypełnij poniższy formularz", "formComponents", "mt-0 pt-0 color-1");
    formComponents.createLabel("Wpisz kwotę która chcesz obliczyć", "vat-label", "formComponents", "form-gross-input", "form-label mt-4");
    formComponents.createNumberInput("form-amount-input", "form-control mb-4", "formComponents");
    document.getElementById("form-amount-input").setAttribute('required', true);
    basicComponents.createP("Wybierz sposób obliczenia", "text m-0", "formComponents");
    formComponents.createRadioButton("gross-to-net", "radio", "brutto na netto", "brutto na netto", "formComponents");
    formComponents.createRadioButton("net-to-gross", "radio", "netto na brutto", "netto na brutto", "formComponents");
    document.getElementById("gross-to-net").checked = true;
    formComponents.createLabel("Wybierz procent vatu do przeliczenia", "vat-label", "formComponents", "vatSelect", "form-label mt-4");
    formComponents.createSelect("vatSelect", " form-control mb-4", "formComponents", [23, 22, 8, 7, 5, 3]);
    formComponents.createButton("form-BN-submit", "button btn btn-secondary w-100 text-light", "Zatwierdź", "submit", "formComponents");

    // Create the result display elements
    basicComponents.createPWithId("Wybrana opcja: ", "check-options", "mb-4 p-3 shadow rounded text-light bg-color-3", "re");
    basicComponents.createSpan(" ", "color-1", "output", "check-options");
    basicComponents.createPWithId("Kwota do obliczenia: ", "amout-to-count", "mb-4 p-3 shadow rounded bg-color-3", "re");
    basicComponents.createSpan(" ", "color-1", "display-amount", "amout-to-count");
    basicComponents.createPWithId("Wybrany procent: ", "vat-percent", "mb-4 p-3 shadow rounded bg-color-3", "re");
    basicComponents.createSpan(" ", "color-1", "display-vat-percent", "vat-percent");
    basicComponents.createPWithId("Podatek VAT: ", "value-wrap-VAT", "mb-4 p-3 shadow rounded bg-color-5 color-1", "re");
    basicComponents.createSpan(" ", "color-1", "value-VAT", "value-wrap-VAT");
    basicComponents.createPWithId("Obliczona kwota: ", "main-value-wrap", "mb-0 p-3 shadow rounded bg-color-5 color-1", "re");
    basicComponents.createSpan(" ", "color-1", "main-value", "main-value-wrap");

    // Add event listener to the form
    const form = document.getElementById("formComponents");
    const amount = document.getElementById("form-amount-input");
    const percent = document.getElementById("vatSelect");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Update the display fields with the entered values
        document.getElementById("display-amount").textContent = amount.value;
        document.getElementById("display-vat-percent").textContent = percent.value;

        // Get the selected radio button value
        const option = formComponents.getRadioValue();
        const vatDisplay = document.getElementById("value-VAT");
        const mainValue = document.getElementById("main-value");

        // Perform calculations based on the selected option
        if (option === "netto na brutto") {
            vatDisplay.textContent = grossNetServices.countVatNetToGross(amount.value, percent.value);
            mainValue.textContent = grossNetServices.netToGross(amount.value, percent.value);
        } else {
            vatDisplay.textContent = grossNetServices.countVatGrossToNet(amount.value, percent.value);
            mainValue.textContent = grossNetServices.grossToNet(amount.value, percent.value);
        }
    });

    // Create a description paragraph for the VAT calculator
    basicComponents.createP("Kalkulator VAT (brutto-netto) to narzędzie, które umożliwia przeliczenie kwoty brutto na netto oraz kwoty netto na brutto, z uwzględnieniem wybranej stawki VAT. Dodatkowo, oblicza on wartość samego podatku VAT, co pozwala na szybkie i precyzyjne określenie wszystkich składników ceny. Użytkownik musi jedynie wybrać odpowiednią metodę przeliczenia – czy chce obliczyć kwotę netto na podstawie brutto, czy odwrotnie – a kalkulator automatycznie wykonuje resztę obliczeń. ", "alert m-0 bg-color-3 color-5", "mainArea");

    // Create a link to external VAT resource
    const a = document.createElement("a");
    a.href = "https://www.ey.com/pl_pl/tax/podatki-posrednie-vat-akcyza-clo/podatek-vat-w-polsce-co-warto-wiedziec-o-podatku-od-towarow-i-uslug";
    a.textContent = "Więcej o poadtku Vat";
    a.className = "color-1";

    // Append the link to the alert message
    document.querySelector("p.alert").appendChild(a);
};
