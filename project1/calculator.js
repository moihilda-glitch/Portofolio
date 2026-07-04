// ── State ──────────────────────────────────────────────
let current     = '0';
let prev        = '';
let operator    = null;
let waitingNext = false;
let history     = [];

const opSym = { '+': '+', '-': '−', '*': '×', '/': '÷' };

// ── DOM refs ───────────────────────────────────────────
const disp   = document.getElementById('display');
const expr   = document.getElementById('expr');
const histEl = document.getElementById('history');

// ── Helpers ────────────────────────────────────────────
function updateDisplay(val) {
  const s = String(val);
  disp.classList.remove('small', 'xsmall');
  if (s.length > 14)     disp.classList.add('xsmall');
  else if (s.length > 9) disp.classList.add('small');
  disp.textContent = s;
}

function updateExpr() {
  expr.textContent = (prev !== '' && operator)
    ? prev + ' ' + opSym[operator]
    : '\u00a0';
}

// ── Input handlers ─────────────────────────────────────
function inputNum(n) {
  if (waitingNext) { current = n; waitingNext = false; }
  else { current = current === '0' ? n : current + n; }
  if (current.length > 16) current = current.slice(0, 16);
  updateDisplay(current);
  updateExpr();
}

function inputDot() {
  if (waitingNext) { current = '0.'; waitingNext = false; }
  else if (!current.includes('.')) current += '.';
  updateDisplay(current);
}

function inputOp(op) {
  if (operator && !waitingNext) calculate(true);
  prev = current;
  operator = op;
  waitingNext = true;
  updateExpr();
}

// ── Calculate ──────────────────────────────────────────
function calculate(chained) {
  if (!operator || prev === '') return;

  const a = parseFloat(prev);
  const b = parseFloat(current);
  const expStr = prev + ' ' + opSym[operator] + ' ' + current + ' = ';

  let result;
  switch (operator) {
    case '+': result = a + b; break;
    case '-': result = a - b; break;
    case '*': result = a * b; break;
    case '/': result = b === 0 ? 'Error' : a / b; break;
  }

  if (result !== 'Error') {
    result = parseFloat(parseFloat(result.toPrecision(12)).toFixed(10)).toString();
  }

  if (!chained) {
    history.unshift(expStr + result);
    if (history.length > 3) history.pop();
    histEl.textContent = history[0] || '\u00a0';
    expr.textContent   = '\u00a0';
    operator = null;
    prev     = '';
  }

  current     = String(result);
  waitingNext = !chained;
  updateDisplay(current);
}

// ── Special buttons ────────────────────────────────────
function clearAll() {
  current = '0'; prev = ''; operator = null; waitingNext = false;
  updateDisplay('0');
  expr.textContent = '\u00a0';
}

function toggleSign() {
  if (current === '0') return;
  current = current.startsWith('-') ? current.slice(1) : '-' + current;
  updateDisplay(current);
}

function inputPercent() {
  const v = parseFloat(current);
  if (!isNaN(v)) {
    current = String(parseFloat((v / 100).toPrecision(12)));
    updateDisplay(current);
  }
}

// ── Keyboard support ───────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key >= '0' && e.key <= '9')             inputNum(e.key);
  else if (e.key === '.')                        inputDot();
  else if (e.key === '+')                        inputOp('+');
  else if (e.key === '-')                        inputOp('-');
  else if (e.key === '*')                        inputOp('*');
  else if (e.key === '/') { e.preventDefault();  inputOp('/'); }
  else if (e.key === 'Enter' || e.key === '=')   calculate();
  else if (e.key === 'Backspace') {
    current = current.length > 1 ? current.slice(0, -1) : '0';
    updateDisplay(current);
  }
  else if (e.key === 'Escape') clearAll();
});