/**
 * Calculus — Premium Calculator
 * JavaScript Logic: Arithmetic, Keyboard Support, History
 */

'use strict';

/* ─── State ────────────────────────────────────────────────── */
const state = {
  expression:    '',   // full expression string shown in display
  operand1:      null, // first operand (number)
  operator:      null, // current operator symbol
  operand2:      null, // second operand (number)
  justEvaled:    false,// did we just press equals?
  justOpPressed: false,// did we just press an operator?
  history:       [],   // [{expr, result}]
};

/* ─── DOM References ─────────────────────────────────────────── */
const exprEl       = document.getElementById('expression');
const previewEl    = document.getElementById('result-preview');
const historyList  = document.getElementById('history-list');
const clearHistBtn = document.getElementById('clear-history');
const grid         = document.getElementById('button-grid');

/* ─── Helpers ────────────────────────────────────────────────── */

/** Map display operators to JS operators */
const OP_MAP = { '÷': '/', '×': '*', '−': '-', '+': '+' };

/** Format a number nicely: cap decimals, use locale commas for large numbers */
function formatNum(n) {
  if (!isFinite(n)) return n > 0 ? 'Infinity' : n < 0 ? '-Infinity' : 'Error';
  if (isNaN(n)) return 'Error';
  // Avoid floating-point noise (e.g. 0.1 + 0.2 = 0.30000000000000004)
  const fixed = parseFloat(n.toPrecision(12));
  // Use exponential for very large/small numbers
  if (Math.abs(fixed) >= 1e13 || (Math.abs(fixed) < 1e-7 && fixed !== 0)) {
    return fixed.toExponential(6);
  }
  return String(fixed);
}

/** Compute the result of operand1 OP operand2 */
function compute(a, op, b) {
  const jsOp = OP_MAP[op];
  switch (jsOp) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/':
      if (b === 0) return NaN; // handled as Error
      return a / b;
    default:  return NaN;
  }
}

/** Evaluate the current expression string safely and return a string result */
function evalExpression(expr) {
  // Replace display operators with JS operators, then evaluate
  const clean = expr
    .replace(/÷/g, '/')
    .replace(/×/g, '*')
    .replace(/−/g, '-');

  try {
    // Only allow safe numeric expressions
    if (!/^[\d+\-*/.()\s]+$/.test(clean)) return null;
    // eslint-disable-next-line no-new-func
    const result = Function('"use strict"; return (' + clean + ')')();
    return formatNum(result);
  } catch {
    return null;
  }
}

/* ─── Display Updates ────────────────────────────────────────── */

function updateDisplay(expr, preview = '') {
  exprEl.textContent = expr || '0';

  // Shrink font for long expressions
  exprEl.classList.remove('shrink', 'smaller');
  if (expr.length > 16) exprEl.classList.add('smaller');
  else if (expr.length > 10) exprEl.classList.add('shrink');

  if (preview && preview !== expr) {
    previewEl.textContent = '= ' + preview;
    previewEl.classList.add('visible');
  } else {
    previewEl.textContent = '';
    previewEl.classList.remove('visible');
  }
}

function animateDisplay(type) {
  exprEl.classList.remove('pulse', 'shake');
  // Force reflow
  void exprEl.offsetWidth;
  exprEl.classList.add(type);
  exprEl.addEventListener('animationend', () => exprEl.classList.remove(type), { once: true });
}

/* ─── History ────────────────────────────────────────────────── */

function addHistory(expr, result) {
  state.history.unshift({ expr, result });
  if (state.history.length > 20) state.history.pop();
  renderHistory();
}

function renderHistory() {
  if (state.history.length === 0) {
    historyList.innerHTML = '<li class="history-empty">No calculations yet</li>';
    return;
  }
  historyList.innerHTML = state.history
    .map(({ expr, result }, i) => `
      <li class="history-item" data-index="${i}" role="button" tabindex="0"
          aria-label="${expr} equals ${result}">
        <span class="history-expr">${expr}</span>
        <span class="history-result">${result}</span>
      </li>`)
    .join('');
}

historyList.addEventListener('click', (e) => {
  const item = e.target.closest('.history-item');
  if (!item) return;
  const idx = parseInt(item.dataset.index, 10);
  const entry = state.history[idx];
  if (!entry) return;
  // Load the result back into the display
  resetState();
  state.expression = entry.result;
  state.operand1   = parseFloat(entry.result);
  state.justEvaled = true;
  updateDisplay(state.expression);
});

historyList.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    e.target.click();
  }
});

clearHistBtn.addEventListener('click', () => {
  state.history = [];
  renderHistory();
});

/* ─── Operator Button Highlight ──────────────────────────────── */

function highlightOperator(op) {
  document.querySelectorAll('.btn-op').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.value === op);
  });
}

