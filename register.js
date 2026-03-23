document.addEventListener('templatesReady', () => {
    const registerForm = document.querySelector('.register-container form');

    if (registerForm) {
        
        // --- MANTENEMOS TU LÓGICA DE VALIDACIÓN VISUAL EN TIEMPO REAL ---
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

        // --- LÓGICA DE ENVÍO ADAPTADA A LOCALSTORAGE ---
        registerForm.addEventListener('submit', (evento) => {
            evento.preventDefault(); 

            // Comprobación de validez nativa de HTML5
            if (!registerForm.checkValidity()) {
                registerForm.reportValidity(); 
                return; 
            }

            const datosUsuario = {
                nombre: document.getElementById('name')?.value,
                apellidos: document.getElementById('surname')?.value,
                email: document.getElementById('email')?.value,
                telefono: document.getElementById('phone')?.value,
                fechaNacimiento: document.getElementById('birthdate')?.value,
                direccion: document.getElementById('address')?.value,
                codigoPostal: document.getElementById('zip')?.value,
                password: document.getElementById('password')?.value,
                tipoCuenta: document.getElementById('account-type')?.value,
                id: Date.now() // Añadimos ID único local
            };

            const confirmPass = document.getElementById('confirm-password')?.value;

            // Comprobación de coincidencia de contraseñas
            if (datosUsuario.password !== confirmPass) {
                alert("Las contraseñas no coinciden.");
                return;
            }

            // --- OPERACIONES DE CARGA LOCAL ---

            // 1. Obtener usuarios actuales del navegador
            const usuariosGuardados = localStorage.getItem('usuarios');
            const usuariosDB = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];

            // 2. Comprobar si el email ya existe localmente
            const existe = usuariosDB.find(u => u.email === datosUsuario.email);

            if (existe) {
                alert("Este email ya está registrado en el sistema local.");
                return;
            }

            // 3. Guardar en el array y actualizar LocalStorage
            usuariosDB.push(datosUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuariosDB));

            // 4. Éxito y redirección
            alert("¡Usuario registrado con éxito en el almacenamiento local!");
            window.location.href = "login.html";
        });
    }
});