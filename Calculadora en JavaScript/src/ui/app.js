// Composition Root: ensambla todo
import { Calculator } from "../core/calculator.js";
import { snapshot } from "../usecases/calculator.usecases.js";
import { mountDomController } from "../adapters/dom-controller.js";
import { mountKeyboardController } from "../adapters/keyboard-controller.js";
import { createRenderer } from "./render.js";

const calc = new Calculator();
const render = createRenderer();

// Primer render
render(snapshot(calc));

// Montar adaptadores
mountDomController(calc, render);
mountKeyboardController(calc, render);
