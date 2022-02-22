let allChars = [];
// initial password to be empty string so it can be generated dynamically
let password = "";
// password length
let passwordLength = 8;
// initial passwords array will be empty so it can later be populated
let passwordsArray = [];
// UI Elements
let passwordsContainer = document.querySelector(".passwords");
let generatePassBtn = document.querySelector(".password-container__button");
let individualPasswords = Array.from(document.querySelectorAll(".password"));
let passwordSelect = document.querySelector("#password-type");

passwordSelect.addEventListener("change", (e) => {
  // get the currently selected option value
  let selectedOption = e.target.value;
  // populate the allChars array based on the selected option
  getCharactersFromDropdown(selectedOption);
});

// set the for loops based on the option selected
let getCharactersFromDropdown = (selectedOption) => {
  switch (selectedOption) {
    case "uppercase":
      for (let i = 65; i <= 90; i++) {
        allChars.push(String.fromCharCode(i));
      }
      break;
    case "lowercase":
      for (let i = 97; i <= 122; i++) {
        allChars.push(String.fromCharCode(i));
      }
      break;
    case "numbers":
      for (let i = 48; i <= 57; i++) {
        allChars.push(String.fromCharCode(i));
      }
      break;
    case "special":
      for (let i = 33; i <= 47; i++) {
        // skip the below conditions to exclulde single and double quotation symbols
        if (i == 34 || i == 39) continue;
        allChars.push(String.fromCharCode(i));
      }
      break;
    case "aplhanumeric":
      for (let i = 48; i <= 122; i++) {
        // skip the below conditions to get only numbers and alphabets
        if ((i >= 58 && i <= 64) || (i >= 91 && i <= 96)) continue;
        allChars.push(String.fromCharCode(i));
      }
      break;
    case "mixed":
      for (let i = 32; i <= 126; i++) {
        // skip the below conditions to exclulde single and double quotation symbols
        if (i == 34 || i == 39) continue;
        allChars.push(String.fromCharCode(i));
      }
      break;
  }
  return allChars;
};

generatePassBtn.addEventListener("click", () => {
  if (allChars.length !== 0) {
    // loop through how many passwords you want
    for (let k = 1; k <= 4; k++) {
      // loop through the length of the password that you want
      for (let j = 0; j < passwordLength; j++) {
        // generate a random character from the characters array
        let randomChar = Math.floor(Math.random() * allChars.length);
        // and add up to 8 character long
        password += allChars[randomChar];
      }
      // push that 8 character lomg password to the passwords array
      passwordsArray.push(password);
      // after the first password has been generated, initialize it to blank again so a new password can be generated
      password = "";
    }
    // when all the passwords have been pushed to the passwords array, loop through it and return a HTML string that contains the markup for the UI
    let newHTML = passwordsArray.map((pass) => {
      return `<div class="password tooltip">
              <span class="tooltiptext" id="myTooltip">Copy to clipboard</span>
              <input type="text" class="input-text" value=${pass} />
            </div>`;
    });
    passwordsContainer.innerHTML = newHTML.join("").toString();
    // after the first 4 passwords are shown on the UI, reset the passwords array so it can generate new passwords when the user clicks again on the "generate passwords" button
    passwordsArray = [];
    // also empty the characters array
    allChars = [];

    // on focus copy text automatically to clipboard
    let inputTexts = document.querySelectorAll(".tooltip");
    inputTexts.forEach((inputEl) => {
      let tooltipText = inputEl.querySelector("#myTooltip");
      inputEl.querySelector(".input-text").addEventListener("focus", (e) => {
        // select the focused password
        e.target.select();
        // For mobile devices
        e.target.setSelectionRange(0, 99999);
        // Copy the text inside the clipboard
        navigator.clipboard.writeText(e.target.value);
        tooltipText.textContent = "Copied to clipboard";
      });
    });
  }
});
