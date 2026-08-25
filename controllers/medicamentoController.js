const medicamentoModel = require('../models/medicamentoModel');

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

    const nombreLimpio = nombre.trim().toUpperCase();

    if(!/^[A-ZÁÉÍÓÚÜÑ ]+$/.test(nombreLimpio)) {
        return res.status(400).json({
            error: "El nombre solo puede contener letras y espacios"
            });
    }

    const gramajeLimpio = gramaje.trim().toUpperCase();
    
    if(!/^[A-Z0-9/ ]+$/.test(gramajeLimpio)){
        return res.status(400).json({
            error: "Gramaje solo permite letras y numeros"
        })
    }

    if(!nombre.trim() || cantidad === undefined || !gramaje.trim()) {
        return res.status(400).json({
            error: "Todos los campos son obligatorios"
        });
    }
    
    const cantidadNumero = Number(cantidad);

    if(isNaN(cantidadNumero)){
        return res.status(400).json({
            error: "La cantidad debe ser un numero"
        })
    }

    if(cantidadNumero <= 0){
        return res.status(400).json({
            error: "La cantidad debe ser mayor que 0"
        });
    }

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

})
}
