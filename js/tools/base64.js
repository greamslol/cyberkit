import { copyText, setMessage } from '../utils.js';

function encodeUtf8(value) {
  return btoa(unescape(encodeURIComponent(value)));
}

function decodeUtf8(value) {
  return decodeURIComponent(escape(atob(value)));
}

export function initBase64Tool(container) {
  const input = container.querySelector('#base64-input');
  const output = container.querySelector('#base64-output');

  container.querySelector('#base64-encode').addEventListener('click', () => {
    try {
      output.value = encodeUtf8(input.value);
      setMessage(container, 'Encoded to Base64.', 'success');
    } catch (error) {
      setMessage(container, `Encoding error: ${error.message}`, 'error');
    }
  });

  container.querySelector('#base64-decode').addEventListener('click', () => {
    try {
      output.value = decodeUtf8(input.value.trim());
      setMessage(container, 'Decoded from Base64.', 'success');
    } catch (error) {
      setMessage(container, `Decoding error: ${error.message}`, 'error');
    }
  });

  container.querySelector('#copy-base64-output').addEventListener('click', async () => {
    try {
      await copyText(output.value);
      setMessage(container, 'Output copied.', 'success');
    } catch (error) {
      setMessage(container, error.message, 'error');
    }
  });
}
