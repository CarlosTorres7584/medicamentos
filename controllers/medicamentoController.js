const medicamentoModel = require('../models/medicamentoModel');

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

///funcion agregar//////////
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
    const cantidadNumero = Number(cantidad);
    

    if(!nombre.trim() || cantidad === undefined || !gramaje.trim()) {
        return res.status(400).json({
            error: "Todos los campos son obligatorios"
        });
    }

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



    medicamentoModel.agregar(
        nombreLimpio, cantidadNumero, gramajeLimpio, (err) => {

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
};