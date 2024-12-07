import date from 'date-and-time';

export default class Time {

    /**
     * Updates the clock element with the current time (hours, minutes, and seconds).
     * The time is formatted to always display two digits for minutes and seconds if less than 10.
     * This function is used in the interval to update the time every second.
     * @private
     */
    #clock() {
        const time = new Date();
        const godzina = time.getHours();
        const min = time.getMinutes();
        const sek = time.getSeconds();
        document.getElementById("clock").innerHTML = "" + godzina +
            ((min < 10) ? ":0" : ":") + min +
            ((sek < 10) ? ":0" : ":") + sek;
    }

    /**
     * Updates the date element with the current date in 'DD/MM/YYYY' format.
     * This function is called once when generating the time, but doesn't update dynamically like the clock.
     * @private
     */
    #createDate() {
        const now = new Date();
        //document.getElementById("day").innerHTML = date.format(now, 'dddd'); // Optionally display the weekday
        document.getElementById("date").innerHTML = date.format(now, 'DD/MM/YYYY  ');
    }

    /**
     * Initializes the clock and date updates.
     * Sets an interval to call the #clock function every second to update the time in real-time.
     * Calls the #createDate function to set the current date once when the component is initialized.
     */
    generateTime() {
        setInterval(this.#clock, 1000); // Update the clock every second
        this.#createDate(); // Set the initial date
    }
}