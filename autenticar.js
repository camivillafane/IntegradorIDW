//PARA AUTENTICAR LOS DATOS DEL LOGIN, DE LO QUE SE RECIBE Y LO QUE HAY EN MI DATA//
//SE VA A HACER UNA FUNCION PARA PORCESAR EL DATO QUE RECIBI PARA LOGUEAR//

// export async function login(usuarioParametro,contraseniaParametro){
//     try{
//         const response = await fetch('data/usuarios.json');
//         console.log(response);
//         const usuarios = await response.json() //guarda y transforma en objeto javascript

//         const usuarioOk = usuarios.find(u => u.usuario === usuarioParametro && u.contrasenia === contraseniaParametro);
//         console.log('usuarioOk:' + JSON.stringify(usuarioOk));
//         return usuarioOk !== undefined; //retorna si es distinto de undefined
//     } catch{error} {
//         console.error("Error en la solicitud");//error de que no se proceso la funcion correctamente
//         return false;
//     }
// }

export async function login(usuarioParametro, contraseniaParametro) {
    try {
    const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: usuarioParametro,
            password: contraseniaParametro
        })
    });

    if (!response.ok) {
        console.error('Error en la respuesta:', response.status);
        return false;
        }

    const data = await response.json();
    console.log(data);
    return data;
    } catch (error) {
    console.error('Error en la solicitud:', error);
    return false;
    }
}
