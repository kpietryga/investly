/**
 * Class representing basic HTML components and utilities for creating DOM elements.
 * This class provides methods to create and append various HTML elements like headings, paragraphs, divs, and tables.
 */
export default class BasicComponents {
    #mainArea

    /**
     * Creates an instance of BasicComponents.
     * Initializes the main area where components will be appended.
     */
    constructor() {
        this.#mainArea = document.getElementById('mainArea');
    }

    /**
     * Creates an H1 element and appends it to the specified parent element.
     * @param {string} title - The text content of the H1 element.
     * @param {string} parentId - The ID of the parent element to append the H1 to.
     */
    createH1(title, parentId) {
        const h1 = document.createElement("h1");
        const parentElement = document.getElementById(parentId);
        h1.innerText = title;
        h1.className = "header mt-4";
        parentElement.appendChild(h1);
    }

    /**
     * Creates an H2 element and appends it to the specified parent element.
     * @param {string} title - The text content of the H2 element.
     * @param {string} parentId - The ID of the parent element to append the H2 to.
     * @param {string} classH2 - The CSS class to be applied to the H2 element.
     */
    createH2(title, parentId, classH2) {
        const h2 = document.createElement("h2");
        const parentElement = document.getElementById(parentId);
        h2.innerText = title;
        h2.className = classH2;
        parentElement.appendChild(h2);
    }

    /**
     * Creates a paragraph (P) element and appends it to the specified parent element.
     * @param {string} text - The text content of the paragraph.
     * @param {string} classP - The CSS class to be applied to the paragraph.
     * @param {string} parentId - The ID of the parent element to append the P to.
     */
    createP(text, classP, parentId) {
        const parentElement = document.getElementById(parentId);
        const paragraphElement = document.createElement("p");
        paragraphElement.innerText = text;
        paragraphElement.className = classP;
        parentElement.append(paragraphElement);
    }

    /**
     * Creates a paragraph (P) element with an ID and appends it to the specified parent element.
     * @param {string} text - The text content of the paragraph.
     * @param {string} id - The ID to be applied to the paragraph.
     * @param {string} classP - The CSS class to be applied to the paragraph.
     * @param {string} parentId - The ID of the parent element to append the P to.
     */
    createPWithId(text, id, classP, parentId) {
        const parentElement = document.getElementById(parentId);
        const paragraphElement = document.createElement("p");
        paragraphElement.innerText = text;
        paragraphElement.className = classP;
        paragraphElement.id = id;
        parentElement.append(paragraphElement);
    }

    /**
     * Creates a span element and appends it to the specified parent element.
     * @param {string} text - The text content of the span.
     * @param {string} classSpan - The CSS class to be applied to the span.
     * @param {string} id - The ID to be applied to the span.
     * @param {string} parentId - The ID of the parent element to append the span to.
     */
    createSpan(text, classSpan, id, parentId) {
        const parentElement = document.getElementById(parentId);
        const spanElement = document.createElement("span");
        spanElement.innerText = text;
        spanElement.className = classSpan;
        spanElement.id = id;
        parentElement.append(spanElement);
    }

    /**
     * Creates a div element with a given ID and class, and appends it to the main area.
     * @param {string} divId - The ID to be applied to the div element.
     * @param {string} divClass - The CSS class to be applied to the div element.
     * @returns {HTMLDivElement} The created div element.
     */
    createDiv(divId, divClass) {
        const div = document.createElement("div");
        if (divClass) div.className = divClass;
        if (divId) div.id = divId;
        this.#mainArea.appendChild(div);
        return div;
    }

    /**
     * Creates a div element with a given ID and class, and appends it to a specified parent element.
     * @param {string} divId - The ID to be applied to the div element.
     * @param {string} divClass - The CSS class to be applied to the div element.
     * @param {string} parentId - The ID of the parent element to append the div to.
     * @returns {HTMLDivElement} The created div element.
     */
    createAndAppendDiv(divId, divClass, parentId) {
        const parentElement = document.getElementById(parentId);
        const div = document.createElement("div");
        if (divClass) div.className = divClass;
        if (divId) div.id = divId;
        parentElement.appendChild(div);
        return div;
    }

    /**
     * Creates a container with two sub-containers (left and right), appends it to the main area.
     * @param {string} id - The ID prefix for the left and right containers.
     */
    createDoubleContainer(id) {
        const row = this.createDiv(id + "row", "row");
        this.#mainArea.append(row);
        const leftContainer = this.createDiv(id + "-left", "col-xl-6");
        const rightContainer = this.createDiv(id + "-right", "col-xl-6");
        row.append(leftContainer);
        row.append(rightContainer);
    }

    /**
     * Adds an icon to the first H1 element on the page.
     * @param {string} [className="fas fa-star"] - The class for the icon to be added (default is a star icon).
     */
    addIconToHeading(className = "fas fa-star") {
        const icon = document.createElement("i");
        icon.className = className;
        const heading = document.querySelector("h1");
        const span = document.createElement("span");
        span.innerText = " ";
        heading.prepend(span);
        heading.prepend(icon);
    }

    /**
     * Creates a card with a header, icon, and body, and appends it to a specified container.
     * @param {string} element - The ID of the container to append the card to.
     * @param {string} header - The text to be displayed in the card header.
     * @param {string} id - The ID to be applied to the card.
     * @param {string} iconName - The name of the icon to be displayed in the card header.
     */
    createCardChart(element, header, id, iconName) {
        const container = document.getElementById(element);
        const card = this.createDiv("card-" + id, "card mb-4");
        container.append(card);
        const cardHeader = this.createDiv("card-header-" + id, "card-header");
        const icon = document.createElement("i");
        icon.className = `fas fa-${iconName} me-1`;
        cardHeader.append(icon);
        cardHeader.append(header);
        card.append(cardHeader);
        const cardBody = this.createDiv(id, "card-body");
        card.append(cardBody);
    }

    /**
     * Creates a table and appends it to the specified container.
     * @param {string} element - The ID of the container to append the table to.
     * @param {string} id - The ID to be applied to the table.
     * @returns {HTMLTableElement} The created table element.
     */
    createTable(element, id) {
        const el = document.getElementById(element);
        const table = document.createElement("table");
        table.id = id;
        table.classList.add("table-striped");
        el.append(table);
        return table;
    }

    /**
     * Creates a container with four columns, each holding a card for displaying currency data.
     * Appends the container to the main area.
     */
    createActualCurrencyDataContainer() {
        const row = this.createDiv("row-actual-currency", "row");
        this.#mainArea.append(row);
        const firstCol = this.createDiv("curr-firts", "col-xl-3 col-md-6");
        const secondCol = this.createDiv("curr-second", "col-xl-3 col-md-6");
        const thirdCol = this.createDiv("curr-third", "col-xl-3 col-md-6");
        const fourthCol = this.createDiv("curr-fouth", "col-xl-3 col-md-6");

        row.append(firstCol);
        row.append(secondCol);
        row.append(thirdCol);
        row.append(fourthCol);

        const firstCard = this.createDiv("curr-card-firts", "card bg-color-1 text-white mb-4 p-3 text-center");
        const secondCard = this.createDiv("curr-card-seconds", "card bg-color-2 text-white mb-4 p-3 text-center");
        const thirdCard = this.createDiv("curr-card-thirds", "card bg-color-3 text-white mb-4 p-3 text-center");
        const fourthCard = this.createDiv("curr-card-fourth", "card bg-color-6 text-white mb-4 p-3 text-center");

        firstCol.append(firstCard);
        secondCol.append(secondCard);
        thirdCol.append(thirdCard);
        fourthCol.append(fourthCard);
    }
}