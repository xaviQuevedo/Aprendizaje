export interface Todo {
    id: string;
    text: string;
    done: boolean;
    createdAt: number;
}

export const uid = (): string =>
    crypto.randomUUID?.() || Math.random().toString(36).slice(2, 9);

/** Crea una tarea nueva al principio. */
export function add(items: Todo[], text: string): Todo[] {
    const newItem = { id: uid(), text, done: false, createdAt: Date.now() };
    return [newItem, ...items];
}

/** Marca completada/no */
export function toggle(items: Todo[], id: string, done: boolean): Todo[] {
    return items.map(t => (t.id === id ? { ...t, done } : t));
}

/** Elimina por id */
export function remove(items: Todo[], id: string): Todo[] {
    return items.filter(t => t.id !== id);
}

/** Limpia todo */
export const clear = (): Todo[] => [];

/** Filtra por vista */
export function filter(items: Todo[], mode: string = "all"): Todo[] {
    if (mode === "active") return items.filter(t => !t.done);
    if (mode === "completed") return items.filter(t => t.done);
    return items;
}

export function rename(items: Todo[], id: string, newText: string): Todo[] {
    return items.map(t => (t.id === id ? { ...t, text: newText } : t));
}