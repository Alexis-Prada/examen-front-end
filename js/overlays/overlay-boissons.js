/**
 * Function qui permet d'ajouter la classe active a l'item boisson et d'afficher l'overlay boisson
 * @params néant
 */
function showBoissonsOverlay(productDom, productObj){
    buildBoissonsOverlay(productObj);
}

/**
 * Fonction qui permet de construire l'overlay de choix de boissons
 * @params neant
 */
function buildBoissonsOverlay(product){
    overlayZone.classList.remove('d-none');
    overlayZone.innerHTML = ``;
    overlayZone.innerHTML+=`<div class="overlay-close btn-close"><img src="assets/images/supprimer.png" alt="image d'une croix pour fermer l'overlay"></div>
        <div class="overlay-container flex">
            <strong class="overlay-title">Une petite soif ?</strong>
            <p>Choisissez la taille de votre boisson,  +0.50€ pour le format 50 Cl</p>
            <div class="flex space-between align-center">
                <div class="menu-choice active" data-taille="30Cl">
                    <div><img class="responsive" src="assets${product.image}" alt="illustration d'une boisson de 30Cl"></div>
                    <strong>30Cl</strong>
                </div>
                <div class="menu-choice" data-taille="50Cl">
                    <div><img class="responsive" src="assets${product.image}" alt="illustration d'une boisson de 50Cl"></div>
                    <strong>50Cl</strong>
                </div>
            </div>
            <div>
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

    let boissonChoices = document.querySelectorAll('.overlay-container .menu-choice');
    let crossCloses = document.querySelectorAll('.btn-close');
    let addBtn = document.querySelector('.add-btn');
    
    countProduct();

    boissonChoices.forEach(choice =>{
        addClickActive(choice, '.overlay-container .menu-choice');
    })

    addBtn.addEventListener('click', ()=>{
        addToCartDrink(product);
    });

    crossCloses.forEach(choice =>{
        choice.addEventListener('click', closeOverlay);
    })
}

/**
 * Fonction qui permet d'augmenter ou de diminuer le compteur sans qu'il ne passe en dessous de 1
 */
function countProduct(){
    let counterValue = 1;
    let counter = document.querySelector('.overlay .number-food');
    let minus = document.querySelector('.overlay .minus');
    let plus = document.querySelector('.overlay .plus');

    function updateCounter() {
        counter.textContent = counterValue;
    }

    plus.addEventListener('click', () => {
        counterValue += 1;
        updateCounter();
    });

    minus.addEventListener('click', () => {
        if(counterValue > 1){
            counterValue -= 1;
            updateCounter();
        }
    });

}

