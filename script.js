async function xLuIncludeFile() {
    // 1. CARGA DINÁMICA DEL JSON SEGÚN LA PÁGINA
    if (!window.templateData) {
        try {
            // Obtenemos el nombre de la página desde el body (por defecto 'index' si no existe)
            const pageName = document.body.getAttribute('data-page') || 'index';

            // Construimos la ruta: data/index.json, data/premium.json, etc.
            const response = await fetch(`data/${pageName}.json`);

            if (!response.ok) throw new Error(`No se encontró el archivo: data/${pageName}.json`);

            const config = await response.json();

            // Si tu JSON tiene una raíz llamada "templates" o "sections"
            window.templateData = config.templates || config.sections || [];

            // Inyectamos los datos en el HTML
            window.templateData.forEach(item => {
                const el = document.querySelector(item.selector);
                if (el) {
                    Object.keys(item.data).forEach(key => {
                        el.setAttribute(`data-${key}`, item.data[key]);
                    });
                }
            });
        } catch (error) {
            console.error("Error cargando configuración de página:", error);
            window.templateData = [];
        }
    }

    // 2. LÓGICA DE PROCESAMIENTO DE TEMPLATES (Igual que antes)
    let el = document.querySelector("[xlu-include-file]");
    if (!el) return;

    let file = el.getAttribute("xlu-include-file");
    const globalAttrs = window.attributes || {};

    try {
        let response = await fetch(file);
        if (response.ok) {
            let content = await response.text();

            let allKeys = new Set([
                ...Object.keys(globalAttrs),
                ...Array.from(el.attributes)
                    .filter(a => a.name.startsWith('data-'))
                    .map(a => a.name.replace('data-', ''))
            ]);

            allKeys.forEach(key => {
                let regex = new RegExp(`{{${key}}}`, "g");
                let value = el.getAttribute(`data-${key}`) || globalAttrs[key] || "";
                content = content.replace(regex, value);
            });

            let temp = document.createElement('div');
            temp.innerHTML = content.trim();
            let newNode = temp.firstElementChild || temp;

            el.parentNode.replaceChild(newNode, el);
            await xLuIncludeFile();
        } else {
            el.removeAttribute("xlu-include-file");
            await xLuIncludeFile();
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Código para la validación del register.html y login.html
// sin tener que esperar a darle al botón para saber que es valido

document.addEventListener('blur', function(evento) {
    const campo = evento.target;

    if (campo.tagName === 'INPUT' || campo.tagName === 'SELECT') {
        
        campo.reportValidity();
    }
}, true);