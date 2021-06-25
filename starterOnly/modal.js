function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelector(".modal-close-btn");
const form = document.forms["reserve"];

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalCloseBtn.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// event submit form
form.addEventListener("submit", function (e) {
  //Get all input
  let names = this.querySelectorAll("input[type='text']");
  let email = this.querySelectorAll("input[type='email']");
  let number = this.querySelectorAll("input[type='number']");
  let radio = this.querySelectorAll("input[type='radio']");
  let date = this.querySelectorAll("input[type='date']");
  let condition = this.querySelectorAll("#checkbox1");

  //Check input value and add class error
  verifyLength(names, 2);
  onlyLetters(names);
  verifyLength(email, 3);
  verifyLength(number, 1);
  verifyLength(date, 8, 10);
  verifyChecked(radio);
  verifyChecked(condition);

  //Check result form
  if (this.querySelectorAll(".errorForm").length > 0) {
    e.preventDefault();
    return false;
  } else {
    return true;
  }
});

// check lenght of input
function verifyLength(elements, number, number2 = 100) {
  let array = [];
  elements.forEach((element) => {
    if (element.value.length >= number && element.value.length <= number2) {
      array.push(element);
      classError(element, "remove");
    } else {
      classError(element, "add");
    }
  });
  return array.length === elements.length;
}

// check if input contains only letters
function onlyLetters(elements) {
  let array = [];
  let regex = /^[-'a-zA-ZÀ-ÖØ-öø-ÿ]+$/;
  elements.forEach((element) => {
    if (regex.test(element.value)) {
      array.push(element);
      classError(element, "remove");
    } else {
      classError(element, "add");
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
    classError(elements[0], "remove");
    return true;
  } else {
    classError(elements[0], "add");
    return false;
  }
}

//add or remove class errorForm
function classError(element, action) {
  element.parentNode.classList[action]("errorForm");
}
