const serviciosFijos = [
  {
    id: 1,
    nombreServicio: 'Decoración con globos',
    descripcionServicio: '◉ Servicio de decoración con globos de diversos tamaños y colores, acordes a cada temática propuesta por el cliente.',
    imagenServicio: 'imagenes/childrens-decoration-inspiration-party-600nw-2281922017.jpg',
    precioServicio: 5000
  },
  {
    id: 2,
    nombreServicio: 'Candy Bar',
    descripcionServicio: '◉ Servicio de Candy Bar con variedad de golosinas, postres, jugos o cocteles, adaptados a cada temática y con personal a disposición.',
    imagenServicio: 'imagenes/MicrosoftTeams-image-1-810x561a.jpg',
    precioServicio: 10000
  },
  {
    id: 3,
    nombreServicio: 'Stand de Make Up Artist & Glitter Bar',
    descripcionServicio: '◉ Servicio de maquillaje artístico personalizado para todas las edades, con materiales hipolargénicos de excelente calidad y fácil lavado, que no dañan la piel ni la ropa.',
    imagenServicio: 'imagenes/makeuup.jpg',
    precioServicio: 10000
  },
  {
    id: 4,
    nombreServicio: 'Show & Entretenimientos',
    descripcionServicio: '◉ Servicio de entretenimiento con personal capacitado y dedicado para brindarte un evento divertido, adaptado para todas las edades.',
    imagenServicio: 'imagenes/entretenimientos.jpg',
    precioServicio: 20000
  },
  {
    id: 5,
    nombreServicio: 'Servicio de Catering',
    descripcionServicio: '◉ Servicio adaptado a las necesidades y preferencias del agasajado y los invitados. Contamos con varias opciones saladas, dulces o mixtas.',
    imagenServicio: 'imagenes/catering salado.jpg',
    precioServicio: 20000
  },
  {
    id: 6,
    nombreServicio: 'Torta & mesa dulce',
    descripcionServicio: '◉ Servicio de torta y mesa dulce con la temática que prefieras.',
    imagenServicio: 'imagenes/zazu-eventos-salon-3 (1).jpg',
    precioServicio: 15000
  },
  {
    id: 7,
    nombreServicio: 'Fotografía & Video',
    descripcionServicio: '◉ Servicio de fotografia, video y edición profesional para capturar cada momento especial.',
    imagenServicio: 'imagenes/fotografo-profesional.jpg',
    precioServicio: 10000
  },
  {
    id: 8,
    nombreServicio: 'Invitaciones digitales e impresas',
    descripcionServicio: '◉ Servicio premium de invitaciones en ambos formatos para que puedas elegir el que mejor se adapte a tus invitados.',
    imagenServicio: 'imagenes/tarjetita.jpg',
    precioServicio: 8000
  }
];

let indexEnEdicion = null;

function obtenerID() {
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    const todosLosServicios = [...serviciosFijos, ...servicios];
    const idMayor = todosLosServicios.reduce((max,servicio) => Math.max(max, servicio.id), 0);
    return idMayor + 1;
}

function mostrarServicios() {
    const tablaBody = document.querySelector('#tablaServicios tbody');
    if (!tablaBody) return;
    tablaBody.innerHTML = '';

    serviciosFijos.forEach((servicio) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${servicio.id}</td>
        <td>${servicio.nombreServicio}</td>
        <td>${servicio.descripcionServicio}</td>
        <td>$${servicio.precioServicio}</td>
        <td>${servicio.imagenServicio ? `<img src="${servicio.imagenServicio}" alt="Imagen de ${servicio.nombreServicio}" width="80">` : `<em>(sin imagen predeterminada)</em>`}</td>
        <td><!-- No hay acciones para fijos --></td>`;
    tablaBody.appendChild(fila);
    });

    const serviciosGuardados = JSON.parse(localStorage.getItem('servicios')) || [];
    serviciosGuardados.forEach((servicio, index) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${servicio.id}</td>
      <td>${servicio.nombreServicio}</td>
      <td>${servicio.descripcionServicio}</td>
      <td>$${servicio.precioServicio}</td>
      <td>${servicio.imagenServicio ? `<img src="${servicio.imagenServicio}" alt="Imagen de ${servicio.nombreServicio}" width="80">` : `<em>(sin imagen)</em>`}</td>
      <td>
        <button class="btn btn-sm btn-warning me-2" onclick="editarServicio(${index})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarServicio(${index})">Eliminar</button>
      </td>`;
    tablaBody.appendChild(fila);
    });
}

