 import {createHome} from "../ui/pages/home/home";
 import {initBudget} from "../ui/pages/budget/budget-main";
 import {initInstruction} from "../ui/pages/instruction/instruction";
 import {initPlaning} from "../ui/pages/investments/planing";
 import {initBruttoNetto} from "../ui/pages/gross-net/gross-net";
 import {initGold} from "../ui/pages/gold/gold";
 import {initCurrencies} from "../ui/pages/currencies/currencies";
 import {initCurrCalculator} from "../ui/pages/curr-calculator/curr-calculator";
 import {initMetals} from "../ui/pages/metals/metals";
 import {fetchAndStoreCurrencies} from "../api/currency-cache";
 import {fetchAndStoreMetals} from "../api/metals-cache";

 /**
  * Initializes event handlers for various buttons on the page.
  * Each button triggers a specific action and updates the content
  * in the main display area of the application.
  */
 export const handlers = () => {
     /**
      * Handles navigation to the Home page.
      * Clears the main area and initializes the Home page.
      */
     const buttHome = document.getElementById("home");
     buttHome.addEventListener("click", (e) => {
         document.getElementById("mainArea").innerHTML = "";
         createHome().catch(console.error);
     });

     /**
      * Handles navigation to the Gold page.
      * Clears the main area and initializes the Gold page.
      */
     const buttGold = document.getElementById("gold");
     buttGold.addEventListener("click", (e) => {
         document.getElementById("mainArea").innerHTML = "";
         initGold().catch(console.error);
     });

     /**
      * Handles navigation to the Currencies page.
      * Clears the main area and initializes the Currencies page.
      */
     const buttCurr = document.getElementById("currency");
     buttCurr.addEventListener("click", (e) => {
         document.getElementById("mainArea").innerHTML = "";
         initCurrencies();
     });

     /**
      * Handles navigation to the Metals page.
      * Clears the main area and initializes the Metals page.
      */
     const buttMetals = document.getElementById("metals");
     buttMetals.addEventListener("click", (e) => {
         document.getElementById("mainArea").innerHTML = "";
         initMetals().catch(console.error);
     });

     /**
      * Handles navigation to the Currency Calculator page.
      * Clears the main area and initializes the Currency Calculator page.
      */
     const buttCurrCalculator = document.getElementById("curr-calculator");
     buttCurrCalculator.addEventListener("click", (e) => {
         document.getElementById("mainArea").innerHTML = "";
         initCurrCalculator().catch(console.error);
     });

     /**
      * Handles navigation to the Budget page.
      * Clears the main area and initializes the Budget page.
      */
     const buttBudget = document.getElementById("budget");
     buttBudget.addEventListener("click", (e) => {
         document.getElementById("mainArea").innerHTML = "";
         initBudget();
     });

     /**
      * Handles navigation to the Gross-Net page.
      * Clears the main area and initializes the Gross-Net page.
      */
     const buttBrutNette = document.getElementById("butto-netto");
     buttBrutNette.addEventListener("click", (e) => {
         document.getElementById("mainArea").innerHTML = "";
         initBruttoNetto();
     });

     /**
      * Handles navigation to the Instructions page.
      * Clears the main area and initializes the Instructions page.
      */
     const buttIns = document.getElementById("instruction");
     buttIns.addEventListener("click", (e) => {
         document.getElementById("mainArea").innerHTML = "";
         initInstruction();
     });

     /**
      * Handles navigation to the Planning page.
      * Clears the main area and initializes the Planning page.
      */
     const buttPlan = document.getElementById("plannig");
     buttPlan.addEventListener("click", async (e) => {
         document.getElementById("mainArea").innerHTML = "";
         await fetchAndStoreCurrencies().catch(error => {console.log(error);})
         await fetchAndStoreMetals().catch(error => {console.log(error);})
         initPlaning().catch(console.error);
     });
 };