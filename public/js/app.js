const colorMap = {
  red: { bg: 'red', theme: '#b91c1c', label: 'red' },
  green: { bg: 'green', theme: '#15803d', label: 'green' },
  white: { bg: 'white', theme: '#ffffff', label: 'white' },
};

const getColorConfig = (color) => colorMap[color] ?? colorMap.white;

const setColor = ({ color, doc, buttons, themeMeta }) => {
  const config = getColorConfig(color);
  doc.body.style.backgroundColor = config.bg;
  doc.body.classList.toggle('color-mode', color !== 'white');

  buttons.forEach((button) => {
    const isActive = button.dataset.color === color;
    button.setAttribute('aria-pressed', String(isActive));
  });

  if (themeMeta) {
    themeMeta.setAttribute('content', config.theme);
  }
};

const initializeColorButtons = (doc = document) => {
  const buttons = doc.querySelectorAll('button[data-color]');
  const themeMeta = doc.querySelector('meta[name="theme-color"]');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      setColor({
        color: button.dataset.color,
        doc,
        buttons,
        themeMeta,
      });
    });
  });

  setColor({
    color: 'white',
    doc,
    buttons,
    themeMeta,
  });
};

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  initializeColorButtons(document);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    colorMap,
    getColorConfig,
    setColor,
    initializeColorButtons,
  };
}
