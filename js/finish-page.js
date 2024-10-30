let btnBuy = document.querySelector('.btn-buy');
let finishZone = document.querySelector('.finish-zone');

btnBuy.addEventListener('click', ()=>{
    finishZone.innerHTML += `<div class="finish-page">
        <img src="assets/images/mc_landing_banner.png" alt="illustration de wacdo">
        <div class="container-finish">
            <div class="container-finish-img"><img class="responsive" src="assets/images/chevalet.png" alt="image d'un chevalet"></div>
            <strong class="start-title">Pour être servis à table,</strong>
            <strong>Récupérez un chevalet et indiquez ici le numéro inscrit dessus</strong>
            <form action="">
                <div class="container-finish-number flex justify-center align-center">
                    <input class="finish-number" id="numberChevalet1" type="text" name="numberChevalet1" required>
                    <input class="finish-number" id="numberChevalet2" type="text" name="numberChevalet2" required>
                    <input class="finish-number" id="numberChevalet3" type="text" name="numberChevalet3" required>
                </div>
                <div class="container-finish-number flex justify-center align-center">
                    <div class="line-grey"></div>
                    <div class="line-grey"></div>
                    <div class="line-grey"></div>
                </div>
            </form>
            <div class="flex justify-center align-center container-finish-bottom">
                <button class="btn btn-full btn-next">Enregistrer le numéro</button>
            </div>
        </div>
    </div>`;

    let header = document.querySelector('header');
    let sideBar = document.querySelector('.side-bar');
    let main = document.querySelector('main');
    let nextBtn = document.querySelector('.btn-next');

    header.classList.add('d-none');
    sideBar.classList.add('d-none');
    main.classList.add('d-none');
    nextBtn.addEventListener('click', ()=>{
        finishZone.innerHTML = ``;
        finishZone.innerHTML += `<div class="finish-page">
        <img src="assets/images/mc_landing_banner.png" alt="illustration de wacdo">
        <div class="container-finish-2 flex space-between">
            <strong class="start-title">Toute l’équipe vous remercie,</strong>
            <strong>Et vous souhaite un bon appétit dans nos restaurants ,</strong>
            <strong class="finish-title">A bientôt !</strong>
        </div>
    </div>`;
    })

    addOnInput();
})

// Ici je veux verifier que les caractères entré dans le form soient bien des chiffre et que ces caractères ne soient qu'un dans chaque input et que une fois un input rentrer cela passe au prochain

/**
 * Function qui se declenchera au moment de l'affichage de la page de fin
 * @param néant
 */
function addOnInput(){
    let finishNumbers = document.querySelectorAll('.finish-number');

    finishNumbers.forEach((number, index) => {
        number.addEventListener('input', (event) => {
            let value = event.target.value;

            if(value.length === 1 && !isNaN(value)){
                let nextInput = finishNumbers[index + 1];
                if(nextInput){
                    nextInput.focus();
                }
            }else{
                event.target.value = '';
            }
        });
    });
}
