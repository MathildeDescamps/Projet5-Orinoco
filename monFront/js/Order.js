var form = document.getElementById("orderForm");
var firstname = document.getElementById("firstname");
var lastname = document.getElementById("lastname");
var address = document.getElementById("address");
var city = document.getElementById("city");
var emailAddress = document.getElementById("emailAddress");
var submitButton = document.getElementById("submitButton");

// Expression Régulière pour la validation des champs "prenom", "nom" et "ville" du formulaire de commande.
let Regex1 = /^[a-zA-Z-\s]+$/;
let Regex2 = /^[0-9a-zA-Z-\s]+$/;

var products = JSON.parse(localStorage.getItem('products'));
if (products == null) {
    products = [];
};
let recap = document.getElementById("recap");

// Recapitulatif du panier.

// Ajout de la virgule dans les prix pour qu'ils soient en €.

function showCardContent(item) {
    let priceVal = item.price;
    let priceString = item.price.toString();
    priceString = priceString.substring(0, priceString.length - 2) + '.' + priceString.substring(priceString.length - 2);
    let items = document.getElementById("items");
    let newItem = document.createElement("tr");
    items.appendChild(newItem);
    let newProduct = document.createElement("td");
    newItem.appendChild(newProduct);
    newProduct.innerHTML = item.name;
    let newPrice = document.createElement("td");
    newItem.appendChild(newPrice);
    newPrice.innerHTML = priceString;
};
for (let i in products) {
    showCardContent(products[i]);
};

// Calcul du prix total de la commande.
let totalPrice = 0;
for (let i in products) {
    totalPrice = totalPrice + products[i].price;
};

let totalPriceLine = document.getElementById("totalPrice");
let totalPriceCell = document.createElement("th");
totalPriceLine.appendChild(totalPriceCell);
let totalPriceString = totalPrice.toString();
totalPriceString = totalPriceString.substring(0, totalPriceString.length - 2) + '.' + totalPriceString.substring(totalPriceString.length - 2);
totalPriceCell.innerHTML = totalPriceString;

// Création de la classe Contact.
class Contact {
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
};

// Validation du formulaire de commande.
function formValidation(e) {
    e.preventDefault();
    if (Regex1.test(firstname.value) == false) {
        document.getElementById("firstnameError").innerHTML = "Veuillez respecter le format requis (lettres uniquement, pas de caractère spécial).";
        return;
    } else {
        document.getElementById("firstnameError").innerHTML = " ";
    };
    if (Regex1.test(lastname.value) == false) {
        document.getElementById("lastnameError").innerHTML = "Veuillez respecter le format requis (lettres uniquement, pas de caractère spécial).";
        return;
    } else {
        document.getElementById("lastnameError").innerHTML = " ";
    };
    if (Regex2.test(address.value) == false) {
        document.getElementById("addressError").innerHTML = "Veuillez respecter le format requis (caractères alphanumériques uniquement).";
        return;
    } else {
        document.getElementById("addressError").innerHTML = " ";
    };
    if (Regex1.test(city.value) == false) {
        document.getElementById("cityError").innerHTML = "Veuillez respecter le format requis (lettres uniquement, pas de caractère spécial).";
        return;
    } else {
        document.getElementById("cityError").innerHTML = " ";
    };


    // Création de l'objet "contact" avec les données du formulaire validées.
    let contact = new Contact(firstname.value, lastname.value, address.value, city.value, emailAddress.value);

    // Création du tableau "ids" contenant les ids des produits du panier.
    let ids = [];
    for (let i in products) {
        ids.push(products[i]._id);
    };

    // Création de l'object "order" qui contient les objets "contact" et "products".
    let order = { "contact": contact, "products": ids };
    let request = new XMLHttpRequest();
    var orderPromise = new Promise(function(resolve, reject) {
        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE) {
                if (this.status == 201) {
                    resolve(this.responseText);
                } else {
                    reject();
                }
            }
        };
        request.open("POST", "http://localhost:3000/api/cameras/order");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(order));
    });
    orderPromise.then(function(data) {
            localStorage.setItem("order", data);
            window.location = "confirmation.html";
        })
        .catch(function() {
            alert('Erreur dans la commande, veuillez réessayer.');
        });

};
form.addEventListener("submit", formValidation);