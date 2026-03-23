
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form-card form');

    if (loginForm) {
        loginForm.addEventListener('submit', (evento) => {
            evento.preventDefault(); 
            
            const inputLogin = document.getElementById('usuario').value;
            const passwordIntroducida = document.getElementById('password').value;

            const datosUsuarios = localStorage.getItem('usuarios');
            const usuariosDB = datosUsuarios ? JSON.parse(datosUsuarios) : [];

            
            const usuarioValido = usuariosDB.find(user => 
                user.email === inputLogin && user.password === passwordIntroducida
            );

            if (usuarioValido) {
                localStorage.setItem('usuarioSesion', JSON.stringify(usuarioValido));
                
                alert(`¡Bienvenido de nuevo, ${usuarioValido.nombre}!`);
                window.location.href = "user-movements.html"; 
            } else {
                alert("Email o contraseña incorrectos. Por favor, revísalos.");
            }
        });
    }
});