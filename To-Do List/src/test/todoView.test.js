import { describe, it, expect } from "vitest";
import { escapeHtml, renderItem, renderList, renderStats, setActiveFilter } from "../js/todoView.js";

describe("todoView", () => {
    it("Escapa caracteres HTML peligrosos", () => {

        const result = escapeHtml("<script>");

        expect(result).toBe("&lt;script&gt;");
    });

    it("renderiza una tarea correctamente", () => {
        const html = renderItem({
            id: "1",
            text: "Aprender Vitest",
            done: false,
        });
        expect(html).toContain("Aprender Vitest");
        expect(html).toContain('data-id="1"');
        expect(html).toContain('type="checkbox"');
    });

    it("Renderiza una lista de tareas", () => {
        const ul = document.createElement("ul");

        const items = [
            {
                id: "1",
                text: "Aprender Vitest",
                done: false,
            },
            {
                id: "2",
                text: "Aprender React",
                done: true,
            },
        ];

        renderList(ul, items);

        expect(ul.children.length).toBe(2);
        expect(ul.children[1].classList.contains("done")).toBe(true);
        expect(ul.textContent).toContain("Aprender React");
    });

    it("renderiza el contador de tareas pendientes", () => {
        const stastEl = document.createElement("div");

        const items = [
            { id: "1", text: "Hecha", done: true },
            { id: "2", text: "Pendiente 1", done: false },
            { id: "3", text: "Pendiente 2", done: false },
        ]; +

            renderStats(stastEl, items);

        expect(stastEl.textContent).toBe("2 pendientes");
    });

    it("marca el filtro activo correctamente", () => {
        const statsEl = document.createElement("div");

        const items = [
            { id: "1", text: "Única pendiente", done: false },
        ];

        renderStats(statsEl, items)

        expect(statsEl.textContent).toBe("1 pendiente");
    });

    it("marca el filtro correctamente", () => {
        const nav = document.createElement("nav");

        nav.innerHTML = `
            <button data-filter="all">Todas</button>
            <button data-filter="active">Activas</button>
            <button data-filter="completed">Completadas</button>
        `;
        setActiveFilter(nav, "active");

        expect(nav.querySelector('[data-filter="all"]').getAttribute("aria-pressed")).toBe("false");
        expect(nav.querySelector('[data-filter="active"]').getAttribute("aria-pressed")).toBe("true");
        expect(nav.querySelector('[data-filter="completed"]').getAttribute("aria-pressed")).toBe("false");
    });

});