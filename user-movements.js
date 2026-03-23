// Puedes seguir llamándolo user-movements.js o cambiarle el nombre a algo como "dashboard.js"
document.addEventListener("DOMContentLoaded", async () => {

    // 1. Miramos en qué página estamos
    const paginaActual = document.body.getAttribute('data-page');

    // 2. ¡EL CAMBIO! Le decimos en qué páginas tiene permiso para ejecutarse
    const paginasPermitidas = ['user-movements', 'user-cards'];
    
    if (!paginasPermitidas.includes(paginaActual)) return;

    // 3. Esperamos a que se carguen las plantillas
    await xLuIncludeFile();

    // 4. Buscamos la sesión del usuario
    const usuarioString = localStorage.getItem('usuarioSesion');
    
    if (!usuarioString) {
        window.location.href = "login.html";
        return;
    }

    const usuarioLogueado = JSON.parse(usuarioString);

    // 5. Actualizamos el nombre en el header
    const elementoNombre = document.getElementById('nombre-usuario-header');
    if (elementoNombre) {
        elementoNombre.textContent = `${usuarioLogueado.nombre} ${usuarioLogueado.apellidos}`; 
    }
});