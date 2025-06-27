    document.addEventListener('DOMContentLoaded', () => {
    if (!sessionStorage.getItem('usuario')) {
        alert('Debes iniciar sesion');
        window.location.href = 'iniciarsesion.html';
        return;
    }})

    const salir = document.getElementById('logout');
    if (salir) {
        salir.addEventListener('click', () => {
        sessionStorage.clear();
        window.location.href = 'index.html';
    });
    }