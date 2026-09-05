const medicamentoModel = require('../models/medicamentoModel');

const {
    validarNombre, validarCantidad, validarGramaje
} = require('../utils/validaciones');


//////////////////FUNCION OBTENER TODOS///////////////////////////////

exports.obtenerTodos = (req, res) => {

    medicamentoModel.obtenerTodos((err, medicamentos) => {

        if (err) {

            console.log(err);
            return res.status(500).json({
                error: "Error al obtener los medicamentos"
            });
        }

        res.json(medicamentos);
    });
};

////////////////////FUNCION AGREGAR///////////////////////////////

exports.agregar = (req, res) =>{
    
    const {nombre, cantidad, gramaje} = req.body;
    
    if(nombre === undefined ||
        nombre.trim() === "" ||
        cantidad === undefined ||
        gramaje === undefined ||
        gramaje.trim() === ""
    ) {
        return res.status(400).json({
            error: "Todos los campos son obligatorios"
        });
    };

    const nombreLimpio = validarNombre(nombre);
    if(nombreLimpio === null) {
        return res.status(400).json({
            error: "El nombre solo puede contener letras y espacios"
            });
    };
    
    const cantidadNumero = validarCantidad(cantidad);
    if(cantidadNumero === null){
        return res.status(400).json({
            error: "La cantidad debe ser mayor que 0"
        });
    };

    const gramajeLimpio = validarGramaje(gramaje);
    if(gramajeLimpio === null){
        return res.status(400).json({
            error: "Gramaje solo permite letras y numeros"
        });
    };


    medicamentoModel.existe (nombreLimpio, gramajeLimpio, (err, medicamentoExistente) => {

        if (err){
            return res.status(500).json({
                error: "Error al consultar el medicamento"
            });
        }

        if (medicamentoExistente){
            return res.status(400).json({
                error: "Medicamento ya existe"
            });
        }


    medicamentoModel.agregar(nombreLimpio, cantidadNumero, gramajeLimpio, (err) => {

        if (err){
                console.error(err);
                return res.status(500).json({
                    error: "Error al agregar medicamento"
                });
            }
            res.json({
                mensaje: "Medicamento agregado con exito"
            });
        }
    );

});
};

////////FUNCION ELIMINAR///////////////

exports.eliminar = (req, res) => {
    
    const {id} = req.params;
    
    medicamentoModel.eliminar (id, (err) => {
            
        if (err){

            console.log(err);

            return res.status(500).json({

                error:"Error al eliminar medicamento"
            })
        }
            console.log("eliminado");

            res.json({

                mensaje: "Medicamento eliminado con exito"
            });
    });
};


///////FUNCION ACTUALIZAR//////////

exports.actualizar =(req, res) => {

    const {id} = req.params;
    const {nombre, cantidad, gramaje} = req.body;

    ///VERIFICA LOS CAMPOS OBLIGATORIOS

    if(!nombre || cantidad === undefined || !gramaje){
        return res.status(400).json({
            error: "Todos los campos son obligatorios"
        })
    }
}