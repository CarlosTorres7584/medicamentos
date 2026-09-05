/////VALIDACION NOMBRE////////
function validarNombre(nombre){

    const nombreLimpio = nombre.trim().toUpperCase();

    if (!/^[A-ZÁÉÍÓÚÜÑ ]+$/.test(nombreLimpio)){
        return null;
    }

    return nombreLimpio;
};


////VALIDACION CANTIDAD///////////

function validarCantidad(cantidad) {

    const cantidadNumero = Number(cantidad);
    
    if (isNaN(cantidadNumero)){
        return null;
    }

    if(cantidadNumero <= 0){
        return null;
    }

    return cantidadNumero;
};

//////VALIDACION GRAMAJE////////

function validarGramaje(gramaje){

    const gramajeLimpio = gramaje.trim().toUpperCase();

    if(!/^[A-Z0-9/ ]+$/.test(gramajeLimpio)){
        return null;
    }

    return gramajeLimpio;
}




module.exports ={
    validarNombre,
    validarCantidad,
    validarGramaje
};