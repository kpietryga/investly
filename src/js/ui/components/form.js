/**
 * Class for creating and managing form elements dynamically.
 * This class includes methods to create form elements such as input fields, radio buttons, labels, selects, and buttons.
 */
export default class Form {

    /**
     * Creates a form element and appends it to the specified parent element.
     * @param {string} id - The ID of the form element.
     * @param {string} parentId - The ID of the parent element where the form will be appended.
     * @param {string} [classForm="form"] - The class to be applied to the form element.
     */
    createForm(id, parentId, classForm = "form") {
        const parent = document.getElementById(parentId);
        const form = document.createElement("form");
        form.id = id;
        form.className = classForm;
        parent.append(form);
    }

    /**
     * Creates a div element inside a form and appends it to the specified parent element.
     * @param {string} id - The ID of the div element.
     * @param {string} divClass - The class to be applied to the div element.
     * @param {string} parentId - The ID of the parent element where the div will be appended.
     */
    createFormDiv(id, divClass, parentId){
        const parent = document.getElementById(parentId);
        const div = document.createElement("div");
        div.id = id;
        div.className = divClass;
        parent.append(div);
    }

    /**
     * Creates a label element and appends it to the specified parent element.
     * @param {string} text - The text content for the label.
     * @param {string} id - The ID of the label element.
     * @param {string} parentId - The ID of the parent element where the label will be appended.
     * @param {string} forElement - The ID of the element this label is for.
     * @param {string} [className="form-label"] - The class to be applied to the label element.
     */
    createLabel(text, id, parentId, forElement, className="form-label"){
        const parent = document.getElementById(parentId);
        const label = document.createElement("label");
        label.id = id;
        label.className = className;
        label.innerHTML = text;
        label.for = forElement;
        parent.append(label);
    }

    /**
     * Creates an input field and appends it to the specified parent element.
     * @param {string} id - The ID of the input field.
     * @param {string} type - The type of the input field (e.g., text, password, etc.).
     * @param {string} classInput - The class to be applied to the input field.
     * @param {string} parentId - The ID of the parent element where the input field will be appended.
     * @param {string} placeholder - The placeholder text for the input field.
     */
    createInput(id, type, classInput, parentId, placeholder) {
        const input = document.createElement("input");
        const parent = document.getElementById(parentId);
        input.id = id;
        input.type = type;
        input.className = classInput;
        input.placeholder = placeholder;
        parent.appendChild(input);
    }

    /**
     * Creates a number input field with specific attributes and appends it to the specified parent element.
     * @param {string} id - The ID of the input field.
     * @param {string} classInput - The class to be applied to the input field.
     * @param {string} parentId - The ID of the parent element where the input field will be appended.
     */
    createNumberInput(id, classInput, parentId) {
        const input = document.createElement("input");
        const parent = document.getElementById(parentId);
        input.id = id;
        input.type = "number";
        input.className = classInput;
        input.min = '0';
        input.step = "0.01";
        input.name = "amount";
        input.setAttribute("required", "true");
        parent.appendChild(input);
    }

    /**
     * Creates a select dropdown and appends it to the specified parent element.
     * @param {string} id - The ID of the select element.
     * @param {string} classInput - The class to be applied to the select element.
     * @param {string} parentId - The ID of the parent element where the select element will be appended.
     * @param {Array<string>} options - An array of option values and texts to be included in the select dropdown.
     */
    createSelect(id, classInput, parentId, options) {
        const select = document.createElement("select");
        const parent = document.getElementById(parentId);
        select.id = id;
        select.className = classInput;

        options.forEach(optionText => {
            const option = document.createElement("option");
            option.value = optionText;
            option.textContent = optionText;
            select.appendChild(option);
        });

        parent.appendChild(select);
    }

    /**
     * Creates a radio button with a label and appends it to the specified parent element.
     * @param {string} id - The ID of the radio button.
     * @param {string} name - The name attribute for the radio button group.
     * @param {string} value - The value of the radio button.
     * @param {string} labelText - The label text for the radio button.
     * @param {string} parentId - The ID of the parent element where the radio button will be appended.
     */
    createRadioButton(id, name, value, labelText, parentId) {
        const parent = document.getElementById(parentId);
        const label = document.createElement("label");
        const radio = document.createElement("input");
        const breakLine = document.createElement("br");

        radio.type = "radio";
        radio.id = id;
        radio.name = name;
        radio.value = value;

        label.appendChild(radio);
        label.appendChild(document.createTextNode(` ${labelText}`));

        parent.appendChild(label);
        parent.appendChild(breakLine);
    }

    /**
     * Creates a button and appends it to the specified parent element.
     * @param {string} id - The ID of the button.
     * @param {string} classButton - The class to be applied to the button.
     * @param {string} text - The text content of the button.
     * @param {string} type - The type of the button (e.g., submit, button, etc.).
     * @param {string} parentId - The ID of the parent element where the button will be appended.
     */
    createButton(id, classButton, text, type, parentId) {
        const button = document.createElement("button");
        const parent = document.getElementById(parentId);
        button.id = id;
        button.innerHTML = text;
        button.className = classButton;
        button.type = type;
        parent.append(button);
    }

    /**
     * Retrieves the value of the selected radio button and displays it.
     * If no radio button is selected, displays a default message.
     * @returns {string|null} The value of the selected radio button or null if none is selected.
     */
    getRadioValue() {
        const radios = document.querySelectorAll('input[type="radio"]');
        let selectedValue = null;

        radios.forEach((radio) => {
            if (radio.checked) {
                selectedValue = radio.value;
            }
        });

        document.getElementById('output').textContent = selectedValue ? `${selectedValue}` : 'Nie wybrano żadnej opcji.';

        return selectedValue;
    }
}