var nbItems = 0;

function addToCart() {
    products.push(camera);
    localStorage.setItem("products", JSON.stringify(products));
    nbItems.innerText = products.length;
};

function cleanCart() {
    products = [];
    nbItems.innerText = 0;
    localStorage.setItem("products", JSON.stringify(products));
    return products;
};