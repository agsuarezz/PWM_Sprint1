async function xLuIncludeFile() {
    let el = document.querySelector("[xlu-include-file]");
    if (!el) return;

    let file = el.getAttribute("xlu-include-file");
    
    const globalAttrs = window.attributes || {};

    try {
        let response = await fetch(file);
        if (response.ok) {
            let content = await response.text();

            let allKeys = new Set([...Object.keys(globalAttrs), ...Array.from(el.attributes).map(a => a.name.replace('data-', ''))]);

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