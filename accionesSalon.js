window.editarSalon = function (index) {
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    const salon = salones[index];

    document.getElementById('nombreSalon').value = salon.nombreSalon;
    document.getElementById('direccionSalon').value = salon.direccionSalon;
    document.getElementById('descripcionSalon').value = salon.descripcionSalon;

    indexEnEdicion = index; 
}

window.eliminarSalon = function (index) {
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    salones.splice(index, 1);
    localStorage.setItem('salones', JSON.stringify(salones));
    mostrarSalones();
}

window.cambiarDisponibilidad = function (index) {
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    if (salones[index]) {
        salones[index].disponible = !salones[index].disponible;
        localStorage.setItem('salones', JSON.stringify(salones));
        mostrarSalones();
    }
}

window.mostrarSalones = function () {
    const tablaBody = document.querySelector('#tablaSalones tbody');
    if (!tablaBody) return;
    tablaBody.innerHTML = '';

    const salonesFijos = [
        {
            id: 1,
            nombreSalon: 'Salón Temático Nº1 "Aventura Pirata"',
            direccionSalon: 'Concordia, Entre Rios - Avenida del Sol 456',
            descripcionSalon: 'El salón de Jumpmania ofrece un espacio perfecto para un evento de todas las edades que busquen pasar un día lleno de diversión. El salón consta de un gran espacio diseñado para todas las edades lleno de trampolines interconectados de todos los tamaños y fosas de cubos de espuma para asegurar la seguridad a la hora de saltar.',
            imagenSalon: 'imagenes/partyroom.webp',
            precioSalon: 26000,
            disponible: true
        },
        {
            id: 2,
            nombreSalon: 'Salón Temático Nº2 "Fun Zone"',
            direccionSalon: 'Concordia, Entre Rios - Calle Litoral 101',
            descripcionSalon: 'El salón Fun Zone es un lugar increíble que asegura la diversión tanto de chicos como de grandes con distintos peloteros. Con una gran variedad entre camas elásticas, toboganes y fosas de pelotas con un amplio espacio para correr, saltar y gritar de emoción.',
            imagenSalon: 'imagenes/KRmoTNl-A_1200x0__1.jpg',
            precioSalon: 22000,
            disponible: true
        },
        {
            id: 3,
            nombreSalon: 'Salón Temático Nº3 "Jumpmania"',
            direccionSalon: 'Concordia, Entre Rios - 9 de julio 154',
            descripcionSalon: 'El salón de Jumpmania ofrece un espacio perfecto para un evento de todas las edades que busquen pasar un día lleno de diversión. El salón consta de un gran espacio diseñado para todas las edades lleno de trampolines interconectados de todos los tamaños y fosas de cubos de espuma para asegurar la seguridad a la hora de saltar.',
            imagenSalon: 'imagenes/Jumpmania.webp',
            precioSalon: 24000,
            disponible: true
        },
        {
            id: 4,
            nombreSalon: 'Salón Temático Nº4 "Safari salvaje"',
            direccionSalon: 'Concordia, Entre Rios - Caminito 131',
            descripcionSalon: 'El salón Safari Salvaje es un lugar que ofrece muchas actividades divertidas apegadas a la temática. Un espacio lleno de colores vibrantes, peloteros y muchos juegos para todas las edades. Ideal para cumpleaños y celebraciones especiales.',
            imagenSalon: 'imagenes/NUESTRAS-JUNGLAS-TLALPAN.jpg',
            precioSalon: 25000,
            disponible: true
        }
    ];

    salonesFijos.forEach((salon) => {
        const fila = document.createElement('tr');
        const estadoDisponibilidad = salon.disponible ? 
            '<span class="badge bg-success">Disponible</span>' : 
            '<span class="badge bg-danger">No Disponible</span>';
        
        fila.innerHTML = `
            <td>${salon.id}</td>
            <td>${salon.nombreSalon}</td>
            <td>${salon.direccionSalon}</td>
            <td>${salon.descripcionSalon}</td>
            <td>$${salon.precioSalon}</td>
            <td>${salon.imagenSalon ? `<img src="${salon.imagenSalon}" alt="Imagen de ${salon.nombreSalon}" width="80">` : `<em>(sin imagen predeterminada)</em>`}</td>
            <td>
                <span class="badge bg-secondary">Salón Fijo</span>
            </td>`;
        tablaBody.appendChild(fila);
    });


    const salonesGuardados = JSON.parse(localStorage.getItem('salones')) || [];
    salonesGuardados.forEach((salon, index) => {
        const fila = document.createElement('tr');
        const estaDisponible = salon.disponible !== false;
        const estadoDisponibilidad = estaDisponible ? 
            '<span class="badge bg-success">Disponible</span>' : 
            '<span class="badge bg-danger">No Disponible</span>';
        const botonDisponibilidad = estaDisponible ? 
            '<button class="btn btn-sm btn-outline-danger w-100 mb-1" onclick="cambiarDisponibilidad(' + index + ')">Marcar No Disponible</button>' :
            '<button class="btn btn-sm btn-outline-success w-100 mb-1" onclick="cambiarDisponibilidad(' + index + ')">Marcar Disponible</button>';
        
        fila.innerHTML = `
            <td>${salon.id}</td>
            <td>${salon.nombreSalon}</td>
            <td>${salon.direccionSalon}</td>
            <td>${salon.descripcionSalon}</td>
            <td>$${salon.precioSalon}</td>
            <td>${salon.imagenSalon ? `<img src="${salon.imagenSalon}" alt="Imagen de ${salon.nombreSalon}" width="80">` : `<em>(sin imagen)</em>`}</td>
            <td>
                <div class="d-flex flex-column">
                    ${estadoDisponibilidad}
                    <div class="d-flex">
                        <button class="btn btn-sm btn-warning w-50 me-1 my-2" onclick="editarSalon(${index})">Editar</button>
                        <button class="btn btn-sm btn-danger w-50 my-2" onclick="eliminarSalon(${index})">Eliminar</button>
                    </div>
                    ${botonDisponibilidad}
                </div>
            </td>`;
        tablaBody.appendChild(fila);
    });
}

