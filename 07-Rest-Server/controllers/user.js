const {request,response} = require("express");

const usariosGet =(req=request, res=response) => {
    const query = req.query;
    //const {nombre= "No name", edad} = req.query;
    res.json({
        msg: "Api get  - controller - controller",
        query
    });
};

const usariosPost =(req, res=response) => {
    
    const body = req.body;
    //const {nombre, edad} = req.body;

    res.json({
        msg: "Api post  - controller",
        body
    });
};

const usariosPut =(req, res=response) => {

    const id = req.params.id;

    res.json({
        msg: "Api put  - controller",
        id
    });
};

const usariosPatch =(req, res=response) => {
    res.json({
        msg: "Api pacth  - controller"
    });
};

const usariosDelete =(req, res=response) => {
    res.json({
        msg: "Api delete  - controller"
    });
};

module.exports = {
    usariosGet,
    usariosPost,
    usariosPut,
    usariosPatch,
    usariosDelete
}