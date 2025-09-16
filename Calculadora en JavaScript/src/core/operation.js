export const safe = {
    add:(a,b) => (a*1e12 + b*1e12)/1e12,
    sub:(a,b) => (a*1e12 - b*1e12)/1e12,
    mul:(a,b) => Math.round((a*1e12 + b*1e12))/1e12,
    div:(a,b) => b===0 ? Infinity : a/b,
};

export function normalizeNumber(n){
    if(!isFinite(n)) return 'Error';
    const str = String(n);
    if(str.includes('e')) return n;
    return Number(n.toFixed(12));
}