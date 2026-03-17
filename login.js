
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