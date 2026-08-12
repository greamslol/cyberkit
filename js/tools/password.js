import { copyText, setMessage } from '../utils.js';

const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()-_=+[]{};:,.<>/?';

function scorePassword(password) {
  let score = 0;
  if (!password) return score;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password) && /[^A-Za-z0-9]/.test(password)) score++;

  return Math.min(score, 4);
}

function scoreLabel(score) {
  return ['Too weak', 'Weak', 'Fair', 'Strong', 'Very strong'][score] || 'Too weak';
}

function randomChar(source) {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return source[arr[0] % source.length];
}

export function initPasswordTool(container) {
  const passwordInput = container.querySelector('#password-input');
  const meter = container.querySelector('#password-meter');
  const strengthText = container.querySelector('#password-strength-text');

  const lengthInput = container.querySelector('#password-length');
  const lower = container.querySelector('#gen-lower');
  const upper = container.querySelector('#gen-upper');
  const number = container.querySelector('#gen-number');
  const symbol = container.querySelector('#gen-symbol');
  const generateBtn = container.querySelector('#generate-password');
  const copyBtn = container.querySelector('#copy-generated-password');
  const output = container.querySelector('#generated-password');

  passwordInput.addEventListener('input', () => {
    const score = scorePassword(passwordInput.value);
    meter.value = score;
    strengthText.textContent = `Strength: ${scoreLabel(score)}`;
  });

  generateBtn.addEventListener('click', () => {
    const length = Number.parseInt(lengthInput.value, 10);
    if (Number.isNaN(length) || length < 8 || length > 128) {
      setMessage(container, 'Password length must be between 8 and 128.', 'error');
      return;
    }

    let charset = '';
    if (lower.checked) charset += LOWER;
    if (upper.checked) charset += UPPER;
    if (number.checked) charset += NUMBERS;
    if (symbol.checked) charset += SYMBOLS;

    if (!charset) {
      setMessage(container, 'Select at least one character set.', 'error');
      return;
    }

    let generated = '';
    for (let i = 0; i < length; i++) {
      generated += randomChar(charset);
    }

    output.value = generated;
    setMessage(container, 'Password generated locally.', 'success');
  });

  copyBtn.addEventListener('click', async () => {
    try {
      await copyText(output.value);
      setMessage(container, 'Generated password copied.', 'success');
    } catch (error) {
      setMessage(container, error.message, 'error');
    }
  });
}
