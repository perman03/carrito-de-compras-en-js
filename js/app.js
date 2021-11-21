//VARIABLES - SELECCIONAMOS LOS ID SOBRE LOS QUE VAMOS A TRABAJAR
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');           
const contenedorCarrito = document.querySelector('#lista-carrito tbody');    
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');    
let articuloscarrito = []; 



//LISTA DE EVENTOS DEL PROYECTO
registrarEventListener();
function registrarEventListener(){
    //Evento que se activa cuando agregas un curso presionando el botón "agregar"
    listaCursos.addEventListener('click', agregarCurso);
    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso); 
    //vaciar carrito 
    vaciarCarritoBtn.addEventListener('click', ()=>{
        articuloscarrito = [];
        carritoHTML(); 
    })


}

//FUNCIONES DEL PROYECTO
function agregarCurso(e){
    e.preventDefault(); 
    if(e.target.classList.contains('agregar-carrito')){       
       const cursoSeleccionado = e.target.parentElement.parentElement;    
       leerDatosCursos(cursoSeleccionado);
    }
}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        articuloscarrito = articuloscarrito.filter( cursos => cursos.id !== cursoId); 

        carritoHTML(); 
    }
}
 
function leerDatosCursos(cursos){
    const infoCurso = {
        imagen: cursos.querySelector('img').src, 
        titulo: cursos.querySelector('h4').textContent,
        precio: cursos.querySelector('.precio span').textContent,
        id:     cursos.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = articuloscarrito.some( cursos => cursos.id === infoCurso.id)
    if(existe){
        //ACTUALIZAMOS LA CANTIDAD
        const curso = articuloscarrito.map(cursos => {
            if(cursos.id === infoCurso.id){
                cursos.cantidad++;
                return cursos;     //retorna el objeto duplicado
            }else{
                return cursos;    //retorna el objeto original, sin duplicar
            }
        }); 
        articuloscarrito = [...curso];

    } else{
        //AGREGAR ELEMENTOS AL ARREGLO DE CARRITO
        articuloscarrito = [...articuloscarrito, infoCurso];
    }
    
    // console.log(articuloscarrito);  
    carritoHTML(); 
}

function carritoHTML(){


   limpiarHTML(); 


    articuloscarrito.forEach(cursos => {
        const {imagen, titulo, precio, cantidad, id} = cursos;    //Destructuring 
        const row = document.createElement('tr'); 
        row.innerHTML = `
            <td>
                <img src="${imagen}" width = "100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <th>
                <a href="#" class="borrar-curso" data-id="${id}" > X </a>
            </th>
        `; 

        contenedorCarrito.appendChild(row);
        
    });
}

function limpiarHTML(){
 contenedorCarrito.innerHTML = ''; 
}
