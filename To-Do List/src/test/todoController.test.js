import { describe, it, expect, beforeEach, vi } from "vitest";
import { initController } from "../js/todoController.js";

describe("todoController", () => {
    beforeEach(() => {
        localStorage.clear();

        document.body.innerHTML = `
            <form id="formNew">
                <input id="newTask" />
                <button type="submit">Añadir</button>
            </form>

            <ul id="list"></ul>

            <p id="stats"></p>

            <button id="btnClear">Limpiar</button>

            <nav aria-label="Filtros">
                <button data-filter="all">Todas</button>
                <button data-filter="active">Activas</button>
                <button data-filter="completed">Completadas</button>
            </nav>        
        `;
    });

    it("añade una tarea al enviar el formulario", () => {
        initController(document);

        const input = document.querySelector("#newTask");
        const form = document.querySelector("#formNew");
        const list = document.querySelector("#list");
        const stats = document.querySelector("#stats");

        input.value = "Aprender controller testing";

        form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

        expect(list.children.length).toBe(1);
        expect(list.textContent).toContain("Aprender controller testing");
        expect(stats.textContent).toBe("1 pendiente");
        expect(input.value).toBe("");
    });

    it("elimina una tarea al pulsar borrar", () => {
        initController(document);

        const input = document.querySelector("#newTask");
        const form = document.querySelector("#formNew");
        const list = document.querySelector("#list");
        const stats = document.querySelector("#stats");

        input.value = "Tarea a eliminar";

        form.dispatchEvent(
            new Event("submit", {
                bubbles: true,
                cancelable: true,
            })
        );

        expect(list.children.length).toBe(1);
        expect(stats.textContent).toBe("1 pendiente");

        const deleteBtn = list.querySelector("[data-del");

        deleteBtn.click();

        expect(list.children.length).toBe(0);
        expect(stats.textContent).toBe("0 pendientes");
    });

    it("marca una tarea como completada", () => {
        initController(document);

        const input = document.querySelector("#newTask");
        const form = document.querySelector("#formNew");
        const list = document.querySelector("#list");

        input.value = "Terminar testing";

        form.dispatchEvent(
            new Event("submit", {
                bubbles: true,
                cancelable: true,
            })
        );
        const checkbox = list.querySelector(
            'input[type="checkbox"][data-id]'
        );

        checkbox.checked = true;
        checkbox.dispatchEvent(
            new Event("click", {
                bubbles: true,
                cancelable: true,
            })
        );

        expect(list.children[0].classList.contains("done")).toBe(true);
    });

    it("filtra tarea completadas", () => {
        initController(document);

        const input = document.querySelector("#newTask");
        const form = document.querySelector("#formNew");
        const list = document.querySelector("#list");
        const completedBtn = document.querySelector('[data-filter="completed"]');

        input.value = "Tarea pendiente";
        form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

        input.value = "Tarea completada"
        form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

        const checkbox = list.querySelector('input[type="checkbox"][data-id]');
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event("click", {bubbles: true, cancelable: true }));

        completedBtn.click();

        expect(list.children.length).toBe(1);
        expect(list.textContent).toContain("Tarea completada");
    });

    it("limpia todas las tareas al confirmar", () => {
        vi.spyOn(window, "confirm").mockReturnValue(true);

        initController(document);

        const input = document.querySelector("#newTask");
        const form = document.querySelector("#formNew");
        const list = document.querySelector("#list");
        const btnClear = document.querySelector("#btnClear");

        input.value = "Tarea 1";
        form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

        input.value = "Tarea 2";
        form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

        expect(list.children.length).toBe(2);

        btnClear.click();

        expect(list.children.length).toBe(0);
        window.confirm.mockRestore();
    });
});