import type { Todo } from "./todoModel";
const KEY = "todo.items.V1";
const FILTER_KEY = "tpdp.filter.V1";

export type FilterMode = "all" | "active" | "completed";

/** Cargar desde localStorage */
export function load(): Todo[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as Todo[];
  } catch {
    return [];
  }
}
/** Guarda en localStorage. */
export function save(items: Todo[]): void {
  localStorage.setItem(KEY, JSON.stringify(items));
}

/**Carga el filtro seleccionado desde localStorage */
export function loadFilter(): FilterMode {
  try {
    const mode = localStorage.getItem(FILTER_KEY);

    if (mode === "active" || mode === "completed" || mode === "all"){
      return mode;
    }
    return "all";
  } catch {
    return "all";
  }
}
/** Guarda el filtro seleccionado en localStorage */
export function saveFilter(mode: FilterMode): void {
  try {
    localStorage.setItem(FILTER_KEY, mode);
  } catch {}
}
