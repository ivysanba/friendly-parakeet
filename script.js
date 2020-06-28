// Assignment code here
var minLength = 0;
var maxLength = 0;
var lowerCase = false;
var upperCase= false;
var numeric = false;
var specialChar = false;
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var numbers = "0123456789";
var specialChars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
var amountSpecialChar = 0;

var charsSelected= [];

var mandatoryMin = 0;
var passLength = 0;
var password ="";

// console.log(specialChars);

// -----------------------Get references to the #generate element------------------------
var generateBtn = document.querySelector("#generate");

// ----------------------------- Functions created---------------------------------------

//0 -  Reset values
function resetValues(){
  minLength = 0;
  maxLength = 0;
  lowerCase = false;
  upperCase= false;
  numeric = false;
  specialChar = false;
  amountSpecialChar = 0;
  charsSelected= [];
  mandatoryMin = 0;
  passLength = 0;
  password ="";
}

//1 - Ask for min length 
function passMinLength(isCanceled){
  var flag = "Failed";
  while (flag == "Failed") {
    window.minLength = prompt("Please enter an integer number for the minimum length, needs to be at least 8");
    if (minLength === null || minLength < 8) {
      isCanceled = true;
      return isCanceled; //break out of the function early
    }else if (Number.isInteger(parseInt(minLength))){
       flag = "Success";
    } 
  }
};

//2 - Ask for max length
function passMaxLength(isCanceled){
  var flag = "Failed";
  while (flag == "Failed") {
    // console.log(flag);
    window.maxLength = prompt("Please enter an integer number for the maximum length, with a maximum number of 128 and make sure is larger or equal than the minimum length");
    if (maxLength === null || maxLength > 128) {
      isCanceled = true;
      return isCanceled; //break out of the function early
    }else if (Number.isInteger(parseInt(maxLength)) && (parseInt(maxLength) >= parseInt(minLength))){
       flag = "Success";
    } 
  }
};

//3 - Ask for set of special characters to be included
function specialCharacters(){
  var flag = "Failed";
  while (flag == "Failed") {
    alert("Next you need to pick at least one type of character to be included out of the next 4 options.");
    window.lowerCase = confirm("Do you want Lower Case letters in your password?");
    if (lowerCase == true) {
      amountSpecialChar += 1;
    }
    window.upperCase = confirm("Do you want Upper Case letters in your password?");
    if (upperCase == true) {
      amountSpecialChar += 1;
    }
    window.numeric = confirm("Do you want numbers in your password?");
    if (numeric == true) {
      amountSpecialChar += 1;
    }
    window.specialChar = confirm("Do you want special characters in your password?");
    if (specialChar == true) {
      amountSpecialChar += 1;
    }
    if (amountSpecialChar > 0){
      flag = "Success";
    }
  }
};

// 3- Length of the password
function randomizeLength(){
  // The length needs to allow for all the special characters so the min needs to be allow for lal the types
 
  if (minLength < amountSpecialChar){
    mandatoryMin = amountSpecialChar;
  }else{
    mandatoryMin = minLength;
  }

  if (maxLength == minLength){
    passLength = maxLength;
  }else{
    passLength = Math.floor(Math.random() * (parseInt(maxLength) - parseInt(mandatoryMin)) + parseInt(minLength));
  }
};


// 4 - Create password
function createPassword(){
  var i = 0
  while(i < passLength){
    if (lowerCase == true && i < passLength){
      password += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      i+= 1;
    }
    if (upperCase == true && i < passLength){
      var upperCaseLetter = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      password += upperCaseLetter.toUpperCase();
      i+= 1;
    }
    if (numeric == true && i < passLength){
      password += numbers.charAt(Math.floor(Math.random() * numbers.length));
      i+= 1;
    }
    if (specialChar == true && i < passLength){
      password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
      i+= 1;
    } 
  };
  return password;
}
// -----------------------Code calling functions------------------------------------------

function writePassword() {
  // Clear values
  resetValues();
  var isCanceled = false;
  isCanceled = passMinLength(isCanceled );
  if (isCanceled ){
    return;
  }else{
    isCanceled = passMaxLength(isCanceled );
  }
  if (isCanceled ){
    return;
  }else{
    specialCharacters();
  }
  randomizeLength();
  var password = createPassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
};

// -----------------------Add event listener to generate button------------------------------
generateBtn.addEventListener("click", writePassword);