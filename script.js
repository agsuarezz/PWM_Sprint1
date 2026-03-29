async function xLuIncludeFile() {
    if (!window.templateData) {
        try {
            const pageName = document.body.getAttribute('data-page') || 'index';

            const [headerResponse, headerProfileResponse, footerResponse, pageResponse] = await Promise.all([
                fetch('data/header.json'),
                fetch('data/header-profile.json'),
                fetch('data/footer.json'),
                fetch(`data/${pageName}.json`)
            ]);

            let headerTemplates = [];
            let headerProfileTemplates = [];
            let footerTemplates = [];
            let pageTemplates = [];

            if (headerResponse.ok) {
                const headerConfig = await headerResponse.json();
                headerTemplates = headerConfig.templates || [];
            }

            if (headerProfileResponse.ok) {
                const headerProfileConfig = await headerProfileResponse.json();
                headerProfileTemplates = headerProfileConfig.templates || [];
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
                ...headerProfileTemplates,
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

            window.templateData.forEach(item => {
                const elements = document.querySelectorAll(item.selector);

                elements.forEach(el => {
                    if (!el.hasAttribute('xlu-include-file')) {
                        let content = el.innerHTML;

                        Object.keys(item.data).forEach(key => {
                            const regex = new RegExp(`{{${key}}}`, "g");
                            content = content.replace(regex, item.data[key]);
                        });

                        el.innerHTML = content;
                    }
                });
            });

        } catch (e) {
            console.error("Error al cargar los archivos JSON:", e);
            window.templateData = [];
        }
    }

    const el = document.querySelector("[xlu-include-file]");

    if (!el) {
        if (typeof initHamburgerMenu === "function") {
            initHamburgerMenu();
        }

        document.dispatchEvent(new CustomEvent('templatesReady'));
        return;
    }

    const file = el.getAttribute("xlu-include-file");

    try {
        const response = await fetch(file);

        if (response.ok) {
            let content = await response.text();

            const allKeys = Array.from(el.attributes)
                .filter(attr => attr.name.startsWith('data-'))
                .map(attr => attr.name.replace('data-', ''));

            allKeys.forEach(key => {
                const regex = new RegExp(`{{${key}}}`, "g");
                const value = el.getAttribute(`data-${key}`) || "";
                content = content.replace(regex, value);
            });

            const temp = document.createElement('div');
            temp.innerHTML = content.trim();

            const newNode = temp.firstElementChild || temp;

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