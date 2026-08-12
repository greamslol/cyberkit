import { copyText, setMessage } from '../utils.js';

export function initBinaryDecimalTool(container) {
  const input = container.querySelector('#binary-decimal-input');
  const output = container.querySelector('#binary-decimal-output');

  container.querySelector('#binary-to-decimal').addEventListener('click', () => {
    const value = input.value.trim();
    if (!/^[01]+$/.test(value)) {
      setMessage(container, 'Provide a valid binary number (0/1).', 'error');
      return;
    }

    output.value = String(parseInt(value, 2));
    setMessage(container, 'Converted binary to decimal.', 'success');
  });

  container.querySelector('#decimal-to-binary').addEventListener('click', () => {
    const value = input.value.trim();
    if (!/^-?\d+$/.test(value)) {
      setMessage(container, 'Provide a valid decimal integer.', 'error');
      return;
    }

    output.value = (Number.parseInt(value, 10) >>> 0).toString(2);
    setMessage(container, 'Converted decimal to binary.', 'success');
  });

  container.querySelector('#copy-binary-decimal-output').addEventListener('click', async () => {
    try {
      await copyText(output.value);
      setMessage(container, 'Output copied.', 'success');
    } catch (error) {
      setMessage(container, error.message, 'error');
    }
  });
}
