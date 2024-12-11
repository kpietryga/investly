/**
 * This module initializes and exports various services and components
 * used in the application, such as budget management, currency calculations,
 * storage interactions, and investment planning.
 */

import GrossNetService from "./gross-net-service";
import { BudgetService } from "./budget-service";
import StorageService from "./storage-service";
import Form from "../ui/components/form";
import BasicComponents from "../ui/components/basic-components";
import CurrCalculatorService from "./curr-calculator-service";
import PlaningService from "./planing-service";
import Time from "../ui/components/time";
import BugetSumary from "../ui/pages/budget/buget-sumary";

/** UI component for handling forms. */
export const formComponents = new Form();

/** Basic reusable UI components. */
export const basicComponents = new BasicComponents();

/** Local storage service for managing income data. */
const incomesStorage = new StorageService(BudgetService.INCOMES);

/** Local storage service for managing outgoing data. */
const outgoingStorage = new StorageService(BudgetService.OUTGOINGS);

/** Budget service for managing income and outgoing data. */
export const budgetService = new BudgetService(incomesStorage, outgoingStorage);

/** Service for currency-related calculations. */
export const currCalcService = new CurrCalculatorService();

/** Service for gross-to-net and net-to-gross conversions. */
export const grossNetServices = new GrossNetService();

/** Local storage service for managing investment data. */
const investStorage = new StorageService("investments");

/** Local storage service for managing metal rates data. */
export const metalsStorage = new StorageService("metals");

/** Local storage service for managing today's currency rates. */
export const currencyStorage = new StorageService("currencies-today");

/** Local storage service for managing archived investments. */
const archiveStorage = new StorageService("archives-investments");

/** Planning service for managing investments, metals, currencies, and archives. */
export const planingService = new PlaningService(investStorage, metalsStorage, currencyStorage, archiveStorage);

/** Planning service for sumary budget. */
export const budgetSumary = new BugetSumary();

/** Data and time service **/
export const clock = new Time