
const deadpool = {
nombre: "Wade",
apellido: "Wilson",
poder: "Regeneracion",
edad:30,
getNombre(){
    return `${this.nombre} ${this.apellido} ${this.poder}`
}
}
console.log(deadpool.getNombre())

const {nombre, apellido, poder ,edad = 20} =deadpool
console.log(nombre, apellido, poder ,edad)

function imprimir({nombre, apellido, poder ,edad = 20}){
    console.log(nombre,apellido,poder,edad)
}
console.log(imprimir(deadpool))