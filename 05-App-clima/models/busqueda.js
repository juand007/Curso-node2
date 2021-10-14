
const axios = require('axios').default;
const fs = require('fs');

class Busquedas{

    historial = []; //"Quito", "Madrid", "Bogota"
    db_path = `./db/dtabase.json`;

    constructor(){
        //Leer DB
        this.leerDatos();
    }

    get paramsMapbox(){
        return {
            "access_token" : process.env.MAPBOX_KEY,
            "limit": 5,
            "language": "es"
        }
    }

    async ciudad( lugar="" ){
        //Peticion HTTP
        try {
            //const resp = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?access_token=pk.eyJ1IjoianVhbmR1bWEiLCJhIjoiY2tzOXBjMHlpMm91ZDJubzQ5NGJvOHJ1YSJ9.m15eet00HNXX7OhSKmoyMA&limit=5&language=es`);
            console.log("Peticion");
            const instance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });
            const resp = await instance.get();
            //const url =`api.openweathermap.org/data/2.5/weather?lat=${-0.21861}&lon=${-78.50972}&appid=408b59ccda3b319d64397aadfb21d7d7&units=metric&lang=es`;
            return resp.data.features.map(lugar=>({
                id: lugar.id,
                nombre: lugar.place_name,
                longitud: lugar.center[0],
                latitud: lugar.center[1],
            })
            );
        } catch (error) {
            console.log(error)
        }
        return []; //retornar lugares
    }

    get paramsOpenWeather(){
        return {
            "appid" : process.env.OPENWEATHER_KEY,
            "units": "metric",
            "lang" : "es",
        }
    }

    async climaLugar( lat, lon){
        //Peticion HTTP
        try {
            const instance = axios.create({
                baseURL:`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
                params: this.paramsOpenWeather
            });
            const resp = await instance.get();
            const {weather,main}=resp.data; //Desestructuracion
            return {
                temperatura: main.temp,
                temp_min: main.temp_min,
                temp_max: main.temp_max,
                descripcion: weather[0].description
            }
        } catch (error) {
            console.log(error)
        }
        return []; //retornar lugares
    }
    
    agregarHistorial(lugar=""){
        //Verificar duplicados
        if (this.historial.includes(lugar.toLocaleLowerCase())){
            return
        }
        this.historial = this.historial.slice(0,2); //devuelve parte del array, fin(no incluido)
        this.historial.unshift(lugar.toLocaleLowerCase()); //agrega al inicio
        //Grabar en DB
        this.guardarDatos();
    }

    guardarDatos(){
        const carga ={
            historial: this.historial
        }
        fs.writeFileSync(this.db_path,JSON.stringify(carga));
    }

    leerDatos(){
        if( !fs.existsSync(this.db_path) ){
            return null;
        }
        const info = fs.readFileSync(this.db_path, { encoding: 'utf-8' });
        const data = JSON.parse( info );
        //console.log(data.historial);
        this.historial=this.historial.concat(data.historial);
    }

    get historialCapitalizado(){
        return this.historial.map(lugar =>{
            let palabras = lugar.split(" ");
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));
            return palabras.join(" ");
        });
    }
}

module.exports = Busquedas;