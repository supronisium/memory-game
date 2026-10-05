// ############## GENERATOR ##############

document.addEventListener("DOMContentLoaded", function () {

    const catalog = document.querySelector(".block__catalog");
    const reloadButton = document.querySelector(".button__reload");
    const categoryLinks = document.querySelectorAll(".game__menu a[id]");

    if (!catalog || !categoryLinks.length) {
        return;
    }

    let products = [];
    let pictures = [];

    let activeCategory = document.querySelector(".game__menu a.now");

    if (!activeCategory) {
        activeCategory = categoryLinks[0];
        activeCategory.classList.add("now");
    }

    const MOBILE_LIMIT = 4;

    //  UPLOAD JSON

    async function loadProducts() {
        try {
            const [productsResponse, picturesResponse] = await Promise.all([
                fetch("products-pictures.json")
            ]);

            products = await productsResponse.json();
            pictures = await picturesResponse.json();

            renderProducts();

        } catch (error) {
            console.error("Ошибка загрузки каталога:", error);

            catalog.innerHTML = `
                <div class="game__error">
                    Error.
                </div>
            `;
        }
    }

    //  UPLOAD IMAGE

    function getProductPicture(product) {

        const picture = pictures.find(function (item) {
            return (
                item.name === product.name &&
                item.category === product.category
            );
        });

        if (picture) {
            return picture.picture;
        }

        return "";
    }

    //  INSERT HTML

    function createProductCard(product) {

        const picture = getProductPicture(product);

        const item = document.createElement("div");
        item.className = "game__item";
        item.dataset.category = product.category;

        item.innerHTML = `
            <a href="#" class="open-modal-link red">
                <div class="game__picture">
                    <div class="picture-item" style="background-image: url(upload/${picture})"></div>
                </div>

                <div class="game__description">
                    <div class="header-3 item-title">
                        ${escapeHTML(product.name)}
                    </div>

                    <p class="tile-description">
                        ${escapeHTML(product.description)}
                    </p>

                    <div class="header-3">
                       $${escapeHTML(product.price)}
                    </div>
                </div>
            </a>
        `;




