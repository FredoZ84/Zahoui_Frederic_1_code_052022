let     Input = {
    firstName: document.getElementById("first"),
    lastName: document.getElementById("last"),
    email: document.getElementById("email"),
    birthdate: document.getElementById("birthdate"),
    participationNumber: document.getElementById("quantity"),
    locations: document.getElementById('locations'),
    termsOfUse: document.getElementById('checkbox1')            
}        

const   form = document.getElementById("form"),
confirmation = document.getElementById("confirmation"),
Regex = {
    name: /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/,
    mail: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    date: /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
};


for (let property in Input) {
    if ([property] !== locations || [property] !== termsOfUse ) {
        Input[property].addEventListener("focusout", check);
    }
}

Input.locations.addEventListener("change", check);
Input.termsOfUse.addEventListener("change", check);

// choice of condition of check function
function conditionOfCheck(condition) {// put the negative condition
    if (condition) {
        return false;        
    } else {
        return true;       
    }
}

// Element verification
function check(e) {    
    let toTest = e.target.value,
        type = e.target.type,
        element = e.target,
        result;
    

    // en fonction du de l'input on vérifie si la saisie est juste
    switch (type) {
        case "text": // for firstname & lastname
            result = conditionOfCheck(toTest.length < 2 || toTest ===" " || !toTest.match(Regex.name));
        break;
        case "email":              
            result = conditionOfCheck(!toTest.match(Regex.mail));
        break;
        case "date":
            result = conditionOfCheck(!toTest.match(Regex.date)); 
        break;
        case "number":
            result = conditionOfCheck(toTest.length === 0 || isNaN(toTest) === true || toTest < 0|| toTest > 99);
        break;
        case "radio":
            result = checkLocations(e);
        break;
        case "checkbox":
            result = checkCheckBox(e);
        break;
        
        default:
              console.log('Erreur de condition');
    }

    console.log(result)

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
    
    result = conditionOfCheck(selectedSearch !== 1);    

    return result;
}

function checkCheckBox(e) {
    let toTest = e.target.checked,
        result;

    result = conditionOfCheck(!toTest);

    return result;
}