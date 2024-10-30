/**
 * Function qui permet d'ajouter la classe active a l'item produits et d'afficher l'overlay produit simple
 * @param néant
 */
function showSimpleOverlay(productSelected){
    buildSimpleOverlay(productSelected);
}

/**
 * Fonction qui permet de construire l'overlay de produit simple
 * @param neant
 */
function buildSimpleOverlay(product){
    overlayZone.classList.remove('d-none');
    overlayZone.innerHTML = ``;
    overlayZone.innerHTML+=`<div class="overlay-close btn-close"><img src="assets/images/supprimer.png" alt="image d'une croix pour fermer l'overlay"></div>
        <div class="overlay-container overlay-container-simple flex">
            <strong class="overlay-title">Une petite faim ?</strong>
            <div class="flex justify-center align-center">
                <div class="menu-choice" id="maxiBestOf">
                    <div><img class="responsive" src="assets${product.image}" alt="illustration d'une boisson de 50Cl"></div>
                    <strong>30Cl</strong>
                </div>
            </div>
            <div class="number-choice responsive">
                <div class="flex justify-center align-center responsive">
                    <button class="btn btn-full minus">-</button>
                    <span class="number-food">1</span>
                    <button class="btn btn-full plus">+</button>
                </div>
            </div>
            <div class="flex justify-center align-center overlay-bottom">
                <button class="btn btn-empty btn-close">Annuler</button>
                <button class="btn btn-full add-btn">Ajouter à ma commande</button>
            </div>
        </div>`;

    let simpleChoices = document.querySelectorAll('.overlay-container .menu-choice');
    let crossCloses = document.querySelectorAll('.btn-close');
    let addBtn = document.querySelector('.add-btn');
    
    countProduct();

    addBtn.addEventListener('click', ()=>{
        addToCartSimple(product);
    });

    simpleChoices.forEach(choice =>{
        addClickActive(choice, '.overlay-container .menu-choice');
    })

    crossCloses.forEach(choice =>{
        choice.addEventListener('click', closeOverlay);
    })
}



