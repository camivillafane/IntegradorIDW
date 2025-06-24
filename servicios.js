const STORAGE_KEY = "serviciosMundoMagico";

const catalogo = document.getElementById("catalogoServicios");
const btnAgregar = document.getElementById("btnAgregarServicio");
const formServicio = document.getElementById("formServicioDatos");
const modalServicio = new bootstrap.Modal(document.getElementById("modalServicio"));

const inputNombre = document.getElementById("nombreServicio");
const inputDescripcion = document.getElementById("descripcionServicio");
const inputPrecio = document.getElementById("precioServicio");
const inputImagen = document.getElementById("imagenServicio");

let modoEdicion = false;
let indiceEdicion = null;

const serviciosFijos = [
    {
        nombre: "Decoración con globos",
        descripcion:
        "◉ Servicio de decoración con globos de diversos tamaños y colores, acordes a cada temática propuesta por el cliente.",
        imagen: "imagenes/childrens-decoration-inspiration-party-600nw-2281922017.jpg",
        precio: 0,
    },
    {
        nombre: "Candy Bar",
        descripcion:
        "◉ Servicio de Candy Bar con variedad de golosinas, postres, jugos o cocteles, adaptados a cada temática y con personal a disposición.",
        imagen: "imagenes/MicrosoftTeams-image-1-810x561a.jpg",
        precio: 0,
    },
    {
        nombre: "Stand de Make Up Artist & Glitter Bar",
        descripcion:
        "◉ Servicio de maquillaje artístico personalizado para todas las edades, con materiales hipolargénicos de excelente calidad y fácil lavado, que no dañan la piel ni la ropa.",
        imagen: "imagenes/makeuup.jpg",
        precio: 0,
    },
    {
        nombre: "Show & Entretenimientos",
        descripcion:
        "◉ Servicio de entretenimiento con personal capacitado y dedicado para brindarte un evento divertido, adaptado para todas las edades.",
        imagen: "imagenes/entretenimientos.jpg",
        precio: 0,
    },
    {
        nombre: "Servicio de Catering",
        descripcion:
        "◉ Servicio adaptado a las necesidades y preferencias del agasajado y los invitados. Contamos con varias opciones saladas, dulces o mixtas.",
        imagen: "imagenes/catering salado.jpg",
        precio: 0,
    },
    {
        nombre: "Torta & mesa dulce",
        descripcion: "◉ Servicio de torta y mesa dulce con la temática que prefieras.",
        imagen: "imagenes/zazu-eventos-salon-3 (1).jpg",
        precio: 0,
    },
    {
        nombre: "Fotografía & Video",
        descripcion:
        "◉ Servicio de fotografia, video y edición profesional para capturar cada momento especial.",
        imagen: "imagenes/fotografo-profesional.jpg",
        precio: 0,
    },
    {
        nombre: "Invitaciones digitales e impresas",
        descripcion:
        "◉ Servicio premium de invitaciones en ambos formatos para que puedas elegir el que mejor se adapte a tus invitados.",
        imagen: "imagenes/tarjetita.jpg",
        precio: 0,
    },
];


function obtenerServiciosLocales() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}


function guardarServiciosLocales(servicios) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(servicios));
}


function crearCard(servicio, index = null) {
    const col = document.createElement("div");
    col.className = "col-md-6 col-sm-6";

    let botones = "";
    if (index !== null) {
        botones = `
        <div class="mt-auto d-flex justify-content-between">
            <button class="btn btn-sm btn-warning" onclick="editarServicio(${index})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="eliminarServicio(${index})">Eliminar</button>
        </div>`;
    }

    col.innerHTML = `
        <div class="card h-100 py-2 px-2">
        <img src="${servicio.imagen}" class="card-img-top" alt="${servicio.nombre}" />
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">${servicio.nombre}</h5>
            <p class="card-text">${servicio.descripcion}</p>
            ${botones}
        </div>
        </div>`;

    return col;
}

function renderizarServicios() {
    catalogo.innerHTML = "";


    serviciosFijos.forEach((servicio) => {
        catalogo.appendChild(crearCard(servicio));
    });


    obtenerServiciosLocales().forEach((servicio, index) => {
        catalogo.appendChild(crearCard(servicio, index));
    });
}


btnAgregar.addEventListener("click", () => {
    modoEdicion = false;
    indiceEdicion = null;
    formServicio.reset();
    formServicio.classList.remove("was-validated");
    modalServicio.show();
});


formServicio.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!formServicio.checkValidity()) {
        e.stopPropagation();
        formServicio.classList.add("was-validated");
        return;
    }

    const archivoImagen = inputImagen.files[0];


    if (!archivoImagen && !modoEdicion) {
        alert("Debe seleccionar una imagen.");
        return;
    }

    const guardar = (imagenBase64) => {
        const nuevoServicio = {
            nombre: inputNombre.value.trim(),
            descripcion: inputDescripcion.value.trim(),
            precio: parseFloat(inputPrecio.value),
            imagen: imagenBase64
        };

        let servicios = obtenerServiciosLocales();

        if (modoEdicion && indiceEdicion !== null) {
            servicios[indiceEdicion] = nuevoServicio;
        } else {
            servicios.push(nuevoServicio);
        }

        guardarServiciosLocales(servicios);
        modalServicio.hide();
        renderizarServicios();
    };

    if (archivoImagen) {
        const lector = new FileReader();
        lector.onload = function (event) {
            guardar(event.target.result); 
        };
        lector.readAsDataURL(archivoImagen);
    } else if (modoEdicion && indiceEdicion !== null) {
        // conservar la anterior si no elijo una nueva im
        const servicios = obtenerServiciosLocales();
        guardar(servicios[indiceEdicion].imagen);
    }
});

window.editarServicio = function (index) {
    const servicio = obtenerServiciosLocales()[index];
    inputNombre.value = servicio.nombre;
    inputDescripcion.value = servicio.descripcion;
    inputPrecio.value = servicio.precio;
    inputImagen.value = servicio.imagen;

    modoEdicion = true;
    indiceEdicion = index;
    formServicio.classList.remove("was-validated");
    modalServicio.show();
};

window.eliminarServicio = function (index) {
    if (confirm("¿Estás seguro de que querés eliminar este servicio?")) {
        let servicios = obtenerServiciosLocales();
        servicios.splice(index, 1);
        guardarServiciosLocales(servicios);
        renderizarServicios();
    }
};

document.addEventListener("DOMContentLoaded", () => {
    renderizarServicios();
});
