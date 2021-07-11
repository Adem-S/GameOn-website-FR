function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalForm = document.querySelector(".modal-form");
const modalConfirmation = document.querySelector(".modal-confirmation");
const modalBtn = document.querySelectorAll(".modal-btn:not(.btn-confirm)");
const confirmBtn = document.querySelector(".btn-confirm");
const formData = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelectorAll(".modal-close-btn");
const form = document.forms["reserve"];

//regex
let regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let regexDate = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
let regexName = /^[-'a-zA-ZÀ-ÖØ-öø-ÿ]+$/;

// launch modal event
modalBtn.forEach((btn) =>
  btn.addEventListener("click", () => launchModal(modalForm))
);

confirmBtn.addEventListener("click", (e) => closeModal(e.target));

modalCloseBtn.forEach((btn) =>
  btn.addEventListener("click", (e) => closeModal(e.target))
);

// launch modal form
function launchModal(modal) {
  window.scroll(0, 0);
  document.documentElement.style.overflow = "hidden";
  modal.style.display = "block";
}

// close modal form
function closeModal(value) {
  document.documentElement.style.overflow = "visible";
  value.closest(".bground").style.display = "none";
}

// event submit form
form.addEventListener("submit", function (e) {
  e.preventDefault();
  //Get all input
  let names = this.querySelectorAll("input[name='names']");
  let email = this.querySelectorAll("input[name='email']");
  let number = this.querySelectorAll("input[type='number']");
  let radio = this.querySelectorAll("input[type='radio']");
  let date = this.querySelectorAll("input[name='birthdate']");
  let condition = this.querySelectorAll("#checkbox1");

  //Check input value and add class error
  verifyLength(number, 1);
  verifyChecked(radio);
  verifyChecked(condition);
  verifyLength(names, 2) ? verifyValue(names, regexName) : null;
  verifyValue(email, regexEmail);
  verifyValue(date, regexDate);

  //Check result form
  if (this.querySelectorAll("[data-error-visible = 'true']").length > 0) {
    return false;
  } else {
    closeModal(modalForm);
    launchModal(modalConfirmation);
    this.reset();
    return true;
  }
});

// check lenght of input
function verifyLength(elements, number, number2 = 100) {
  let array = [];
  elements.forEach((element) => {
    if (element.value.length >= number && element.value.length <= number2) {
      array.push(element);
      errorVisible(element, false);
    } else {
      errorVisible(element, true);
    }
  });
  return array.length === elements.length;
}

// check if value input is valid
function verifyValue(elements, regex) {
  let array = [];
  elements.forEach((element) => {
    if (regex.test(element.value)) {
      array.push(element);
      errorVisible(element, false);
    } else {
      errorVisible(element, true);
    }
  });
  return array.length === elements.length;
}

// verify if an element is checked
function verifyChecked(elements) {
  let array = [];
  elements.forEach((element) => {
    if (element.checked) {
      array.push(element);
    }
  });
  if (array.length === 1) {
    errorVisible(elements[0], false);
    return true;
  } else {
    errorVisible(elements[0], true);
    return false;
  }
}

// change data-error-visible value
function errorVisible(element, action) {
  element.parentNode.dataset.errorVisible = action;
}
