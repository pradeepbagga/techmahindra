var checkCategory = false;
var sortField = "title";
var sortOrder = "asc";
var limit = 10;
var skip = 0;
var category = null;
var previousCategory = null;
var totalProducts = 0;
var productsLoaded = 0;

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


function getProducts() {
    let loader = document.getElementById("loader-container");
    loader.style.display = "block";

    let url = "";
    if (category) {
        url = `https://dummyjson.com/products/category/${category}?sortBy=${sortField}&order=${sortOrder}&limit=${limit}&skip=${skip}`;
    }
    else {
        url = `https://dummyjson.com/products?sortBy=${sortField}&order=${sortOrder}&limit=${limit}&&skip=${skip}`;
    }

    fetch(url)
        .then(res => res.json())
        .then((response) => {
            loader.style.display = "none";
            document.getElementById("total-result").innerHTML = `${response.total} Results`;
            response.products.map((element) => productsDisplay(element));
            totalProducts = response.total;
            productsLoaded = productsLoaded + response.products.length
            if (totalProducts === productsLoaded) {
                document.getElementById("load-more").style.display = "none";
            }
            else {
                document.getElementById("load-more").style.display = "block";
            }
        });

}
getProducts();

function categorySelected(val) {

    if(screen.width < 769) {
        document.getElementById("categories-wrapper").style.display = "none";
    }

    if (category !== val.value) {
        document.getElementById("productsList").innerHTML = "";
        skip = 0;
        productsLoaded = 0;
    }

    category = val.value;
    getProducts();
}

function sorted(val) {
    document.getElementById("productsList").innerHTML = "";
    sortField = "price";
    sortOrder = val.value;
    skip = 0;
    productsLoaded = 0;
    getProducts();
}

document.addEventListener("DOMContentLoaded", function () {

    /* ******************* LOAD MORE PRODUCTS  ******************* */
    const loadMoreBtn = document.getElementById("load-more");

    loadMoreBtn.addEventListener("click", function () {
        if (productsLoaded <= totalProducts) {
            skip = skip + limit;
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