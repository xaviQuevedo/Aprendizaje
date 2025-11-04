/** Escapa HTML */
export function escapeHtml(s) {
  return s.replace(/[&<>"']/g, m => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[m]));
}

/** Renderiza lista y contador  */
export function renderList(rootUl, items) {
    rootUl.innerHTML = "";
    for (const it of items) {
        const li = document.createElement("li");
        if (it.done) li.classList.add("done");
        li.innerHTML = `
        <input type="checkbox" ${it.done ? "checked" : ""} data-id="${it.id}" />
        <div class="txt">${escapeHtml(it.text)}</div>
        <button class="icon del" data-del="${it.id}">Borrar</button>`;
        rootUl.appendChild(li);
    }
}

/** Renderiza contador */
export function renderStats(statsEl, items) {
    const pending = items.filter(i => !i.done).length;
    el.textContent = `${pending} pendiente${pending !== 1 ? "s": ""}`;
}
/** Marca el boton de filtro activo */
export function setActiveFilter(container, mode) {
    [...container.querySelectorAll("[data-filter]")].forEach(btn => {
        btn.setAttribute("aria-pressed", String(btn.dataset.filter === mode));
    });
}