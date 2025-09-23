class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
    this.updateDisplay();
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1) || '0';
    this.updateDisplay();
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (this.currentOperand === '0' && number !== '.') {
      this.currentOperand = number.toString();
    } else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '' || this.currentOperand === '0') {
      this.operation = operation; // permitir cambiar operación
      this.updateDisplay();
      return;
    }
    if (this.previousOperand !== '') this.compute();
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '0';
    this.updateDisplay();
  }

  compute() {
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current) || !this.operation) return;

    let result;
    switch (this.operation) {
      case '+': result = prev + current; break;
      case '-': result = prev - current; break;
      case '*': result = prev * current; break;
      case '÷': result = prev / current; break;
      default: return;
    }
    this.currentOperand = String(result);
    this.operation = undefined;
    this.previousOperand = '';
    this.updateDisplay();
  }

  getDisplayNumber(number) {
    const [intPart, decPart] = number.toString().split('.');
    const intDigits = parseFloat(intPart);
    const intDisplay = isNaN(intDigits) ? '' : intDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    return decPart != null ? `${intDisplay}.${decPart}` : intDisplay || '0';
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}

// ---------- wiring ----------
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

if (!previousOperandTextElement || !currentOperandTextElement) {
  console.error('❌ No se encontraron los elementos del display. Revisa el HTML.');
}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Clicks
numberButtons.forEach(btn => {
  btn.addEventListener('click', () => calculator.appendNumber(btn.dataset.number));
});
operationButtons.forEach(btn => {
  btn.addEventListener('click', () => calculator.chooseOperation(btn.dataset.operation || btn.innerText));
});
equalsButton.addEventListener('click', () => calculator.compute());
allClearButton.addEventListener('click', () => calculator.clear());
deleteButton.addEventListener('click', () => calculator.delete());

// Teclado
document.addEventListener('keydown', (e) => {
  if (/\d/.test(e.key)) return calculator.appendNumber(e.key);
  if (e.key === '.' || e.key === ',') return calculator.appendNumber('.');
  if (['+', '-', '*', '/'].includes(e.key)) {
    const map = { '/':'÷', '*':'*', '+':'+', '-':'-' };
    return calculator.chooseOperation(map[e.key]);
  }
  if (e.key === 'Enter' || e.key === '=') {
    e.preventDefault();
    return calculator.compute();
  }
  if (e.key === 'Backspace') return calculator.delete();
  if (e.key === 'Escape') return calculator.clear();
});

console.log('✅ Calculadora lista');
