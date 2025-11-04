/** @typedef {import("./store.js").Todo} Todo */

export const uid = () => crypto.randomUUID?.() || Math.random().toString(36).slice(2, 9);

/** Crea una tarea nueva al principio. */
export function add(items, text) {
    const newItem = {id: uid(), text, done: false, createdAt: Date.now() };
    return [newItem, ...items];
}

/** Marca completada/no */
export function toggle(items, id, done) {
    return items.map(t => (t.id === id ? { ...t, done } : t));
}

/** Elimina por id */
export function remove(items, id) {
    return items.filter (t => t.id !== id);
}

/** Limpia todo */
export const clear = () => [];

/** Filtra por vista */
export function filter(items, mode = "all") {
    if (mode === "active") return items-filter(t => !t.done);
    if (mode === "completed") return items.filter(t => t.done);
    return items;
}