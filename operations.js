
document.addEventListener('input', (evento) => {
    const campo = evento.target;
    
    if (campo.tagName === 'INPUT' && campo.closest('#formulario-operacion')) {
        let mensaje = campo.parentNode.querySelector('.mensaje-flotante');

        if (campo.value.trim() !== '' && !campo.checkValidity()) {
            campo.style.border = "2px solid red";
            campo.style.outline = "2px solid red";
            
            if (!mensaje) {
                mensaje = document.createElement('span');
                mensaje.className = 'mensaje-flotante';
                mensaje.style.color = "#d9534f"; 
                mensaje.style.fontSize = "13px";
                mensaje.style.fontWeight = "600";
                mensaje.style.display = "block";
                mensaje.style.marginTop = "4px";
                campo.parentNode.insertBefore(mensaje, campo.nextSibling);
            }
            mensaje.textContent = "⚠️ " + (campo.title || "Formato incorrecto");

        } else {
            campo.style.border = "";
            campo.style.outline = "";
            if (mensaje) {
                mensaje.remove(); 
            }
        }
    }
}, true);



document.addEventListener('click', async (evento) => {
    const form = document.getElementById('formulario-operacion');
    if (!form) return;

    if (evento.target.closest('form')) {
        form.addEventListener('submit', (e) => e.preventDefault());
    }


    if (evento.target.closest('.footer-left')) {
        evento.preventDefault();
        

        form.querySelectorAll('input').forEach(campo => {
            campo.value = ''; 
            campo.style.border = "";
            campo.style.outline = "";
        });

        form.querySelectorAll('.mensaje-flotante').forEach(m => m.remove());
        return;
    }

    const clicEnDerecha = evento.target.closest('.footer-right');
    const esBotonValido = evento.target.closest('button, a, .btn');
    
    if (clicEnDerecha && esBotonValido) {
        
        const textoBoton = evento.target.textContent.trim().toLowerCase();
        
        if (textoBoton.includes('cancelar')) {
            return; 
        }
        evento.preventDefault();
        
        if (!form.checkValidity()) {
            form.reportValidity();
            return; 
        }

        const formData = new FormData(form);
        const datosOperacion = Object.fromEntries(formData.entries());
        
        datosOperacion.fecha = new Date().toLocaleDateString('es-ES');
        datosOperacion.tipo = document.body.getAttribute('data-page');
        datosOperacion.id = Date.now();

        const usuarioString = localStorage.getItem('usuarioSesion'); 
        
        if (!usuarioString) {
            alert("Error: No has iniciado sesión. Por favor, vuelve al Login.");
            window.location.href = "login.html";
            return;
        }

        const usuarioLogueado = JSON.parse(usuarioString);
        
        datosOperacion.usuarioId = usuarioLogueado.id;


        try {
            const movimientosGuardados = localStorage.getItem('movimientos');
            const movimientosDB = movimientosGuardados ? JSON.parse(movimientosGuardados) : [];

            
            movimientosDB.push(datosOperacion);
            localStorage.setItem('movimientos', JSON.stringify(movimientosDB));

            
            alert("¡Operación guardada con éxito!");
            window.location.href = "user-movements.html";
        } catch (error) {
            alert("Error: ¿Está encendido el json-server?");
        }
    }
});