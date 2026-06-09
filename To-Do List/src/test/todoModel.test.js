// -------------------------------------------------
// Unit Test for To-Do List Model / Pruebas unitarias del modelo To-Do List
// -------------------------------------------------
//
// GB This file tests the logical functions from `todoModel.js`.
//      It checks that adding, removing, renaming, toggling, and filtering tasks
//      behave correctly and do not mutate the original data.
//
// ES Este archivo pruebas las funciones lógicas del archivo `todoModel.js`.
//      Verifica que las operaciones de  añadir, eliminar, renombrar, marcar y filtrar tareas
//      se comparten correctamente y no modifiuen el arreglo original.
//
// ------------------------------------------------


import { describe, it, expect } from "vitest";
// GB Importing Vitest functions (describe, it, expect).
// ES Importamos las funciones básicas de Vitest (describe, it, expect).

import { add, toggle, remove, rename, filter } from "../js/todoModel.js";
// GB Importing Vitest testing functions (describe, it, expect).
// ES Importamos las funciones que vamos a probar desde nuestro módulo lógico de tareas.


// ----------------------------------------------
// Test Suite: todoModel.js
// ----------------------------------------------
//
// GB A "describe" block groups several related tests for the same module or feature.
// ES Un bloque "describe" agrupa varios tests relacionados con el mismo módulo o funcionalidad.
//
describe("todoModel", () => {

  // -------------------------------------------
  // TEST 1: add()
  // -------------------------------------------  
  it("adds a new task at the beginning / añade una nueva tarea al principio", () => {
    const items = [];
    const updated = add(items, "Aprender testing / Learn testing");

    // GB The new list should have one element.
    // ES La nueva lista debe tener un elemento.
    expect(updated.length).toBe(1);
    expect(updated[0].text).toBe("Aprender testing / Learn testing");
    expect(updated[0].done).toBe(false);

    expect(items.length).toBe(0);
    expect(updated).not.toBe(items);
  });

  it("marca tarea como completada o no", () => {
    const base = add([], "Practicar JS");
    const id = base[0].id;
    const toggled = toggle(base, id, true);
    expect(toggled[0].done).toBe(true);
  });

  it("elimine tarea por id", () => {
    const base = add([], "Tarea 1");
    const id = base[0].id;
    const result = remove(base, id);
    expect(result.length).toBe(0);
  });

  it("renombra correctamente", () => {
    const base = add([], "Original");
    const id = base[0].id;
    const result = rename(base, id, "Modificada");
    expect(result[0].text).toBe("Modificada");
  });

  it("filtra correctamente según modo", () => {
    const base = [
      { id: "1", text: "Hecha", done: true },
      { id: "2", text: "Pendiente", done: false },
    ];
    expect(filter(base, "completed").length).toBe(1);
    expect(filter(base, "active").length).toBe(1);
    expect(filter(base, "all").length).toBe(2);
  });
  
  it("does not mutate the original task when toggling / no muta la tarea original al marcar", () => {
    const base = add([], "Practicar JS");
    const id = base[0].id;

    const toggled = toggle(base, id, true);

    expect(base[0].done).toBe(false);
    expect(toggled[0].done).toBe(true);
    expect(toggled).not.toBe(base);
  });

});
