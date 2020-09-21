var nbItems = 0;

// Fonction pour ajouter une camera au panier.
function addToCart() {
    products.push(camera);
    localStorage.setItem("products", JSON.stringify(products));
    nbItems.innerText = products.length;
};

// Fonction pour vider le panier.
function cleanCart() {
    products = [];
    nbItems.innerText = 0;
    localStorage.setItem("products", JSON.stringify(products));
    return products;
};