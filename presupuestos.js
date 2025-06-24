document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const nombreSalon = params.get('nombreSalon');
    const precioSalon = params.get('precioSalon');

    if (nombreSalon && precioSalon) {
        document.getElementById('salonNombre').textContent = nombreSalon;
        document.getElementById('precioSalonPresupuesto').textContent = `$${precioSalon}`;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const precios = [
        5000,
        10000,
        8000,
        10000,
        20000,
        15000,
        20000,
        10000 
    ];
    const checkboxes = document.querySelectorAll('input[type="checkbox"].servicio');
    const totalPresupuesto = document.getElementById('totalPresupuesto');
    const cantidadHorasInput = document.getElementById('cantidadHoras');

    const params = new URLSearchParams(window.location.search);
    const precioSalon = parseInt(params.get('precioSalon')) || 0;

    function actualizarTotal() {
        let total = 0;
        checkboxes.forEach((checkbox, i) => {
            if (checkbox !== cantidadHorasInput && checkbox.checked) {
                total += precios[i];
            }
        });
        const cantidadHoras = parseInt(cantidadHorasInput.value) || 1;
        totalPresupuesto.textContent = `$${(precioSalon * cantidadHoras) + total}`;
    }
    checkboxes.forEach(checkb => checkb.addEventListener('change', actualizarTotal));
    cantidadHorasInput.addEventListener('input', actualizarTotal);

    actualizarTotal();
});
document.addEventListener('DOMContentLoaded', function() {
    const buttonEnviar = document.querySelector('#columnaFormulario button[type="submit"]');
    if (!buttonEnviar) return;

    buttonEnviar.addEventListener('click', function(e) {
        e.preventDefault();
        const inputCliente = document.querySelectorAll('#columnaFormulario form:nth-of-type(1) input');
        const clienteNombre = inputCliente[0].value.trim();
        const clienteDni = inputCliente[1].value.trim();
        const clienteEmail = inputCliente[2].value.trim();
        const clienteTel = inputCliente[3].value.trim();

        const inputCumple = document.querySelectorAll('#columnaFormulario form:nth-of-type(2) input');
        const cumpleNombre = inputCumple[0].value.trim();
        const cumpleFecha = inputCumple[1].value.trim();

        const salon = document.getElementById('salonNombre').textContent;
        const horas = document.getElementById('cantidadHoras').value;

        const serviciosNombres = [
            "Decoración con globos",
            "Candybar",
            "Invitaciones digitales",
            "Maquillaje Artístico",
            "Catering",
            "Torta y Mesa dulce",
            "Espectáculo",
            "Fotografía y Video"
        ];
        
        const checkboxes = document.querySelectorAll('input[type="checkbox"].servicio');
        let serviciosElegidos = [];
        checkboxes.forEach((cb, i) => {
            if(cb.checked) serviciosElegidos.push(serviciosNombres[i]);
        });
        const total = document.getElementById('totalPresupuesto').textContent;

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.setFillColor(44, 62, 80);
        doc.rect(0, 0, 210, 25, 'F');
        doc.setDrawColor(218, 155, 185);
        doc.setLineWidth(2);
        doc.line(0, 26, 210, 26);

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.text("Mundo Mágico", 105, 15, { align: "center" });
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(16);
        doc.text("Presupuesto Mundo Mágico", 10, 40);

        doc.setFontSize(12);
        doc.text("Datos del Cliente:", 10, 48);
        doc.text(`Nombre: ${clienteNombre}`, 10, 56);
        doc.text(`DNI: ${clienteDni}`, 10, 64);
        doc.text(`Email: ${clienteEmail}`, 10, 72);
        doc.text(`Teléfono: ${clienteTel}`, 10, 80);
        doc.text("Datos del Cumpleañero/a:", 10, 92);
        doc.text(`Nombre: ${cumpleNombre}`, 10, 100);
        doc.text(`Fecha del evento: ${cumpleFecha}`, 10, 108);
        doc.text("Salón y Horas:", 10, 120);
        doc.text(`Salón: ${salon}`, 10, 128);
        doc.text(`Cantidad de horas: ${horas}`, 10, 136);

        doc.text("Servicios Elegidos:", 10, 148);
        let y = 156;
        if(serviciosElegidos.length === 0) {
            doc.text("Ninguno", 10, y);
            y += 8;
        } else {
            serviciosElegidos.forEach(servicio => {
                doc.text(`- ${servicio}`, 10, y);
                y += 8;
            });
        }
        doc.text(`Total: ${total}`, 10, y + 8);
        doc.save("presupuestoMundoMagico.pdf");
    });
});