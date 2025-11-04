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