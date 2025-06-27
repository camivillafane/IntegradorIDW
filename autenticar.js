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
