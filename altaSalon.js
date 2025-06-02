
const salonesFijos = [ //constante de los salones fijos del catalogo de salones.html
    {
        nombreSalon: 'Salón Temático Nº1 "Aventura Pirata"',
        direccionSalon: 'Concordia, Entre Rios - Avenida del Sol 456',
        descripcionSalon: 'El salón de Jumpmania ofrece un espacio perfecto para un evento de todas las edades que busquen pasar un día lleno de diversión. El salón consta de un gran espacio diseñado para todas las edades lleno de trampolines interconectados de todos los tamaños y fosas de cubos de espuma para asegurar la seguridad a la hora de saltar.'
    },
    {
        nombreSalon: 'Salón Temático Nº2 "Fun Zone"',
        direccionSalon: 'Concordia, Entre Rios - Calle Litoral 101',
        descripcionSalon: 'El salón Fun Zone es un lugar increíble que asegura la diversión tanto de chicos como de grandes con distintos peloteros. Con una gran variedad entre camas elásticas, toboganes y fosas de pelotas con un amplio espacio para correr, saltar y gritar de emoción.'
    },
    {
        nombreSalon: 'Salón Temático Nº3 "Jumpmania"',
        direccionSalon: 'Concordia, Entre Rios - 9 de julio 154',
        descripcionSalon: 'El salón de Jumpmania ofrece un espacio perfecto para un evento de todas las edades que busquen pasar un día lleno de diversión. El salón consta de un gran espacio diseñado para todas las edades lleno de trampolines interconectados de todos los tamaños y fosas de cubos de espuma para asegurar la seguridad a la hora de saltar.'
    },
    {
        nombreSalon: 'Salón Temático Nº4 "Safari salvaje"',
        direccionSalon: 'Concordia, Entre Rios - Caminito 131',
        descripcionSalon: 'El salón Safari Salvaje es un lugar que ofrece muchas actividades divertidas apegadas a la temática. Un espacio lleno de colores vibrantes, peloteros y muchos juegos para todas las edades. Ideal para cumpleaños y celebraciones especiales.'
    }
];

function mostrarSalones() { //muestra salones
    const tablaBody = document.querySelector('#tablaSalones tbody');
    if (!tablaBody) return;
    tablaBody.innerHTML = '';


    salonesFijos.forEach((salon) => { // constante de salones fijos de catalogo
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${salon.nombreSalon}</td>
            <td>${salon.direccionSalon}</td>
            <td>${salon.descripcionSalon}</td>
            <td></td> <!-- Sin acciones para los fijos -->
        `;
        tablaBody.appendChild(fila);
    });

    const salones = JSON.parse(localStorage.getItem('salones')) || []; //salones de altasalon que se pueden editar,etc
    salones.forEach((salon, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${salon.nombreSalon}</td>
            <td>${salon.direccionSalon}</td>
            <td>${salon.descripcionSalon}</td>
            <td>
                <button class="btn btn-sm btn-warning me-2" onclick="editarSalon(${index})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="eliminarSalon(${index})">Eliminar</button>
            </td>
        `;
        tablaBody.appendChild(fila);
    });
}

document.addEventListener('DOMContentLoaded',() =>{
    if (!sessionStorage.getItem('usuario')){
        alert('Debes iniciar sesion')
        window.location.href = 'iniciarsesion.html';
        return;
    }

    const salir = document.getElementById('logout');
    if (salir){
        salir.addEventListener('click',() => {
            sessionStorage.clear();
            window.location.href = 'salones.html';
        });
    }

    const form = document.getElementById('formSalones');
    if (form) {
        form.addEventListener('submit', function(event){
            event.preventDefault();
            const nombreSalon= document.getElementById('nombreSalon').value;
            const direccionSalon = document.getElementById('direccionSalon').value;
            const descripcionSalon = document.getElementById('descripcionSalon').value;
            const salon = {nombreSalon, direccionSalon, descripcionSalon};
            const salones = JSON.parse(localStorage.getItem('salones')) || [];
            salones.push(salon);
            localStorage.setItem('salones',JSON.stringify(salones))
            alert(`El nuevo salón tiene los siguientes atributos nombre:${nombreSalon}-direccion:${direccionSalon}-descripcion:${descripcionSalon}`);
            this.reset();
            mostrarSalones();
        });
    }
    mostrarSalones();
});
