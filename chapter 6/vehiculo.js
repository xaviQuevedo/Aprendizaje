// Constructor tradicional con prototipe
function Vehiculo(tipo){
    this.tipo = tipo;
}

// Método en el prototipo
Vehiculo.prototype.mover = function(){
    return `El ${this.tipo} se está moviendo.`;
};

export { Vehiculo };

const coche = new Vehiculo("coche");
console.log(coche.mover()); // El coche se está moviendo.