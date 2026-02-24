async function xLuIncludeFile() {
    let el = document.querySelector("[xlu-include-file]");
    if (!el) return;

    let file = el.getAttribute("xlu-include-file");
    
    // 1. Prioridad: Atributos data- del propio elemento
    // 2. Segunda opción: Objeto global window.attributes
    const globalAttrs = window.attributes || {};

    try {
        let response = await fetch(file);
        if (response.ok) {
            let content = await response.text();

            // Combinar variables globales con las locales del elemento
            // Buscamos todas las llaves {{key}} posibles
            let allKeys = new Set([...Object.keys(globalAttrs), ...Array.from(el.attributes).map(a => a.name.replace('data-', ''))]);

            allKeys.forEach(key => {
                let regex = new RegExp(`{{${key}}}`, "g");
                // Si el elemento tiene data-title, usa eso. Si no, usa el globalAttrs.title
                let value = el.getAttribute(`data-${key}`) || globalAttrs[key] || "";
                content = content.replace(regex, value);
            });

            let temp = document.createElement('div');
            temp.innerHTML = content.trim();
            let newNode = temp.firstElementChild || temp;
            
            el.parentNode.replaceChild(newNode, el);
            
            // Recursión para el siguiente elemento
            await xLuIncludeFile();
        } else {
            el.removeAttribute("xlu-include-file");
            await xLuIncludeFile();
        }
    } catch (error) {
        console.error("Error:", error);
    }
}