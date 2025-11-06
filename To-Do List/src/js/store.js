const KEY = "todo.items.V1";

/** @type{{id:string, text:string, done:boolean, createdAt:number }} TODO*/

/** Cargar desde localStorage */
export function load() {
  try {
    return /** @type {Todo[]} */ (JSON.parse(localStorage.getItem(KEY)) || []);
  } catch {
    return [];
  }
}
/** Guarda en localStorage. */
export function save(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

const FILTER_KEY = "todo.filter.V1";

export function loadFilter() {
  try {
    return localStorage.getItem(FILTER_KEY) || "all";
  } catch {
    return "all";
  }
}

export function saveFilter(mode) {
  try {
    localStorage.setItem(FILTER_KEY, mode);
  } catch {}
}
