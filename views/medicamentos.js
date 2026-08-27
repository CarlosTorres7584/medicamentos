console.log("estoy ejecutando este archivo");

const form = document.querySelector('#formMedicamento')

////ENVIA LOS MEDICAMENTOS AL SQL
form.addEventListener('submit', async (event) => {
    
    event.preventDefault();

    const nombre = document.querySelector('#nombre').value;

    const cantidad = document.querySelector('#cantidad').value;

    const gramaje = document.querySelector('#gramaje').value;

    const medicamento = {
        nombre: nombre,
        cantidad: cantidad,
        gramaje: gramaje
    };


    const respuesta = await fetch('/medicamentos', {
        method: 'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(medicamento)
    });

    const resultado = await respuesta.json();

    console.log(resultado);

    console.log("antes reset");

    form.reset();
    
    console.log("despues");    

    cargarMedicamentos();

  
});


//////ENVIA EL LISTADO DE MEDICAMENTOS DESDE SQL AL HTML
async function cargarMedicamentos(){

    const respuesta = await fetch('/medicamentos');

    const medicamentos = await respuesta.json();

    const lista = document.querySelector('#listaMedicamentos');

    lista.innerHTML = ''; //limpia la lista 

    medicamentos.forEach((medicamento) => {

        const elemento = document.createElement('div');

        elemento.className = 'medicamento';

        elemento.innerHTML = `
        <strong>${medicamento.nombre}</strong>
        <br>
        Cantidad: ${medicamento.cantidad}
        <br>
        Gramaje: ${medicamento.gramaje}
        <br>
        <button class="btnEliminar" data-id="${medicamento.id}">
        ELIMINAR
        </button>
        `;   

        const botonEliminar = elemento.querySelector('.btnEliminar');
        botonEliminar.addEventListener('click', async () => {
            const id = botonEliminar.dataset.id;

            console.log("id:", id);
            console.log("url:",`/medicamentos/${id}`);
            const respuesta = await fetch(`/medicamentos/${id}`,{
                method: 'DELETE'
            });

            const resultado = await respuesta.json();

            console.log(resultado);

            cargarMedicamentos();        
        });

        lista.appendChild(elemento);  
        
        
    });

    console.log(medicamentos);
}


cargarMedicamentos();