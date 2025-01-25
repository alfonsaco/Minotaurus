window.addEventListener("DOMContentLoaded", function() {
    const textoTurno=document.querySelector(".turno");
    let turno=Math.round(Math.random()*1);

    // Posiciones de las fichas
    let posicionRojo={x: 1, y: 1};
    let posicionAzul={x: 19, y: 19};
    let posicionMinotauro={x: 10, y: 10};

    // Variables para la mecánica de juego
    let nombreTurnoJugador="ROJO";
    // Cuando se completen los movimeintos que el dado ha dado al jugador, se pondrá en True, y el siguiente jugador podrá tirar el dado
    let puedeTirar=true;
    // Para especificar el tipo y el número de pasos que puede hacer el jugador
    let tipoTirada='';
    let numeroPasos=0;

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
    const minotauro=document.getElementById("minotauro");
    

    // Se define el turno al comenzar y se crea el tablero
    turnoJugador(turno);
    crearTablero(tablero);

    const dado=document.querySelector(".dado");
    // Añadir animación aleatoria al dado
    dado.addEventListener("click", function() {
        if(puedeTirar) {
            turno++;

            // Obtenemos una tirada aleatoria para el dado
            turnoJugador(turno);
            let random=(Math.round(1+Math.random()*5));
    
            // Quitamos y ponemos el estilo, para repetir la animación
            for (let i=1; i<=6; i++) {
                dado.classList.remove(`dado-${i}`);
            }
            void dado.offsetWidth;
    
            dado.classList.add(`dado-${random}`);

            tipoTirada=obtenerTipoTirada(random);
            console.log(numeroPasos);
            puedeTirar=false;
        }
    });

    // Agregar movimiento a los jugadores con las teclas
    window.addEventListener("keydown", function(e) {        
        // MOVER A LOS JUGADORES
        if(numeroPasos > 0) {
            if(tipoTirada != "minotauro") {
                // TURNO JUGADOR AZUL
                if(nombreTurnoJugador === "AZUL") {
                    let nuevaX=posicionAzul.x;
                    let nuevaY=posicionAzul.y;

                    if(e.key == "ArrowLeft") {
                        nuevaX--;
                    }
                    if(e.key == "ArrowUp") {
                        nuevaY--;
                    }
                    if(e.key == "ArrowRight") {
                        nuevaX++;
                    }
                    if(e.key == "ArrowDown") {
                        nuevaY++;
                    }

                    if(esMovimientoValido(nuevaX, nuevaY)) {
                        console.log("movimiento válido");
                        posicionAzul.x=nuevaX;
                        posicionAzul.y=nuevaY;

                        posicionarJugadores();
                        numeroPasos--;

                        if(verificarVictoria(nuevaX, nuevaY)) {
                            console.log("EL JUGADOR AZUL HA GANADO");
                        }

                    } else {
                        console.log("movimiento no válido");
                    }                    

                } else if(nombreTurnoJugador === "ROJO") {
                    let nuevaX=posicionRojo.x;
                    let nuevaY=posicionRojo.y;

                    if(e.key == "a" || e.key == "A") {
                        nuevaX--;
                    }
                    if(e.key == "w" || e.key == "W") {
                        nuevaY--;
                    }
                    if(e.key == "s" || e.key == "S") {
                        nuevaY++;
                    }
                    if(e.key == "d" || e.key == "D") {
                        nuevaX++;
                    }

                    if(esMovimientoValido(nuevaX, nuevaY)) {
                        console.log("movimiento válido");
                        posicionRojo.x=nuevaX;
                        posicionRojo.y=nuevaY;

                        posicionarJugadores();
                        numeroPasos--;

                        if(verificarVictoria(nuevaX, nuevaY)) {
                            console.log("EL JUGADOR ROJO HA GANADO");
                        }

                    } else {
                        console.log("movimiento no válido");
                    }                      
                }
    
            // MOVER AL MINOTAURO
            } else {
                if(nombreTurnoJugador === "ROJO") {
                    let nuevaX=posicionMinotauro.x;
                    let nuevaY=posicionMinotauro.y;

                    if(e.key == "a" || e.key == "A") {
                        nuevaX--;
                    }
                    if(e.key == "w" || e.key == "W") {
                        nuevaY--;
                    }
                    if(e.key == "s" || e.key == "S") {
                        nuevaY++;
                    }
                    if(e.key == "d" || e.key == "D") {
                        nuevaX++;
                    }

                    if(esMovimientoValido(nuevaX, nuevaY)) {
                        console.log("movimiento válido");
                        posicionMinotauro.x=nuevaX;
                        posicionMinotauro.y=nuevaY;

                        posicionarJugadores();
                        numeroPasos--;
                    } else {
                        console.log("movimiento no válido");
                    }       

                } else {
                    let nuevaX=posicionMinotauro.x;
                    let nuevaY=posicionMinotauro.y;

                    if(e.key === "ArrowLeft") {
                        nuevaX--;
                    }
                    if(e.key == "ArrowUp") {
                        nuevaY--;
                    }
                    if(e.key == "ArrowDown") {
                        nuevaY++;
                    }
                    if(e.key == "ArrowRight") {
                        nuevaX++;
                    }                
                    
                    if(esMovimientoValido(nuevaX, nuevaY)) {
                        console.log("movimiento válido");
                        posicionMinotauro.x=nuevaX;
                        posicionMinotauro.y=nuevaY;

                        posicionarJugadores();
                        numeroPasos--;
                    } else {
                        console.log("movimiento no válido");
                    }       
                }                                      

                verificarMinotauroComeFicha();
            }
        }
        
        if(numeroPasos == 0) {
            puedeTirar=true;
        }
    });

    // Con este evento se evita que se produzcan problemas al cambiar el tamaño de la ventana, ya que hasta que no se mueve un jugador,  
    // no se coloan las fichas en su lugar correspondiente. Esto lo hace de forma automática
    window.addEventListener("resize", function() {    
        posicionarJugadores();
    });


    /**
                 TURNO
        Par     Turno del jugador Rojo
        Impar   Turno del jugador Azul
    
    */
    function turnoJugador(turno) {
        if (turno % 2 == 0) {
            nombreTurnoJugador="ROJO";
        } else if (turno % 2 != 0) {
            nombreTurnoJugador="AZUL";
        }

        textoTurno.textContent=`TURNO DEL JUGADOR ${nombreTurnoJugador}`;
    }

    function verificarMinotauroComeFicha() {
        if(posicionMinotauro.x == posicionAzul.x && posicionMinotauro.y == posicionAzul.y) {
            numeroPasos=0;
            posicionAzul={x: 19, y: 19};
            posicionMinotauro={x: 10, y: 10};

        } else if(posicionMinotauro.x == posicionRojo.x && posicionMinotauro.y == posicionRojo.y) {
            numeroPasos=0;            
            posicionRojo={x: 1, y: 1};
            posicionMinotauro={x: 10, y: 10};
        }

        posicionarJugadores();
    }

    function verificarVictoria(x, y) {
        const celda=tablero[x][y];

        if(celda === 3) {
            return true;
        }

        return false;
    }

    // Función para verificar que no se mueva la ficha a un muro
    function esMovimientoValido(x, y) {
        // Límites del tablero
        console.log(tablero[y][x]);

        if(x < 1 || x > tablero.length-2 || y < 1 || y > tablero.length-2) {
            return false;
        }

        // Verificar muros
        const celda=tablero[y][x];
        if(celda === 1 || celda === 2) {
            return false;
        }

        return true;
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
        const anchoTablero=divTablero.offsetWidth;
        const numCeldasPorFila=tablero.length;
        const anchoCelda=anchoTablero / numCeldasPorFila;

        return {ancho: anchoCelda, alto: anchoCelda};
    }

    function posicionarJugadores() {
        const tamañoCelda=obtenerTamañoCelda();
        
        // Posicionar el jugador azul
        jugAzul.style.left=`${posicionAzul.x * tamañoCelda.ancho}px`;
        jugAzul.style.top=`${posicionAzul.y * tamañoCelda.alto}px`;

        // Posicionar el jugador rojo
        jugRojo.style.left=`${posicionRojo.x * tamañoCelda.ancho}px`;
        jugRojo.style.top=`${posicionRojo.y * tamañoCelda.alto}px`;

        // Posicionar el Minotauro
        minotauro.style.left=`${posicionMinotauro.x * tamañoCelda.ancho}px`;
        minotauro.style.top=`${posicionMinotauro.y * tamañoCelda.alto}px`;

        // Cambiamos el tamaño de los jugadores, para que tengan el mismo tamaño que las celdas
        jugAzul.style.width=`${tamañoCelda.ancho}px`;
        jugAzul.style.height=`${tamañoCelda.alto}px`;

        jugRojo.style.width=`${tamañoCelda.ancho}px`;
        jugRojo.style.height=`${tamañoCelda.alto}px`;

        minotauro.style.width=`${tamañoCelda.ancho}px`;
        minotauro.style.height=`${tamañoCelda.alto}px`;
    }

    function obtenerTipoTirada(numeroRandom) {
        let tipo="";

        switch(numeroRandom) {
            case 1:
                tipo="minotauro";
                numeroPasos=8;
                break;
            case 2:
                tipo="minotauro";
                numeroPasos=8;
                break;
            case 3:
                numeroPasos=3;
                break;
            case 4:
                numeroPasos=4;
                break;
            case 5:
                numeroPasos=5;
                break;
            case 6:
                numeroPasos=6;
                break;
        }

        return tipo;
    }
});