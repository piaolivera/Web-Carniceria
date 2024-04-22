//Slider:

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: ".swiper-pagination", //Los puntitos se ven
        clickable:true, //Hacemos que los puntos debajo de la foto sean clickeables y anden
    },
    navigation: {//Las flechas andan
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints:{ // responsive
        0: {
            slidesPerView:1
        },
        520: {
            slidesPerView:2
        },
        950: {
            slidesPerView:3
        }
    }
});


//Carrito

const Carrito = document.getElementById('carrito');
const elementos = document.getElementById("lista");
const elementos2 = document.getElementById("lista-2");
const lista = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("Vaciar-carrito");

cargarEventListeners();

function cargarEventListeners(){
    elementos.addEventListener('click', comprarElemento);
    elementos2.addEventListener('click', comprarElemento); // cada vez que le damos click se carga el elemento al carrito

    Carrito.addEventListener('click', eliminarElemento);

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

function comprarElemento(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const elemento = e.target.parentElement.parentElement; // enviamos el elemento seleccionado para leer sus datos
        leerDatosElemento(elemento);
    }
}


function leerDatosElemento(elemento){
    const infoElemento = {
        imagen : elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id:elemento.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento){

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width=100>
        </td>

        <td>
            ${elemento.titulo}
        </td>

        <td>
            ${elemento.precio}
        </td>

        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">X</a>
        </td>
    
    `;
    lista.appendChild(row);
    guardarElementoLocalStorage(elemento);
}


function eliminarElemento(e){
    e.preventDefault();

    let elemento,
        elementoId;
    if(e.target.classList.contains('borrar')){
        e.target.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoId =elemento.querySelector('a').getAttribute('data-id');
    }
    eliminarElementoLocalStorage(elementoId);
}


function vaciarCarrito() {
    const lista = document.querySelector("#lista-carrito tbody");

    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    vaciarLocalStorage(); 
    return false;
}






//Cada vez que recargamos la página se evita perder los elementos guardados
function guardarElementoLocalStorage(elemento){

    let elementos;

    elementos = obtenerelementosLocalStorage();
    elementos.push(elemento);
    
    localStorage.setItem('elementos', JSON.stringify(elementos));
}

function obtenerelementosLocalStorage(){
    let elementosLS;

    if(localStorage.getItem('elementos') == null){
        elementosLS = [];
    }
    else{
        elementosLS =JSON.parse(localStorage.getItem('elementos'));
    }
    return elementosLS;
}


function leerLocalStorage (){

    let elementosLS;
    elementosLS = obtenerelementosLocalStorage();

    elementosLS.forEach(function(elemento) {
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${elemento.imagen}" width=100>
            </td>
    
            <td>
                ${elemento.titulo}
            </td>
    
            <td>
                ${elemento.precio}
            </td>
    
            <td>
                <a href="#" class="borrar" data-id="${elemento.id}">X</a>
            </td>
        
        `;
        lista.appendChild(row);
    });
}


function eliminarElementoLocalStorage(elemento){
    let elementosLS;

    elementosLS =obtenerelementosLocalStorage();
    elementosLS.forEach(function(elementosLS, index){
        if(elementosLS.id=== elemento){
            elementosLS.splice(index, 1);
        }
    });

    localStorage.setItem('elementos', JSON.stringify(elementosLS));
}

function vaciarLocalStorage(){
    localStorage.clear();
}








