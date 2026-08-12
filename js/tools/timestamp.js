import { copyText, setMessage } from '../utils.js';

function toLocalDatetimeInput(date) {
  const pad = (num) => String(num).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function initTimestampTool(container) {
  const unixInput = container.querySelector('#timestamp-unix');
  const dateInput = container.querySelector('#timestamp-date');
  const output = container.querySelector('#timestamp-output');

  container.querySelector('#unix-to-date').addEventListener('click', () => {
    const unix = Number(unixInput.value.trim());
    if (!Number.isFinite(unix)) {
      setMessage(container, 'Provide a valid unix timestamp.', 'error');
      return;
    }

    const date = new Date(unix * 1000);
    if (Number.isNaN(date.getTime())) {
      setMessage(container, 'Invalid timestamp value.', 'error');
      return;
    }

    dateInput.value = toLocalDatetimeInput(date);
    output.textContent = `${date.toISOString()} (UTC)`;
    setMessage(container, 'Converted unix timestamp to date.', 'success');
  });

  container.querySelector('#date-to-unix').addEventListener('click', () => {
    if (!dateInput.value) {
      setMessage(container, 'Select a date and time first.', 'error');
      return;
    }

    const date = new Date(dateInput.value);
    const unix = Math.floor(date.getTime() / 1000);
    unixInput.value = String(unix);
    output.textContent = `${date.toISOString()} (UTC)`;
    setMessage(container, 'Converted date to unix timestamp.', 'success');
  });

  container.querySelector('#timestamp-now').addEventListener('click', () => {
    const now = new Date();
    unixInput.value = String(Math.floor(now.getTime() / 1000));
    dateInput.value = toLocalDatetimeInput(now);
    output.textContent = `${now.toISOString()} (UTC)`;
    setMessage(container, 'Loaded current timestamp.', 'success');
  });

  container.querySelector('#copy-timestamp-output').addEventListener('click', async () => {
    try {
      await copyText(unixInput.value);
      setMessage(container, 'Unix timestamp copied.', 'success');
    } catch (error) {
      setMessage(container, error.message, 'error');
    }
  });
}
