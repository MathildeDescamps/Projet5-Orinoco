// On utilise les paramètres de l'URL pour cibler la requête.
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id')
const apiURL = "http://localhost:3000/api/cameras/";

var camera;
var products = JSON.parse(localStorage.getItem('products'));
if (products == null) {
    products = [];
}
nbItems = document.getElementById("nbItems");
nbItems.innerText = products.length;

// Nouvelle requête HTTP pour récupérer et afficher les infos de la caméra sur laquelle l'utilisateur a cliqué.
let request = new XMLHttpRequest();
var camerasPreviewPromise = new Promise(function(resolve, reject) {
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status == 200) {
                resolve(this.responseText);
            } else {
                reject();
            };
        };
    };
    request.open("GET", apiURL + id);
    request.send();
});
camerasPreviewPromise.then(function(data) {
        camera = JSON.parse(data);
        let imgPhoto = document.getElementById("photo");
        imgPhoto.src = camera.imageUrl;
        let cameraModel = document.getElementById("model");
        cameraModel.innerText = camera.name;
        let cameraPrice = document.getElementById("price");
        cameraPrice.innerText = camera.price.toString() + " €";
        for (let i in camera.lenses) {
            let dropDownList = document.getElementById("dropDownList");
            let lenseOption = document.createElement("option");
            lenseOption.text = camera.lenses[i];
            dropDownList.appendChild(lenseOption);

        }
    })
    .catch(function() {
        alert('Erreur au niveau de la requête.');
    });

// Activation des boutons "ajouter au panier" et "vider le panier".
let addToCartButton = document.getElementById("addToCartButton");
addToCartButton.addEventListener('click', addToCart);
let cleanCartButton = document.getElementById("cleanCartButton");
cleanCartButton.addEventListener('click', cleanCart);