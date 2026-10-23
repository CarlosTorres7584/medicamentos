console.log("estoy ejecutando este archivo");

const form = document.querySelector("#formMedicamento");

const buscador = document.querySelector("#buscarMedicamento");

let medicamentosActuales = [];


////ENVIA LOS MEDICAMENTOS AL SQL
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nombre = document.querySelector("#nombre").value;

  const cantidad = document.querySelector("#cantidad").value;

  const gramaje = document.querySelector("#gramaje").value;

  const medicamento = {
    nombre: nombre,
    cantidad: cantidad,
    gramaje: gramaje,
  };

  const respuesta = await fetch("/medicamentos", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(medicamento),
  });

  const resultado = await respuesta.json();

  console.log(resultado);

  console.log("antes reset");

  form.reset();

  console.log("despues");

  cargarMedicamentos();
});

//////ENVIA EL LISTADO DE MEDICAMENTOS DESDE SQL AL HTML
async function cargarMedicamentos() {
  const respuesta = await fetch("/medicamentos");

  medicamentosActuales = await respuesta.json();

  const medicamentos = medicamentosActuales;

  const lista = document.querySelector("#listaMedicamentos");

  mostrarMedicamentos(medicamentos);

  console.log(medicamentos);

}

//// FUNCION MOSTRAR MEDICAMENTOS//////

  function mostrarMedicamentos(listaMedicamentos) {
    const lista = document.querySelector("#listaMedicamentos");
    lista.innerHTML = "";

    listaMedicamentos.forEach((medicamento) => {

        const elemento = document.createElement("div");

    elemento.className = "medicamento";

     elemento.innerHTML = `
        <strong>${medicamento.nombre}</strong>
        <br>
        Cantidad: ${medicamento.cantidad}
        <br>
        Gramaje: ${medicamento.gramaje}
        <br><br>

        <div class = "editorTarjeta" style="display: none;">

        <label>NOMBRE:</label>

        <input
                type="text"
                class="editarNombre"
                value="${medicamento.nombre}"
                >

        <br><br>

        <label>GRAMAJE</label>
        <input
            type="text"
            class="editarGramaje"
            value="${medicamento.gramaje}"
            >

        <br><br>

        <button type="button" class="btnGuardarCambios">
        GUARDAR
        </BUTTON>
        <br><br>

        <button type="button" class="btnCancelarEdicion">
        CANCELAR
        </button>
        <br><br>

        </div>

        <button type="button" class="btnEditar" data-id="${medicamento.id}">
        EDITAR
        </button>

        <br><br>

        <button type="button" class="btnEliminar" data-id="${medicamento.id}">
        ELIMINAR
        </button>
       
    `;

    /// ===== EVENTOS DE LOS BOTONES EDITAR Y ELIMINAR=========

    //===== BOTON EDITAR==========

    const botonEditar = elemento.querySelector(".btnEditar");
    const botonEliminar = elemento.querySelector(".btnEliminar"); 

    const editor = elemento.querySelector(".editorTarjeta");
    const campoNombre = elemento.querySelector(".editarNombre");
    const campoGramaje = elemento.querySelector(".editarGramaje");
    
    botonEditar.addEventListener("click", () => {
    editor.style.display = "block";

    campoNombre.value = medicamento.nombre;
    campoGramaje.value = medicamento.gramaje;

    botonEditar.style.display = "none";
    botonEliminar.style.display = "none";
});

////BOTONES GUARDADAR Y CANCELAR

const botonGuardar = elemento.querySelector(".btnGuardarCambios");
const botonCancelar = elemento.querySelector(".btnCancelarEdicion");

///BOTON CANCELAR

botonCancelar.addEventListener("click", () => {
    editor.style.display = "none";

    campoNombre.value = medicamento.nombre;
    campoGramaje.value = medicamento.gramaje;

    botonEditar.style.display = "inline-block";
    botonEliminar.style.display = "inline-block";
});

    //======= BOTON ELIMINAR=============
    botonEliminar.addEventListener("click", async () => {

        const confirmar = confirm (
            `Seguro que deseas eliminar "${medicamento.nombre}"?`
        );

        if (!confirmar){
            return;
        }
    
        const id = botonEliminar.dataset.id;

      const respuesta = await fetch(`/medicamentos/${id}`, {
        method: "DELETE",
      });

      const resultado = await respuesta.json();

      console.log(resultado);

      cargarMedicamentos();
    });

    lista.appendChild(elemento);
  });
  }

  buscador.addEventListener("input", () => {
    const texto = buscador.value.trim().toUpperCase();

    const medicamentosFiltrados = medicamentosActuales.filter((medicamento) =>
      medicamento.nombre.toUpperCase().includes(texto),
    );

    mostrarMedicamentos(medicamentosFiltrados);
  }); 

cargarMedicamentos();
