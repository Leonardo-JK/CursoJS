var numSecreto = Math.floor(Math.random()*100);

alert("Vamos a jugar a un juego. Tienes que adivinar el numero entre 0 y 99, y yo te dare pistas de que tan cerca estas. Tienes 5 intentos.");
var numero = parseInt(prompt("¿Que numero estoy pensando? - Te quedan 5 intentos."));
var diferencia;

if(numero < numSecreto){
    diferencia = numSecreto - numero;
}else {
    diferencia = numero - numSecreto;
}

if(numero == numSecreto){
    alert("¡Felicidades has adivinado el numero! Si quieres jugar de nuevo preciona F5.");
} else {
    if(numero < numSecreto){
        diferencia = numSecreto - numero;
    }else {
        diferencia = numero - numSecreto;
    }

    if(diferencia <= 10) {
        numero = parseInt(prompt("Estas muy cerca de adivinarlo. ¡Intentalo de nuevo! - Te quedan 4 intentos."));
    } else if(diferencia > 10 && diferencia <= 25) {
        numero = parseInt(prompt("Te estas acercando. ¡Intentalo de nuevo! - Te quedan 4 intentos."));
    } else if(diferencia > 25 && diferencia <= 50){
        numero = parseInt(prompt("Estas lejos. ¡Intentalo de nuevo! - Te quedan 4 intentos."));
    } else if( diferencia > 50) {
        numero = parseInt(prompt("Estas muy lejos. ¡Intentalo de nuevo! - Te quedan 4 intentos."));
    }

    if(numero == numSecreto){
        alert("¡Felicidades has adivinado el numero! Si quieres jugar de nuevo preciona F5.");
    } else {
        if(numero < numSecreto){
            diferencia = numSecreto - numero;
        }else {
            diferencia = numero - numSecreto;
        }
    
        if(diferencia <= 10) {
            numero = parseInt(prompt("Estas muy cerca de adivinarlo. ¡Intentalo de nuevo! - Te quedan 3 intentos."));
        } else if(diferencia > 10 && diferencia <= 25) {
            numero = parseInt(prompt("Te estas acercando. ¡Intentalo de nuevo! - Te quedan 3 intentos."));
        } else if(diferencia > 25 && diferencia <= 50){
            numero = parseInt(prompt("Estas lejos. ¡Intentalo de nuevo! - Te quedan 3 intentos."));
        } else if( diferencia > 50) {
            numero = parseInt(prompt("Estas muy lejos. ¡Intentalo de nuevo! - Te quedan 3 intentos."));
        }

        if(numero == numSecreto){
            alert("¡Felicidades has adivinado el numero! Si quieres jugar de nuevo preciona F5.");
        } else {
            if(numero < numSecreto){
                diferencia = numSecreto - numero;
            }else {
                diferencia = numero - numSecreto;
            }
        
            if(diferencia <= 10) {
                numero = parseInt(prompt("Estas muy cerca de adivinarlo. ¡Intentalo de nuevo! - Te quedan 2 intentos."));
            } else if(diferencia > 10 && diferencia <= 25) {
                numero = parseInt(prompt("Te estas acercando. ¡Intentalo de nuevo! - Te quedan 2 intentos."));
            } else if(diferencia > 25 && diferencia <= 50){
                numero = parseInt(prompt("Estas lejos. ¡Intentalo de nuevo! - Te quedan 2 intentos."));
            } else if( diferencia > 50) {
                numero = parseInt(prompt("Estas muy lejos. ¡Intentalo de nuevo! - Te quedan 2 intentos."));
            }

            if(numero == numSecreto){
                alert("¡Felicidades has adivinado el numero! Si quieres jugar de nuevo preciona F5.");
            } else {
                if(numero < numSecreto){
                    diferencia = numSecreto - numero;
                }else {
                    diferencia = numero - numSecreto;
                }
            
                if(diferencia <= 10) {
                    numero = parseInt(prompt("Estas muy cerca de adivinarlo. ¡Intentalo de nuevo! - Te quedan 1 intentos."));
                } else if(diferencia > 10 && diferencia <= 25) {
                    numero = parseInt(prompt("Te estas acercando. ¡Intentalo de nuevo! - Te quedan 1 intentos."));
                } else if(diferencia > 25 && diferencia <= 50){
                    numero = parseInt(prompt("Estas lejos. ¡Intentalo de nuevo! - Te quedan 1 intentos."));
                } else if( diferencia > 50) {
                    numero = parseInt(prompt("Estas muy lejos. ¡Intentalo de nuevo! - Te quedan 1 intentos."));
                }

                if(numero == numSecreto){
                    alert("¡Felicidades has adivinado el numero! Si quieres jugar de nuevo preciona F5.");
                } else {
                    alert("Lo siento no lo has logrado, el numero que estaba pensando era el " + numSecreto + ". mejor suerte para la próxima. Si quieres jugar de nuevo presiona la tecla F5.");
                }
            }
        }
    }
}