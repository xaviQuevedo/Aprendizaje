// src/js/todoController.js
import { load, save } from "./store.js";
import { add, toggle, remove, clear, filter } from "./todoModel.js";
import { renderList, renderStats, setActiveFilter } from "./todoView.js";

/** Controla eventos y estado global. */
export function initController(doc = document) {
  const $ = (s) => doc.querySelector(s);

  const listEl = $("#list");
  const inputEl = $("#newTask");
  const btnClear = $("#btnClear");
  const statsEl = $("#stats");
  const formNew = $("#formNew");
  const filtersNav = doc.querySelector('nav[aria-label="Filtros"]');

  // ✅ Comprobaciones defensivas (mira la consola si algo es null)
  if (!listEl || !inputEl || !statsEl || !formNew) {
    console.error("Faltan elementos del DOM:", { listEl, inputEl, statsEl, formNew });
    return;
  }
  if (!filtersNav) {
    console.warn("No se encontró el nav de filtros; los filtros no estarán activos.");
  }

  /** @type {import("./store.js").Todo[]} */
  let items = load();
  let mode = "all"; // "all" | "active" | "completed"

  const redraw = () => {
    renderList(listEl, filter(items, mode));
    renderStats(statsEl, items);
    if (filtersNav) setActiveFilter(filtersNav, mode);
  };

  console.log("✅ Controller inicializado");

  // Añadir
  formNew.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = inputEl.value.trim();
    console.log("🟢 Enviando formulario:", { text });
    if (!text) return;
    items = add(items, text);
    inputEl.value = "";
    save(items);
    redraw();
    inputEl.focus();
  });

  // Borrar / Toggle
  listEl.addEventListener("click", (e) => {
    // Borrar
    const delBtn = e.target.closest("[data-del]");
    if (delBtn) {
      const id = delBtn.getAttribute("data-del");
      items = remove(items, id);
      save(items);
      redraw();
      return;
    }

    // ✅ Toggle (fíjate en [data-id], no [data-toggle])
    const checkbox = e.target.closest('input[type="checkbox"][data-id]');
    if (checkbox) {
      const id = checkbox.getAttribute("data-id");
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
  if (filtersNav) {
    filtersNav.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;
      mode = btn.dataset.filter || "all";
      redraw();
    });
  }

  redraw();
}
