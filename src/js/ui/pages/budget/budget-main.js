import BudgetManager from "./budget-manager";
import BugetSumary from "./buget-sumary";
import { createBudgetForms } from "./budget-forms";
import { basicComponents, formComponents } from "../../../services/instances";

/**
 * Initializes the budget management module.
 *
 * This function sets up the budget interface by:
 * - Creating a heading and a description.
 * - Adding a double container for form elements.
 * - Initializing budget forms.
 * - Setting up the budget summary and budget manager.
 * - Adding required attributes to input fields.
 * - Adding buttons for submitting or clearing the budget.
 * - Attaching event listeners to handle budget approval and data clearing actions.
 *
 * The interface helps users track their income and expenses,
 * calculate their investment potential, and manage their budget efficiently.
 */
export const initBudget = () => {
    // Create the main heading and description for the budget section
    basicComponents.createH1("Budżet", "mainArea");
    basicComponents.addIconToHeading("fas fa-scale-unbalanced color-2");
    basicComponents.createP(
        "Aby móc zainwestować musisz dokladnie wiedzieć na co wydajesz swoje pieniądze. Dodaj swoje srodki i wydatki w ten sposób obliczysz ile pieniedzy możesz zainwestować.",
        "alert alert-success m-0 mb-4 alert-dismissible fade show",
        "mainArea"
    );

    // Create a double container for budget-related forms
    basicComponents.createDoubleContainer("form");

    // Initialize budget forms
    createBudgetForms();

    // Initialize budget summary
    const sumary = new BugetSumary();
    sumary.createSumary();

    // Initialize budget manager and its functionality
    const bm = new BudgetManager();
    bm.initIncomes();
    bm.initOutgoings();
    bm.countItems();
    bm.countBalance();
    bm.submitIncome();
    bm.submitOutgoing();

    // Set required attributes for income input fields
    document.getElementById("input-name-incomes").setAttribute('required', true);
    document.getElementById("input-value-incomes").setAttribute('required', true);

    // Add final instructions for budget confirmation or clearing
    basicComponents.createP(
        "Jeśli uważasz, że Twój budżet jest zakończony klikni przycisk zatwierdz bugdet to Przejdź do zakładki \"Planowanie wydatków\". Pozostała kwota zostanie przekazana do oszczedności. Aby zaplanować budżet na nowo, kliknij \"Wyczyść dane\".",
        "alert alert-success m-0",
        "mainArea"
    );

    // Create buttons for submitting and clearing budget data
    formComponents.createButton("btn-accept", "btn bg-color-6 text-light tx-uppercase bg-gradient mt-4 mb-4 me-4", "Zatwierdz budżet", "submit", "mainArea");
    formComponents.createButton("clearData", "btn btn-dark text-uppercase text-light bg-gradient mt-4 mb-4", "Wyczyść dane", "submit", "mainArea");

    // Attach event listener to the budget approval button
    document.getElementById("btn-accept").addEventListener("click", function (event) {
        bm.aceptBudget();
    });

    // Attach event listener to the clear data button
    const clearDataBtn = document.getElementById("clearData");
    clearDataBtn.addEventListener("click", e => {
        bm.clearBudget();
        bm.initIncomes();
        bm.initOutgoings();
    });
};