// loader.js corregido para ignorar fallos y seguir
async function xLuIncludeFile() {
    let el = document.querySelector("[xlu-include-file]");
    if (!el) return;

    let file = el.getAttribute("xlu-include-file");
    const attrs = window.attributes || {};

    try {
        let response = await fetch(file);
        if (response.ok) {
            let content = await response.text();

            for (let key in attrs) {
                let regex = new RegExp(`{{${key}}}`, "g");
                content = content.replace(regex, attrs[key] || "");
            }

            let temp = document.createElement('div');
            temp.innerHTML = content.trim();
            let newNode = temp.firstElementChild || temp;
            
            el.parentNode.replaceChild(newNode, el);
        } else {
            console.error("Error cargando archivo:", file);
            el.removeAttribute("xlu-include-file"); // Marcamos como "leído" aunque fallara
        }
    } catch (error) {
        console.error("Error de red en:", file, error);
        el.removeAttribute("xlu-include-file");
    }

    // Pase lo que pase, busca el siguiente
    await xLuIncludeFile();
}