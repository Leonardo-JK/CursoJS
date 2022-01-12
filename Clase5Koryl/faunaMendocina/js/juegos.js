class Animal {
    constructor(id, nombre, familia, peso, tamanno, alimentacion, habitat, masculino){
        this.id = id;
        this.nombre = nombre;
        this.familia = familia;
        this.peso = peso;
        this.tamanno = tamanno;
        this.alimentacion = alimentacion;
        this.habitat = habitat;
        this.masculino = masculino;
    }

    queAnimalEs(){
        return "Yo soy el " + this.nombre;
    }

    esDepredador(){
        for(let i = 0; i < this.alimentacion.length; i++){
            if(this.alimentacion[i] === "carnivoro"){
                return "Es un depredador";
            }
        }
        return "No es depredador";
    }
}


const grison = new Animal(1, "grison", "mamifero", [1.2, 2.4], [0.4, 0.75], ["omnivoro", "animales", "fruta"], ["pastizales", "bosques", "matorrales", "prados"], true);
const guanaco = new Animal(2, "guanaco", "mamifero", [100, 140], [1.8, 1.9], ["hierbas", "musgos", "tuberculos", "hervivoro"], ["montaña", "matorrales", "pendientes"], true);
const puma = new Animal(3, "puma", "mamifero", [60, 100], [2, 2.7], ["insectos grandes", "animales pequeños", "reptiles", "animales grandes", "carnivoro"], ["desierto", "montaña", "bosques", "llanuras"], true);
const zorrillo = new Animal(4, "zorrillo", "mamifero", [0.150, 0.320], [0.180, 0.240], ["omnivoro", "insectos", "huevos", "aves", "pequeños mamiferos", "frutas", "semillas"], ["selva", "cuerpos de agua", "llanuras"], true);
const zorroCulpeo = new Animal(2, "zorro culpeo", "mamifero", [7, 14], [0.9, 1.6], ["carroña", "animales enfermos", "animales desvalidos", "carnivoro"], ["montaña", "sierra"], true);

const fauna = {
    animales: [
        grison,
        guanaco,
        puma,
        zorrillo,
        zorroCulpeo
    ],

    pesoPromedio(nombre){
        for(let i=0; i < this.animales.length; i++){
            if(this.animales[i].nombre === nombre){
                let promedio = (this.animales[i].peso[0] + this.animales[i].peso[0])/2;
                return "El peso promedio de " + this.animales[i].nombre + " es de " + promedio + " Kg."; 
            }
        }
    },

    listarPorAlimentacion(dieta){
        let lista = "";
        for(let i = 0; i < this.animales.length; i++){
            for(let j = 0; j < this.animales[i].alimentacion.length; j++){
                if(this.animales[i].alimentacion[j] === dieta){
                    lista += this.animales[i].nombre + "\n";
                }
            }
        }
        
        return lista;
    }, 

    filtrarAnimalPorNombre(nombre){
        for (let i = 0; i < this.animales.length; i++) {
            if(this.animales[i].nombre == nombre){
                return this.animales[i];
            }
        }
    }
}
let asdf = "asd";
console.log(asdf);
let respuesta;

alert("Esta es nuestra base de datos de animales, con la cual podras hacer varias cosas.");

do{
    respuesta = prompt("¿Que deseas hacer? (Escribe salir para terminar el programa)\n\n1)- Listar animales.\n2)- Listar por dieta.\n3)- Saber si un animal es un depradador.\n4)- Peso promedio.");

    if(respuesta == 1){
        let lista = "";
        for(let i = 0; i < fauna.animales.length; i++){
        lista += fauna.animales[i].nombre + "\n";
        }
        alert("Estos son los animales que forman parte de la base de datos:\n\n" + lista); 
    } else if(respuesta == 2){
        let dieta = prompt("Que dieta quiers listar?\n\ncarnivoro\nhervivoro\nomnivoro");
        alert("Los " + dieta + "s son: \n\n" + fauna.listarPorAlimentacion(dieta));
    } else if(respuesta == 3){
        let nombre = prompt("Introduce su nombre:");
        alert(fauna.filtrarAnimalPorNombre(nombre).esDepredador());
    } else if(respuesta == 4){
        let animal = prompt("Introduce el nombre:");
        alert(fauna.pesoPromedio(animal));
    }
    

}while(respuesta != "salir")

