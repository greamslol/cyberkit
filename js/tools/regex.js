import { setMessage } from '../utils.js';

export function initRegexTool(container) {
  const pattern = container.querySelector('#regex-pattern');
  const flags = container.querySelector('#regex-flags');
  const input = container.querySelector('#regex-input');
  const output = container.querySelector('#regex-output');

  container.querySelector('#regex-run').addEventListener('click', () => {
    try {
      const regex = new RegExp(pattern.value, flags.value.trim());
      const matches = [...input.value.matchAll(regex)];

      if (!matches.length) {
        output.value = 'No matches found.';
      } else {
        output.value = matches
          .map((match, index) => `${index + 1}. "${match[0]}" @ index ${match.index}`)
          .join('\n');
      }

      setMessage(container, `Regex test complete. Matches: ${matches.length}.`, 'success');
    } catch (error) {
      output.value = '';
      setMessage(container, `Regex error: ${error.message}`, 'error');
    }
  });
}
