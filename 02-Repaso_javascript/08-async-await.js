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
    },
    {
        id:4,
        sueldo: 2000
    }
]

const getEmpleado=(id)=>{
    return new Promise((resolve,reject)=>{
        const empleado = empleados.find((obj)=>{return obj.id === id});
        (empleado)?resolve(empleado):reject(`El empleado con id ${id} NO existe`);
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

const getInfoUsuario = async (id_envio) =>{
    try {
        const empleado = await getEmpleado(id_envio);
        const salario = await getSalario(id_envio);
        return `El salario de ${empleado.nombre} es: $ ${salario.sueldo}`;
    } catch (error) {
        throw error;   //con throw llama al reject  --> va al catch
    }
};

const id_envio=10
getInfoUsuario(id_envio)
    .then(msg=>{console.log(msg)})
    .catch(err =>{console.log(err)});
