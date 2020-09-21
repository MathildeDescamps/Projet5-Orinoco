var products = JSON.parse(localStorage.getItem('products'));
let order = JSON.parse(localStorage.getItem('order'));
let orderId = document.getElementById("orderId");
let firstName = document.getElementById("firstName");
let totalPriceSpan = document.getElementById("totalPrice");
orderId.innerText = order.orderId;
firstName.innerText = order.contact.firstName;

// Calcul du prix total de la commande.
let totalPrice = 0;
for (let i in products) {
    totalPrice = totalPrice + products[i].price;
}
if (totalPrice == 0) {
    totalPriceSpan.innerText = "0 €.";
} else {
    totalPriceSpan.innerText = totalPrice + " €";
}