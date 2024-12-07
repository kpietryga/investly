import {basicComponents, formComponents} from "../../../services/instances";

/**
 * Creates the forms for managing incomes and outgoings on the budget page.
 * It creates two sections: one for incomes and one for outgoings, each with their own form,
 * labels, inputs, and buttons.
 */
export const createBudgetForms = () => {
    /**
     * Creates the form for incomes.
     * It includes a title, input fields for income name and value, and a button to add an income.
     */
    formComponents.createForm('form-incomes', "form-left");
    formComponents.createFormDiv("left-form-incomes-top", "left-top bg-color-2 shadow text-white text-center p-3", "form-incomes");
    basicComponents.createH2("Przychody", "left-form-incomes-top", "mb-0");
    formComponents.createFormDiv("left-form-incomes", "left-container card p-3 bg-light shadow", "form-incomes");
    formComponents.createLabel('Podaj nazwę dochodu', "label-for-income", "left-form-incomes", "input-name-incomes");
    formComponents.createInput("input-name-incomes", "text", "form-control mb-4", "left-form-incomes", "Praca");
    formComponents.createLabel('Podaj kwotę dochodu', "label-for-income", "left-form-incomes", "input-value-incomes");
    formComponents.createNumberInput("input-value-incomes", "form-control mb-4", "left-form-incomes");
    formComponents.createButton("buttIncome", "btn bg-color-2  text-light bg-gradient shadow ", "Dodaj przychód +", "submit", "left-form-incomes");

    formComponents.createFormDiv("incomes-list", "left-container", "form-incomes");

    /**
     * Creates the form for outgoings.
     * It includes a title, input fields for outgoing name and value, and a button to add an outgoing.
     */
    formComponents.createForm('form-outgoings', "form-right");
    formComponents.createFormDiv("right-form-outgoings-top", "right-top bg-color-7 shadow text-white text-center p-3", "form-outgoings");
    basicComponents.createH2("Wydatki", "right-form-outgoings-top", "mb-0");
    formComponents.createFormDiv("right-form-outgoings", "right-container card p-3 bg-light shadow", "form-outgoings");
    formComponents.createLabel('Podaj nazwę Wydatku', "label-for-out-name", "right-form-outgoings", "input-name-outgoins");
    formComponents.createInput("input-name-outgoings", "text", "form-control mb-4", "right-form-outgoings", "Benzyna");
    formComponents.createLabel('Podaj kwote Wydatku', "label-for-uot-value", "right-form-outgoings", "input-value-outgoins");
    formComponents.createNumberInput("input-value-outgoings", "form-control mb-4", "right-form-outgoings");
    formComponents.createButton("buttOutgoig", "btn bg-color-7 text-light tx-uppercase bg-gradient ", "Dodaj wydatek -", "submit", "right-form-outgoings");

    formComponents.createFormDiv("outgoings-list", "right-container", "form-outgoings");
}