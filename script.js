async function xLuIncludeFile() {
    if (!window.templateData) {
        try {
            const pageName = document.body.getAttribute('data-page') || 'index';

            const response = await fetch(`data/${pageName}.json`);

            if (!response.ok) throw new Error(`No se encontró el archivo: data/${pageName}.json`);

            const config = await response.json();

            window.templateData = config.templates || config.sections || [];

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
