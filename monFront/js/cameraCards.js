let row = document.getElementById("cards");
var items;

// Fonction permettant de créer des "cartes" pour présenter la liste des caméras.
function createCard(item) {
    let cardsContainer = document.getElementById("cards-container");
    let card = document.createElement("div");
    cardsContainer.appendChild(card);
    card.classList.add("card-body");
    let cardTitleLink = document.createElement("a");
    card.appendChild(cardTitleLink);
    cardTitleLink.setAttribute("href", 'detail.html?id=' + item._id + '');
    cardTitleLink.classList.add("card-title-link", "link-unstyled");
    let cardImage = document.createElement("img");
    cardTitleLink.appendChild(cardImage);
    cardImage.classList.add("card-img");
    cardImage.setAttribute("src", item.imageUrl);
    cardImage.setAttribute("alt", "[Photo de la caméra]");
    let cardTitle = document.createElement("h5");
    cardTitleLink.appendChild(cardTitle);
    cardTitle.classList.add("card-title");
    cardTitle.innerHTML = item.name;
    let cardDescription = document.createElement("p");
    cardTitleLink.appendChild(cardDescription);
    cardDescription.classList.add("card-description");
    cardDescription.innerHTML = item.description;
}

// Nouvelle requête HTTP avec une promise pour récupérer les infos sur les caméras.
var request = new XMLHttpRequest();
var camerasPromise = new Promise(function(resolve, reject) {
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status == 200) {
                resolve(this.responseText);
            } else {
                reject();
            }
        }
    }
    request.open("GET", "http://localhost:3000/api/cameras/");
    request.send();
});
camerasPromise.then(function(data) {
    items = JSON.parse(data);
    for (let i in items) {
        createCard(items[i]);
    };

})

.catch(function() {
    alert('Erreur au niveau de la requete !');
});