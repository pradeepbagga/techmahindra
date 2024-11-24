function getActiveImage(val) {
    document.getElementById("main-image").src = val.src;

    const thumbDiv = document.getElementById("thumb-list");
    const abcd = thumbDiv.querySelectorAll(".active");
    abcd[0].classList.remove('active');

    document.getElementById(val.id).classList = "active";
}

function getActiveImage2(val) {
    document.getElementById("main-image").src = val.innerHTML;

    const thumbDiv = document.getElementById("dots");
    const abcd = thumbDiv.querySelectorAll(".active");
    abcd[0].classList.remove('active');

    document.getElementById(val.id).classList = "active";
}

function imageGallery(obj) {

    obj.forEach((element, index) => {
        const image = document.createElement('img');
        image.src = element;
        image.id = `thumb-${index+1}`;
        image.setAttribute('onclick', `getActiveImage(this)`);
        if(index === 0) {
            image.classList = "active";
        }
        document.getElementById("thumb-list").appendChild(image);

        const thumbDiv = document.createElement('div');
        thumbDiv.id = `thumb-dot-${index+1}`;
        thumbDiv.setAttribute("data-img-src", element);
        const text = document.createTextNode(element);
        thumbDiv.appendChild(text);
        if(index === 0) {
            thumbDiv.classList = "active";
        }
        thumbDiv.setAttribute('onclick', `getActiveImage2(this)`);
        document.getElementById("dots").appendChild(thumbDiv);
    });

    const activeImg = document.createElement('img');
    activeImg.src = obj[0];
    activeImg.id = "main-image";
    document.getElementById("active-image").appendChild(activeImg);

}

function getProduct() {
    let url = new URL(window.location.href);
    const params = url.searchParams;
    const productId = params.get('id');

    fetch(`https://dummyjson.com/products/${productId}`)
        .then(res => {
            if (res.status === 404) {
                throw new Error(`Product with id '${productId}' not found`);
            }
            return res.json();
        })
        .then((product) => {

            imageGallery(product.images);

            document.getElementById("loader-container").style.display = "none";
            document.getElementById("product-detail").style.display = "block";

            document.getElementById("title").innerHTML = product.title;
            document.getElementById("price").innerHTML = `$${product.price}`;
            let description = product.description;
            document.getElementById("descShort").innerHTML = description.substring(0, 100) + '...';

            document.getElementById("title2").innerHTML = product.title;
            document.getElementById("description").innerHTML = product.description;


        })
        .catch((err) => {
            document.getElementById("loader-container").style.display = "none";
            const errorDiv = document.getElementById("error");
            errorDiv.innerHTML = err;
            errorDiv.style.display = "block";
        });

}


document.addEventListener("DOMContentLoaded", function (event) {
    getProduct();
});