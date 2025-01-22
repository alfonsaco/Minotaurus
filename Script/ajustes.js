/* ESTE JAVASCRIPT SIRVE PARA MOSTRAR U OCULTAR EL MENÚ DE AJUSTES
   TAMBIÉN TENDRÁ LAS FUNCIONES DEL MENÚ:
        - ACTIVAR / DESACTIVAR SONIDO
        - RESETEAR JUEGO
*/
window.addEventListener("DOMContentLoaded", function() {
    const botonAjustes=document.querySelector(".fa-gear");

    const divAjustes=document.getElementById("div-ajustes");
    const divAjustsBlur=document.querySelector(".div-ajustes-blur");

    const botonCerrarAjustes=document.querySelector(".fa-x");

    botonAjustes.addEventListener("click", function() {
        divAjustes.classList.add("mostrar-menu");
        divAjustsBlur.classList.add("mostrar-blur");
    });

    botonCerrarAjustes.addEventListener("click", function() {
        divAjustes.classList.remove("mostrar-menu");
        divAjustsBlur.classList.remove("mostrar-blur");
    }); 
    divAjustsBlur.addEventListener("click", function() {
        divAjustes.classList.remove("mostrar-menu");
        divAjustsBlur.classList.remove("mostrar-blur");
    }); 
});