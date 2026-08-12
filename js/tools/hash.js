import { copyText, setMessage } from '../utils.js';

async function sha256Hex(input) {
  const bytes = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function initHashTool(container) {
  const input = container.querySelector('#hash-input');
  const output = container.querySelector('#hash-output');
  const generateBtn = container.querySelector('#hash-generate');
  const copyBtn = container.querySelector('#copy-hash');

  generateBtn.addEventListener('click', async () => {
    try {
      output.value = await sha256Hex(input.value);
      setMessage(container, 'SHA-256 generated.', 'success');
    } catch (error) {
      setMessage(container, `Hashing failed: ${error.message}`, 'error');
    }
  });

  copyBtn.addEventListener('click', async () => {
    try {
      await copyText(output.value);
      setMessage(container, 'Hash copied.', 'success');
    } catch (error) {
      setMessage(container, error.message, 'error');
    }
  });
}
