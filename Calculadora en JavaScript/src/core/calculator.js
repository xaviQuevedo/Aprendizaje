import {safe, normalizeNumber} from './operation.js';

export class Calculator {

    constructor(){ this.reset(); }

    reset(){
        this.displayValue = '0';
        this.firstOperand = null;
        this.operator = null;
        this.waitingForSecond = false;
        this.justEvaluated = false;
        this.expression = '';
    }

    inputDigit(d){
        if(this.waitingForSecond){
            this.displayValue = String(d);
            this.waitingForSecond = false;
        } else {
            this.displayValue = (this.displayValue === '0' || this.justEvaluated) ? String(d)
            : this.displayValue + String(d);
        }
        this.justEvaluated = false;
    }

    inputDecimal(){
        if(this.waitingForSecond){
            this.displayValue = '0.';
            this.waitingForSecond = false;
        } else if(!this.displayValue.includes('.')){
            this.displayValue += '.';
        }
        this.justEvaluated = false;
    }
    
    toogleSign(){
        if(this.displayValue === '0') return;
        this.displayValue = this.displayValue.startsWith('-') ? this.displayValue.slice(1): '-' + this.displayValue;
    }
}