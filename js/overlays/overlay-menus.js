/**
 * Function qui permet d'afficher l'overlay menu
 * @params 
 */
function showMenuOverlay(productDom, products){
    let productId = productDom.getAttribute('data-id');
    console.log(products);
    let product = products.find((elmnt)=> elmnt.id == productId);
    console.log(product);
    buildMenuOverlay(product);
}

let overlayZone = document.getElementById(`overlayZone`);
let choixMenu = {
    type: '',
    burger: '',
    accompagnement: '',
    boisson: '',
    prix: '',
};

/**
 * Fonction qui permet de construire l'overlay de choix du menu
 * @params neant
 */
function buildMenuOverlay(product){
    
    overlayZone.classList.remove('d-none');
    overlayZone.innerHTML = ``;
    overlayZone.innerHTML+=`<div class="overlay-close"><img src="assets/images/supprimer.png" alt="image d'une croix pour fermer l'overlay"></div>
        <div class="overlay-container">
            <strong class="overlay-title">Une grosse faim ?</strong>
            <p>Le menu maxi Best Of comprend un sandwich, une grande frite et une boisson 50 Cl</p>
            <div class="flex space-between align-center">
                <div class="menu-choice active" id="maxiBestOf" data-nom="${product.nom}">
                    <div><img class="responsive" src="assets/images/illustration-maxi-best-of.png" alt="illustration d'un menu maxi best of"></div>
                    <strong>Menu Maxi Best Of</strong>
                </div>
                <div class="menu-choice" id="bestOf" data-nom="${product.nom}">
                    <div><img class="responsive" src="assets/images/illustration-best-of.png" alt="illustration d'un menu best of"></div>
                    <strong>Menu Best Of</strong>
                </div>
            </div>
            <button class="btn btn-full btn-next">Etape Suivante</button>
        </div>`;
    
    let firstMenuChoice = document.querySelectorAll('.overlay-container .menu-choice');
    let crossClose = document.querySelector('.overlay-close');
    let nextBtn = document.querySelector('.btn-next');

    firstMenuChoice.forEach(choice =>{
        addClickActive(choice, '.overlay-container .menu-choice');
        choice.addEventListener('click', ()=>{
            // Ajout du type de menun dans choixMenu
            choixMenu.type = choice.id === "maxiBestOf" ? "Maxi Best Of" : "Best Of";
            choixMenu.type = choice.getAttribute("data-nom");
        });
    })
    crossClose.addEventListener('click', closeOverlay);
    nextBtn.addEventListener('click', secondOverlayMenu);
}

/**
 * Fonction qui permet de passer à la deuxième étapes des choix du menu
 * @params néant
 */
function secondOverlayMenu(){
    overlayZone.innerHTML = ``;
    overlayZone.innerHTML+= `<div class="overlay-close"><img src="assets/images/supprimer.png" alt="image d'une croix pour fermer l'overlay"></div>
        <button class="btn btn-empty btn-back">Retour</button>
        <div class="overlay-container">
            <strong class="overlay-title">Choisissez votre accompagnement</strong>
            <p>Frites, potatoes, la pomme de terre dans tous ses états</p>
            <div class="flex space-between align-center">
                <div class="menu-choice active" id="frites">
                    <div><img class="responsive" src="assets/frites/MOYENNE_FRITE.png" alt="illustration d'un menu maxi best of"></div>
                    <strong>Frites</strong>
                </div>
                <div class="menu-choice" id="potatoes">
                    <div><img class="responsive overlay-potatoes-img" src="assets/frites/GRANDE_POTATOES.png" alt="illustration d'un menu best of"></div>
                    <strong>Potatoes</strong>
                </div>
            </div>
            <button class="btn btn-full btn-next">Etape Suivante</button>
        </div>`;

    let crossClose = document.querySelector('.overlay-close');
    let backBtn = document.querySelector('.btn-back');
    let nextBtn = document.querySelector('.btn-next');
    let secondMenuChoice = document.querySelectorAll('.overlay-container .menu-choice');

    secondMenuChoice.forEach(choice =>{
        addClickActive(choice, '.overlay-container .menu-choice');
        choice.addEventListener('click', ()=>{
            // Ajout de l'accompagnement dans choixMenu
            choixMenu.accompagnement = choice.id === "frites" ? "Frites" : "Potatoes";
        });
    })

    crossClose.addEventListener('click', closeOverlay);
    backBtn.addEventListener('click', buildMenuOverlay);
    nextBtn.addEventListener('click', thirdOverlayMenu);
}

