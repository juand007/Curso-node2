console.log("Inicio programa");

setTimeout(()=>{
    console.log("1 Timeout");
},3000);

setTimeout(()=>{
    console.log("2 Timeout");
},0);

setTimeout(()=>{
    console.log("3 Timeout");
},0);

console.log("Fin programa");
