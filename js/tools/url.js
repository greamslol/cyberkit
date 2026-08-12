import { copyText, setMessage } from '../utils.js';

export function initUrlTool(container) {
  const input = container.querySelector('#url-input');
  const output = container.querySelector('#url-output');

  container.querySelector('#url-encode').addEventListener('click', () => {
    output.value = encodeURIComponent(input.value);
    setMessage(container, 'URL encoded.', 'success');
  });

  container.querySelector('#url-decode').addEventListener('click', () => {
    try {
      output.value = decodeURIComponent(input.value);
      setMessage(container, 'URL decoded.', 'success');
    } catch (error) {
      setMessage(container, 'Invalid encoded URL input.', 'error');
    }
  });

  container.querySelector('#copy-url-output').addEventListener('click', async () => {
    try {
      await copyText(output.value);
      setMessage(container, 'Output copied.', 'success');
    } catch (error) {
      setMessage(container, error.message, 'error');
    }
  });
}
