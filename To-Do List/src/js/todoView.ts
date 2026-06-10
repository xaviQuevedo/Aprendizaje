import type { Todo } from "./todoModel";


/** Escapa HTML */
export function escapeHtml(s: string):string {
  return s.replace(
    /[&<>"']/g,
    (m) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[m] ?? m)
  );
}

/**Crea el HTML en un <li> */
export function renderItem(it: Todo):string {
  return `
    <input type="checkbox" ${it.done ? "checked" : ""} data-id="${it.id}" />
    <div class="txt" data-edit="${it.id}" title= "Doble clic para editar">${escapeHtml(
    it.text
  )}</div>
    <button class="icon del "data-del="${it.id}">Borrar</button>
    `;
}

/** Renderiza lista y contador  */
export function renderList(rootUl: HTMLUListElement, items: Todo[]): void {
  rootUl.innerHTML = "";
  for (const it of items) {
    const li = document.createElement("li");

    if (it.done) li.classList.add("done");

    li.innerHTML = renderItem(it);
    rootUl.appendChild(li);
  }
}

/** Renderiza contador */
export function renderStats(statsEl: HTMLElement, items: Todo[]): void {
  const pending = items.filter((i) => !i.done).length;
  // Asegúrate de que `statsEl` esté pasando correctamente como el elemento DOM donde se muestra el contador
  statsEl.textContent = `${pending} pendiente${pending !== 1 ? "s" : ""}`;
}

/** Marca el boton de filtro activo */
export function setActiveFilter(container: HTMLElement, mode: string) {
  [...container.querySelectorAll("[data-filter]")].forEach((btn) => {
    btn.setAttribute("aria-pressed", 
      String((btn as HTMLElement).dataset.filter === mode)
    );
  });
}

