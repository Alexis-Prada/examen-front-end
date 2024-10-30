// Ici je veux faire une fonction permettant de : 
//      - au clique d'un des deux boutons "emporte" ou "sur-place", cette page disparraisse pour laisser la page principale
// Pour ça je vais devoir ajouter un écouteur d'évènement sur les boutons et ensuite ajouter un display none a mon container

let startPage = document.querySelector(`.start-page`);
let btnIn = document.getElementById(`btnIn`);
let btnOut = document.getElementById(`btnOut`);
let header = document.querySelector('header');
let sideBar = document.querySelector('.side-bar');
let main = document.querySelector('main');
let typeCommand = document.querySelector('.endroit');
let numberCommand = document.querySelector('.side-bar-number');
const numberInAlea = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
const numberCommandAlea = Math.floor(Math.random() * (99 - 1 + 1)) + 1;
// Ici je sépare les deux boutons pour par la suite faire une page sur place et une autre a emporté
// En réalialité ce sera les deux même page mais un élément changera

btnIn.addEventListener('click', ()=>{
    typeCommand.textContent = `Sur place : ${numberInAlea}`;
    numberCommand.textContent = `${numberCommandAlea}`;
    startPage.classList.add(`o-none`);
    header.classList.remove('d-none');
    sideBar.classList.remove('d-none');
    main.classList.remove('d-none');
    startPage.remove();
})
btnOut.addEventListener('click', ()=>{
    typeCommand.textContent = `À emporter`;
    numberCommand.textContent = `${numberCommandAlea}`;
    startPage.classList.add(`o-none`);
    header.classList.remove('d-none');
    sideBar.classList.remove('d-none');
    main.classList.remove('d-none');
    startPage.remove();
})