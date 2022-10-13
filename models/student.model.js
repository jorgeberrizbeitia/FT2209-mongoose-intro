const mongoose = require("mongoose")

// el schema define las propiedas de cada elemento de esta colección
let studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // es obligatorio que el obj sea creado con name
    unique: true // el name debe ser unico. No permite agregar documentos con el mismo nombre.
  },
  candy: {
    type: Number,
    default: 1 // si no se determina un valor, el valor será 1
  },
  likesPokemon: Boolean,
  pizzaToppings: [{
    type: String,
    enum: ["Tomate", "Queso", "Piña", "Peperoni", "Alcachofa"] // .todos los posibles valor que se pueden agregar
  }], // esto define un array de strings
  // address: {
  //   street: String,
  //   strNumber: Number
  // }
})

// el model nos permite acceder a la base de datos (esa colección) y buscar o modificar
let Student = mongoose.model("Student", studentSchema)
//    |
//  pascal casing => buena practica

module.exports = Student // para poder usarlo en cualquier archivo