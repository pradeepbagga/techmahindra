var checkCategory = false;
var sortField = "title";
var sortOrder = "asc";
var limit = 10;
var skip = 0;

function displayCategory(obj) {
    // console.log('category - ', obj.slug);
    const node = document.createElement("div");

    const radio = document.createElement("input");
    // radio.setAttribute("type", "radio");
    radio.type = "radio";
    radio.name = "category";
    radio.value = obj.slug;
    radio.classList = "category_radio";
    radio.setAttribute("onchange", "categorySelected(this)")

    const textNode = document.createTextNode(obj.name);
    const label = document.createElement("label");
    label.appendChild(textNode);

    node.appendChild(radio);
    node.appendChild(label);
    document.getElementById("categories").appendChild(node);
}

function getCategories() {
    // fetch('https://fakestoreapi.com/products/categories')
    fetch('https://dummyjson.com/products/categories')
        .then(res => res.json())
        .then((response) => {
            // console.log('categories - ', response);
            response.map((element) => displayCategory(element));
            checkCategory = true;
        });
}
getCategories();

function productsDisplay(obj) {
    // console.log('productsDisplay - ', obj);
    let product = document.createElement('div');
    product.classList = "product-box";

    const productImage = document.createElement('img');
    productImage.src = obj.thumbnail;
    productImage.alt = `product image: ${obj.title}`;
    productImage.title = `product image: ${obj.title}`;

    const imageDiv = document.createElement("div");
    imageDiv.classList = "image";
    imageDiv.appendChild(productImage);

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

    product.appendChild(imageDiv);
    product.appendChild(title);
    product.appendChild(price);
    document.getElementById("productsList").appendChild(product);

}


function getProducts(category = null) {
    let loader = document.getElementById("loader-container");
    loader.style.display = "block";

    console.log('category - ', category);
    console.log('limit - ', limit);
    console.log('skip - ', skip);
    console.log('sortBy - ', sortField);
    console.log('order - ', sortOrder);

    let url = "";
    if (category) {
        // console.log('FALSE');
        url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}&?sortBy=${sortField}&order=${sortOrder}`;
    }
    else {
        // console.log('TRUE');
        // url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}&?sortBy=${sort}&order=${order}`;
        url = `https://dummyjson.com/products?sortBy=${sortField}&order=${sortOrder}&limit=${limit}&&skip=${skip}`;
    }

    // fetch('https://fakestoreapi.com/products')
    fetch(url)
        .then(res => res.json())
        .then((response) => {
            loader.style.display = "none";
            console.log('products - ', response);
            document.getElementById("total-result").innerHTML = `${response.total} Results`;
            document.getElementById("productsList").innerHTML = "";
            response.products.map((element) => productsDisplay(element));
        });

}
getProducts();

function categorySelected(val) {
    console.log('this 1 - ', this);
    console.log('this 2 - ', val.value);
    getProducts(category = val.value);
}

function sorted(val){
    console.log('1 - ', val);
    console.log('2 - ', val.value);
    sortField = "price";
    sortOrder = val.value;
    getProducts();
}
