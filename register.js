document.addEventListener('templatesReady', () => {
    const registerForm = document.querySelector('.register-container form');

    if (registerForm) {
        registerForm.addEventListener('submit', async (evento) => {
            evento.preventDefault();

            const datosUsuario = {
                nombre: document.getElementById('name')?.value,
                apellidos: document.getElementById('surname')?.value,
                email: document.getElementById('email')?.value,
                telefono: document.getElementById('phone')?.value,
                fechaNacimiento: document.getElementById('birthdate')?.value,
                direccion: document.getElementById('address')?.value,
                codigoPostal: document.getElementById('zip')?.value,
                password: document.getElementById('password')?.value,
                tipoCuenta: document.getElementById('account-type')?.value
            };

            const confirmPass = document.getElementById('confirm-password')?.value;


            if (datosUsuario.password !== confirmPass) {
                alert("Las contraseñas no coinciden.");
                return;
            }

            try {

                const res = await fetch(`http://localhost:3000/usuarios?email=${datosUsuario.email}`);
                const existentes = await res.json();

                if (existentes.length > 0) {
                    alert("Este email ya está registrado.");
                    return;
                }

                const resPost = await fetch('http://localhost:3000/usuarios', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datosUsuario)
                });

                if (resPost.ok) {
                    alert("¡Usuario guardado con éxito!");
                    window.location.href = "login.html";
                }
            } catch (error) {
                alert("Error: ¿Está encendido el json-server?");
            }
        });
    }
});