/**
 * Represents an investment table that allows the creation and manipulation
 * of a table displaying investment data.
 *
 * @class InvestmentTable
 */
export default class InvestmentTable {
    /**
     * Creates an instance of the InvestmentTable class.
     * @param {string} container - The ID of the container element where the table will be appended.
     */
    constructor(container) {
        this.investmentContainer = document.getElementById(container);
        this.table = document.createElement("table");
        this.thead = document.createElement("thead");
        this.tbody = document.createElement("tbody");
        this.thtr = document.createElement("tr");
    }

    /**
     * Creates a table with a specified body ID and header titles.
     *
     * @param {string} idBody - The ID for the table body.
     * @param {...string} headers - The titles for the table headers.
     */
    createTable(idBody, ...headers) {
        this.table.className = "table table-striped table-hover text-center";
        this.tbody.id = idBody;

        // Add headers to the table
        headers.forEach(header => this.#addTdToTh(header));

        // Append the table elements
        this.investmentContainer.appendChild(this.table);
        this.table.appendChild(this.thead);
        this.table.appendChild(this.tbody);
        this.thead.appendChild(this.thtr);
    }

    /**
     * Adds a new row to the investment table with specified values and a button.
     *
     * @param {string} id - The ID for the new row.
     * @param {...string} values - The values to populate the cells of the row.
     * @returns {HTMLElement} - The button element created in the row.
     */
    addInvestRow(id, ...values) {
        const tbtr = document.createElement("tr");

        // Add values to the row
        values.forEach(value => this.#addTdToTr(value, tbtr));

        // Create a button for the row
        const btnContainer = document.createElement("td");
        const btn = document.createElement("button");
        tbtr.appendChild(btnContainer);
        btn.innerHTML = "<i class='fa fa-circle-check'></i>";
        btn.className = "btn btn-dark";
        btnContainer.appendChild(btn);

        // Append the row to the table body
        this.tbody.appendChild(tbtr);

        return btn;
    }

    /**
     * Adds a new archived row to the table with the specified values.
     *
     * @param {...string} values - The values to populate the cells of the archived row.
     */
    addArchiveRow(...values) {
        const tbtr = document.createElement("tr");

        // Add values to the archived row
        values.forEach(value => this.#addTdToTr(value, tbtr));

        // Append the archived row to the table body
        this.tbody.appendChild(tbtr);
    }

    /**
     * Adds a header cell (th) with the specified title to the table header.
     *
     * @param {string} title - The title of the header cell.
     * @private
     */
    #addTdToTh(title) {
        const th = document.createElement("th");
        th.innerText = title;
        this.thtr.appendChild(th);
    }

    /**
     * Adds a regular cell (td) with the specified value to the row.
     *
     * @param {string} value - The value to be inserted into the cell.
     * @param {HTMLElement} tbtr - The table row (tr) where the cell will be added.
     * @private
     */
    #addTdToTr(value, tbtr) {
        const td = document.createElement("td");
        td.className = "align-middle";
        td.innerText = value;
        tbtr.appendChild(td);
    }
}
