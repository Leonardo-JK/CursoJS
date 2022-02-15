window.addEventListener('load', function() {
    let individuos = [];
    let espera = 0;

    // -> Solicito datos desde el archivo .json mediante URL, archivado en repositorio
    const URL = "https://raw.githubusercontent.com/Leonardo-JK/FaunaMendocina-LeonardoKoryl/main/data/animales.json";

    function obtenerDatos() {
        $.get(URL, function(response, estado) {
            if(estado === "success"){
                individuos = JSON.parse(response);
            }
        });
    }


    // fetch("https://raw.githubusercontent.com/Leonardo-JK/FaunaMendocina-LeonardoKoryl/main/data/animales.json")
    //     .then(response => response.json())
    //     .then(data => individuos = data)
    // <-

    // -> Genera un loop de espera de respuesta de datos, que se mantiene mientras no se realice ninguna accion
    //      si el array individuos sigue vacio despues de 500 ms se vuelve a ejucutar y comienza un contador,
    //      pasado 20 s, envia un msj de error por alert y comienza nuevamente el loop de espera por otros
    //      20 s. Al ejecutar la espera de esta forma evita que el hilo se bloquee como pasa con el metodo await,
    //      ya el call back de ajax puede entrar entre ejecucion y ejecucion del loop de espera, permitiendo el
    //      funcionamiento normal de la pagina.
    function loopEspera(){
        if(individuos.length === 0){
            espera++;
            setTimeout(function() {
                if(espera >= 40){
                    espera = 0;
                    error();
                }else {
                    loopEspera();
                }
            }, 500);
        }
    }

    function error(){
        alert("Hubo un error al cargar los datos o el tiempo de respuesta de la base de datos fue mayor a la esperada. Por recarga la pagina o espera un poco mas.");
        loopEspera();
    }

    // <-

    function abrirPopup(){
        $(".popup").fadeIn(300);
    }

    // -> Carga la presentacion del juego.
    function cargaQueAnimalEs(){
        // -> Limpía la pantalla.
        limpiar("encabezado");
        limpiar("preguntas");
        limpiar("respuestas");
        limpiar("contenido");
        // <-

        //-> Genera el encabezado del juego.
        titulo = document.createElement("h2");
        titulo.innerHTML = "¿Que animal es?<br><br>";
        document.getElementById("encabezado").appendChild(titulo);

        presentacion = "Bienvenido, a continuación te mostrare unas imagenes y tu tendras que responder a que animal corresponde.<br> ¿Estás listo?";
        dificultad = "¿Elige la dificultad?";

        let descripcion1 = document.createElement("p");
        descripcion1.id = "descripcion1";
        descripcion1.innerHTML = presentacion + "<br><br>";
        document.getElementById("encabezado").appendChild(descripcion1);

        let descripcion2 = document.createElement("p");
        descripcion2.id = "descripcion2";
        descripcion2.innerHTML = dificultad;
        document.getElementById("encabezado").appendChild(descripcion2);
        // <-

        document.getElementById("preguntas").style.flexDirection = "row";

        // -> Despliega la eleccion de dificultad y lanza el juego correspondiente.
        facil.innerHTML = "<strong>FACIL</strong> <br>(Multiple Choice <br>con 3 oportunidades)";
        facil.href = "#";
        facil.id = "facil";
        facil.style.display = "none";
        facil.onclick = () => {
                                dificultadValor = "facil";
                                comenzarJuego();
                            } ;
        document.getElementById("preguntas").appendChild(facil);

        medio.innerHTML = "<strong>MEDIO</strong> <br>(Multiple Choice <br>sin oportunidades)";
        medio.href = "#";
        medio.id = "medio";
        medio.style.display = "none";
        medio.onclick = () => {
                                dificultadValor = "medio";
                                comenzarJuego();
                            } ;
        document.getElementById("preguntas").appendChild(medio);

        dificil.innerHTML = "<strong>DIFICIL</strong> <br>(Respuesta escrita)";
        dificil.href = "#";
        dificil.id = "dificil";
        dificil.style.display = "none";
        dificil.onclick = () => {
                                dificultadValor = "dificil";
                                comenzarJuego();
                            } ;
        document.getElementById("preguntas").appendChild(dificil);

        $("#facil").slideDown(300, () =>{
            $("#medio").slideDown(300, () => {
                $("#dificil").slideDown(300);
            });
        });
        // <-

        setTimeout(function(){              // ->
            if(individuos.length === 0){    // Si el usuario inicia el juego y los datos no se han cargado,
                error();                    // envia el mensaje e inicia el loop de espera.
            }                               //
        }, 1000);                           // <-
    }
    // -

    // -> Genera la estructura basica del juego y deriva a la dificultad correspondiente.
    function comenzarJuego(){
        respCorr = 0;
        pregunta = 0;
        document.getElementById("preguntas").style.flexDirection = "row";
        document.getElementById("encabezado").removeChild(document.getElementById("encabezado").lastChild);
        document.getElementById("preguntas").removeChild(document.getElementById("preguntas").lastChild);
        document.getElementById("preguntas").removeChild(document.getElementById("preguntas").lastChild);
        document.getElementById("preguntas").removeChild(document.getElementById("preguntas").lastChild);

        divImagen = document.createElement("div");
        divImagen.id = "divImagen";
        document.getElementById("preguntas").appendChild(divImagen);

        divRespuestas = document.createElement("div");
        divRespuestas.id = "divRespuestas";
        document.getElementById("preguntas").appendChild(divRespuestas);

        switch(dificultadValor){
            case "facil":
                juegoFacil();
                break;
            case "medio":
                juegoFacil();
                break;
            case "dificil":
                juegoDificil();
                break;
        }
    }
    // <-

    // -> Inicio juego facil/medio.
    function juegoFacil(){
        limpiar("divImagen");
        limpiar("divRespuestas");

        console.log(pregunta);

        if(pregunta === 10){    // -> Verifica la cantidad de preguntas realizada y si llega al final, muestra el resultado.
            resultado = respCorr / pregunta * 100;
            let final = document.createElement("p");
            final.innerHTML = "Fin del jugo. <br> Has respondido correctamente el " + resultado + " % de las imagenes.";
            limpiar("preguntas");
            
            guardarPuntaje(dificultadValor, resultado);

            document.getElementById("preguntas").appendChild(final); // <-

        } else {
            let id = Math.floor(Math.random() * (individuos.length)) + 1;           // -> Genera un numero random para determinar el animal por id. <-
            let img = Math.floor(Math.random() * (individuos[(id-1)].imagenes[0])); // -> Genera un numero random para genera una imagen del animal,
                                                                                    // el array de imagenes esta comprendido por el numero de imagenes
                                                                                    // disponibles y el nombre generico del archivo para dicho animal. <-
            animal = animalAleatorio(id);

            let imagen = document.createElement("img");
            imagen.id = "img";                                              // -> Carga una imagen aleatoria del animal.
            imagen.style.display = "none";                                  //
            imagen.src = "../img/" + animal.imagenes[1] + img + ".jpg";     //
            document.getElementById("divImagen").appendChild(imagen);       // <-
            $("#img").fadeIn(1000)
                     .animate({width: "+=15px",
                                heigth: "+=10px"})
                     .animate({width: "-=15px",
                                heigth: "-=10px"});


            let opciones = document.createElement("ul");                    //  -> Crea la lista que presentara las opciones.
            opciones.id = "opciones";                                       //
            opciones.style.listStyle = "none";                              //
            document.getElementById("divRespuestas").appendChild(opciones); // <-

            let opcionCorrecta = Math.floor(Math.random() * 5);             // -> Genera una posicion aleatoria en la cual se ubicara la respuesta correcta.

            let array = [];
            for(let i = 0; i < 4; i++){                                     // -> Carga un array de animales aleatorios incorrectos,
                id = Math.floor(Math.random() * (individuos.length)) + 1;   //      verificando que no se repitan ni que coincidan 
                if(array.includes(id) || id === animal.id){                 //      con el animal correcto.
                    i--;                                                    //
                } else {                                                    //
                    array[i] = id;                                          //        
                }                                                           //    
            }                                                               // <-

            console.log(array, animal.id);                                          

            let j = 0;
            // -> Enlista todas la opciones.
            for(let i = 0; i < 5; i++){
                
                let opcion = document.createElement("li");
                opcion.id = "opcion" + i;
                document.getElementById("opciones").appendChild(opcion);
                input = document.createElement("input");
                input.type = "radio";
                input.name = "opcion";

                let label = document.createElement("label");
                label.className = "opcion";

                // -> Determina si la posicion sera llenada con la opcion correcta o con una incorrecta.
                if(i === opcionCorrecta){
                    llenarOpcion(animal.nombre, input, label);
                    label.id = "opcionCorrecta";
                } else {
                    llenarOpcion(animalAleatorio(array[j]).nombre, input, label);
                    j++;
                }
                // <-

                console.log(input.id);

                document.getElementById("opcion" + i).appendChild(input);
                document.getElementById("opcion" + i).appendChild(label);
            }
            // <-

            send.type = "button";
            send.value = "Responder";
            send.id = "send2";
            document.getElementById("divRespuestas").appendChild(send);
            document.getElementById("send2").onclick = verificarOpcion;
        }
    }
    // <-

    // -> Setea valores de la opcion
    function llenarOpcion(nom, inp, lab){
        inp.id = nom;
        inp.value = nom;
        lab.setAttribute("for", nom);
        lab.innerHTML = nom;
    }
    // <-

    // -> Evalua el puntaje y da el msj correspondiente.
    function guardarPuntaje(string, resul){
        let sufijo = "";
        switch (string){
            case "facil":
                sufijo = "puntajeQAEF";
                break;
            case "medio":
                sufijo = "puntajeQAEM";
                break;
            case "dificil":
                sufijo = "puntajeQAED";
                break;
        }

        let p = JSON.parse(sessionStorage.usuarioActivo)[sufijo];
        if(resul > p){
            $("#mensaje1").html("Felicidades has mejorado desde tu ultima vez.");
            $("#mensaje2").html("Sigue asi.");
            abrirPopup();
        } else if(resul === p){
            $("#mensaje1").html("Has mantenido tu puntaje.");
            $("#mensaje2").html("Felicidades.");
            abrirPopup();
        } else if(resul < p && resul > 0){
            $("#mensaje1").html("Has obtenido un puntaje menor al anterior.");
            $("#mensaje2").html("Aun puedes mejorar.");
            abrirPopup();
        } else if(resul === 0){
            $("#mensaje1").html("No has acertado ninguna respuesta.");
            $("#mensaje2").html("Aun puedes mejorar.");
            abrirPopup();
        }

        if(JSON.parse(sessionStorage.usuarioActivo).usuario === "invitado"){
            let sStorage = JSON.parse(sessionStorage.usuarioActivo);
            sStorage[sufijo] = resul;
            sessionStorage.usuarioActivo = JSON.stringify(sStorage);
        } else {
            let i = JSON.parse(sessionStorage.usuarioActivo).id - 1;
            let lStorage = JSON.parse(localStorage.usuariosFM);
            lStorage[i][sufijo] = resul;
            localStorage.usuariosFM = JSON.stringify(lStorage);
        }
    }
    // <-

    // -> Inicia Juego Dificil
    function juegoDificil(){
        limpiar("divImagen");
        limpiar("divRespuestas");

        document.getElementById("divRespuestas").style.display = "flex";            // -> Acomoda el estilo para el juego.
        document.getElementById("divRespuestas").style.flexDirection = "column";    //
        document.getElementById("divRespuestas").style.justifyContent = "center";   // <-

        solucion = document.createElement("p");
        solucion.id = "solucion";
        solucion.innerHTML = "";
        document.getElementById("divRespuestas").appendChild(solucion);

        if(pregunta === 10){    // -> Verifica la cantidad de preguntas realizada y si llega al final, muestra el resultado.
            resultado = respCorr / pregunta * 100;
            solucion.innerHTML = "Fin del juego. <br> Has respondido correctamente el " + resultado + " % de las imagenes.";
            limpiar("preguntas");

            guardarPuntaje(dificultadValor, resultado);

            document.getElementById("preguntas").appendChild(solucion); // <-
        } else {
            let id = Math.floor(Math.random() * (individuos.length)) + 1;   // -> Genera un numero random para determinar el animal por id. <-
            let img = Math.floor(Math.random() * (individuos[(id-1)].imagenes[0])); // -> Genera un numero random para genera una imagen del animal,
                                                                                    // el array de imagenes esta comprendido por el numero de imagenes
                                                                                    // disponibles y el nombre generico del archivo para dicho animal. <-
            animal = animalAleatorio(id);

            let imagen = document.createElement("img");                     // -> Carga una imagen aleatoria del animal.
            imagen.id = "img";                                              //
            imagen.src = "../img/" + animal.imagenes[1] + img + ".jpg";     //
            imagen.style.display = "none";                                  //
            document.getElementById("divImagen").appendChild(imagen);       // <-
            $("#img").fadeIn(1000)
                     .animate({width: "+=15px",
                                heigth: "+=10px"})
                     .animate({width: "-=15px",
                                heigth: "-=10px"});
            resp.id = "resp2";
            resp.type = "text";
            resp.disabled = false;
            document.getElementById("divRespuestas").appendChild(resp);

            send.type = "button";
            send.value = "Responder";
            send.id = "send2";
            document.getElementById("divRespuestas").appendChild(send);
            document.getElementById("send2").onclick = verificarRespuesta;
        }
    }
    // <-

    // -> Verifica la respuesta escrita.
    function verificarRespuesta(){
        respuesta = document.getElementById("resp2").value.toLowerCase();

        if(respuesta.length === 0){
            $("#mensaje1").html("Debes ingresar una respuesta.");
            $("#mensaje2").html("");
            $(".popup").fadeIn(300);
        } else {
            if(respuesta === animal.nombre){
                solucion.style.color = "#27ad27";
                solucion.innerHTML = "¡Respuesta Correcta!";
                respCorr++;
            } else {
                solucion.style.color = "red";
                solucion.innerHTML = "¡Respuesta Incorrecta!";
            }

            pregunta++;

            resp.value = "";
            resp.disabled = true;
            send.id = "next";
            send.value = "Siguiente";

            document.getElementById("next").onclick = juegoDificil;
        }

    }
    // <-

    // -> Verificacion de respuesta con Multiple Choice.
    function verificarOpcion() {
        respuesta = document.querySelector('input[name="opcion"]:checked').value;

        // -> Verifica las oportunidades disponibles segun el modo de juego.
        if(dificultadValor === "facil" && cont <= 2){
            cont++;
            color(respuesta);
        } else if(dificultadValor === "medio" || cont === 3){
            color(respuesta);
            cont = 1;
            disable();
            document.getElementById("opcionCorrecta").innerHTML = animal.nombre + "&#10004";
            send.id = "next";
            send.value = "Siguiente";
            pregunta++;
            document.getElementById("next").onclick = juegoFacil;
        }
        // <-

        // -> Muestra si la respuesta es correcta o no.
        function color(r){
            if(r === animal.nombre){
                document.querySelector('label[for="' + document.querySelector('input[name="opcion"]:checked').id + '"]').style.color = "#27ad27";
                document.querySelector('label[for="' + document.querySelector('input[name="opcion"]:checked').id + '"]').style.fontWeight = "Bolder";
                disable();
                send.id = "next";
                send.value = "Siguiente";
                cont = 1;
                respCorr++;
                if(dificultadValor === "facil"){
                    pregunta++;
                }
                document.getElementById("opcionCorrecta").innerHTML = animal.nombre + "&#10004";
                document.getElementById("next").onclick = juegoFacil;
            } else {
                document.querySelector('label[for="' + document.querySelector('input[name="opcion"]:checked').id + '"]').style.color = "red";
                document.querySelector('label[for="' + document.querySelector('input[name="opcion"]:checked').id + '"]').style.fontWeight = "Bolder";
                document.querySelector('input[name="opcion"]:checked').disabled = true;
            }
        }
        // <-

        // -> Desabilita los input una vez respondida la pregunta o acaba las oportunidades.
        function disable(){
            for(let j = 0; j < 5; j++){
                document.getElementsByName("opcion")[j].disabled = true;
            }
        }
        // <-
    }
    // <-

    // -> Extrae un animal del objeto en funcion del id ingresado
    function animalAleatorio(idnum){
        return individuos.find(individuo => individuo.id === idnum);
    }
    // <-

    // -> Funcion para limpiar elementos.
    function limpiar(id){
        let contenedor = document.getElementById(id);

        while(contenedor.hasChildNodes()){
            contenedor.removeChild(contenedor.firstChild);
        }
    }
    // <-

    // -> Decalaracion de variables globales.
    let resultado;
    let titulo;
    let presentacion;
    let dificultad;
    let dificultadValor = "";
    let divImagen;
    let divRespuestas;
    let input;
    let cont = 1;
    let pregunta;
    let respuesta;
    let solucion;
    let animal;
    let respCorr;
    let resp = document.createElement("input");
    let send = document.createElement("input");
    let facil = document.createElement("a");
    let medio = document.createElement("a");
    let dificil = this.document.createElement("a");
    let queAnimalEs = document.getElementById("queAnimalEs");
    //

    // -> Eventos que determinan lanzan los juegos.
    queAnimalEs.onclick = () => {
        if(sessionStorage.usuarioActivo === "" || sessionStorage.getItem("usuarioActivo") == undefined){
            document.getElementById("mensaje1").innerHTML = "Debes ingresar con tu usuario y contraseña o ingresa como invitado si no estas registrado."
            document.getElementById("mensaje2").innerHTML = ""
            $(".popup").fadeIn(300);
        } else {
            obtenerDatos();
            cargaQueAnimalEs();
            setTimeout(loopEspera, 1000);
        }
    };
    // <-
}, false);