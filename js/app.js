import { initBase64Tool } from './tools/base64.js';
import { initBinaryDecimalTool } from './tools/binaryDecimal.js';
import { initHashTool } from './tools/hash.js';
import { initHexAsciiTool } from './tools/hexAscii.js';
import { initJwtTool } from './tools/jwt.js';
import { initPasswordTool } from './tools/password.js';
import { initRegexTool } from './tools/regex.js';
import { initTimestampTool } from './tools/timestamp.js';
import { initUrlTool } from './tools/url.js';

function setupSearch() {
  const search = document.querySelector('#tool-search');
  const cards = [...document.querySelectorAll('.tool-card')];

  search.addEventListener('input', () => {
    const value = search.value.trim().toLowerCase();
    cards.forEach((card) => {
      const text = card.dataset.toolName || card.textContent.toLowerCase();
      card.style.display = text.includes(value) ? '' : 'none';
    });
  });
}

function setupNavigation() {
  const nav = document.querySelector('#tool-nav');
  const cards = [...document.querySelectorAll('.tool-card')];

  cards.forEach((card) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = card.querySelector('h2')?.textContent ?? card.id;
    button.addEventListener('click', () => {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    nav.append(button);
  });
}

function init() {
  setupSearch();
  setupNavigation();

  initPasswordTool(document.querySelector('#password-tool'));
  initHashTool(document.querySelector('#hash-tool'));
  initBase64Tool(document.querySelector('#base64-tool'));
  initUrlTool(document.querySelector('#url-tool'));
  initJwtTool(document.querySelector('#jwt-tool'));
  initHexAsciiTool(document.querySelector('#hex-ascii-tool'));
  initBinaryDecimalTool(document.querySelector('#binary-decimal-tool'));
  initTimestampTool(document.querySelector('#timestamp-tool'));
  initRegexTool(document.querySelector('#regex-tool'));
}

init();
