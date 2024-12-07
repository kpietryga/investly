import {basicComponents} from "../../../services/instances";

/**
 * Initializes the instruction section of the application by creating
 * and adding HTML elements to display a user guide for using the app.
 * The guide includes sections on budgeting, investing, and financial reports.
 */

export const initInstruction = () => {

    // Create a main heading and add an icon to it
    basicComponents.createH1("Istrukcja", "mainArea");
    basicComponents.addIconToHeading("fas fa-book color-2")

    basicComponents.createP("W razie problemów z korzystaniem z aplikacji, skontaktuj się z działem wsparcia technicznego poprzez zakładkę „Pomoc” lub wysyłając wiadomość na adres support@krzysztof-pietryga.com.pl.", "alert alert-success m-0 mb-4 alert-dismissible fade show", "mainArea")

    // Create a container div for the instructions content
    const div = basicComponents.createDiv("ins-cointainer", "ins-cointainer")

    // Add detailed instructions about using the app for budgeting, investing, and reports
    div.innerHTML = `
    <h2>1. Wprowadzenie</h2>
    <p>Aplikacja webowa służy do zarządzania osobistym budżetem oraz inwestycjami w różne aktywa, takie jak złoto, metale, obligacje i inne. Umożliwia monitorowanie dochodów, wydatków, oszczędności oraz planowanie inwestycji w oparciu o aktualny stan finansów.</p>

    <h2>2. Ustawienia budżetu</h2>
    <ol>
        <li>Dodaj źródła dochodów – w zakładce "Budżet" wprowadź wszystkie swoje regularne źródła dochodów (np. pensja, dochody pasywne).</li>
        <li>Dodaj wydatki – w tej samej sekcji wprowadź swoje stałe miesięczne wydatki (np. czynsz, rachunki, jedzenie).</li>
        <li>Zdefiniuj cele oszczędnościowe – ustaw cel oszczędzania, który aplikacja pomoże Ci monitorować.</li>
    </ol>

    <h2>3. Inwestowanie</h2>
    <ol>
        <li>Zakładka „Inwestycje” – w tej sekcji znajdziesz dostępne opcje inwestycyjne:
            <ul>
                <li>Złoto</li>
                <li>Fundusze inwestycyjne</li>
                <li>Obligacje</li>
                <li>Akcje</li>
                <li>Kryptowaluty</li>
            </ul>
        </li>
        <li>Dodaj kwotę inwestycji – wybierz interesujący Cię instrument finansowy i wprowadź kwotę, którą chcesz zainwestować. Aplikacja wyświetli szacowane zyski na podstawie aktualnych danych rynkowych.</li>
        <li>Śledzenie inwestycji – aplikacja automatycznie aktualizuje wartość Twojego portfela inwestycyjnego, informując Cię o zmianach wartości posiadanych aktywów.</li>
    </ol>

    <h2>4. Raporty finansowe</h2>
    <ol>
        <li>Analiza budżetu – w zakładce „Raporty” znajdziesz szczegółowe podsumowanie Twoich wydatków, oszczędności i dochodów w wybranym okresie (tydzień, miesiąc, rok).</li>
        <li>Historia inwestycji – aplikacja oferuje przegląd Twoich dotychczasowych inwestycji, ich wzrostu lub spadku wartości, a także sugeruje ewentualne zmiany w portfelu inwestycyjnym.</li>
    </ol>`

    document.getElementById("mainArea").appendChild(div)
}


