const salonesFijos = [
  {
    id: 1,
    nombreSalon: 'Salón Temático Nº1 "Aventura Pirata"',
    direccionSalon: 'Concordia, Entre Rios - Avenida del Sol 456',
    descripcionSalon: 'El salón de Jumpmania ofrece un espacio perfecto para un evento de todas las edades que busquen pasar un día lleno de diversión. El salón consta de un gran espacio diseñado para todas las edades lleno de trampolines interconectados de todos los tamaños y fosas de cubos de espuma para asegurar la seguridad a la hora de saltar.',
    imagenSalon: 'imagenes/partyroom.webp',
    precioSalon: 26000
  },
  {
    id: 2,
    nombreSalon: 'Salón Temático Nº2 "Fun Zone"',
    direccionSalon: 'Concordia, Entre Rios - Calle Litoral 101',
    descripcionSalon: 'El salón Fun Zone es un lugar increíble que asegura la diversión tanto de chicos como de grandes con distintos peloteros. Con una gran variedad entre camas elásticas, toboganes y fosas de pelotas con un amplio espacio para correr, saltar y gritar de emoción.',
    imagenSalon: 'imagenes/KRmoTNl-A_1200x0__1.jpg',
    precioSalon: 22000
  },
  {
    id: 3,
    nombreSalon: 'Salón Temático Nº3 "Jumpmania"',
    direccionSalon: 'Concordia, Entre Rios - 9 de julio 154',
    descripcionSalon: 'El salón de Jumpmania ofrece un espacio perfecto para un evento de todas las edades que busquen pasar un día lleno de diversión. El salón consta de un gran espacio diseñado para todas las edades lleno de trampolines interconectados de todos los tamaños y fosas de cubos de espuma para asegurar la seguridad a la hora de saltar.',
    imagenSalon: 'imagenes/jumpmania.webp',
    precioSalon: 24000
  },
  {
    id: 4,
    nombreSalon: 'Salón Temático Nº4 "Safari salvaje"',
    direccionSalon: 'Concordia, Entre Rios - Caminito 131',
    descripcionSalon: 'El salón Safari Salvaje es un lugar que ofrece muchas actividades divertidas apegadas a la temática. Un espacio lleno de colores vibrantes, peloteros y muchos juegos para todas las edades. Ideal para cumpleaños y celebraciones especiales.',
    imagenSalon: 'imagenes/NUESTRAS-JUNGLAS-TLALPAN.jpg',
    precioSalon: 25000
  }
];

let indexEnEdicion = null;

function obtenerID() {
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    const todosLosSalones = [...salonesFijos, ...salones];
    const idMayor = todosLosSalones.reduce((max,salon) => Math.max(max, salon.id), 0);
    return idMayor + 1;
}

function mostrarSalones() {
    const tablaBody = document.querySelector('#tablaSalones tbody');
    if (!tablaBody) return;
    tablaBody.innerHTML = '';

    salonesFijos.forEach((salon) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${salon.id}</td>
        <td>${salon.nombreSalon}</td>
        <td>${salon.direccionSalon}</td>
        <td>${salon.descripcionSalon}</td>
        <td>$${salon.precioSalon}</td>
        <td>${salon.imagenSalon ? `<img src="${salon.imagenSalon}" alt="Imagen de ${salon.nombreSalon}" width="80">` : `<em>(sin imagen predeterminada)</em>`}</td>
        <td><!-- No hay acciones para fijos --></td>`;
    tablaBody.appendChild(fila);
    });

    const salonesGuardados = JSON.parse(localStorage.getItem('salones')) || [];
    salonesGuardados.forEach((salon, index) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${salon.id}</td>
      <td>${salon.nombreSalon}</td>
      <td>${salon.direccionSalon}</td>
      <td>${salon.descripcionSalon}</td>
      <td>$${salon.precioSalon}</td>
      <td>${salon.imagenSalon ? `<img src="${salon.imagenSalon}" alt="Imagen de ${salon.nombreSalon}" width="80">` : `<em>(sin imagen)</em>`}</td>
      <td>
        <button class="btn btn-sm btn-warning me-2" onclick="editarSalon(${index})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarSalon(${index})">Eliminar</button>
      </td>`;
    tablaBody.appendChild(fila);
    });
    }

    document.addEventListener('DOMContentLoaded', () => {
    if (!sessionStorage.getItem('usuario')) {
        alert('Debes iniciar sesion');
        window.location.href = 'iniciarsesion.html';
        return;
    }

    const salir = document.getElementById('logout');
    if (salir) {
        salir.addEventListener('click', () => {
        sessionStorage.clear();
        window.location.href = 'salones.html';
    });
    }

    const form = document.getElementById('formSalones');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const nombreSalon = document.getElementById('nombreSalon').value.trim();
            const direccionSalon = document.getElementById('direccionSalon').value.trim();
            const descripcionSalon = document.getElementById('descripcionSalon').value.trim();
            const precioSalon = document.getElementById('precioSalon').value.trim();
            const inputImagen = document.getElementById('imagenSalon');

            if (!nombreSalon || !direccionSalon || !descripcionSalon) {
                alert('Por favor completa todos los campos de texto.');
                return;
            }
            if (inputImagen.files.length === 0) {
                alert('Debes elegir una imagen para el salón.');
                return;
            }

            const archivo = inputImagen.files[0];
            const reader = new FileReader();

            reader.onload = function(event) {
                
            const imagenBase64 = event.target.result;
            const salones = JSON.parse(localStorage.getItem('salones')) || [];

            if (indexEnEdicion !== null) {
                salones[indexEnEdicion].nombreSalon = nombreSalon;
                salones[indexEnEdicion].direccionSalon = direccionSalon;
                salones[indexEnEdicion].descripcionSalon = descripcionSalon;
                salones[indexEnEdicion].precioSalon = precioSalon;
                salones[indexEnEdicion].imagenSalon = imagenBase64;
                indexEnEdicion = null;
            } else {
                const nuevoSalon = {
                    id: obtenerID(),
                    nombreSalon,
                    direccionSalon,
                    descripcionSalon,
                    precioSalon,
                    imagenSalon: imagenBase64
            };
            
            salones.push(nuevoSalon);

            alert(
                `Nuevo salón agregado:\n\n` +
                `– ID: ${obtenerID()}\n` +
                `– Nombre: ${nombreSalon}\n` +
                `– Dirección: ${direccionSalon}\n` +
                `– Descripción: ${descripcionSalon}\n` +
                `– Precio: ${precioSalon}` )
            }

            localStorage.setItem('salones', JSON.stringify(salones));
            form.reset();
            mostrarSalones();
            };
            reader.readAsDataURL(archivo);
        });
    }
mostrarSalones();
});