let numSecreto = Math.floor(Math.random()*100);

alert("Vamos a jugar a un juego. Tienes que adivinar el numero entre 0 y 99, y yo te dare pistas de que tan cerca estas. Tienes 5 intentos.");
let numero = parseInt(prompt("¿Que numero estoy pensando? - Te quedan 5 intentos."));
let diferencia;

for(i=5; i > 0; i--){
    
    if(numero == numSecreto){
        alert("¡Felicidades has adivinado el numero! Si quieres jugar de nuevo presiona F5.");
        break;
    } else {
        if(numero < numSecreto){
            diferencia = numSecreto - numero;
        }else {
            diferencia = numero - numSecreto;
        }

        if(i >= 2){
            switch(true){
                case (diferencia <= 10): 
                    numero = parseInt(prompt("Estas muy cerca de adivinarlo. ¡Intentalo de nuevo! - Te quedan " + (i-1) + " intentos.")); 
                    break;
                case (diferencia > 10 && diferencia <= 25):
                    numero = parseInt(prompt("Te estas acercando. ¡Intentalo de nuevo! - Te quedan " + (i-1) + " intentos.")); 
                    break;
                case (diferencia > 25 && diferencia <= 50):
                    numero = parseInt(prompt("Estas lejos. ¡Intentalo de nuevo! - Te quedan " + (i-1) + " intentos.")); 
                    break;
                case (diferencia > 50):
                    numero = parseInt(prompt("Estas muy lejos. ¡Intentalo de nuevo! - Te quedan " + (i-1) + " intentos.")); 
                    break;
            }
        }

        if(i == 1){
            prompt("¿Muy dificil? Tendras una nueva oportunidad. Esta vez no hay no hay limites. Salvo que te des por vencido.");
            let rendirse = "no";

            do {
                for(let i = 0; i < 3; i++){
                    numero = parseInt(prompt("Adivina!"));
                    if(numero == numSecreto){
                        break;
                    }
                }

                if(numero != numSecreto){
                    rendirse = prompt("¿Te rindes? (si / no)");
                }

            } while (numero != numSecreto && rendirse != "si");

            if(numero == numSecreto){
                alert("¡Felicidades has adivinado el numero! Si quieres jugar de nuevo presiona F5.");
            } else {
                alert("Lo siento no lo has logrado, el numero que estaba pensando era el " + numSecreto + ". mejor suerte para la próxima. Si quieres jugar de nuevo presiona la tecla F5.");
            }
            
            
        }
    }
}

