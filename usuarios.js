document.addEventListener('DOMContentLoaded', async () => {
    const tabla = document.querySelector('#tablaUsuarios tbody');

    try {
        const response = await fetch('https://dummyjson.com/users');
        if(response.ok){
        const data = await response.json();
        const usuarios = data.users;

        usuarios.forEach(usuario => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${usuario.username}</td>
            <td>${usuario.firstName}</td>
            <td>${usuario.lastName}</td>
            <td>${usuario.email}</td>
        `;
        tabla.appendChild(fila);
        });
    }else{
        console.error(response.status);
        throw Error("Error al consultar")
    }
    } catch (error) {
        console.error("error:", error);
        alert("error con la API de usuarios");
        }
    });


        document.addEventListener('DOMContentLoaded', () => {
    if (!sessionStorage.getItem('usuario')) {
        alert('Debes iniciar sesion');
        window.location.href = 'iniciarsesion.html';
        return;
    }})

    const salir = document.getElementById('logout');
    if (salir) {
        salir.addEventListener('click', () => {
        window.location.href = 'altaMenu.html';
    });
    }