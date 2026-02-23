async function xLuIncludeFile() {
    let elements = document.querySelectorAll("[xlu-include-file]");

    for (let el of elements) {
        let file = el.getAttribute("xlu-include-file");

        try {
            let response = await fetch(file);
            if (response.ok) {
                let content = await response.text();

                for (let key in attributes) {
                    let regex = new RegExp(`{{${key}}}`, "g");
                    content = content.replace(regex, attributes[key] || "");
                }

                let newNode = el.cloneNode(false);
                newNode.removeAttribute("xlu-include-file");
                newNode.innerHTML = content;
                
                el.parentNode.replaceChild(newNode, el);

                await xLuIncludeFile();
            }
        } catch (error) {
            console.error("Error cargando el archivo:", file, error);
        }
        return; 
    }
}