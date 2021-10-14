const empleados = [
    {
        id:1,
        nombre: "Fernando"
    },
    {
        id:2,
        nombre: "Ana"
    },
    {
        id:3,
        nombre: "Marcela"
    }
]
const sueldos = [
    {
        id:1,
        sueldo: 1000
    },
    {
        id:2,
        sueldo: 1500
    }
]

const getEmpleado=(id)=>{
    return new Promise((resolve,reject)=>{
        const empleado = empleados.find((obj)=>{return obj.id === id});
        (empleado)?resolve(empleado):reject("El empleado no existe");
        /* if(empleado){
            resolve(empleado)
        }else{
            reject("El empleado no existe")
        } */
    })
}

const getSalario=(id)=>{
    return new Promise((resolve,reject)=>{
        const salario = sueldos.find((obj)=>{return obj.id === id});
        (salario)?resolve(salario):reject(`No existe sueldo para el id: ${id}`);
    })
}



/* getEmpleado(id_envio)
    .then(empleado =>{console.log(empleado)})
    .catch(err => console.log(err));

getSalario(id_envio)
    .then(salario =>{console.log(salario.sueldo)})
    .catch(err => console.log(err)); */

/* getEmpleado(id_envio)
    .then(empleado =>{
        getSalario(id_envio)
            .then(salario =>{console.log(empleado.nombre,"recibe:",salario.sueldo)})
            .catch(err => console.log(err));
    })
    .catch(err => console.log(err)); */

const id_envio=4
let nombre

getEmpleado(id_envio)
    .then(empleado =>{
        nombre=empleado.nombre
        return getSalario(id_envio)})
    .then(salario => console.log(nombre,"recibe:",salario.sueldo))
    .catch(err => console.log(err));