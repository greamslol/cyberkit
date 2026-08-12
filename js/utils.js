export function setMessage(container, message, type = '') {
  const msg = container.querySelector('.tool-message');
  if (!msg) return;
  msg.textContent = message;
  msg.className = 'tool-message';
  if (type) msg.classList.add(type);
}

export async function copyText(text) {
  if (!text) throw new Error('Nothing to copy.');

  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const temp = document.createElement('textarea');
  temp.value = text;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand('copy');
  temp.remove();
}

export function toHex(text) {
  return Array.from(text)
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
    .join(' ')
    .toUpperCase();
}

export function fromHex(hex) {
  const compact = hex.replace(/\s+/g, '');
  if (!compact || compact.length % 2 !== 0 || /[^0-9a-f]/i.test(compact)) {
    throw new Error('Provide valid hex bytes.');
  }

  let output = '';
  for (let i = 0; i < compact.length; i += 2) {
    output += String.fromCharCode(parseInt(compact.slice(i, i + 2), 16));
  }
  return output;
}
