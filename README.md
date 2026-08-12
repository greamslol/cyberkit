# CyberKit

CyberKit is a browser-based cybersecurity utility toolkit built with vanilla HTML, CSS, and JavaScript.

It provides practical defensive and educational utilities while keeping sensitive user input local to the browser whenever possible.

## Features

- Password strength checker
- Secure password generator
- SHA-256 hash generator
- Base64 encoder/decoder
- URL encoder/decoder
- JWT decoder
- Hex/ASCII converter
- Binary/decimal converter
- Unix timestamp converter
- Regex tester

## Privacy and security

- No backend, database, or external APIs are used.
- User-provided data (passwords, tokens, text) is processed in-browser.
- JWT decoding is local only and **does not verify signatures**.

## Accessibility

- Semantic structure (`header`, `nav`, `main`, `section`, `footer`)
- Labeled form controls for all inputs
- Keyboard-focus styles for interactive controls
- Per-tool status messages with `aria-live="polite"`

## Responsive design

- Mobile-friendly layout using responsive CSS grid
- Horizontal scrolling for tool navigation chips on smaller viewports
- Flexible action-button layout for narrow screens

## Project structure

```text
cyberkit/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── utils.js
│   └── tools/
│       ├── base64.js
│       ├── binaryDecimal.js
│       ├── hash.js
│       ├── hexAscii.js
│       ├── jwt.js
│       ├── password.js
│       ├── regex.js
│       ├── timestamp.js
│       └── url.js
└── README.md
```

## Run locally

Because this project uses ES modules, run it from a local web server:

```bash
cd /home/runner/work/cyberkit/cyberkit
python3 -m http.server 8080
```

Then open: `http://localhost:8080`

## Disclaimer

CyberKit is intended for **defensive security** and **educational use only**.
