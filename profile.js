document.addEventListener("DOMContentLoaded", async () => {
    if (document.body.getAttribute('data-page') !== 'profile') return;

    await xLuIncludeFile();

    const usuarioString = sessionStorage.getItem('usuarioSesion');
    
    if (!usuarioString) {
        window.location.href = "login.html";
        return;
    }

    const usuarioLogueado = JSON.parse(usuarioString);

    const elementoNombreHeader = document.getElementById('nombre-usuario-header');
    if (elementoNombreHeader) {
        elementoNombreHeader.textContent = `Hola, ${usuarioLogueado.nombre}`; 
    }

    const columnaDerecha = document.querySelector('.perfil-columna-derecha');
    
    if (columnaDerecha) {
        const bloques = columnaDerecha.children;

        if (bloques[0]) {
            bloques[0].innerHTML = bloques[0].innerHTML
                .replace('Nombre', usuarioLogueado.nombre)
                .replace('Apellido1 Apellido2', usuarioLogueado.apellidos || "");
        }

        if (bloques[1]) {
            bloques[1].innerHTML = bloques[1].innerHTML
                .replace('xxxxxxxx@gmail.com', usuarioLogueado.email);
        }

        if (bloques[2]) {
            bloques[2].innerHTML = bloques[2].innerHTML
                .replace(/x{5,}/ig, '********'); 
        }

        if (bloques[3]) {
            bloques[3].innerHTML = bloques[3].innerHTML
                .replace(/x{5,}/ig, usuarioLogueado.telefono || "No especificado");
        }

        if (bloques[4]) {
            bloques[4].innerHTML = bloques[4].innerHTML
                .replace(/x{5,}/ig, usuarioLogueado.direccion || "No especificada");
        }
    }

    const logoutButton = document.getElementById('profile-delete-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('usuarioSesion');
            window.location.href = "login.html";
        });
    }
});