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

    /**
              TIRAR DADO
     */
    const dado=document.querySelector(".dado");
    // Añadir animación aleatoria al dado
    function tirarDado() {
        if(puedeTirar) {
            turno++;
            reproducirSonido(sonidoDado);

            // Obtenemos una tirada aleatoria para el dado
            turnoJugador(turno);
            let random=Math.round(Math.random()*6)+1;
    
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
    }
    
    dado.addEventListener("click", function() {
        tirarDado();
    });
    window.addEventListener("keydown", function(e) {
        if(e.key == " " || e.key == "Spacebar") {
            tirarDado();
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

                        // Se verifica que las teclas que se han pulsado han sido esas, para restar 
                        // los pasos, ya que de lo contrario, se restarán pasos aunque se hayan pulsado
                        // teclas incorrectas
                        if(e.key == "ArrowLeft" || e.key == "ArrowUp" || e.key == "ArrowRight" || e.key == "ArrowDown") {
                            numeroPasos--;
                            pasosJugador();
                        }     

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
                        if(e.key == "a" || e.key == "A" || e.key == "w" || e.key == "W" || 
                            e.key == "s" || e.key == "S" || e.key == "d" || e.key == "D") {
                                
                            numeroPasos--;
                            pasosJugador();
                        }

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
                        
                    if (e.key == "a" || e.key == "A") {
                        nuevaX--;
                    }
                    if (e.key == "w" || e.key == "W") {
                        nuevaY--;
                    }
                    if (e.key == "s" || e.key == "S") {
                        nuevaY++;
                    }
                    if (e.key == "d" || e.key == "D") {
                        nuevaX++;
                    }

                    if(esMovimientoValido(nuevaX, nuevaY)) {
                        console.log("movimiento válido");
                        posicionMinotauro.x=nuevaX;
                        posicionMinotauro.y=nuevaY;

                        posicionarJugadores();
                        if(e.key == "a" || e.key == "A" || e.key == "w" || e.key == "W" || 
                            e.key == "s" || e.key == "S" || e.key == "d" || e.key == "D") {

                            numeroPasos--;
                            pasosJugador();
                        }                

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

                        // Se verifica que las teclas que se han pulsado han sido esas, para restar 
                        // los pasos, ya que de lo contrario, se restarán pasos aunque se hayan pulsado
                        // teclas incorrectas
                        if(e.key == "ArrowLeft" || e.key == "ArrowUp" || e.key == "ArrowRight" || e.key == "ArrowDown") {
                            numeroPasos--;
                            pasosJugador();
                        }                             

                        posicionarJugadores();
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
            reproducirSonido(comerFicha);

        } else if(posicionMinotauro.x == posicionRojo.x && posicionMinotauro.y == posicionRojo.y) {
            numeroPasos=0;            
            posicionRojo={x: 1, y: 1};
            posicionMinotauro={x: 10, y: 10};
            reproducirSonido(comerFicha);
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



    /* ----------------------- AUDIO -----------------------
       Función de subir y bajar audio
       Contadores para el audio y el sonido  
       ----------------------------------------------------- */ 
    let contSonido = 10;
    let contMusica = 10;
    let volumenMusica = 1;
    let volumenSonido = 1;

    const divMusica = document.querySelector(".divs-volumen-musica");
    const divSonido = document.querySelector(".divs-volumen-sonido");

    // Inicializar audio
    function inicializarAudio(contenedor, contador) {
        for (let i = 0; i < contador; i++) {
            const raya = document.createElement("div");
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
        sonidoPlay.volume=1 * nuevoVolumen;
        comerFicha.volume=1 * nuevoVolumen;
        sonidoDado.volume=1 * nuevoVolumen;
        paso1.volume=1 * nuevoVolumen;
        paso2.volume=1 * nuevoVolumen;
        sonidoBotonesAudio.volume=1 * nuevoVolumen;
    }
    function cambiarVolumenMusica(nuevoVolumen) {
        menuTheme.volume=1 * nuevoVolumen;
        ambiance.volume=1 * nuevoVolumen;
    }

    // Rutas sonidos
    const sonidoPlay=new Audio("/Minotaurus/Audio/lego-breaking.mp3");
    const comerFicha=new Audio("/Minotaurus/Audio/biteMinotaurus.mp3");
    const sonidoDado=new Audio("/Minotaurus/Audio/dado.mp3");
    const paso1=new Audio("/Minotaurus/Audio/step1.mp3")
    const paso2=new Audio("/Minotaurus/Audio/step2.mp3")
    const parImparPasos=0;
    const sonidoBotonesAudio=new Audio("/Minotaurus/Audio/volumeChange.mp3");
    const ambiance=new Audio("/Minotaurus/Audio/gameAmbiance.mp3");

    function pasosJugador() {
        if(parImparPasos%2 == 0) {
            reproducirSonido(paso1);
        } else {
            reproducirSonido(paso2);
        }
        parImparPasos++;
    }

    // Música del menú    
    const menuTheme = new Audio("/Minotaurus/Audio/Menu-Theme.mp3");
    menuTheme.loop = true;
    menuTheme.play();
    let volumen = 1;


    // Sonidos botones
    document.querySelector(".play-game").addEventListener("click", function () {
        reproducirSonido(sonidoPlay);

        // Reducir el audio lentamente, para hacerlo más fluido
        let reducirAudio = setInterval(() => {
            if (volumen > 0.05) {
                volumen -= 0.05;
                menuTheme.volume = volumen;
            } else {
                menuTheme.pause();
                clearInterval(reducirAudio);
            }
        }, 100);

        setTimeout(() => {
            reproducirSonido(ambiance);
        }, 1000);
    });
    document.querySelector(".instrucciones").addEventListener("click", function () {
        reproducirSonido(sonidoPlay);
        divIntrucciones.classList.add("aparecer-div");
    });

    // BOTONES DE SUBIR Y BAJAR VOLUMEN
    document.querySelector(".bajar-M").addEventListener("click", function () {
        if (contMusica > 0) {
            const raya = divMusica.lastElementChild;

            divMusica.removeChild(raya);
            contMusica--;
            volumenMusica -= 0.1;

            cambiarVolumenMusica(volumenMusica);        
        }
        reproducirSonido(sonidoBotonesAudio);
    });
    document.querySelector(".subir-M").addEventListener("click", function () {
        if (contMusica < 10) {
            const raya = document.createElement("div");
            raya.classList.add("rayida-audio");

            divMusica.appendChild(raya);
            contMusica++;
            volumenMusica += 0.1;

            cambiarVolumenMusica(volumenMusica);            
        }
        reproducirSonido(sonidoBotonesAudio);
    });
    document.querySelector(".bajar-S").addEventListener("click", function () {
        if (contSonido > 0) {
            const raya = divSonido.lastElementChild;

            divSonido.removeChild(raya);
            contSonido--;
            volumenSonido -= 0.1;

            cambiarVolumenSonido(volumenSonido);            
        }
        reproducirSonido(sonidoBotonesAudio);
    });
    document.querySelector(".subir-S").addEventListener("click", function () {
        if (contSonido < 10) {
            const raya = document.createElement("div");
            raya.classList.add("rayida-audio");

            divSonido.appendChild(raya);
            contSonido++;
            volumenSonido += 0.1;

            cambiarVolumenSonido(volumenSonido);            
        }
        reproducirSonido(sonidoBotonesAudio);
    });
});