function clearOperatorHighlight() {
  document.querySelectorAll('.btn-op').forEach(btn => btn.classList.remove('active'));
}

/* ─── Core State Reset ───────────────────────────────────────── */

function resetState() {
  state.expression    = '';
  state.operand1      = null;
  state.operator      = null;
  state.operand2      = null;
  state.justEvaled    = false;
  state.justOpPressed = false;
  clearOperatorHighlight();
}

/* ─── Action Handlers ────────────────────────────────────────── */

function handleNumber(digit) {
  // After equals, start fresh
  if (state.justEvaled) {
    state.expression = '';
    state.justEvaled = false;
    state.operand1   = null;
    state.operator   = null;
  }

  // After operator pressed, start typing operand2
  if (state.justOpPressed) {
    state.justOpPressed = false;
  }

  // Prevent multiple leading zeros
  if (digit === '0' && state.expression === '0') return;
  if (state.expression === '0') state.expression = '';

  state.expression += digit;

  // Live preview while typing operand2
  const preview = state.operator ? evalExpression(state.expression) : null;
  updateDisplay(state.expression, preview);
}

function handleDecimal() {
  if (state.justEvaled) {
    state.expression = '0';
    state.justEvaled = false;
    state.operand1   = null;
    state.operator   = null;
  }
  if (state.justOpPressed) {
    state.expression += '0';
    state.justOpPressed = false;
  }

  // Find the last number token in the expression
  const parts = state.expression.split(/[+\-×÷]/);
  const lastPart = parts[parts.length - 1];
  if (lastPart.includes('.')) return; // already has a decimal

  if (state.expression === '') state.expression = '0';
  state.expression += '.';
  updateDisplay(state.expression);
}

function handleOperator(op) {
  clearOperatorHighlight();

  // If we have a pending computation, chain it
  if (state.operator && !state.justOpPressed) {
    handleEquals(/* silent */ true);
  }

  // If no expression yet
  if (!state.expression && state.operand1 === null) {
    state.expression = '0';
    state.operand1   = 0;
  }

  // Use current display as operand1 if not set
  if (state.operand1 === null) {
    state.operand1 = parseFloat(state.expression.replace(/[^0-9.\-]/g, '')) || 0;
  }

  state.operator      = op;
  state.justOpPressed = true;
  state.justEvaled    = false;

  state.expression += op;
  updateDisplay(state.expression);
  highlightOperator(op);
}

function handleEquals(silent = false) {
  if (!state.operator || state.justOpPressed) return;

  // Parse out operands from the expression string
  // Split on operators, keeping the operator
  const exprStr  = state.expression;
  // Find the last operator position to split operand2
  const opIndex  = findLastOperatorIndex(exprStr);
  if (opIndex === -1) return;

  const expr1str = exprStr.slice(0, opIndex);
  const opChar   = exprStr[opIndex];
  const expr2str = exprStr.slice(opIndex + 1);

  const a = parseFloat(expr1str);
  const b = parseFloat(expr2str);

  if (isNaN(a) || isNaN(b) || expr2str === '') return;

  const result = compute(a, opChar, b);

  if (isNaN(result)) {
    // Division by zero or error
    if (!silent) {
      updateDisplay('Error');
      animateDisplay('shake');
      setTimeout(() => {
        updateDisplay(state.expression);
      }, 1000);
    }
    return;
  }

  const resultStr  = formatNum(result);
  const historyExpr = exprStr + '=';

  if (!silent) {
    addHistory(historyExpr, resultStr);
    animateDisplay('pulse');
    clearOperatorHighlight();
  }

  state.operand1      = result;
  state.operator      = null;
  state.operand2      = null;
  state.expression    = resultStr;
  state.justEvaled    = !silent;
  state.justOpPressed = false;

  if (!silent) updateDisplay(resultStr, '');
}

/** Find the index of the last operator in the expression (not counting leading -) */
function findLastOperatorIndex(expr) {
  const ops = ['÷', '×', '−', '+'];
  for (let i = expr.length - 1; i >= 0; i--) {
    if (ops.includes(expr[i])) {
      // Make sure it's not a leading negative sign
      if (expr[i] === '−' && i === 0) continue;
      // Make sure it's not a sign after another operator
      if (expr[i] === '−' && ops.includes(expr[i - 1])) continue;
      return i;
    }
  }
  return -1;
}

function handleClear() {
  resetState();
  updateDisplay('0');
  animateDisplay('pulse');
}

function handleSign() {
  if (!state.expression || state.expression === '0') return;

  // Find the last number in the expression and negate it
  const opIndex = findLastOperatorIndex(state.expression);
  if (opIndex === -1) {
    // Single number — negate the whole thing
    const num = parseFloat(state.expression);
    if (isNaN(num)) return;
    state.expression = formatNum(-num);
  } else {
    const before = state.expression.slice(0, opIndex + 1);
    const after  = state.expression.slice(opIndex + 1);
    const num    = parseFloat(after);
    if (isNaN(num)) return;
    state.expression = before + formatNum(-num);
  }
  updateDisplay(state.expression);
}

