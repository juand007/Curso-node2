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

const getEmpleado=(id,callback)=>{
    const empleado = empleados.find((obj)=>{return obj.id === id})
    if (empleado){
        callback(null,empleado);
    }else{
        callback("El empleado no existe")
    }
}

const getSalario=(id,callback)=>{
    const sueldo = sueldos.find((obj)=>{return obj.id === id})
    if (sueldo){
        callback(null,sueldo);
    }else{
        callback(`No existe sueldo para el id: ${id}`)
    }
}
const id_envio=2

getEmpleado(id_envio,(error,empleado)=>{
    if (error){
        console.log(error)
    }else{
        console.log(empleado.nombre)
        getSalario(id_envio,(error,salario)=>{
            if (!error){
                console.log(salario.sueldo)
            }else{
                console.log(error)
            }
        })
    }
})

/* getSalario(19,(error,salario)=>{
    if (!error){
        console.log(salario.sueldo)
    }else{
        console.log(error)
    }
}) */