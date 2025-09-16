// Clase base animal
class Animal {
    constructor(nombre){
        this.nombre = nombre;
    }
    hablar() {
    return `{this.nombre} hace un ruido`;
    }
}

    // Subclase Perro
    class Perro extends Animal {
        hablar() {
            return `${this.nombre} dice guau`;
        }
    }

    export { Animal, Perro };
    const rex = new Perro('Rex');
    console.log(rex.hablar()); // Rex dice guau
    console.log(rex instanceof Perro); // true
