/* VARIABLES Y CONSTANTES*/
const formulario = document.querySelector("#formulario");
const tareas = document.querySelector("#tareas");
const total = document.querySelector("#total");
const completadas = document.querySelector("#completadas");
let task = [];

/*EVENTOS*/
(() => {
    formulario.addEventListener('submit', validarFormulario);
    tareas.addEventListener("click", eliminarTarea);
    tareas.addEventListener("click", completarTarea);
    document.addEventListener("DOMContentLoaded",() => {
        let datosLS = JSON.parse(localStorage.getItem("tareas")) || [];
        task = datosLS;
        agregarHTML();
    })
        
}) ()

/*FUNCIONES*/
function validarFormulario(e){
    e.preventDefault();
    //validar los campos
    const tarea = document.querySelector("#tarea").value;
    if(tarea.trim().length === 0){
        console.log('vacío');
        return
    }
    //creamos el objeto tarea
    const objTarea = {id: Date.now(), tarea: tarea, estado: false};
    //agregamos el array
    task = [...task, objTarea];
    formulario.reset();
    //agregamos al HTML
    agregarHTML();
}

function agregarHTML(){
    //limpiar el HTML
    while(tareas.firstChild){
        tareas.removeChild(tareas.firstChild)
    }

    if(task.length > 0){
        task.forEach(item => {
            const elemento =document.createElement('div');
            elemento.classList.add('item-tarea');
            elemento.innerHTML = `
                <p>${item.estado ? (
                    `<span class='completa'>${item.tarea}</span>`
                ) : (
                    `<span>${item.tarea}</span>`
                )}</p>
                <div class="botones">
                    <button class="eliminar" data-id="${item.id}">X</button>
                    <button class="completada" data-id="${item.id}">!</button>
                </div>
            `
            tareas.appendChild(elemento);
    } );
} else {
    const mensaje = document.createElement("h5");
    mensaje.textContent ="No Hay Tareas"
    tareas.appendChild(mensaje)
}

let totalTareas = task.length;
let tareasCompletadas= task.filter(item => item.estado === true).length;

total.textContent = `Total Tareas: ${totalTareas}`;
completadas.textContent = `Tareas Completadas: ${tareasCompletadas}`;

//hacer que persistan los datos con localStorage
localStorage.setItem("tareas", JSON.stringify(task))

}//Fin función agregar HTML

//completar tareas
function completarTarea(e){
    if(e.target.classList.contains("completada")){
        const tareaID = Number(e.target.getAttribute("data-id"));
        const nuevasTareas = task.map(item => {
            if(item.id === tareaID) {
                item.estado = !item.estado;
                return item;
            } else {
                return item
            }
        }) 

        //editams el arreglo
        task =nuevasTareas;
        agregarHTML();
    }
}

