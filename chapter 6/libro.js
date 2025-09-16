class Libro {
    constructor(titulo, autor) {
        this.titulo = titulo;
        this.autor = autor;
    }

    descripcion() {
        return `${this.titulo} fue escrito por ${this.autor}`;
    }
}

export { Libro };

const libro1 = new Libro("Clean Code", "Robert c. Martin");
console.log(libro1.descripcion()); // Clean Code fue escrito por Robert c. Martin