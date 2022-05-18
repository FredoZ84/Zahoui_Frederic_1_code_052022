let Input = {
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

Input.locations.type = "radio";
/*----------------------------------------------------------------------------------------
                                        INSTRUCTIONS
-----------------------------------------------------------------------------------------*/
window.addEventListener("load", ()=> {
    dateOfBirth(Input.birthdate);//Attribution d'une date min et une max

    for (let property in Input) {
        eventCondition(Input[property]);
        dataErrorCondition(Input[property]);
        Input[property].addEventListener(Input[property].propertyEvent, check);
    }

    Input.locations.addEventListener("mouseleave", check);

    form.addEventListener('submit', validate);

    reset(Input);
})
/*----------------------------------------------------------------------------------------
                                        FUNCTIONS
-----------------------------------------------------------------------------------------*/

// Attribut l'evenement correspondant en fonction du type de l'input
function eventCondition(e) {
    if (e.type == "radio" || e.type == "checkbox" ) {
        e.propertyEvent = "change";
    } else {
        e.propertyEvent = "focusout";
    }
}
// Condition d'attribution des propriété data-error &  data-error-visible en fonction du type de l'input
function dataErrorCondition(e) {

    if (e.type == "radio") {
        e.setAttribute("data-error", errorMessage(e.type));
        e.setAttribute("data-error-visible", false);
    } else {
        e.parentNode.setAttribute("data-error", errorMessage(e.type));
        e.parentNode.setAttribute("data-error-visible", false);
    }
}
// Renvoi le message d'erreur correspondant
function errorMessage(type) {
    let info;

    switch (type) {
        case "text": // for firstname & lastname
            info = "Veuillez saisir 2 caractères minimum";
        break;
        case "email":              
            info = "Vous devez entrer une adresse email valide";
        break;
        case "date":
            info = "Veuillez saisir une date dans les critères demandées";
        break;
        case "number":
            info = "Veuillez saisir une valeur numérique";
        break;
        case "radio":
            info = "Veuillez sélectionné une ville";
        break;
        case "checkbox":
            info = "Veuillez accepter les conditions d'utilisation";
        break;
        default:
              console.log('type non trouvé');
    } 

    return info;
}

// choice of condition of check function
function conditionOfCheck(condition) {//mettre la condition négative
    if (condition) {
        return false;        
    } else {
        return true;       
    }
}

// Element verification
function check(e) {
    let toTest,type, element, result;    

    if (e.type == "focusout" || e.type == "change") {
        toTest = e.target.value;
        type = e.target.type;
        element = e.target;
    } else {
        if (e == Input.locations || e.type == "mouseleave") {
            e = Input.locations.children[0];
        }
        toTest = e.value;
        type = e.type;
        element = e;        
    }

    // en fonction du de l'input on vérifie si la saisie est juste
    switch (type) {
        case "text": // for firstname & lastname
            result = conditionOfCheck(toTest.length < 2 || toTest ===" " || !toTest.match(Regex.name));
        break;
        case "email":              
            result = conditionOfCheck(!toTest.match(Regex.mail));
        break;
        case "date":
            result = conditionOfCheck(!toTest.match(Regex.date) || dateVerification(toTest)); 
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

    if(result) {
        element.parentNode.setAttribute("data-error-visible", false);
    } else {
        element.parentNode.setAttribute("data-error-visible", true);
    }

    return result;
}

// Locations check
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

// Term of use check
function checkCheckBox(e) {
    let toTest, result;

    if (e.type == "change") {
        toTest =  e.target.checked;
    } else {
        toTest = e.checked;
    }

    result = conditionOfCheck(!toTest);

    return result;
}

// Checking items 
function validate(e) {
    e.preventDefault();
    let rejectionCounter = 0; // compteur de refus

    // seconde verification des entrées du Formulaires
    for (let property in Input) {           
        if (check(Input[property])) {
            Input[property].validation = true ;
        } else {
            Input[property].validation = false; 
            rejectionCounter++
        }      
    }
    
    // Si il y a un 
    if (rejectionCounter > 0) {
        console.log("saisir ou coriger l'information demandée");
    } else {
        form.style.display ="none";
        confirmation.style.display = "block";
        sessionStorage.setItem("validate","true");
    }
}

;// uupprime les sessions storage de validation et les données saisies
function reset(input) {
    let city =  document.getElementsByName("location");

    for (let property in input) {
        if ([property] == "locations") {
            for (let i = 0; i < city.length; i++) {
                city[i].checked = false;                    
            }

        }else if([property] == "termsOfUse"){
            input[property].checked = false;

        } else {
            input[property].value = "";

        }
    }

    if (sessionStorage.getItem("validate")) {        
        sessionStorage.removeItem('validate');

    }
}

//Attribution du min et du max
function dateOfBirth(e) {
    let currentDate = new Date();
    const Age = {
        min:18,
        max:currentDate.getFullYear() - 1970
    }

    const dateToAssigned = {
        min: dateFormatting(Age.max),
        max : dateFormatting(Age.min)       
    }

    if (e !== 0) {
        for (const property in dateToAssigned) {       
            e.setAttribute([property][0], dateToAssigned[property] ) ;                
        }        
    } else {
        return dateToAssigned;
    }    
}

//Renvoi une date au format yyyy-mm-dd
function dateFormatting(year){ //number of years
    let currentDate = new Date();
    let newYear= currentDate.getFullYear() - year;
    let newDate = currentDate.getDate() + 1;

    let alertMessage = "L'année de naissance ne doit pas être inferieur à 1970.";

    if (year > currentDate.getFullYear()-1970) {
        alert(alertMessage);
    } else {
        currentDate.setDate(newDate)
        currentDate.setFullYear(newYear);        

        let dateFormatted = currentDate.toISOString().split('T')[0];

        return dateFormatted;
    }    
}

function dateVerification(dateEntered){
    let currentDate = new Date(),
        periode = dateOfBirth(0);

    let dateFrom = periode.min,
        dateTo = periode.max;

    let d1 = dateFrom.split("-"),
        d2 = dateTo.split("-"),
        c = dateEntered.split("-");

    let from = new Date(d1[0], parseInt(d1[1])-1, d1[2]),  //-1 because months are from 0 to 11
        to   = new Date(d2[0], parseInt(d2[1])-1, d2[2]),
        check = new Date(c[0], parseInt(c[1])-1, c[2]);

    let result = conditionOfCheck(check > from && check < to);

    return result;
}