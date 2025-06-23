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

