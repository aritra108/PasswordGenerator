// DOM Elements 
const result = document.querySelector('#result');
const generate = document.querySelector('.generate');
const clipboard = document.querySelector('#clipboard');
const messageContainer = document.querySelector('.message-container');
const lengthInput = document.querySelector('#length');
const uppercase = document.querySelector('#uppercase');
const lowercase = document.querySelector('#lowercase');
const number = document.querySelector('#number');
const special = document.querySelector('#special');


// Global Variables 
const specialCharacters = `!@#$%^&*+-*/|:?"()[]<>{}~,.;'_`;
const successMessage = 'Password copied successfully!';
const errorMessage = 'Select at least one option!';

// Events 
generate.addEventListener('click', generatePassword); // When generate button is clicked 
clipboard.addEventListener('click', copyPassword); // When clipboard icon is clicked

// Functions 

function generatePassword(e) {  

    // Find out the options checked and their count  
    let options = [];

    if ( uppercase.checked === true ) options.push('uppercase');
        
    if ( lowercase.checked === true ) options.push('lowercase');
        
    if ( number.checked === true ) options.push('number');
        
    if ( special.checked === true ) options.push('special');
    
    const count = options.length;

    // Get the input length 
    const length = lengthInput.value;

    // If count is 0 or input length is 0, then display an error message 
    if (count === 0) {
        UI.displayMessage(errorMessage, 'error');
        return;
    }
    if (length === 0) return;

    // Iterate over the length 
    let output = '';
    for (let i = 0; i < length; i++) {

        // Generate a random index for the options array 
        const index = Math.floor(Math.random() * count);
        
        // Get a random object 
        if (options[index] === 'uppercase') output += Generate.randomUppercase();
        else if (options[index] === 'lowercase') output += Generate.randomLowercase();
        else if (options[index] === 'number') output += Generate.randomNumber();
        else if (options[index] === 'special') output += Generate.randomSpecial();
    }

    // Display the output 
    UI.displayOutput(output);
}

function copyPassword (e) {

    // Select the input text field 
    result.select();
    result.setSelectionRange(0, 99999); // for mobile devices 

    // Copy the text inside the input field 
    document.execCommand("copy");

    // Display a success message
    if (result.value.length > 0) UI.displayMessage(successMessage, 'success');
}

// Class UI: Handles the DOM
class UI {

    static displayOutput (output) {
        result.value = output;
    }

    static displayMessage (message, type) {

        // Embed the message in a HTML paragraph tag 
        const msg = `
            <p>${message}</p>
        `;

        // Add it to the error container 
        messageContainer.innerHTML = msg;

        // Display it in the DOM
        messageContainer.style.top = '10vh';
        if (type === 'error') messageContainer.style.backgroundColor = 'rgb(235, 64, 64)';
        else messageContainer.style.backgroundColor = 'rgb(76, 187, 76)';
        messageContainer.style.opacity = '1';

        // Reset the styles after 3s
        setTimeout(() => {
            messageContainer.style.top = '-10vh';
            messageContainer.style.opacity = '0';
        }, 3000);
    }

}

// Class Generate: Generates a random object based on it's type 
class Generate {

    // Generates a random uppercase letter 
    static randomUppercase () {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }

    // Generates a random lowercase letter 
    static randomLowercase () {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }

    // Generates a random digit 
    static randomNumber () {
        return Math.floor(Math.random() * 10);
    }

    // Generates a random special character
    static randomSpecial () {
        return specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
    }

}


