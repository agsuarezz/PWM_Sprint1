document.addEventListener('templatesReady', () => { 
    const sesionActiva = sessionStorage.getItem('usuarioSesion');

    if (sesionActiva) {
        window.location.href = "user-movements.html";
        return; 
    }

    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (evento) => {
            evento.preventDefault(); 
            
            const inputLogin = document.getElementById('usuario').value.trim().toLowerCase();
            const passwordIntroducida = document.getElementById('password').value;

            const datosUsuarios = localStorage.getItem('usuarios');
            const usuariosDB = datosUsuarios ? JSON.parse(datosUsuarios) : [];
            
            const usuarioValido = usuariosDB.find(user => 
                user.email.trim().toLowerCase() === inputLogin && user.password === passwordIntroducida
            );

            if (usuarioValido) {
                sessionStorage.setItem('usuarioSesion', JSON.stringify(usuarioValido));
                
                alert(`¡Bienvenido de nuevo, ${usuarioValido.nombre}!`);
                window.location.href = "user-movements.html"; 
            } else {
                alert("Email o contraseña incorrectos. Por favor, revísalos.");
            }
        });
    }
});