function mostrarServiciosCards() {
    const catalogo = document.getElementById('catalogoServicios');
    if (!catalogo) return;
    
    const serviciosGuardados = JSON.parse(localStorage.getItem('servicios')) || [];
    serviciosGuardados.forEach((servicio) => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-sm-6';
        col.innerHTML = `
            <div class="card h-100 py-2 px-2">
                <img src="${servicio.imagenServicio}" class="card-img-top" alt="${servicio.nombreServicio}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${servicio.nombreServicio}</h5>
                    <p class="card-text">◉ ${servicio.descripcionServicio}</p>
                    <h5 class="card-title" style="align-self: flex-end; font-weight: bold;">$${servicio.precioServicio}</h5>
                </div>
            </div>
        `;
        catalogo.appendChild(col);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const esAltaServicios = document.getElementById('formServicios') !== null;
    const esServicios = document.getElementById('catalogoServicios') !== null;

    if (esAltaServicios) {
        if (!sessionStorage.getItem('usuario')) {
            alert('Debes iniciar sesion');
            window.location.href = 'iniciarsesion.html';
            return;
        }

        const salir = document.getElementById('logout');
        if (salir) {
            salir.addEventListener('click', () => {
                window.location.href = 'altaMenu.html';
            });
        }

        const form = document.getElementById('formServicios');
        if (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();

                const nombreServicio = document.getElementById('nombreServicio').value.trim();
                const descripcionServicio = document.getElementById('descripcionServicio').value.trim();
                const precioServicio = document.getElementById('precioServicio').value;
                const inputImagen = document.getElementById('imagenServicio');

                if (!nombreServicio || !descripcionServicio) {
                    alert('Por favor completa todos los campos de texto.');
                    return;
                }
                if (inputImagen.files.length === 0) {
                    alert('Debes elegir una imagen para el servicio.');
                    return;
                }

                const archivo = inputImagen.files[0];
                const reader = new FileReader();

                reader.onload = function(event) {
                    
                const imagenBase64 = event.target.result;
                const servicios = JSON.parse(localStorage.getItem('servicios')) || [];

                if (indexEnEdicion !== null) {
                    servicios[indexEnEdicion].nombreServicio = nombreServicio;
                    servicios[indexEnEdicion].descripcionServicio = descripcionServicio;
                    servicios[indexEnEdicion].precioServicio = precioServicio;
                    servicios[indexEnEdicion].imagenServicio = imagenBase64;
                    indexEnEdicion = null;
                } else {
                    const nuevoServicio = {
                        id: obtenerID(),
                        nombreServicio,
                        descripcionServicio,
                        precioServicio,
                        imagenServicio: imagenBase64
                };
                
                servicios.push(nuevoServicio);

                alert(
                    `Nuevo servicio agregado:\n\n` +
                    `– ID: ${obtenerID()}\n` +
                    `– Nombre: ${nombreServicio}\n` +
                    `– Descripción: ${descripcionServicio}\n` +
                    `– Precio: $${precioServicio}` )
                }

                localStorage.setItem('servicios', JSON.stringify(servicios));
                form.reset();
                mostrarServicios();
                };
                reader.readAsDataURL(archivo);
            });
        }
        mostrarServicios();
    } else if (esServicios) {
        mostrarServiciosCards();
    }
}); 