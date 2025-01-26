window.addEventListener("DOMContentLoaded", function() {
    const imagenMenu=document.querySelector(".imagen-menu");
    const tituloJuego=document.querySelector(".titulo-minotaurus");
    const divIntrucciones=document.querySelector(".div-instrucciones");
    const salir=document.querySelector(".fa-xmark");

    // Botones
    const playGame = document.querySelector(".play-game");
    const instrucciones=document.querySelector(".instrucciones");

    // ANIMACIÓN COMENZAR JUEGO
    playGame.addEventListener("click", function () {
        playGame.classList.add("desaparecer-boton");
        instrucciones.style.transform='translateY(0px)';
        instrucciones.classList.add("desaparecer-boton");
        imagenMenu.classList.add("desaparecer-fondo");
        tituloJuego.classList.add("desaparecer-titulo");
    });
    
    instrucciones.addEventListener("click", function() {
        divIntrucciones.classList.add("aparecer-div");
    });

    salir.addEventListener("click", function() {
        divIntrucciones.classList.remove("aparecer-div");
    });
});