function handlePercent() {
  if (!state.expression) return;
  const opIndex = findLastOperatorIndex(state.expression);
  if (opIndex === -1) {
    const num = parseFloat(state.expression);
    if (isNaN(num)) return;
    state.expression = formatNum(num / 100);
  } else {
    const before = state.expression.slice(0, opIndex + 1);
    const after  = state.expression.slice(opIndex + 1);
    const num    = parseFloat(after);
    if (isNaN(num)) return;
    state.expression = before + formatNum(num / 100);
  }
  updateDisplay(state.expression);
}

/* ─── Button Click Handler ───────────────────────────────────── */

function flashButton(btn) {
  btn.classList.add('flash');
  btn.addEventListener('animationend', () => btn.classList.remove('flash'), { once: true });
}

grid.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn');
  if (!btn) return;
  flashButton(btn);
  dispatch(btn.dataset.action, btn.dataset.value);
});

function dispatch(action, value) {
  switch (action) {
    case 'number':   handleNumber(value);   break;
    case 'operator': handleOperator(value); break;
    case 'equals':   handleEquals();        break;
    case 'clear':    handleClear();         break;
    case 'sign':     handleSign();          break;
    case 'percent':  handlePercent();       break;
    case 'decimal':  handleDecimal();       break;
  }
}

/* ─── Keyboard Support ───────────────────────────────────────── */

const KEY_MAP = {
  '0': { action: 'number',   value: '0' },
  '1': { action: 'number',   value: '1' },
  '2': { action: 'number',   value: '2' },
  '3': { action: 'number',   value: '3' },
  '4': { action: 'number',   value: '4' },
  '5': { action: 'number',   value: '5' },
  '6': { action: 'number',   value: '6' },
  '7': { action: 'number',   value: '7' },
  '8': { action: 'number',   value: '8' },
  '9': { action: 'number',   value: '9' },
  '+': { action: 'operator', value: '+' },
  '-': { action: 'operator', value: '−' },
  '*': { action: 'operator', value: '×' },
  '/': { action: 'operator', value: '÷' },
  'Enter':       { action: 'equals',  value: null },
  '=':           { action: 'equals',  value: null },
  'Escape':      { action: 'clear',   value: null },
  'Backspace':   { action: 'backspace', value: null },
  '.':           { action: 'decimal', value: null },
  ',':           { action: 'decimal', value: null },
  '%':           { action: 'percent', value: null },
};

function handleBackspace() {
  if (state.justEvaled) {
    handleClear();
    return;
  }
  if (!state.expression || state.expression.length === 0) return;
  const last = state.expression.slice(-1);
  state.expression = state.expression.slice(0, -1);
  // If we deleted an operator, clear state.operator
  if (['÷', '×', '−', '+'].includes(last)) {
    state.operator      = null;
    state.justOpPressed = false;
    clearOperatorHighlight();
  }
  if (state.expression === '') {
    updateDisplay('0');
  } else {
    const preview = state.operator ? evalExpression(state.expression) : null;
    updateDisplay(state.expression, preview);
  }
}

document.addEventListener('keydown', (e) => {
  // Don't interfere if focus is on an input element
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  const mapping = KEY_MAP[e.key];
  if (!mapping) return;

  e.preventDefault();

  if (mapping.action === 'backspace') {
    handleBackspace();
    // Flash the AC button as visual feedback
    const acBtn = document.getElementById('btn-ac');
    if (acBtn) flashButton(acBtn);
    return;
  }

  dispatch(mapping.action, mapping.value);

  // Flash the corresponding DOM button
  const btnId = getBtnIdForKey(e.key);
  if (btnId) {
    const domBtn = document.getElementById(btnId);
    if (domBtn) flashButton(domBtn);
  }
});

function getBtnIdForKey(key) {
  const map = {
    '0': 'btn-0', '1': 'btn-1', '2': 'btn-2', '3': 'btn-3',
    '4': 'btn-4', '5': 'btn-5', '6': 'btn-6', '7': 'btn-7',
    '8': 'btn-8', '9': 'btn-9',
    '+': 'btn-plus', '-': 'btn-minus', '*': 'btn-multiply', '/': 'btn-divide',
    'Enter': 'btn-equal', '=': 'btn-equal',
    'Escape': 'btn-ac', 'Backspace': 'btn-ac',
    '.': 'btn-dot', ',': 'btn-dot',
    '%': 'btn-percent',
  };
  return map[key] || null;
}

/* ─── Initialise ─────────────────────────────────────────────── */
updateDisplay('0');
