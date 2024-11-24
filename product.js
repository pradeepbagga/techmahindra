function getProduct() {
    let url = new URL(window.location.href);
    const params = url.searchParams;
    const productId = params.get('id');
    console.log('productId - ', productId);

    fetch(`https://dummyjson.com/products/${productId}`)
        .then(res => res.json())
        .then((product) => {
            console.log('PRODUCT - ', product);

            document.getElementById("loader-container").style.display = "none";

            // let element = document.createElement("div");

            // let titleHead = document.createElement("h2");
            // const title = document.createTextNode(product.title);
            // titleHead.appendChild(title);

            // let priceHead = document.createElement('h4');
            // const price = document.createTextNode(`$ ${product.price}`);
            // priceHead.appendChild(price);

            // element.appendChild(titleHead);
            // element.appendChild(price);

            // document.getElementById("product-content").appendChild(element);

            document.getElementById("title").innerHTML = product.title;
            document.getElementById("price").innerHTML = `$${product.price}`;
            let description = product.description;
            document.getElementById("descShort").innerHTML = description.substring(0,100) + '...';

            document.getElementById("title2").innerHTML = product.title;
            document.getElementById("description").innerHTML = product.description;


        });

}


document.addEventListener("DOMContentLoaded", function (event) {
    console.log("product detail");
    getProduct();
});