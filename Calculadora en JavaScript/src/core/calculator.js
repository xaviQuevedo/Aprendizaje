import { safe, normalizeNumber } from "./operations.js";

export class Calculator {
  constructor() {
    this.reset();
  }

  reset() {
    this.displayValue = "0";
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecond = false;
    this.justEvaluated = false;
    this.expression = "";
  }

  inputDigit(d) {
    if (this.waitingForSecond) {
      this.displayValue = String(d);
      this.waitingForSecond = false;
    } else {
      this.displayValue =
        this.displayValue === "0" || this.justEvaluated
          ? String(d)
          : this.displayValue + String(d);
    }
    this.justEvaluated = false;
  }

  inputDecimal() {
    if (this.waitingForSecond) {
      this.displayValue = "0.";
      this.waitingForSecond = false;
    } else if (!this.displayValue.includes(".")) {
      this.displayValue += ".";
    }
    this.justEvaluated = false;
  }

  toggleSign() {
    if (this.displayValue === "0") return;
    this.displayValue = this.displayValue.startsWith("-")
      ? this.displayValue.slice(1)
      : "-" + this.displayValue;
  }

  clearEntry() {
    if (this.justEvaluated) {
      this.reset();
    } else {
      this.displayValue =
        this.displayValue.length > 1 ? this.displayValue.slice(0, -1) : "0";
    }
  }

  allClear() {
    this.reset();
  }

  setOperator(nextOp) {
    const inputValue = parseFloat(this.displayValue);

    if (this.operator && this.waitingForSecond) {
      this.operator = nextOp;
      this.expression =
        this.firstOperand !== null ? `${this.firstOperand} ${nextOp}` : "";
      return;
    }

    if (this.firstOperand === null) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.evaluate(
        this.firstOperand,
        inputValue,
        this.operator
      );
      this.displayValue = String(result);
      this.firstOperand = Number(result);
    }

    this.operator = nextOp;
    this.waitingForSecond = true;
    this.justEvaluated = false;
    this.expression = `${this.firstOperand} ${nextOp}`;
  }

  equals() {
    const inputValue = parseFloat(this.displayValue);
    if (this.operator === null || this.firstOperand === null) return;
    const result = this.evaluate(this.firstOperand, inputValue, this.operator);
    this.displayValue = String(result);
    this.expression = `${this.firstOperand} ${this.operator} ${inputValue} =`;
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecond = false;
    this.justEvaluated = true;
  }
  evaluate(a, b, op) {
    let r;
    switch (op) {
      case "+":
        r = safe.add(a, b);
        break;
      case "-":
        r = safe.sub(a, b);
        break;
      case "*":
        r = safe.mul(a, b);
        break;
      case "/":
        r = safe.div(a, b);
        break;
      default:
        r = b;
    }
    return normalizeNumber(r);
  }
}
