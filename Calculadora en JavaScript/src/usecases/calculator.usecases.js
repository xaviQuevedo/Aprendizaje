export function onDigit(calc, d) {
  calc.inputDigit(d);
  return snapshot(calc);
}
export function onDecimal(calc) {
  calc.inputDecimal();
  return snapshot(calc);
}

export function onToggleSign(calc) {
  calc.toggleSign();
  return snapshot(calc);
}
export function onClearEntry(calc) {
  calc.clearEntry();
  return snapshot(calc);
}
export function onAllClear(calc) {
  calc.allClear();
  return snapshot(calc);
}
export function onOperator(calc, op) {
  calc.setOperator(op);
  return snapshot(calc);
}
export function onEquals(calc) {
  calc.equals();
  return snapshot(calc);
}

export function snapshot(calc) {
  return {
    display: calc.displayValue,
    expr: calc.expression,
    waiting: calc.waitingForSecond,
    op: calc.operator,
  };
}
