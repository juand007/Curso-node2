//const inquirer = require("inquirer");
require("dotenv").config(); //configuracion de variables de entorno

const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busqueda");

//console.log(process.env.MAPBOX_KEY);

const main = async ()=>{
    let opcion;
    let busqueda = new Busquedas();
    
    do{
        opcion = await inquirerMenu();

        switch (opcion) {
            case "1": 
                //Mostrar mensaje
                const buscar = await leerInput("Ingrese una ciudad:");
                //Buscar lugar
                const lugares = await busqueda.ciudad(buscar);
                //Seleccionar el lugar
                const idSelecct = await listarLugares(lugares);
                if (idSelecct === "0") continue;
                const lugarSelect =lugares.find(lugar=> lugar.id === idSelecct); //retorna un objeto {}
                //Guardar en historial 
                busqueda.agregarHistorial(lugarSelect.nombre);
                //Datos del clima
                const clima = await busqueda.climaLugar(lugarSelect.latitud,lugarSelect.longitud);
                
                //Mostrar resultados
                console.log("\n**** Informacion de la ciudad ***");
                console.log("Ciudad:".green,lugarSelect.nombre);
                console.log("Latitud:".green,lugarSelect.latitud);
                console.log("Longitud:".green,lugarSelect.longitud);
                console.log("Temperatura:".green,clima.temperatura);
                console.log("Minima:".green,clima.temp_min);
                console.log("Maxima:".green,clima.temp_max);
                console.log("Descripcion:".green,clima.descripcion);

                break;
            case "2":
                busqueda.historialCapitalizado.forEach((lugar, i)=>{
                    const idx = `${i+1}`;
                    console.log(`${idx} ${lugar}`);
                }); 
                break;
            default:
                break;
        }

        if (opcion!=="0") await pausa();
    }while(opcion !== "0");
}

main();