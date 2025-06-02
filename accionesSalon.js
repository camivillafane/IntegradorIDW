function editarSalon(index){
    const salones = JSON.parse(localStorage.getItem('salones')) || []; //obtengo cadena de salones para convertirla a objetos, si no tengo nada que cree no vacio
    const salon = salones[index]; //del array de salones me quedo con uno que en este caso es index, es decir la posicion que le pasamos del array
    
    document.getElementById('nombreSalon').value = salon.nombreSalon;//necesitamos que renderice los valores que obtenemos en el formulario
    document.getElementById('direccionSalon').value = salon.direccionSalon;
    document.getElementById('descripcionSalon').value = salon.descripcionSalon;

    salones.splice(index,1);//no se puede hacer push, pq yo no quiero sumar longitud a i array, lo que se busca es remplazar, l push va a agregar valor
    localStorage.setItem('salones',JSON.stringify(salones));
    mostrarSalones();                                       
}

function eliminarSalon(index){
    const salones = JSON.parse(localStorage.getItem('salones')) || []; //obtengo cadena de salones para convertirla a objetos, si no tengo nada que cree no vacio
    const salon = salones[index]; //del array de salones me quedo con uno que en este caso es index, es decir la posicion que le pasamos del array
    

    salones.splice(index,1);//no se puede hacer push, pq yo no quiero sumar longitud a i array, lo que se busca es remplazar, l push va a agregar valor
    localStorage.setItem('salones',JSON.stringify(salones));
    mostrarSalones();   
}
