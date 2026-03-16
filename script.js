/**
 * Función principal para cargar archivos dinámicamente e inyectar datos del JSON
 */
async function xLuIncludeFile() {
    // 1. CARGA DEL JSON (Solo se ejecuta la primera vez)
    if (!window.templateData) {
        try {
            const pageName = document.body.getAttribute('data-page') || 'index';
            const response = await fetch(`data/${pageName}.json`);
            if (response.ok) {
                const config = await response.json();
                window.templateData = config.templates || [];

                // Mapear datos del JSON a atributos data- en el HTML
                window.templateData.forEach(item => {
                    const el = document.querySelector(item.selector);
                    if (el) {
                        Object.keys(item.data).forEach(key => {
                            // Guardamos todo en minúsculas para evitar problemas de Case Sensitivity
                            el.setAttribute(`data-${key.toLowerCase()}`, item.data[key]);
                        });
                    }
                });
            }
        } catch (e) {
            console.error("Error al cargar el archivo JSON:", e);
        }
    }

    // 2. PROCESAMIENTO DE TEMPLATES
    let el = document.querySelector("[xlu-include-file]");
    if (!el) return; // Si no hay más elementos, terminamos

    let file = el.getAttribute("xlu-include-file");

    try {
        let response = await fetch(file);
        if (response.ok) {
            let content = await response.text();

            // Obtener todas las llaves de datos disponibles en el elemento
            let allKeys = Array.from(el.attributes)
                               .filter(a => a.name.startsWith('data-'))
                               .map(a => a.name.replace('data-', ''));

            // Reemplazar las llaves {{key}} por su valor
            allKeys.forEach(key => {
                let regex = new RegExp(`{{${key}}}`, "g");
                let value = el.getAttribute(`data-${key}`);
                content = content.replace(regex, value);
            });

            // Convertir el string en un nodo DOM
            let temp = document.createElement('div');
            temp.innerHTML = content.trim();
            let newNode = temp.firstElementChild || temp;

            // --- MEJORA CRÍTICA PARA EL POSICIONAMIENTO ---
            // Copiamos todos los atributos del elemento original (incluyendo ID y CLASS)
            // al nuevo elemento inyectado. Esto mantiene el "position: absolute" del ojo.
            Array.from(el.attributes).forEach(attr => {
                if (attr.name !== 'xlu-include-file') {
                    newNode.setAttribute(attr.name, attr.value);
                }
            });

            // Reemplazar en el documento
            el.parentNode.replaceChild(newNode, el);

            // Llamada recursiva para procesar si el template cargado tiene más includes
            await xLuIncludeFile();
        } else {
            console.error("Error al cargar el template:", file);
            el.removeAttribute("xlu-include-file"); // Evitar bucle infinito si falla
            await xLuIncludeFile();
        }
    } catch (error) {
        console.error("Error de red o procesamiento:", error);
    }
}