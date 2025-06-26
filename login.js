import { login } from './autenticar.js'

    document.getElementById('formIniciarSesion').addEventListener('submit', async function(event){
        event.preventDefault();

        const usuario= document.getElementById('usuario').value;
        const contrasenia= document.getElementById('contrasenia').value;

        const usuarioValidado = await login(usuario, contrasenia)

        if (usuarioValidado){
            sessionStorage.setItem('token',usuarioValidado.accessToken);
            sessionStorage.setItem('usuario',usuarioValidado.username);
            alert('Ingresaste a Modo Administrador');
            window.location.href = 'altaMenu.html';
        }
        else{
            alert('No se pudo ingresar a Modo Administrador')
        }
    });
