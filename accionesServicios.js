window.editarServicio = function (index) {
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    const servicio = servicios[index];

    document.getElementById('nombreServicio').value = servicio.nombreServicio;
    document.getElementById('descripcionServicio').value = servicio.descripcionServicio;
    document.getElementById('precioServicio').value = servicio.precioServicio;

    indexEnEdicion = index; 
}

window.eliminarServicio = function (index) {
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    servicios.splice(index, 1);
    localStorage.setItem('servicios', JSON.stringify(servicios));
    mostrarServicios();
} 