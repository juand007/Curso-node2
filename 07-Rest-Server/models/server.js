const express = require("express");
const cors = require("cors");

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = "/api/usuarios";
        //Middlewares
        this.middleware();
        //Rutas de la app
        this.router();
    }

    middleware(){
        //Cors
        this.app.use(cors());

        //Lectura y Parceo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static("public"));
    }

    router(){
        this.app.use(this.usuariosPath, require("../routes/user"));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("App listening in port:",this.port);
        });
    }
}

module.exports = Server;