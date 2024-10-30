let totalPrice = 0;
let cart = document.querySelector('.panier');
/**
 * Function pour ajouter les commandes simples dans le panier
 * @param {Array} food
 */
function addToCartSimple(food){
    let numberFood = document.querySelector('.number-food').textContent;
    cart.innerHTML += `<div class="order">
                    <div class="flex space-between align-center">
                        <p><span>${numberFood}</span> ${food.nom}</p>
                        <div class="delete-btn"><img src="assets/images/trash.png" alt="logo de suppression"></div>
                    </div>
                </div>`;
                
    addAndCloseOverlay(food.prix, numberFood);

    totalPrice += numberFood * food.prix;

    let priceCart = document.querySelector('.side-bar-price');
    priceCart.textContent = `${totalPrice.toFixed(2)}€`;
}

/**
 * Function pour ajouter des boissons dans le panier
 * @param {Array} boisson
 */
function addToCartDrink(boisson){
    let numberFood = document.querySelector('.number-food').textContent;
    let drink = document.querySelector('.menu-choice.active');
    let contenance = drink.getAttribute('data-taille');
    if(contenance == "50Cl"){
        totalPrice += numberFood * 0.50;
    }
    cart.innerHTML += `<div class="order">
                    <div class="flex space-between align-center">
                        <p><span>${numberFood}</span> ${boisson.nom}</p>
                        <div><img src="assets/images/trash.png" alt="logo de suppression"></div>
                    </div>
                </div>`;

    addAndCloseOverlay(boisson.prix, numberFood);

    totalPrice += numberFood * boisson.prix;

    let priceCart = document.querySelector('.side-bar-price');
    priceCart.textContent = `${totalPrice.toFixed(2)}€`;
}

/**
 * Function pour ajouter des menus dans le panier
 * @param {Array} menu
 */
function addToCartMenu(menu){
    cart.innerHTML += `<div class="order">
                    <div class="flex space-between align-center">
                        <div class="flex order-menu">
                            <p><span>1</span> Menu ${choixMenu.type} ${choixMenu.burger}</p>
                            <ul>
                                <li>${choixMenu.accompagnement}</li>
                                <li>${choixMenu.boisson}</li>
                            </ul>
                        </div>
                        <div class="delete-btn"><img src="assets/images/trash.png" alt="logo de suppression"></div>
                    </div>
                </div>`;
                
    totalPrice += menu.prix;

    let priceCart = document.querySelector('.side-bar-price');
    priceCart.textContent = `${totalPrice.toFixed(2)}€`;

    addAndCloseOverlay(menu.prix, 1);

    // Réinitialiser choixMenu
    choixMenu = {
        type: '',
        accompagnement: '',
        boisson: '',
    };
}


/**
 * function pour ajouter des ecouteurs d'evenement sur les boutons de suppression d'article et pour fermer l'overlay
 * @param {Number} prix
 * @param {Number} numberFood
 */
function addAndCloseOverlay(prix, numberFood){
    let deleteBtns = document.querySelectorAll('.delete-btn');
    
    deleteBtns.forEach(btn=>{
        if(btn.hasClickListener == null){
            btn.addEventListener('click', function() {
                this.closest('.order').remove();
                downPriceCart(numberFood, prix)
            })
            btn.hasClickListener = true;
        }
    })
    
    closeOverlay();
}

/**
 * Fonction pour baisser le prix total en cas de suppression d'article
 * @param {Number} numberFood
 * @param {Number} prix
 */
function downPriceCart(numberFood, prix){
    let priceCart = document.querySelector('.side-bar-price');

    totalPrice -= numberFood * prix;
    priceCart.textContent = `${totalPrice.toFixed(2)}€`;
}