import {fetchAndStoreMetals} from "../../../api/metals-cache";
import {basicComponents, metalsStorage} from "../../../services/instances";

/**
 * Initializes the metals investment section by dynamically creating the HTML structure for metals
 * and their respective investment data. It fetches the metal data using the `fetchAndStoreMetals`
 * function and stores it in `metalsStorage`. The function creates the overall layout of the page,
 * including:
 * - An introductory header and text explaining metals investments.
 * - A container for displaying metal cards.
 * - A hidden section for showing detailed investment data when a metal is selected.
 */
export const initMetals = async () => {

    basicComponents.createH1("Metale", "mainArea")
    basicComponents.addIconToHeading("fa-solid fa-medal color-2")
    basicComponents.createP(`Ceny metali szlachetnych`, "alert alert-success m-0 mb-4 alert-dismissible fade show", "mainArea")
    basicComponents.createP(`Dwiedz się wiecej na temat inwestycji w metale klikjąc w przycisk "Zobacz dane inwestycyjne"`, "alert alert-success m-0 mb-4 alert-dismissible fade show", "mainArea")
    basicComponents.createDiv("metals-cotainer", "container my-5")
    basicComponents.createAndAppendDiv("grid-container", "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4", "metals-cotainer")
    basicComponents.createDiv("investment-info-container", "mt-5 p-3 border rounded bg-light d-none mb-5")
    basicComponents.createH2("Dane inwestycyjne", "investment-info-container", "investment-title")
    basicComponents.createPWithId("Wybierz metal, aby zobaczyć szczegóły inwestycyjne.", "investment-data", "", "investment-info-container")

    await fetchAndStoreMetals()

    const metals = [
        {
            name: 'Aluminium',
            value: metalsStorage.findOne("aluminium"),
            icon: 'fa-bolt',
            color: 'text-primary',
            investmentData: 'Aluminium jest szeroko wykorzystywane w przemyśle motoryzacyjnym, lotniczym oraz budowlanym. Jego wartość inwestycyjna jest umiarkowana z powodu stabilnego popytu, ale potencjalne innowacje w produkcji mogą zwiększyć jego znaczenie na rynku. Inwestycje w aluminium są stabilne, ale wrażliwe na zmiany globalnych cen energii, ponieważ produkcja wymaga dużych nakładów energii.'
        },
        {
            name: 'Miedź',
            value: metalsStorage.findOne("miedź"),
            icon: 'fa-coins',
            color: 'text-success',
            investmentData: 'Miedź jest kluczowym metalem w przemyśle elektrycznym, budownictwie oraz w produkcji pojazdów elektrycznych. Jej cena waha się w zależności od globalnego zapotrzebowania, rozwoju technologii i zmian w polityce klimatycznej. Rośnie zainteresowanie recyklingiem miedzi, co może wpływać na długoterminowy popyt i podaż na rynku.'
        },
        {
            name: 'Ołów',
            value: metalsStorage.findOne("ołów"),
            icon: 'fa-anchor',
            color: 'text-secondary',
            investmentData: 'Ołów znajduje szerokie zastosowanie w produkcji akumulatorów, zwłaszcza w motoryzacji. Jego inwestycyjna atrakcyjność jest ograniczona przez obawy o środowisko oraz spadający popyt na tradycyjne akumulatory. Ołów jest metalem o niskiej dynamice wzrostu, a jego cena jest wrażliwa na zmiany regulacji środowiskowych.'
        },
        {
            name: 'Nikiel',
            value: metalsStorage.findOne("nikiel"),
            icon: 'fa-cog',
            color: 'text-danger',
            investmentData: 'Nikiel jest niezbędny w produkcji stali nierdzewnej oraz baterii do pojazdów elektrycznych. Popyt na ten metal rośnie wraz z ekspansją rynku EV, co czyni go jednym z bardziej dynamicznych metali. Ceny niklu mogą być niestabilne w zależności od dostępności surowca i wahań w produkcji baterii.'
        },
        {
            name: 'Palad',
            value: metalsStorage.findOne("palad"),
            icon: 'fa-gem',
            color: 'text-info',
            investmentData: 'Palad jest szeroko wykorzystywany w przemyśle motoryzacyjnym, szczególnie w produkcji katalizatorów. Jego cena wzrosła w ostatnich latach z powodu wzrastającego zapotrzebowania, zwłaszcza w krajach rozwijających się. Jako metal rzadki, palad ma także potencjał w długoterminowych inwestycjach, ale jego ceny mogą być niestabilne, zależnie od globalnego zapotrzebowania na samochody.'
        },
        {
            name: 'Platyna',
            value: metalsStorage.findOne("platyna"),
            icon: 'fa-diamond',
            color: 'text-dark',
            investmentData: 'Platyna znajduje zastosowanie głównie w przemyśle motoryzacyjnym oraz jubilerstwie. Jest mniej popularna niż złoto, ale może stanowić dobrą alternatywę inwestycyjną. Jest metalem bardziej zmiennym, a jego cena w dużej mierze zależy od popytu w przemyśle motoryzacyjnym i zastosowań w technologii ekologicznej.'
        },
        {
            name: 'Srebro',
            value: metalsStorage.findOne("srebro"),
            icon: 'fa-snowflake',
            color: 'text-primary',
            investmentData: 'Srebro jest wykorzystywane zarówno w przemyśle, jak i jako inwestycja. Jego wartość zależy od globalnego zapotrzebowania przemysłowego, szczególnie w elektronice, oraz trendów makroekonomicznych. W porównaniu do złota, srebro jest bardziej zmienne, ale także bardziej dostępne, co czyni je interesującym wyborem dla długoterminowych inwestycji.'
        },
        {
            name: 'Cynk',
            value: metalsStorage.findOne("cynk"),
            icon: 'fa-toolbox',
            color: 'text-secondary',
            investmentData: 'Cynk jest szeroko stosowany w budownictwie oraz produkcji ocynkowanych materiałów. Jest to stabilna inwestycja z umiarkowanym wzrostem, ponieważ zapotrzebowanie na cynk jest związane z rozwojem infrastruktury i przemysłu. Ceny cynku mogą wzrastać w okresach intensywnej urbanizacji i rozwoju gospodarczego.'
        },
    ];

    const container = document.getElementById('grid-container');
    const infoContainer = document.getElementById('investment-info-container');
    const infoTitle = document.querySelector('.investment-title');
    const infoData = document.getElementById('investment-data');

    /**
     * Creates an individual card for each metal, including:
     * - A card with the metal's icon, name, value, and a button to view investment details.
     * - The button triggers the display of investment data for the selected metal.
     *
     * @param {Object} metal - The metal data object containing name, value, icon, and color.
     * @returns {HTMLElement} The card element representing a single metal.
     */

    function createCard(metal) {
        const col = document.createElement('div');
        col.className = 'col';

        const card = document.createElement('div');
        card.className = 'card text-center shadow-sm';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const icon = document.createElement('i');
        icon.className = `fas ${metal.icon} ${metal.color} fs-3`;
        cardBody.appendChild(icon);

        const title = document.createElement('h5');
        title.className = 'card-title mt-3';
        title.textContent = metal.name;
        cardBody.appendChild(title);

        const text = document.createElement('p');
        text.className = 'card-text';
        text.textContent = metal.value;
        cardBody.appendChild(text);

        const button = document.createElement('button');
        button.className = 'btn mt-3 bg-color-3 color-5';
        button.textContent = 'Zobacz dane inwestycyjne';
        button.onclick = function() {
            showInvestmentData(metal.name);
        };
        cardBody.appendChild(button);

        card.appendChild(cardBody);
        col.appendChild(card);

        return col;
    }

    /**
     * Displays detailed investment data for the selected metal.
     * It updates the investment data section with the relevant information based on the selected metal.
     *
     * @param {string} metalName - The name of the metal for which to display investment data.
     */

    function showInvestmentData(metalName) {
        const metal = metals.find(m => m.name === metalName);

        infoTitle.textContent = `Dane inwestycyjne dla ${metal.name}`;
        infoData.textContent = metal.investmentData;

        infoContainer.classList.remove('d-none');
    }

    metals.forEach(metal => {
        const card = createCard(metal);
        container.appendChild(card);
    });
}
