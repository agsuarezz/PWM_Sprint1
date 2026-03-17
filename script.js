async function xLuIncludeFile() {
    if (!window.templateData) {
        try {
            const pageName = document.body.getAttribute('data-page') || 'index';
            const response = await fetch(`data/${pageName}.json`);
            if (response.ok) {
                const config = await response.json();
                window.templateData = config.templates || [];

                window.templateData.forEach(item => {
                    const el = document.querySelector(item.selector);
                    if (el) {
                        Object.keys(item.data).forEach(key => {
                            el.setAttribute(`data-${key.toLowerCase()}`, item.data[key]);
                        });
                    }
                });
            }
        } catch (e) {
            console.error("Error al cargar el archivo JSON:", e);
        }
    }

    let el = document.querySelector("[xlu-include-file]");
    if (!el) return;

    let file = el.getAttribute("xlu-include-file");

    try {
        let response = await fetch(file);
        if (response.ok) {
            let content = await response.text();

            let allKeys = Array.from(el.attributes)
                               .filter(a => a.name.startsWith('data-'))
                               .map(a => a.name.replace('data-', ''));

            allKeys.forEach(key => {
                let regex = new RegExp(`{{${key}}}`, "g");
                let value = el.getAttribute(`data-${key}`);
                content = content.replace(regex, value);
            });

            let temp = document.createElement('div');
            temp.innerHTML = content.trim();
            let newNode = temp.firstElementChild || temp;

            Array.from(el.attributes).forEach(attr => {
                if (attr.name !== 'xlu-include-file') {
                    newNode.setAttribute(attr.name, attr.value);
                }
            });

            el.parentNode.replaceChild(newNode, el);

            await xLuIncludeFile();
        } else {
            console.error("Error al cargar el template:", file);
            el.removeAttribute("xlu-include-file");
            await xLuIncludeFile();
        }
    } catch (error) {
        console.error("Error de red o procesamiento:", error);
    }
}