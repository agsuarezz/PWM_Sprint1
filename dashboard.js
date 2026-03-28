document.addEventListener("DOMContentLoaded", async () => {
    const paginaActual = document.body.getAttribute("data-page");
    const paginasPermitidas = ["user-movements", "user-cards"];

    if (!paginasPermitidas.includes(paginaActual)) return;

    await xLuIncludeFile();

    const usuarioString = sessionStorage.getItem("usuarioSesion");

    if (!usuarioString) {
        window.location.href = "login.html";
        return;
    }

    const usuarioLogueado = JSON.parse(usuarioString);

    const elementoNombre = document.getElementById("nombre-usuario-header");
    if (elementoNombre) {
        elementoNombre.textContent = `Bienvenido, ${usuarioLogueado.nombre} ${usuarioLogueado.apellidos}`;
    }
});