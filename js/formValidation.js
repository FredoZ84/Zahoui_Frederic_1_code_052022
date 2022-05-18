let firstName = document.getElementById("first"),
    lastName = document.getElementById("last"),
    email = document.getElementById("email"),
    birthdate = document.getElementById("birthdate"),
    participationNumber = document.getElementById("quantity"),
    locations = document.getElementById('locations'),
    termsOfUse = document.getElementById('checkbox1');           
       

const form = document.getElementById("form"),
    confirmation = document.getElementById("confirmation"),
    Regex = {
        name: /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/,
        mail: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        date: /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
    };

firstName.addEventListener("focusout", checkName);
lastName.addEventListener("focusout", checkName);
email.addEventListener("focusout", checkMail );
birthdate.addEventListener("focusout", checkBirthdate);
participationNumber.addEventListener("focusout", checkTournamentsQuantity);
locations.addEventListener("change", checkLocations);
termsOfUse.addEventListener("change",checkCheckBox);

function checkName(e) {
    let toTest = e.target.value,
        result;

    if (toTest.length < 2 || toTest ===" " || !toTest.match(Regex.name)) {
        result = false;
    } else {
        result = true;
    }

    console.log(result);

    return result;
}

function checkMail(e) {
    let toTest = e.target.value,
        result;

    if (!toTest.match(Regex.mail)) {
        result = false;
    } else {
        result = true;
    }

    console.log(result);

    return result;
}

function checkBirthdate(e) {
    let toTest = e.target.value,
        result;

    if (!toTest.match(Regex.date) ) {
        result = false;
    } else {
        result = true;
    }

    console.log(result);

    return result;
}

function checkTournamentsQuantity(e) {
    let toTest = e.target.value,
        result;

    if (toTest.length === 0 || isNaN(toTest) === true || toTest < 0|| toTest > 99) {
        result = false;
    } else {
        result = true;
    }
    
    console.log(result);

    return result;
}

function checkLocations(e) {
    let city =  document.getElementsByName("location"),
        selectedSearch = 0,
        selected = null,
        result;

    for (let i = 0; i < city.length; i++) {
        if (city[i].checked) {
            selectedSearch++ ;
            selected = i;        
        }
    }
    
    if (selectedSearch !== 1) {
        result = false;
    } else {
        result = true;
    }

    console.log(result);

    return result;
}

function checkCheckBox(e) {
    let toTest = e.target.checked,        
        result;

    if (!toTest) {
        result = false;
    } else {
        result = true;
    }
    
    console.log(result);

    return result;
}