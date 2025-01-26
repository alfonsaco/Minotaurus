window.addEventListener("DOMContentLoaded", function() {
    const imagenMenu=document.querySelector(".imagen-menu");
    const tituloJuego=document.querySelector(".titulo-minotaurus");
    const divIntrucciones=document.querySelector(".div-instrucciones");
    const salir=document.querySelector(".fa-xmark");

    // Botones
    const playGame = document.querySelector(".play-game");
    const instrucciones=document.querySelector(".instrucciones");
    let sonidoPlay = new Audio("../Audio/lego-breaking.mp3"); 
    
    // Sonido de los botones
    function reproducirSonido(sonido) {
        sonido.play();
    }

    // Música del menú
    const menuTheme=new Audio("../Audio/Menu-Theme.mp3");
    menuTheme.loop=true;
    menuTheme.play();
    let volumen=0.8;


    // ANIMACIÓN COMENZAR JUEGO
    playGame.addEventListener("click", function () {
        reproducirSonido(sonidoPlay);
        playGame.classList.add("desaparecer-boton");
        instrucciones.style.transform='translateY(0px)';
        instrucciones.classList.add("desaparecer-boton");
        imagenMenu.classList.add("desaparecer-fondo");
        tituloJuego.classList.add("desaparecer-titulo");


        // Reducir el audio lentamente, para hacerlo más fluido
        let reducirAudio=setInterval(() => {
            if(volumen > 0.05) {
                volumen-=0.05;
                menuTheme.volume=volumen;
            } else {
                menuTheme.pause();
                clearInterval(reducirAudio);
            }
        }, 100);
    });
    
    instrucciones.addEventListener("click", function() {
        reproducirSonido(sonidoPlay);
        divIntrucciones.classList.add("aparecer-div");
    });

    salir.addEventListener("click", function() {
        divIntrucciones.classList.remove("aparecer-div");
    });
});