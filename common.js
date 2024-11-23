/* *************************  MENU CLICKED  ************************* */
function handleMenu() {
    let id = document.getElementById("header-menu");
    let element = id.querySelectorAll("a");
    console.log('id - ', id);
    console.log('element - ', element);
    console.log('this - ', this);

    // element.forEach((elem) => {
    //     elem.classList.remove("active");
    // });

    this.classList = "active";
}

window.addEventListener('load', function() {
    handleMenu();
})

/* *************************    ************************* */
/* *************************    ************************* */
/* *************************    ************************* */
/* *************************    ************************* */