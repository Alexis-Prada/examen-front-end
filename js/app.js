// Récupèration des données json pour les produits menu
fetch("json/produits.json")
.then(res=>{
    return res.json()
})
.then(data=>{
    buildProductsMenu(data.menus)
})

/**
 * Function qui permet d'integrer directement la liste des menus
 * @param {Array} products 
 */
function buildProductsMenu(products){
    let listProduct = document.querySelector(`.produits`);
    products.forEach(p => {
        let prixComplet = p.prix.toFixed(2);
        listProduct.innerHTML+= `<article data-category="menus" data-id="${p.id}">
                    <div><img class="responsive" src="assets${p.image}" alt="photo du menu ${p.nom}"></div>
                    <div>
                        <h2 class="truncate-text">${p.nom}</h2>
                        <p>${prixComplet}€</p>
                    </div>
                </article>`
    });

    let allMenus = document.querySelectorAll('.produits article');
    allMenus.forEach(menu =>{
        addClickActive(menu, '.produits article')
        menu.addEventListener('click', ()=>{
            showMenuOverlay(menu, products);
        })
        
    })
}

// Récupèration des données json pour les categories
fetch("json/categories.json")
.then(res=>{
    return res.json()
})
.then(data=>{
    //console.log(data)
    buildCategories(data)
})

/**
 * function pour construire (inserer le code html) dans le carousel pour toutes les categories
 * Ajouter également un ecouteur d'evenement sur chaque categorie creer pour lui appliquer la classe active et récupèrer son data-id
 * @param {Array} categories 
 */
function buildCategories(categories){
    let carousel = document.getElementById(`headerCarousel`)
    categories.forEach(category => {
        let isActive = category.title === "Menus" ? 'active' : '';
        carousel.innerHTML+= `<div class="carousel-item ${isActive}" data-id="${category.title}">
                        <div class="flex justify-center align-center"><img src="assets${category.image}" alt="image de la categorie ${category.title}"></div>
                        <h4>${category.title}</h4>
                    </div>`
    });

    let activeCategorie = document.querySelector('.carousel-item.active');

    // Ajout des ecouteurs 
    let allItems = document.querySelectorAll(`.carousel-item`);
    
    carouselWork(allItems);
    allItems.forEach(item =>{
        item.addEventListener("click", ()=>{
            // Recup du nom de la categorie selectionne
            let selectedCategory = item.getAttribute('data-id').toLowerCase();
            // Suppression de la classe active
            activeCategorie.classList.remove('active');
            // Ajout de la classe active
            item.classList.add('active');
            activeCategorie = item;

            buildMainTitle(categories, selectedCategory);

            // Récupèration des données json pour les produits
            fetch("json/produits.json")
            .then(res=>{
                return res.json()
            })
            .then(data=>{
                buildProducts(data, selectedCategory)
            })
            
    
        })
    })
}


/**
 * Function pour que au clique d'une categorie, les bons produits soient construit dans le main 
 * @param {Array} products 
 */
function buildProducts(products, selectedCategory){
    let category = products[selectedCategory];
    // console.log(category)
    let listProduct = document.querySelector(`.produits`);
    listProduct.innerHTML = '';  // Efface le contenu précédent
    
    
    category.forEach(c => {
        let prixComplet = c.prix.toFixed(2);
        listProduct.innerHTML+= `<article data-category="${selectedCategory}" data-id="${c.id}">
                    <div><img class="responsive" src="assets${c.image}" alt="photo de ${c.nom}"></div>
                    <div>
                        <h2 class="truncate-text">${c.nom}</h2>
                        <p>${prixComplet}€</p>
                    </div>
                </article>`
    });

    const categoryActions = {
        menus: showMenuOverlay,
        boissons: showBoissonsOverlay
    };

    let allProducts = document.querySelectorAll('.produits article');
    allProducts.forEach(produit =>{
        let category = produit.getAttribute('data-category');
        let productId = produit.getAttribute('data-id');
        let productSelected = getProductById(productId, products[selectedCategory])
        if (categoryActions[category]) {
            addClickActive(produit, '.produits article');
            produit.addEventListener('click', () => {
                categoryActions[category](produit, productSelected);
            });
        }else{
            addClickActive(produit, '.produits article');
            produit.addEventListener('click', () => {
                showSimpleOverlay(productSelected);
            });
        }
    })
}

/**
 * Fonction qui va permettre d'integrer le title de chaque categories
 * @param {Array} categories
 */
function buildMainTitle(categories, selectedCategory){
    let mainH1 = document.querySelector('.main-h1');
    let mainP = document.querySelector('.main-p');

    mainH1.innerHTML = ``;
    mainP.innerHTML = ``;

    categories.forEach(c =>{;
        if(c.title.toLowerCase() == selectedCategory){
            mainH1.innerHTML += `Nos ${c.title}`;
            mainP.innerHTML += `${c.description}`;
        }
    })
}

/**
 * Fonction click qui va permettre d'ajouter un ecouteur d'evenement au clique a un élément et de lui ajouter la classe active
 * @param elmnt
 */
function addClickActive(elmnt, zone){
    elmnt.addEventListener('click', ()=>{
        verifActive(zone);
        elmnt.classList.add('active');
    })
}

/**
 * Fonction qui permet de verifier si un item possede la classe active et si oui l'enleve. Elle fera cette verification dans une zone demandé
 * @param {String} zone
 */
function verifActive(zone){
    let activeItem = document.querySelector(`${zone}.active`);
    if(activeItem){
        activeItem.classList.remove('active');
    }
}

/**
 * Fonction pour trouver le bon produit en fonction du data-id récupèrer
 * @param {Number} id
 * @param {Array} products
 */
function getProductById(id, products){
    return products.find(p => p.id == id);
}

/**
 * Function pour permettre de deplacer avec les fleches la classe active dans le carousel
 * @param {Array} allItems 
 */
function carouselWork(allItems){

    let leftArrow = document.querySelector('.left-arrow');
    let rightArrow = document.querySelector('.right-arrow');

    let container = document.querySelector('.carousel');

    let step = container.offsetWidth * 0.3;

    leftArrow.addEventListener('click', ()=>{
        container.scrollLeft -= step;
        let activeItem = document.querySelector('.carousel-item.active');
        let prevItem = activeItem.previousElementSibling;
        console.log(prevItem);

        if(prevItem === null){
            prevItem = allItems[allItems.length - 1];
            console.log(prevItem);
        }

        activeItem.classList.remove('active');
        prevItem.classList.add('active');
    });

    rightArrow.addEventListener('click', ()=>{
        container.scrollLeft += step;

        let activeItem = document.querySelector('.carousel-item.active');
        let nextItem = activeItem.nextElementSibling;

        if(!nextItem){
            nextItem = allItems[0];
        }
        
        activeItem.classList.remove('active');
        nextItem.classList.add('active');
    });

}
