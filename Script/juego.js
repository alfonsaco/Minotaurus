window.addEventListener("DOMContentLoaded", function() {
    const textoTurno=document.querySelector(".turno");
    let turno=Math.round(Math.random()*1);

    /**
     *              TURNO
     *   Par     Turno del jugador Rojo
     *   Impar   Turno del jugador Azul
     * 
     */
    function turnoJugador(turno) {
        if(turno%2 == 0) {
            textoTurno.textContent='TURNO DEL JUGADOR ROJO';
            textoTurno.style.backgroundColor='rgb(204, 50, 50)';
        } else if(turno%2 != 0) {
            textoTurno.textContent='TURNO DEL JUGADOR AZUL';
            textoTurno.style.backgroundColor='rgb(39, 141, 201)';
        }
    }

    // Tablero 21x21
    const tablero=[
        [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,1,0,0,1,2,2,0,1,0,2,2,1,0,0,1,0,0,1],
        [1,0,2,2,0,2,2,0,0,0,2,0,0,0,2,2,0,2,2,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,1,0,1,2,2,0,2,2,2,0,2,2,1,0,1,0,0,1],
        [1,0,0,1,0,2,0,0,0,0,0,0,0,0,0,2,0,1,0,0,1],
        [1,0,2,2,0,0,0,1,2,2,0,2,2,1,0,0,0,2,2,0,1],
        [1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,1],
        [1,0,1,0,2,2,0,2,0,3,3,3,0,2,0,2,2,0,1,0,1],
        [1,0,1,0,0,0,0,0,0,3,3,3,0,0,0,0,0,0,1,0,1],
        [1,0,2,0,2,1,0,1,0,3,3,3,0,1,0,1,2,0,2,0,1],
        [1,0,0,0,0,2,0,1,0,0,0,0,0,1,0,2,0,0,0,0,1],
        [1,0,2,1,0,0,0,2,2,2,0,2,2,2,0,0,0,1,2,0,1],
        [1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,1],
        [1,0,0,2,0,2,2,2,0,2,2,2,0,2,2,2,0,2,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,2,1,0,2,1,0,0,0,1,0,0,0,1,2,0,1,2,0,1],
        [1,0,0,2,0,0,2,2,2,0,2,0,2,2,2,0,0,2,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ];
    
    function crearTablero(tablero) {
        const divTablero=document.getElementById("tablero");

        tablero.forEach((fila, y) => {
            fila.forEach((celda, x) => {
                const divCelda=document.createElement("div");
                divCelda.classList.add("celda");

                if(celda === 0) {
                    divCelda.classList.add("vacio");
                } else if(celda === 1 || celda === 2) {
                    divCelda.classList.add("muro");
                    if(celda === 2) {
                        divCelda.classList.add("muro2");
                    }
                } else if(celda === 3) {
                    divCelda.classList.add("spawn");
                }

                divTablero.appendChild(divCelda);
            });
        });
    }

    // Se define el turno al comenzar y se crea el tablero
    turnoJugador(turno);
    crearTablero(tablero);

    const dado=document.querySelector(".dado");
    // Añadir animación aleatoria al dado
    dado.addEventListener("click", function() {
        turno++;
        turnoJugador(turno);
        let random=(Math.round(1+Math.random()*5));

        for (let i=1; i<=6; i++) {
            dado.classList.remove(`dado-${i}`);
        }
        void dado.offsetWidth;

        dado.classList.add(`dado-${random}`);
    });
});