let row = document.getElementById("cards");
var items;

function createCard(item) {
    let cardRow = document.getElementById("cards");
    let cardContainer = document.createElement("div");
    cardRow.appendChild(cardContainer);
    cardContainer.classList.add("col-sm", "col-xs-12", "d-flex", "justify-content-center");
    let card = document.createElement("div");
    cardContainer.appendChild(card);
    card.classList.add("card", "border-warning", "mb-3", "w-auto");
    card.setAttribute("style", "width: 12rem;");
    let cardImage = document.createElement("img");
    card.appendChild(cardImage);
    cardImage.classList.add("card-img-top");
    cardImage.setAttribute("src", item.imageUrl);
    cardImage.setAttribute("alt", "[Photo de la caméra]");
    let cardBody = document.createElement("div");
    card.appendChild(cardBody);
    cardBody.classList.add("card-body");
    let cardTitleLink = document.createElement("a");
    cardBody.appendChild(cardTitleLink);
    cardTitleLink.setAttribute("href", 'detail.html?id=' + item._id + '');
    cardTitleLink.classList.add("stretched-link", "text-decoration-none");
    let cardTitle = document.createElement("h5");
    cardTitleLink.appendChild(cardTitle);
    cardTitle.classList.add("card-title", "text-warning");
    cardTitle.innerHTML = item.name;
    let cardDescription = document.createElement("p");
    cardBody.appendChild(cardDescription);
    cardDescription.classList.add("card-text");
    cardDescription.innerHTML = item.description;
}
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