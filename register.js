// register.js
document.addEventListener('templatesReady', () => {
    // Seleccionamos el formulario (soporta tanto si le pusiste ID como si no)
    const registerForm = document.getElementById('register-form') || document.querySelector('.register-container form');

    if (registerForm) {
        
        // --- 1. VALIDACIÓN VISUAL EN TIEMPO REAL (Tu código original intacto) ---
        registerForm.addEventListener('input', (evento) => {
            const campo = evento.target;
            
            if (campo.tagName === 'INPUT' || campo.tagName === 'SELECT') {
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


        // --- 2. LÓGICA DE ENVÍO CON LOCALSTORAGE (Orden corregido) ---
        registerForm.addEventListener('submit', (evento) => {
            evento.preventDefault(); 

            // A. Comprobación de validez nativa de HTML5
            if (!registerForm.checkValidity()) {
                registerForm.reportValidity(); 
                return; 
            }

            // B. Comprobación de contraseñas
            const password = document.getElementById('password')?.value;
            const confirmPass = document.getElementById('confirm-password')?.value;

            if (password !== confirmPass) {
                alert("Las contraseñas no coinciden.");
                return;
            }

            // C. Capturar y limpiar el email (minúsculas y sin espacios a los lados)
            const emailIngresado = document.getElementById('email')?.value.trim().toLowerCase();

            // D. LEER LA BASE DE DATOS LOCAL
            const usuariosGuardados = localStorage.getItem('usuarios');
            const usuariosDB = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];

            // E. COMPROBAR DUPLICADOS (La corrección clave está aquí)
            const existe = usuariosDB.find(u => u.email === emailIngresado);

            if (existe) {
                alert("Este email ya está registrado en el sistema local.");
                return; // Cortamos la ejecución, NO se guarda nada
            }

            // F. CONSTRUIR EL USUARIO (Solo llegamos aquí si no existe)
            const datosUsuario = {
                nombre: document.getElementById('name')?.value.trim(),
                apellidos: document.getElementById('surname')?.value.trim(),
                email: emailIngresado,
                telefono: document.getElementById('phone')?.value.trim(),
                fechaNacimiento: document.getElementById('birthdate')?.value,
                direccion: document.getElementById('address')?.value.trim(),
                codigoPostal: document.getElementById('zip')?.value.trim(),
                password: password,
                tipoCuenta: document.getElementById('account-type')?.value,
                id: Date.now() // Generamos ID único
            };

            // G. GUARDAR EN LOCALSTORAGE
            usuariosDB.push(datosUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuariosDB));

            // H. ÉXITO Y REDIRECCIÓN
            alert("¡Usuario registrado con éxito en el almacenamiento local!");
            window.location.href = "login.html";
        });
    }
});