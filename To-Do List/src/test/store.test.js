import { describe, it, expect, beforeEach } from "vitest";
import { load, save, loadFilter, saveFilter } from "../js/store.js";

describe("store", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("guarda y carga tareas desde localStore", () => {
        const items = [
            {
                id: "1",
                text: "Aprender localStore",
                done: false,
                createdAt: 123456,
            },
        ];

        save(items);
        const result = load();

        expect(result).toEqual(items);
    });

    it("devuelve array vacio si no hay tareas guardadas", () => {
        const result = load();

        expect(result).toEqual([]);
    });

    it("guarda y carga el filtro seleccionado", () => {
        saveFilter("completed");

        const result = loadFilter();

        expect(result).toBe("completed");
    });

    it("devuelve all si no hay filtro guardado", () => {
        const result = loadFilter();

        expect(result).toBe("all");
    });

    it("devuelve array vacío cuando localStore contiene un JSON inválido", () => {

        localStorage.setItem(
            "todo.items.V1",
            "{esto-no-es-json}"
        );

        const result = load();

        expect(result).toEqual([]);
    });
});