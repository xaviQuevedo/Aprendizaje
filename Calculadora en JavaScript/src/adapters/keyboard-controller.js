import {
  onDigit,
  onDecimal,
  onOperator,
  onEquals,
  onClearEntry,
  onAllClear,
} from "../usecases/calculator.usecases.js";

export function mountKeyboardController(calc, render) {
  window.addEventListener("keydown", (e) => {
    const { key } = e;
    if (/^[0-9]$/.test(key)) {
      render(onDigit(calc, key));
      return;
    }
    if (key === ".") {
      render(onDecimal(calc));
      return;
    }
    if (["+", "-", "*", "/"].includes(key)) {
      render(onOperator(calc, key));
      return;
    }
    if (key === "Enter" || key === "=") {
      e.preventDefault();
      render(onEquals(calc));
      return;
    }
    if (key === "Backspace") {
      render(onClearEntry(calc));
      return;
    }
    if (key === "Escape") {
      render(onAllClear(calc));
      return;
    }
  });
}
