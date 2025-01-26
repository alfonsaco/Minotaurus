/* ESTE JAVASCRIPT SIRVE PARA MOSTRAR U OCULTAR EL MENÚ DE AJUSTES
   TAMBIÉN TENDRÁ LAS FUNCIONES DEL MENÚ:
        - ACTIVAR / DESACTIVAR SONIDO
        - RESETEAR JUEGO
*/
window.addEventListener("DOMContentLoaded", function() {
    const botonAjustes=document.querySelector(".fa-gear");

    const divAjustes=document.getElementById("div-ajustes");
    const divAjustsBlur=document.querySelector(".div-ajustes-blur");

    const botonCerrarAjustes=document.querySelector(".boton-volver");


    // Abrir menú ajustes
    botonAjustes.addEventListener("click", function() {
        divAjustes.classList.add("mostrar-menu");
        divAjustsBlur.classList.add("mostrar-blur");
    });

    // Cerrar menú ajustes
    botonCerrarAjustes.addEventListener("click", function() {
        divAjustes.classList.remove("mostrar-menu");
        divAjustsBlur.classList.remove("mostrar-blur");
    }); 
    divAjustsBlur.addEventListener("click", function() {
        divAjustes.classList.remove("mostrar-menu");
        divAjustsBlur.classList.remove("mostrar-blur");
    }); 


    /* ----------------------- AUDIO -----------------------
       Función de subir y bajar audio
       Contadores para el audio y el sonido  
    */
    let contSonido=10;
    let contMusica=10;
    let volumenMusica=1;
    let volumenSonido=1;

    const divMusica=document.querySelector(".divs-volumen-musica");
    const divSonido=document.querySelector(".divs-volumen-sonido");

    // Inicializar audio
    function inicializarAudio(contenedor, contador) {
        for(let i=0; i<contador; i++) {
            const raya=document.createElement("div");
            raya.classList.add("rayida-audio");
    
            contenedor.appendChild(raya);
        }
    }
    inicializarAudio(divMusica, contMusica);
    inicializarAudio(divSonido, contSonido);


    // ----------------------- INICIALIZAR SONIDOS -----------------------
    function reproducirSonido(sonido) {
        sonido.play();
    }
    function cambiarVolumenSonido(nuevoVolumen) {
        sonidoPlay.volume=1*nuevoVolumen;
    }
    function cambiarVolumenMusica(nuevoVolumen) {
        menuTheme.volume=1*nuevoVolumen;
    }
    
    // Rutas sonidos
    let sonidoPlay=new Audio("../Audio/lego-breaking.mp3");
    // Música del menú
    const menuTheme=new Audio("../Audio/Menu-Theme.mp3");
    menuTheme.loop=true;
    menuTheme.play();
    let volumen=0.8;
    
    // Sonidos botones
    document.querySelector(".play-game").addEventListener("click", function () {
        reproducirSonido(sonidoPlay);

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
    document.querySelector(".instrucciones").addEventListener("click", function() {
        reproducirSonido(sonidoPlay);
        divIntrucciones.classList.add("aparecer-div");
    });

    // BOTONES DE SUBIR Y BAJAR VOLUMEN
    document.querySelector(".bajar-M").addEventListener("click", function() {
        if(contMusica > 0) {
            const raya=divMusica.lastElementChild;

            divMusica.removeChild(raya);
            contMusica--;
            volumenMusica-=0.1;

            cambiarVolumenMusica(volumenMusica);
        }
    });
    document.querySelector(".subir-M").addEventListener("click", function() {
        if(contMusica < 10) {
            const raya=document.createElement("div");
            raya.classList.add("rayida-audio");
    
            divMusica.appendChild(raya);
            contMusica++;
            volumenMusica+=0.1;

            cambiarVolumenMusica(volumenMusica);
        }
    });
    document.querySelector(".bajar-S").addEventListener("click", function() {
        if(contSonido > 0) {
            const raya=divSonido.lastElementChild;

            divSonido.removeChild(raya);
            contSonido--;
            volumenSonido-=0.1;

            cambiarVolumenSonido(volumenSonido);
        }
    });
    document.querySelector(".subir-S").addEventListener("click", function() {
        if(contSonido < 10) {
            const raya=document.createElement("div");
            raya.classList.add("rayida-audio");
    
            divSonido.appendChild(raya);
            contSonido++;
            volumenSonido+=0.1;

            cambiarVolumenSonido(volumenSonido);
        }
    });
});