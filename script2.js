async function xLuIncludeFile() {
  let el = document.querySelector("[xlu-include-file]");
  if (!el) return;

  const file = el.getAttribute("xlu-include-file");

 
  const attrs = {};
  for (const a of el.attributes) {
    if (a.name === "xlu-include-file") continue;
    attrs[a.name] = a.value;
  }


  const globalAttrs = window.attributes || {};
  const finalAttrs = { ...globalAttrs, ...attrs };

  try {
    const response = await fetch(file);
    if (!response.ok) {
      console.error("Error cargando archivo:", file);
      el.removeAttribute("xlu-include-file");
      await xLuIncludeFile();
      return;
    }

    let content = await response.text();

    for (const key in finalAttrs) {
      const regex = new RegExp(`{{${key}}}`, "g");
      content = content.replace(regex, finalAttrs[key] ?? "");
    }

   
    content = content.replace(/{{\s*[\w-]+\s*}}/g, "");

    const temp = document.createElement("div");
    temp.innerHTML = content.trim();
    const newNode = temp.firstElementChild || temp;

    el.parentNode.replaceChild(newNode, el);
  } catch (err) {
    console.error("Error de red en:", file, err);
    el.removeAttribute("xlu-include-file");
  }

  await xLuIncludeFile();
}