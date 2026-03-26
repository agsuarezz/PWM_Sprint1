async function xLuIncludeFile() {
    if (!window.templateData) {
        try {
            const pageName = document.body.getAttribute('data-page') || 'index';

            const [headerResponse, footerResponse, pageResponse] = await Promise.all([
                fetch('data/header.json'),
                fetch('data/footer.json'),
                fetch(`data/${pageName}.json`)
            ]);

            let headerTemplates = [];
            let footerTemplates = [];
            let pageTemplates = [];

            if (headerResponse.ok) {
                const headerConfig = await headerResponse.json();
                headerTemplates = headerConfig.templates || [];
            }

            if (footerResponse.ok) {
                const footerConfig = await footerResponse.json();
                footerTemplates = footerConfig.templates || [];
            }

            if (pageResponse.ok) {
                const pageConfig = await pageResponse.json();
                pageTemplates = pageConfig.templates || [];
            }

            window.templateData = [
                ...headerTemplates,
                ...footerTemplates,
                ...pageTemplates
            ];

            window.templateData.forEach(item => {
                const elements = document.querySelectorAll(item.selector);

                elements.forEach(el => {
                    Object.keys(item.data).forEach(key => {
                        el.setAttribute(`data-${key.toLowerCase()}`, item.data[key]);
                    });
                });
            });

            // --- PEGAR AQUÍ (Justo después del último forEach de window.templateData) ---
            window.templateData.forEach(item => {
                const el = document.querySelector(item.selector);
                // Si el elemento existe en el HTML y NO es un archivo externo (no tiene xlu-include-file)
                if (el && !el.hasAttribute('xlu-include-file')) {
                    let content = el.innerHTML;
                    Object.keys(item.data).forEach(key => {
                        const regex = new RegExp(`{{${key}}}`, "g");
                        content = content.replace(regex, item.data[key]);
                    });
                    el.innerHTML = content;
                }
            });
            // --------------------------------------------------------------------------

        } catch (e) {
            console.error("Error al cargar los archivos JSON:", e);
            window.templateData = [];
        }
    }

    let el = document.querySelector("[xlu-include-file]");

    if (!el) {
        if (typeof initHamburgerMenu === "function") initHamburgerMenu();
        
        document.dispatchEvent(new CustomEvent('templatesReady'));
        return;
    }

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
                let value = el.getAttribute(`data-${key}`) || "";
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

function initHamburgerMenu() {
    const toggleBtn = document.getElementById("menu-toggle");
    const mainMenu = document.getElementById("main-menu");
    const overlay = document.getElementById("mobile-overlay");

    if (!toggleBtn || !mainMenu) return;

    if (toggleBtn.dataset.listenerAdded === "true") return;
    toggleBtn.dataset.listenerAdded = "true";

    function openMenu() {
        mainMenu.classList.add("active");
        if (overlay) overlay.classList.add("active");
        document.body.classList.add("menu-open");
    }

    function closeMenu() {
        mainMenu.classList.remove("active");
        if (overlay) overlay.classList.remove("active");
        document.body.classList.remove("menu-open");
    }

    toggleBtn.addEventListener("click", function () {
        if (mainMenu.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    if (overlay) {
        overlay.addEventListener("click", closeMenu);
    }

    window.addEventListener("resize", function () {
        if (window.innerWidth >= 768) {
            closeMenu();
        }
    });
}