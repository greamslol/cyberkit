import { copyText, fromHex, setMessage, toHex } from '../utils.js';

export function initHexAsciiTool(container) {
  const input = container.querySelector('#hex-ascii-input');
  const output = container.querySelector('#hex-ascii-output');

  container.querySelector('#ascii-to-hex').addEventListener('click', () => {
    output.value = toHex(input.value);
    setMessage(container, 'Converted ASCII to hex.', 'success');
  });

  container.querySelector('#hex-to-ascii').addEventListener('click', () => {
    try {
      output.value = fromHex(input.value);
      setMessage(container, 'Converted hex to ASCII.', 'success');
    } catch (error) {
      setMessage(container, error.message, 'error');
    }
  });

  container.querySelector('#copy-hex-ascii-output').addEventListener('click', async () => {
    try {
      await copyText(output.value);
      setMessage(container, 'Output copied.', 'success');
    } catch (error) {
      setMessage(container, error.message, 'error');
    }
  });
}
