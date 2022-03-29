class User{

    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return this.nombre + " " + this.apellido;
    }

    addMascota(nombre){
        this.mascotas.push(nombre);
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(nombre,autor){
        this.libros.push({"nombre":nombre,"autor":autor})
    }

    getBookNames(){
        this.libros.forEach(element => {
            return console.log(element.nombre);
        });
    }
}

//Create User
let user = new User("Jorge","Molano",[{"nombre":"El senor de las moscas","autor":"William Golding"},{"nombre":"Fundacion","autor":"Isaac Asimov"}],["Perro","Gato"]);
//Get Full Name
console.log(user.getFullName())
//Add Pet
user.addMascota("Lobo");
//Count Pets
console.log(user.countMascotas());
//Add Book
user.addBook("Dune","Person");
//Show Book's Name
console.log(user.getBookNames());
