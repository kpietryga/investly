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

    basicComponents.createP("W razie problemów z korzystaniem z aplikacji, skontaktuj się z działem wsparcia technicznego wysyłając wiadomość na adres support@pietryga.com.pl.", "alert alert-success m-0 mb-4 alert-dismissible fade show", "mainArea")

    // Create a container div for the instructions content
    const div = basicComponents.createDiv("ins-cointainer", "ins-cointainer")

    // Add detailed instructions about using the app for budgeting, investing, and reports
    div.innerHTML = `<h2>Investly</h2>

    <p><strong>Opis:</strong> Investly to aplikacja do zarządzania budżetem, śledzenia przychodów, wydatków oraz planowania inwestycji. Dzięki aplikacji użytkownicy mogą wprowadzać dane, analizować budżet i zarządzać swoimi funduszami.</p>

    <h2>Kluczowe funkcje:</h2>
    <ul>
        <li>Dodawanie przychodów i wydatków.</li>
        <li>Wyświetlanie i aktualizowanie listy przychodów i wydatków.</li>
        <li>Obliczanie dostępnych środków do inwestycji.</li>
        <li>Podstawowe operacje na budżecie: dodawanie, usuwanie, edytowanie elementów.</li>
        <li>Resetowanie i akceptowanie budżetu.</li>
        <li>Zarządzanie stanem aplikacji poprzez zapis do lokalnej pamięci przeglądarki.</li>
        <li>Śledzenie cen złota i innych metali szlachetnych.</li>
        <li>Wyświetlanie porad inwestycyjnych związanych z metalami szlachetnymi.</li>
        <li>Sprawdzanie aktualnych kursów walut.</li>
        <li>Przeliczanie złotówek na waluty obce i walut na złotówki.</li>
        <li>Przeliczanie kwoty brutto na netto oraz obliczanie VAT.</li>
    </ul>

    <h2>Instrukcje użytkowania:</h2>
    <ol>
        <li>
            <strong>Dodawanie przychodów:</strong>
            <p>Przejdź do sekcji "Przychody". Wpisz nazwę przychodu (np. pensja, premia) oraz kwotę. Kliknij przycisk "Dodaj przychód", aby zapisać dane. Wartość zostanie dodana do całkowitej sumy przychodów.</p>
        </li>
        <li>
            <strong>Dodawanie wydatków:</strong>
            <p>Przejdź do sekcji "Wydatki". Wpisz nazwę wydatku (np. czynsz, media) oraz kwotę. Kliknij przycisk "Dodaj wydatek", aby zapisać dane. Wydatki zostaną odjęte od dostępnych środków na inwestycje.</p>
        </li>
        <li>
            <strong>Podsumowanie budżetu:</strong>
            <p>Podsumowanie budżetu jest automatycznie obliczane po dodaniu nowych danych. Aplikacja wyświetla łączną kwotę przychodów, wydatków oraz bilans dostępnych środków.</p>
        </li>
        <li>
            <strong>Akceptowanie budżetu:</strong>
            <p>Po dodaniu wszystkich danych, kliknij przycisk "Zatwierdź budżet". Spowoduje to zapisanie bieżącego stanu budżetu i wyliczenie dostępnych środków do inwestycji.</p>
        </li>
        <li>
            <strong>Resetowanie budżetu:</strong>
            <p>Jeśli chcesz zacząć od nowa, kliknij przycisk "Wyczyść dane". Spowoduje to usunięcie wszystkich danych z aplikacji, w tym przychodów, wydatków i zapisanych wartości.</p>
        </li>
        <li>
            <strong>Śledzenie cen złota i metali:</strong>
            <p>W aplikacji możesz na bieżąco śledzić ceny złota oraz innych metali szlachetnych, co pozwala na lepsze podejmowanie decyzji inwestycyjnych.</p>
        </li>
        <li>
            <strong>Porady inwestycyjne dotyczące metali szlachetnych:</strong>
            <p>Aplikacja udostępnia porady dotyczące inwestowania w metale szlachetne, takie jak złoto czy srebro, pomagając w podejmowaniu świadomych decyzji inwestycyjnych.</p>
        </li>
        <li>
            <strong>Sprawdzanie cen walut:</strong>
            <p>Możesz na bieżąco sprawdzać aktualne kursy walut, co umożliwia szybsze podejmowanie decyzji finansowych w zależności od zmian na rynku walutowym.</p>
        </li>
        <li>
            <strong>Przeliczanie złotówek na waluty i walut na złotówki:</strong>
            <p>Aplikacja umożliwia łatwe przeliczanie wartości w złotówkach na waluty obce oraz odwrotnie, co ułatwia zarządzanie finansami w różnych walutach.</p>
        </li>
        <li>
            <strong>Przeliczanie VAT i netto:</strong>
            <p>W aplikacji możesz obliczyć kwoty netto i brutto oraz przeliczyć wartość VAT, co jest przydatne w przypadku analizowania kosztów i dochodów.</p>
        </li>
    </ol>

    <h2>Rozwiązywanie problemów:</h2>
    <ul>
        <li>Jeśli budżet nie jest aktualizowany, spróbuj odświeżyć stronę.</li>
        <li>Upewnij się, że wszystkie wymagane pola w formularzach są wypełnione przed ich wysłaniem.</li>
        <li>W przypadku dalszych problemów sprawdź konsolę pod kątem komunikatów o błędach lub zapoznaj się z dokumentacją projektu.</li>
    </ul>

    <h2>Wkład w rozwój projektu:</h2>
    <p>Aby wnieść wkład, forkuj repozytorium, utwórz nową gałąź dla swojej funkcji lub poprawki błędów, a następnie wyślij pull request do przeglądu.</p>

    <h2>Licencja:</h2>
    <p>Projekt Investly jest open-source, a wszelkie wkłady są mile widziane. Szczegóły licencji znajdują się w pliku LICENSE.</p>`

    document.getElementById("mainArea").appendChild(div)
}


