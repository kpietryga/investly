import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../css/style.scss'
import {createHome} from "./ui/pages/home/home";
import {toggleMenu} from "./ui/components/toggle-menu";
import {handlers} from "./handlers/handlers";
import {clock} from "./services/instances";

/**
 * The main function that initializes the application.
 * - Toggles the menu visibility.
 * - Initializes and updates the current time.
 * - Creates the home page and handles errors.
 * - Sets up event handlers for the application.
 */

 const main = () => {
     toggleMenu()
     clock.generateTime()
     createHome().catch(error => console.log(error))
     handlers()
 }

 main()



