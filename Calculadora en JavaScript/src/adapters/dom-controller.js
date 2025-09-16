import { onDigit, onDecimal, onToggleSign, onClearEntry, onAllClear, onOperator, onEquals } from "../usecases/calculator.usecases.js";

export function mountDomController(calc, render){
    const keys = document.getElementById('keys');
    keys.addEventListener('click', (e)=>{
        const btn = e.target.closest('button.key');
        if (!btn) return;

        if(btn.dataset.digit) { render(onDigit(calc, btn.dataset.digit)); return;}
        if(btn.dataset.action === 'decimal'){ render(onDecimal(calc)); return; }
        if(btn.dataset.action === 'toggle-sign'){ render(onToggleSign(calc)); return; }


        if(btn.dataset.action === 'clear-entry'){ render(onClearEntry(calc)); return; }
        if(btn.dataset.action === 'all-clear'){ render(onAllClear(calc)); return; }
        if(btn.dataset.action === 'equals'){ render(onEquals(calc)); return; }
        if(btn.dataset.op){ render(onOperator(calc, btn.dataset.op)); return; }



    });
}