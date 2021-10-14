
//setTimeout(function(){
//    console.log("Hola mundo")
//},1000);

//setTimeout(()=>{
//    console.log("Hola mundo")
//},1000);

const getUsuarioById=(id, callback)=>{
    const user={
        id:id,
        nombre:"pepe"
    }
    setTimeout(()=>{
        callback(user)
    },1000);
}

getUsuarioById(1,(usuario)=>{
    console.log(usuario.id)
    console.log(usuario.nombre)
})