
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form-card form');

    if (loginForm) {
        loginForm.addEventListener('submit', (evento) => {
            evento.preventDefault(); 
            
            // 1. Obtenemos lo que el usuario escribió en el input de "Usuario"
            // (En tu HTML de login, este input probablemente tiene el ID 'usuario')
            const inputLogin = document.getElementById('usuario').value;
            const passwordIntroducida = document.getElementById('password').value;

            // 2. Extraemos la "base de datos" del navegador
            const datosUsuarios = localStorage.getItem('usuarios');
            const usuariosDB = datosUsuarios ? JSON.parse(datosUsuarios) : [];

            // 3. BUSQUEDA CORREGIDA:
            // Buscamos si el 'inputLogin' coincide con el campo 'email' que guardaste en el registro
            const usuarioValido = usuariosDB.find(user => 
                user.email === inputLogin && user.password === passwordIntroducida
            );

            if (usuarioValido) {
                // Guardamos la sesión (importante para mostrar el nombre en la siguiente página)
                sessionStorage.setItem('usuarioSesion', JSON.stringify(usuarioValido));
                
                alert(`¡Bienvenido de nuevo, ${usuarioValido.nombre}!`);
                window.location.href = "user-movements.html"; 
            } else {
                alert("Email o contraseña incorrectos. Por favor, revísalos.");
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form-card form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (evento) => {
            evento.preventDefault(); 
            const usuarioIntroducido = document.getElementById('usuario').value;
            const passwordIntroducida = document.getElementById('password').value;

            try {
                const respuesta = await fetch('http://localhost:3000/usuarios');
                const usuariosDB = await respuesta.json();

                const usuarioValido = usuariosDB.find(user => 
                    user.email === usuarioIntroducido && user.password === passwordIntroducida
                );

                if (usuarioValido) {
                    localStorage.setItem('usuarioActivo', JSON.stringify(usuarioValido));
                    
                    alert(`¡Bienvenida de nuevo, ${usuarioValido.nombre}!`);
                    window.location.href = "user-movements.html"; 
                } else {
                    alert("Usuario o contraseña incorrectos. Por favor, revísalos.");
                }

            } catch (error) {
                console.error("Error:", error);
                alert("Error de conexión con el servidor.");
            }
        });
    }
});