/**
 * Fonction qui permet de passer a la troisieme étape des choix du menu
 * @params néant 
 */
function thirdOverlayMenu(){
    overlayZone.innerHTML = ``;
    overlayZone.innerHTML+= `<div class="overlay-close"><img src="assets/images/supprimer.png" alt="image d'une croix pour fermer l'overlay"></div>
        <button class="btn btn-empty btn-back">Retour</button>
        <div class="overlay-container">
            <strong class="overlay-title">Choisissez votre boisson</strong>
            <p>Un soda , un jus de fruit ou un verre d’eau pour accompagner votre repas</p>
            <div class="carousel-container flex align-center justify-center">
                <button class="carousel-arrow left-arrow-overlay">
                    <img class="responsive" src="assets/images/fleche-slider.png" alt="flèche rouge arrière">
                </button>
                <div class="carousel">
                    <div class="carousel-slides carousel-boissons"></div>
                </div>
                <button class="carousel-arrow right-arrow-overlay">
                    <img class="responsive reverse-arrow" src="assets/images/fleche-slider.png" alt="flèche rouge arrière">
                </button>
            </div>
            <button class="btn btn-full btn-next">Ajouter le menu à ma commande</button>
        </div>`;

    let crossClose = document.querySelector('.overlay-close');
    let backBtn = document.querySelector('.btn-back');
    let addBtn = document.querySelector('.btn-next');

    crossClose.addEventListener('click', closeOverlay);
    backBtn.addEventListener('click', secondOverlayMenu);
    addBtn.addEventListener('click', ()=>{
        addToCartMenu(choixMenu);
    })

    // Récupèration des données json pour les boissons
    fetch("json/produits.json")
    .then(res=>{
        return res.json()
    })
    .then(data=>{
        buildBoissons(data.boissons)
    })
}

/**
 * Fonction pour integrer (construire) les item boissons dans le carousel
 * @param {Array} boissons
 */
function buildBoissons(boissons){
    let carouselBoissons = document.querySelector(`.carousel-boissons`);
    boissons.forEach(b =>{
        let isActive = b.nom === "Coca Cola" ? 'active' : '';
        carouselBoissons.innerHTML+= `<div class="carousel-item ${isActive}" data-nom="${b.nom}">
                            <div class="flex justify-center align-center"><img src="assets${b.image}" alt="image de la boisson ${b.nom}"></div>
                            <h4>${b.nom}</h4>
                        </div>`
    });

    let allBoissons = document.querySelectorAll('.carousel-boissons .carousel-item');
    allBoissons.forEach(boisson =>{
        boisson.addEventListener('click', ()=>{
            let activeBoisson = document.querySelector('.carousel-boissons .carousel-item.active');
            if(activeBoisson){
                activeBoisson.classList.remove('active');
            }
            boisson.classList.add('active');
            // Ajout de la boisson dans choixMenu
            choixMenu.boisson = boisson.getAttribute('data-nom');
        });
    })
}

/**
 * Fonction qui permet de fermer l'overlay
 * @params néant
 */
function closeOverlay(){
    overlayZone.innerHTML = '';
    overlayZone.classList.add(`d-none`);
    document.querySelector('.produits article.active').classList.remove('active');
}
