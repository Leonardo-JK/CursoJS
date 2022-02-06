$(document).ready(function() {
    if(localStorage.usuariosFM === undefined){
        localStorage.setItem("usuariosFM", JSON.stringify([]));
    }

    sessionStorage.setItem("usuarioActivo", "");

    let userTemp;
    let user;
    let passw;

    let userDiv = "<div id='userDiv'></div>";
    let passDiv = "<div id='passDiv'></div>";
    let ingresoDiv = "<div id='ingresoDiv'></div>";

    $("#sesion").css("display", "flex");
    $("#sesion").css("flex-direction", "column");
    $("#sesion").css("align-items", "center");

    $("#sesion").append(userDiv);
    $("#sesion").append(passDiv);
    $("#sesion").append(ingresoDiv);

    $("#ingresoDiv").css("display", "flex");
    $("#ingresoDiv").css("flex-direction", "column");
    $("#ingresoDiv").css("align-items", "center");

    $("#userDiv").append("<p>User</p>");
    $("#passDiv").append("<p>Password</p>");
    $("#userDiv p, #passDiv p").css("text-align", "center");
    $("#userDiv p, #passDiv p").css("margin", "0");
    $("#userDiv p, #passDiv p").css("text-indent", "0");

    $("#userDiv").append("<input id='userInput'>");
    $("#userInput").prop("required", true);
    $("#userInput").attr("type", "text");

    $("#passDiv").append("<input id='passInput'>");
    $("#passInput").attr("type", "password");

    $("#ingresoDiv").append("<button id='ingresar'></button>");
    $("#ingresar").text("INGRESAR");

    $("#ingresoDiv").append("<button id='ingresarInv'></button>");
    $("#ingresarInv").text("Ingresar como invitado");
    $("#ingresarInv").css("margin-bottom", "1rem");

    $("#ingresoDiv").append("<button id='registro'></button>");
    $("#registro").text("Registrarse");

    $("#ingresar").on("click", verificarUsuario);

    $("#ingresarInv").on("click", () => {sessionStorage.setItem("user", JSON.stringify({usuario: "invitado", puntajeQAEF: 0, puntajeQAEM: 0, puntajeQAED: 0, puntajeCS: 0}));
                                    sessionStorage.usuarioActivo = sessionStorage.user;
                                    $("#queAnimalEs").attr("href", "#");
                                    $("#cuantoSabes").attr("href", "#");
                                    $("#sesion").css("visibility", "hidden");
                                    $("#encabezado").append("<h2>Elije el juego.</h2>");
                                    console.log(JSON.parse(sessionStorage.usuarioActivo));
                                });
    $("#registro").on("click", registrar);

    $(".popup__close").click(() => {
        $(".popup").css("visibility", "hidden");
    });

    function extraerUsuario(us, array){
        console.log(us);
        console.log("array: " + array);
        console.log(userTemp);
        for(const u of array){
            if(us === u.usuario){
                return u;
            }
        }

        return {usuario: "error"};
    }

    function verificarUsuario(){
        user = $("#userInput").val();
        passw = $("#passInput").val();

        userTemp = {};
        let lStorage = JSON.parse(localStorage.usuariosFM);

        userTemp = extraerUsuario(user, lStorage);

        if(userTemp.usuario === "error" || passw !== userTemp.password){
            $("#mensaje1").html("Usuario o contraseña invalidos.");
            $("#mensaje2").html("Intentenlo de nuevo o registre un nuevo usuario.");
            $(".popup").css("visibility", "visible");

            $(".popup__close").click(() => {
                $(".popup").css("visibility", "hidden");;
            });

        } else if (user === userTemp.usuario && passw === userTemp.password){

            sessionStorage.setItem("usuarioActivo", JSON.stringify(userTemp));
            $("#mensaje1").html("Bienvenido " + userTemp.usuario);
            $("#mensaje2").html("");
            $(".popup").css("visibility", "visible");
            $("#sesion").css("visibility", "hidden");
            $("#queAnimalEs").attr("href", "#");
            $("#cuantoSabes").attr("href", "#");
            $("#encabezado").append("<h2>Elije el juego.</h2>");
            return;
        }

        console.log(sessionStorage.usuarioActivo);
        console.log(JSON.parse(localStorage.usuariosFM))
    }

    function registrar(){
        user = $("#userInput").val();
        passw = $("#passInput").val();

        let lStorage = JSON.parse(localStorage.usuariosFM);

        if(passw === "" || user === ""){
            $("#mensaje1").html("Por favor ingrese un usuario y contraseña validos.");
            $("#mensaje2").html("");
            $(".popup").css("visibility", "visible");

            $(".popup__close").click(() => {
                $(".popup").css("visibility", "hidden");;
            });

        } else {
            for(const u of lStorage){
                if(user === u.usuario){
                    $("#mensaje1").html("Usuario ya registrado.");
                    $("#mensaje2").html("Elija otro nombre de usuario.");
                    $(".popup").css("visibility", "visible");
                    return;
                }
            }

            lStorage.push({id: (lStorage.length + 1), usuario: user, password: passw, puntajeQAEF: 0, puntajeQAEM: 0, puntajeQAED: 0, puntajeCS: 0});
            localStorage.usuariosFM = JSON.stringify(lStorage);

            $("#mensaje1").html("Usuario registrado correctamente.");
            $("#mensaje2").html("");
            $(".popup").css("visibility", "visible");
        }
    }

    console.log(sessionStorage.usuarioActivo);


});