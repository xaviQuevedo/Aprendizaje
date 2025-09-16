// Capa UI: renderiza el estado en el DOM
export function createRenderer() {
  const display = document.getElementById("display");
  const expr = document.getElementById("expr");

  return function render(state) {
    if (!state) return;
    display.textContent = state.display;
    expr.textContent = state.expr || "";
  };
}
