// Récupèration des données json pour les boissons
fetch("json/produits.json")
.then(res=>{
    return res.json()
})
.then(data=>{
    buildBoissons(data.boissons)
})


/**
 * Fonction pour integrer (construire) les item boissons dans le carousel
 * @param {Array} boissons
 */
function buildBoissons(boissons){
    let carouselBoissons = document.querySelector(`.carousel-boissons`);
    boissons.forEach(b => {
        carouselBoissons.innerHTML+= `<div class="carousel-item" data-id="${b.id}">
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
            
        });
    })
}