// Affichage du menu de navigation lors des formats tablettes et mobiles
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
const modalContent = document.querySelector(".content");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModalBtn = document.querySelectorAll(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeModalBtn.forEach((btn) => btn.addEventListener("click", closeModal));
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal
function closeModal() {
  modalContent.animate([
    // step/keyframes
    {opacity: "0"}
    
  ], {
    // temporisation
    duration: 1000
  });
  setTimeout(function(){
    modalbg.style.display = "none";
  },900);  
  if (sessionStorage.getItem("validate")) {
    window.location.reload();
  }
}