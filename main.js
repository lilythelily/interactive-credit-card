"use strict";

const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const expInputs = [inputs[2], inputs[3]];
const expError = document.querySelector("#exp-error");
const reg = /^\s*(\d\s*){16}$/;
const reg2 = /^\d{2}$/;
const reg3 = /^\s*(\d\s*){3}$/;
const cardNumber = document.querySelector(".card-number");
const cardName = document.querySelector(".card-name");
const cardMm = document.querySelector(".card-mm");
const cardYy = document.querySelector(".card-yy");
const cardCvc = document.querySelector(".back-cvc");
const thanksModal = document.querySelector("#thanks-modal");
const cardFront = document.querySelector(".card-front");
const cardBack = document.querySelector(".card-back");

// ***** dynamically insert values into the card

// card name

function insertName() {
  cardName.innerHTML = inputs[0].value;
}

// card number
function insertValues() {
  const inputNumber = inputs[1].value;
  const formattedNumber = formatCardNumber(inputNumber);
  cardNumber.innerHTML = formattedNumber;
}

function formatCardNumber(input) {
  const digitsOnly = input.replace(/\D/g, "");
  const segments = [];
  for (let i = 0; i < digitsOnly.length; i += 4) {
    segments.push(digitsOnly.slice(i, i + 4));
  }
  return segments.join(" ");
}

// expiration
function insertExp() {
  const month = inputs[2].value;
  cardMm.innerHTML = month;
}

function insertYear() {
  const year = inputs[3].value;
  cardYy.innerHTML = year;
}

function formatExp() {
  const mm = inputs[2].value;
  const yy = inputs[3].value;

  inputs[2].value = mm.length === 1 ? "0" + mm : mm.slice(0, 2);
  inputs[3].value = yy.length === 1 ? "0" + yy : yy.slice(0, 2);
}

// cvc

function insertCvc() {
  cardCvc.innerHTML = inputs[4].value;
}

// ***** form validation

let validForm = true;

// cardholder name

function nameEmptyCheck() {
  if (inputs[0].value == "") {
    inputs[0].nextElementSibling.classList.remove("hidden");
    inputs[0].nextElementSibling.textContent = `Can't be blank`;
    inputs[0].style.borderColor = "hsl(0, 100%, 66%)";
    validForm = false;
  } else {
    inputs[0].nextElementSibling.classList.add("hidden");
    inputs[0].style.borderColor = "lime";
    validForm = true;
  }
}

// card number

function numberEmptyCheck() {
  if (inputs[1].value == "") {
    inputs[1].nextElementSibling.classList.remove("hidden");
    inputs[1].nextElementSibling.textContent = `Can't be blank`;
    inputs[1].style.borderColor = "hsl(0, 100%, 66%)";
    validForm = false;
  } else if (!reg.test(inputs[1].value.trim())) {
    inputs[1].nextElementSibling.classList.remove("hidden");
    inputs[1].nextElementSibling.textContent = `Wrong format, must be 16 digits`;
    inputs[1].style.borderColor = "hsl(0, 100%, 66%)";
    validForm = false;
  } else {
    inputs[1].nextElementSibling.classList.add("hidden");
    inputs[1].style.borderColor = "lime";
  }
}

// expiration

function expNanCheck() {
  expInputs.forEach((input) => {
    if (input.value == "") {
      expError.classList.remove("hidden");
      input.style.borderColor = "hsl(0, 100%, 66%)";
      expError.textContent = `Can't be empty`;
      validForm = false;
    } else if (!reg2.test(input.value.trim())) {
      expError.classList.remove("hidden");
      input.style.borderColor = "hsl(0, 100%, 66%)";
      expError.textContent = `Wrong format, must be 2 digits`;
      validForm = false;
    } else if (input.value.trim().length > 2) {
      expError.classList.remove("hidden");
      input.style.borderColor = "hsl(0, 100%, 66%)";
      expError.textContent = `Wrong format, must be 2 digits`;
      validForm = false;
    } else {
      expError.classList.add("hidden");
      input.style.borderColor = "lime";
    }
  });
}

// cvc check

function cvcCheck() {
  if (inputs[4].value == "") {
    inputs[4].nextElementSibling.classList.remove("hidden");
    inputs[4].nextElementSibling.textContent = `Can't be blank`;
    inputs[4].style.borderColor = "hsl(0, 100%, 66%)";
    validForm = false;
  } else if (!reg3.test(inputs[4].value.trim())) {
    inputs[4].nextElementSibling.classList.remove("hidden");
    inputs[4].nextElementSibling.textContent = `Wrong format,  must be 3 digits`;
    inputs[4].style.borderColor = "hsl(0, 100%, 66%)";
    validForm = false;
  } else {
    inputs[4].nextElementSibling.classList.add("hidden");
    inputs[4].style.borderColor = "lime";
  }
}

// show thank you modal

function showThanks() {
  if (validForm == true) {
    thanksModal.style.display = "flex";
    form.classList.add("hidden");
  }
}
// cards dropshadow
function cardShadow() {
  cardFront.style.boxShadow = "rgba(0, 0, 0, 0.6) 0px 3px 8px";
  cardBack.style.boxShadow = "rgba(0, 0, 0, 0.6) 0px 3px 8px";
}
// events

// real-time formatting

inputs[1].addEventListener("input", () => {
  const formattedNumber = formatCardNumber(inputs[1].value);
  inputs[1].value = formattedNumber;
});

// form submission

form.addEventListener("submit", (e) => {
  e.preventDefault();
  insertName();
  insertValues();
  insertExp();
  formatExp(expInputs);
  insertYear();
  insertCvc();
  nameEmptyCheck();
  numberEmptyCheck();
  expNanCheck();
  cvcCheck();
  showThanks();
  cardShadow();
});
