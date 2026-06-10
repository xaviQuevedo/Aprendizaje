// src/js/todoController.js
import { load, save, loadFilter, saveFilter } from "./store";
import type { FilterMode } from "./store";
import { add, toggle, remove, clear, filter, rename } from "./todoModel";
import { renderList, renderStats, setActiveFilter } from "./todoView";

/** Controla eventos y estado global. */
export function initController(doc: Document = document) {
  const $ = (s: string): Element | null => doc.querySelector(s);

  const listEl = $("#list") as HTMLUListElement | null;
  const inputEl = $("#newTask") as HTMLInputElement | null;
  const btnClear = $("#btnClear") as HTMLButtonElement | null;
  const statsEl = $("#stats") as HTMLElement | null;
  const formNew = $("#formNew") as HTMLFormElement | null;
  const filtersNav = doc.querySelector('nav[aria-label="Filtros"]') as HTMLElement | null;

  // Comprobaciones defensivas (mira la consola si algo es null)
  if (!listEl || !inputEl || !statsEl || !formNew) {
    console.error("Faltan elementos del DOM:", { listEl, inputEl, statsEl, formNew });
    return;
  }
  /*   if (!filtersNav) {
    console.warn("No se encontró el nav de filtros; los filtros no estarán activos.");
  }
 */
  let items = load();
  let mode: FilterMode = loadFilter(); // "all" | "active" | "completed"

  const redraw = (): void => {
    renderList(listEl, filter(items, mode));
    renderStats(statsEl, items);

    if (filtersNav) {
      setActiveFilter(filtersNav, mode);
    }
  };

  console.log(" Controller inicializado");

  listEl.addEventListener("dblclick", (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    const txt = target?.closest(".txt[data-edit]") as HTMLElement | null;

    if (!txt) return;

    const id = txt.getAttribute("data-edit");
    if (!id) return;

    const original = txt.textContent || "";

    const input = document.createElement("input");
    input.type = "text";
    input.value = original;
    input.className = "w-full border rounded px-2 py-1";

    txt.replaceWith(input);
    input.focus();
    input.setSelectionRange(original.length, original.length);

    const commit = (): void => {
      const val = input.value.trim();
      const newText = val || original;
      items = rename(items, id, newText);
      save(items);
      redraw();
    };

    const cancel = (): void => redraw();

    input.addEventListener("keydown", (ev: KeyboardEvent) => {
      if (ev.key === "Enter") commit();
      if (ev.key === "Escape") cancel();
    });
    input.addEventListener("blur", commit);
  });

  // Añadir
  formNew.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();

    const text = inputEl.value.trim();
    if (!text) return;

    items = add(items, text);
    inputEl.value = "";

    save(items);
    redraw();
    inputEl.focus();
  });

  // Borrar / Toggle
  listEl.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    // Borrar
    const delBtn = target?.closest("[data-del]") as HTMLElement | null;

    if (delBtn) {
      const id = delBtn.getAttribute("data-del");
      if (!id) return;

      items = remove(items, id);
      save(items);
      redraw();
      return;
    }

    // Toggle (fíjate en [data-id], no [data-toggle])
    const checkbox = target?.closest('input[type="checkbox"][data-id]') as HTMLInputElement | null;

    if (checkbox) {
      const id = checkbox.getAttribute("data-id");
      if (!id) return;

      items = toggle(items, id, checkbox.checked);
      save(items);
      redraw();
      return;
    }
  });

  // Limpiar todas (por si lo necesitas)
  if (btnClear) {
    btnClear.addEventListener("click", () => {
      if (!items.length) return;
      if (confirm("¿Eliminar todas las tareas?")) {
        items = clear();
        save(items);
        redraw();
      }
    });
  }

  // Filtros
  filtersNav?.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    const btn = target?.closest("[data-filter]") as HTMLElement | null;

    if (!btn) return;

    const selectedMode = btn.dataset.filter;


    if (
      selectedMode === "all" ||
      selectedMode === "active" ||
      selectedMode === "completed"
    ) {
      mode = selectedMode;
      saveFilter(mode);
      redraw();
    }
  });

  redraw();
}
