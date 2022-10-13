const mongoose = require('mongoose');

const Student = require("./models/student.model.js")

const studentList = require("./data/students.json");
const { findOneAndUpdate } = require('./models/student.model.js');
// los .json se exportan automaticamente

mongoose.connect("mongodb://localhost/studentsdb")
.then((response) => {
  console.log("Todo bien! conectados a la BD")

  // empezar a hacer modificaciones en la BD
  // CREATE
  // agregar un solo elemento => .create()
  // return Student.create({
  //   name: "Curro",
  //   // candy: 22,
  //   likesPokemon: true,
  //   pizzaToppings: ["Tomate", "Queso", "Alcachofa", "Piña"]
  // })

  // para agregar multiples elementos => insertMany
  // return Student.insertMany(studentList)

  // READ
  // metodo para buscar todos los elementos de una colección => .find()
  // return Student.find() // busca todo.
  // return Student.find({likesPokemon: true}) // le pasamos un query para la busqueda
  // return Student.find( {pizzaToppings: {$in: ["Piña"] } } ).select("name candy pizzaToppings")
  return Student
    .find( {pizzaToppings: {$in: ["Piña"] } } ) // queries de busqueda como en compass
    .select({name: 1, candy: 1, pizzaToppings: 1}) // select() es project. 1 es incluyelo. 0 es ignoralo (opcional)
    .sort({candy: 1}) // 1 ascendente. -1 descendente
    // .skip() // para saltarse x cantidad de documentos
    // .limit() // para que solo nos busque los primeros x documentos


})
.then((response) => {
  console.log("estamos buscando los estudiantes")
  console.log(response)

  // READ de un solo documento => un solo Objetos
  // return Student.findOne({name: "Borja"})
  return Student.findById("63481cfe9d5206d7dd5581ac")

})
.then((response) => {
  console.log("el documento es:", response)

  // UPDATE => pasamos dos argumentos
  // arg1. el query de busqueda
  // arg2. lo que queremos actualizar
  // return Student.findOneAndUpdate({ name: "Borja" }, { likesPokemon: true })
  // return Student.findByIdAndUpdate("63481cfe9d5206d7dd5581ad", { likesPokemon: true }, {new: true})
  return Student.findOneAndUpdate({name: "Borja"}, { $push: { pizzaToppings: "Peperoni" } }, {new: true})

  // opcionalmente podemos agregar 3er argument {new: true} para que nos devuelva el documento actualizado

  

})
.then((response) => {
  console.log(response) // el elemento que estamos modificando (antes de hacer la modificacion)
  // ! si usamos {new: true} el console.log sería el documento actualizado
  console.log("Ahora a Borja si le gusta Pokemon")


  // DELETE
  return Student.findOneAndDelete({name: "Nacho"})
  // findByIdAndDelete(unId)

})
.then((response) => {
  // a partir de aqui, ya no existe en la BD
  console.log("documento borrado", response)
})
.catch((error) => {
  console.log(error)
})
