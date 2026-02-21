const test = require('node:test');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');

const {
  getColorConfig,
  setColor,
  initializeColorButtons,
} = require('../public/js/app');

const createDom = () => {
  const dom = new JSDOM(`<!doctype html>
    <html>
      <head>
        <meta name="theme-color" content="#ffffff">
      </head>
      <body>
        <button data-color="red" aria-pressed="false">red</button>
        <button data-color="green" aria-pressed="false">green</button>
        <button data-color="white" aria-pressed="false">reset</button>
      </body>
    </html>`);

  const doc = dom.window.document;
  return {
    doc,
    buttons: doc.querySelectorAll('button[data-color]'),
    themeMeta: doc.querySelector('meta[name="theme-color"]'),
  };
};

test('getColorConfig returns white config for unknown colors', () => {
  const config = getColorConfig('blue');
  assert.equal(config.bg, 'white');
  assert.equal(config.theme, '#ffffff');
});

test('setColor applies red mode and updates pressed state + theme', () => {
  const { doc, buttons, themeMeta } = createDom();

  setColor({
    color: 'red',
    doc,
    buttons,
    themeMeta,
  });

  assert.equal(doc.body.style.backgroundColor, 'red');
  assert.equal(doc.body.classList.contains('color-mode'), true);
  assert.equal(themeMeta.getAttribute('content'), '#b91c1c');

  const redButton = doc.querySelector('button[data-color="red"]');
  const greenButton = doc.querySelector('button[data-color="green"]');

  assert.equal(redButton.getAttribute('aria-pressed'), 'true');
  assert.equal(greenButton.getAttribute('aria-pressed'), 'false');
});

test('initializeColorButtons sets default white state', () => {
  const { doc, themeMeta } = createDom();

  initializeColorButtons(doc);

  assert.equal(doc.body.style.backgroundColor, 'white');
  assert.equal(doc.body.classList.contains('color-mode'), false);
  assert.equal(themeMeta.getAttribute('content'), '#ffffff');

  const whiteButton = doc.querySelector('button[data-color="white"]');
  assert.equal(whiteButton.getAttribute('aria-pressed'), 'true');
});

test('initializeColorButtons click handler applies green state', () => {
  const { doc, themeMeta } = createDom();
  initializeColorButtons(doc);

  const greenButton = doc.querySelector('button[data-color="green"]');
  greenButton.click();

  assert.equal(doc.body.style.backgroundColor, 'green');
  assert.equal(doc.body.classList.contains('color-mode'), true);
  assert.equal(themeMeta.getAttribute('content'), '#15803d');
  assert.equal(greenButton.getAttribute('aria-pressed'), 'true');
});
