var checkCategory = false;
var sortField = "title";
var sortOrder = "";
var limit = 10;
var skip = 0;
var category = null;
var previousCategory = null;
var totalProducts = 0;
var productsLoaded = 0;
var products = null;
var minPrice = 0;
var maxPrice = 1;

function getMaxPrice() {
    fetch('./data.json')
        .then(res => res.json())
        .then((response) => {

            let max = 0;

            response.products.forEach((element) => {
                if (element.price > max) {
                    max = element.price;
                }
            });

            max = Math.round(max);
            maxPrice = max;

            let maxInput = document.getElementById("maxPrice");
            maxInput.setAttribute("value", maxPrice);
            maxInput.setAttribute("max", maxPrice);
        });
}

getMaxPrice();

function displayCategory(obj) {
    const node = document.createElement("div");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "category";
    radio.value = obj.slug;
    radio.classList = "category_radio";
    radio.setAttribute("onchange", "categorySelected(this)");
    radio.id = obj.slug;

    const textNode = document.createTextNode(obj.name);
    const label = document.createElement("label");
    label.htmlFor = obj.slug;
    label.appendChild(textNode);

    node.appendChild(radio);
    node.appendChild(label);
    document.getElementById("categories").appendChild(node);
}

function getCategories() {
    fetch('https://dummyjson.com/products/categories')
        .then(res => res.json())
        .then((response) => {
            response.map((element) => displayCategory(element));
            checkCategory = true;
        });
}
getCategories();

function productsDisplay(obj) {
    let product = document.createElement('div');
    product.classList = "product-box";

    const productImage = document.createElement('img');
    productImage.src = obj.thumbnail;
    productImage.alt = `product image: ${obj.title}`;
    productImage.title = `product image: ${obj.title}`;

    const anchorImg = document.createElement("a");
    anchorImg.href = `./product.html?id=${obj.id}`;

    const imageDiv = document.createElement("div");
    imageDiv.classList = "image";
    anchorImg.appendChild(productImage);
    imageDiv.appendChild(anchorImg);

    const anchor = document.createElement("a");
    anchor.href = `./product.html?id=${obj.id}`;

    const title = document.createElement('h3');
    const titleText = document.createTextNode(obj.title);
    anchor.appendChild(titleText);
    title.appendChild(anchor);

    const price = document.createElement('div');
    price.classList = "price";
    const priceText = document.createTextNode(`$ ${obj.price}`)
    price.appendChild(priceText);

    const iconDiv = document.createElement('div');
    iconDiv.classList = "icon-product-list";
    const icon = document.createElement('img');
    icon.src = "./images/heart-icon.png";
    icon.alt = `product image: ${obj.title}`;
    icon.title = `product image: ${obj.title}`;
    iconDiv.appendChild(icon);

    product.appendChild(imageDiv);
    product.appendChild(title);
    product.appendChild(price);
    product.appendChild(iconDiv);
    document.getElementById("productsList").appendChild(product);

}



function minPriceChanged(val) {
    minPrice = val.value;

    document.getElementById("productsList").innerHTML = "";
    skip = 0;
    productsLoaded = 0;

    getProducts();
};

function maxPriceChanged(val) {
    maxPrice = val.value;

    document.getElementById("productsList").innerHTML = "";
    skip = 0;
    productsLoaded = 0;

    getProducts();
};



function productsFilter(obj) {

    let products = [];

    if (category !== null) {
        products = obj.filter((element) => element.category === category)
    }
    else {
        products = obj;
    }

    products = products.filter((element) => {
        if (element.price >= minPrice && element.price <= maxPrice) {
            return element;
        }
    });

    if (sortOrder === "asc") {
        products = products.sort((a, b) => a.price - b.price);
    }
    if (sortOrder === "desc") {
        products = products.sort((a, b) => b.price - a.price);
    }

    return products;
}


function getProducts() {
    let loader = document.getElementById("loader-container");
    loader.style.display = "block";

    fetch('./data.json')
        .then(res => res.json())
        .then((response) => {

            document.getElementById("total-result").innerHTML = `${response.total} Results`;

            let filterdProducts = productsFilter(response.products);

            filterdProducts.slice(skip, limit).map((element) => productsDisplay(element));

            loader.style.display = "none";

            totalProducts = filterdProducts.length;
            productsLoaded = limit;

            if(totalProducts === 0) {
                document.getElementById("no-product-found").style.display = "block";
            }
            else {
                document.getElementById("no-product-found").style.display = "none";
            }

            if (totalProducts <= productsLoaded) {
                document.getElementById("load-more").style.display = "none";
            }
            else {
                document.getElementById("load-more").style.display = "block";
            }
        });

}
getProducts();

function categorySelected(val) {

    if (screen.width < 769) {
        document.getElementById("categories-wrapper").style.display = "none";
    }

    if (category !== val.value) {
        document.getElementById("productsList").innerHTML = "";
        skip = 0;
        limit = 10;
        productsLoaded = 0;
    }

    category = val.value;
    getProducts();
}

function sorted(val) {
    document.getElementById("productsList").innerHTML = "";
    sortField = "price";
    if (val.value === "") {
        sortOrder = null;
    }
    else {
        sortOrder = val.value;
    }
    skip = 0;
    productsLoaded = 0;
    getProducts();
}

document.addEventListener("DOMContentLoaded", function () {
    getMaxPrice();

    /* ******************* LOAD MORE PRODUCTS  ******************* */
    const loadMoreBtn = document.getElementById("load-more");

    loadMoreBtn.addEventListener("click", function () {
        if (productsLoaded <= totalProducts) {
            skip = skip + 10;
            limit = limit + 10;
            getProducts();
        }
    });

    /* ******************* CATEGORIES / FILTERS : SHOW HIDE ******************* */

    const filtersBtn = document.getElementById("filter-clickon");

    filtersBtn.addEventListener("click", function () {
        document.getElementById("categories-wrapper").style.display = "block";
    });

    const filtersClose = document.getElementById("filters-close");

    filtersClose.addEventListener("click", function () {
        document.getElementById("categories-wrapper").style.display = "none";
    });

    /* *******************  ******************* */
    /* *******************  ******************* */

});