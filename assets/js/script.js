// Assignment Code
const generateBtn = document.querySelector("#generate");
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbersCriteria = "0123456789";
const specialCharCriteria = " !\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";

// generate the list containing the final password criteria
function criteriaGenerator() {
  // object containing the criteria questions confirmation
  const confirmObj = {
    lowercase: confirm("Would you like to include lowercase letters?"),

    uppercase: confirm("Would you like to include uppercase letters?"),

    numbers: confirm("Would you like to include numbers?"),

    specialChar: confirm("Would you like to include special characters?"),
  };
  // initialize the list of criteria
  let finalCriteria = [];

  //iterate over the object keys and values
  for (const [key, value] of Object.entries(confirmObj)) {
    //if one value confirmed add the relevant criteria to the list
    if (key === "lowercase" && value) {
      finalCriteria.push(lowerCaseLetters);
    } else if (key === "uppercase" && value) {
      finalCriteria.push(upperCaseLetters);
    } else if (key === "numbers" && value) {
      finalCriteria.push(numbersCriteria);
    } else if (key === "specialChar" && value) {
      finalCriteria.push(specialCharCriteria);
    }
  }

  return finalCriteria;
}

//random function
function random(firstNumber, lastNumber) {
  return Math.floor(Math.random() * lastNumber + firstNumber);
}

const getPasswordLength = () => {
  // prompt the user with the pass length question
  let passwordLength = prompt(
    "Please enter a password length starting from 8 to 128"
  );

  // initialize loop variables
  let confirmMe = false; //retry confirm variable
  let counter = 0; // loop count variable

  // loop to validate the pass length
  while (
    (passwordLength < 8 && counter < 5) ||
    (passwordLength > 128 && counter < 5)
  ) {
    //increment counter
    counter += 1;

    //check if number of retry was exceeded, 5 is max
    if (counter === 5) {
      alert("Retry count exceeded! Generator Terminated!");

      // return invalid length -1 to trigger stop generator execution later
      return -1;
    } else {
      // ask user if retry or cancel
      confirmMe = confirm("Incorrect password length! Try again or stop?");

      if (confirmMe) {
        // ask for the length
        passwordLength = prompt(
          "Please enter a password length starting from 8 to 128"
        );
      } else {
        //break the loop if cancel
        alert("Generator Session Terminated!");

        // return invalid length -1 to trigger stop generator execution later
        return -1;
      }
    }
  }

  return passwordLength;
};

const getPasswordCriteria = (aLength) => {
  if (aLength != -1) {
    // generate the criteria
    let returnCriteria = criteriaGenerator();

    //if no criteria is selected
    if (returnCriteria.length === 0) {
      //initialize loop counter
      let counter = 0;

      let useConfirm = false;

      //loop to help users select new criteria
      while (returnCriteria.length === 0 && counter < 6) {
        //increment counter
        counter += 1;

        //ask user if he want's to retry imputing the password parameters
        useConfirm = confirm(
          "No password parameters were selected.Do you want to retry?"
        );

        if (useConfirm) {
          //generate new criteria
          returnCriteria = criteriaGenerator();
        } else {
          alert("Session terminated!");
          //return an invalid number that will stop the execution
          return -1;
        }
      }
    } else {
      //return the selected criteria
      return returnCriteria;
    }
  } else {
    return -1;
  }
};

const createRandomPassword = (length, criteria) => {
  //initialize the loop counter
  let counter = 0;

  //the final password
  let password = "";
  if (length != -1 && criteria != -1) {
    //start the loop to generate the password
    while (counter < length) {
      //increment counter
      counter += 1;

      //select a random index
      let randomCriteria = random(0, criteria.length);

      //select the list item and convert to array
      let passwordCriteria = criteria[randomCriteria].split("");

      //generate a random index from the array
      let randomCharacter = random(0, passwordCriteria.length);

      //append the character to the final password
      password = password + passwordCriteria[randomCharacter];
    }
  }
  return password;
};

// main function to generate the random password
const generatePassword = () => {
  // get the password length
  const passwordLength = getPasswordLength();

  // get the password criteria
  const passwordCriteria = getPasswordCriteria(passwordLength);

  // create random password
  const password = createRandomPassword(passwordLength, passwordCriteria);

  return password;
};

// Write password to the #password input
const writePassword = () => {
  const password = generatePassword();
  const passwordText = document.querySelector("#password");

  passwordText.value = password;
};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
