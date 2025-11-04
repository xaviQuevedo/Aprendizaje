import {load, save} from './store.js';
import {add, toggle, remove, clear, filter} from './todoModel.js';
import {renderList, renderStats, setActiveFilter} from './todoView.js';

/** Controla eventos y estado global. */ 
export function initController(doc = document) {
    
    const $ = s => doc.querySelector(s);

    const listEl = $("#list");
    const inputEl = $("#newTask");
    const btnClear = $("#btnClear");
    const statsEl = $("#stats");
    const formNew = $("#formNew");
    const filterNav = doc.querySelector('nav[aria-label="Filtros"]');

    /** @type {import("./store.js").Todo[]} */
    let items = load();
    let mode = "all";

    const redraw = () => {
        renderList(listEl, filter(items, mode));
        renderStats(statsEl, items);
        setActiveFilter(filterNav, mode);
    };

    // Añadir
    formNew.addEventListener("submit", e => {
        e.preventDefault();
        const text = inputEl.value.trim();
        if (!text) return;
        items = add(items, text);
        inputEl.value = "";
        save(items);
        redraw();
        inputEl.focus();
    });

    // Borrar / Toggle (Fix 1: usar e.target y getAttribute correctamente)
    listEl.addEventListener("click", e => {
        const delBtn = e.target.closest("[data-del");
        if (delBtn) {
            const id = delBtn.getAttribute("data-del");
            items = remove (items, id);
            save (items);
            redraw();
            return;
        }
    });

    // Filtros
    filtersNav.addEventListener("click", e => {
        const btn = e.target.closest("[data-filter]");
        if (!btn) return;
        mode = btn.dataset.filter || "all";
        redraw();
    });

    redraw();
}
