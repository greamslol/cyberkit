import { copyText, setMessage } from '../utils.js';

function decodeBase64Url(value) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function formatJson(input) {
  return JSON.stringify(JSON.parse(input), null, 2);
}

export function initJwtTool(container) {
  const input = container.querySelector('#jwt-input');
  const headerEl = container.querySelector('#jwt-header');
  const payloadEl = container.querySelector('#jwt-payload');
  const signatureEl = container.querySelector('#jwt-signature');

  container.querySelector('#jwt-decode').addEventListener('click', () => {
    try {
      const parts = input.value.trim().split('.');
      if (parts.length !== 3) {
        throw new Error('JWT must have 3 dot-separated segments.');
      }

      const headerRaw = decodeBase64Url(parts[0]);
      const payloadRaw = decodeBase64Url(parts[1]);

      headerEl.value = formatJson(headerRaw);
      payloadEl.value = formatJson(payloadRaw);
      signatureEl.value = parts[2];
      setMessage(container, 'JWT decoded locally (signature not verified).', 'success');
    } catch (error) {
      headerEl.value = '';
      payloadEl.value = '';
      signatureEl.value = '';
      setMessage(container, `JWT decode failed: ${error.message}`, 'error');
    }
  });

  container.querySelector('#copy-jwt-payload').addEventListener('click', async () => {
    try {
      await copyText(payloadEl.value);
      setMessage(container, 'Payload copied.', 'success');
    } catch (error) {
      setMessage(container, error.message, 'error');
    }
  });
}
