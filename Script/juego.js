window.addEventListener("DOMContentLoaded", function() {
    const textoTurno=document.querySelector(".turno");
    let turno=Math.round(Math.random()*1);



    // Se posicionan las fichasa en la esquina superior izquierda, e inferior derecha
    let posicionRojo={x: 1, y: 1};
    let posicionAzul={x: 19, y: 19};

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

    const divTablero=document.getElementById("tablero");
    const jugRojo=document.getElementById("jugRojo");
    const jugAzul=document.getElementById("jugAzul");
    

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




    /**
                 TURNO
        Par     Turno del jugador Rojo
        Impar   Turno del jugador Azul
    
    */
    function turnoJugador(turno) {
        if (turno % 2 == 0) {
            textoTurno.textContent = 'TURNO DEL JUGADOR ROJO';
        } else if (turno % 2 != 0) {
            textoTurno.textContent = 'TURNO DEL JUGADOR AZUL';
        }
    }

    function crearTablero(tablero) {
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

        // Posición de los jugadores
        posicionarJugadores();
    }

    function obtenerTamañoCelda() {
        const celda=divTablero.querySelector(".celda");
        // Esto se usa para alto y ancho, ya que ocupa lo mismo
        const anchoCelda=celda.offsetWidth;
        const altoCelda=celda.offsetHeight;

        return {ancho: anchoCelda, alto: altoCelda};
    }

    function posicionarJugadores() {
        const tamañoCelda=obtenerTamañoCelda();
        
        // Posicionar el jugador azul
        jugAzul.style.left=`${posicionAzul.x * tamañoCelda.ancho}px`;
        jugAzul.style.top=`${posicionAzul.y * tamañoCelda.alto}px`;

        // Posicionar el jugador rojo
        jugRojo.style.left=`${posicionRojo.x * tamañoCelda.ancho}px`;
        jugRojo.style.top=`${posicionRojo.y * tamañoCelda.alto}px`;

        // Cambiamos el tamaño de los jugadores, para que tengan el mismo tamaño que las celdas
        jugAzul.style.width=`${tamañoCelda.ancho}px`;
        jugAzul.style.height=`${tamañoCelda.alto}px`;
        jugRojo.style.width=`${tamañoCelda.ancho}px`;
        jugRojo.style.height=`${tamañoCelda.alto}px`;
    }
});