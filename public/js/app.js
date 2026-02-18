const buttons = document.querySelectorAll('button[data-color]');
const themeMeta = document.querySelector('meta[name="theme-color"]');

const colorMap = {
  red: { bg: 'red', theme: '#b91c1c', label: 'red' },
  green: { bg: 'green', theme: '#15803d', label: 'green' },
  white: { bg: 'white', theme: '#ffffff', label: 'white' },
};

const setColor = (color) => {
  const config = colorMap[color] ?? colorMap.white;
  document.body.style.backgroundColor = config.bg;
  document.body.classList.toggle('color-mode', color !== 'white');

  buttons.forEach((button) => {
    const isActive = button.dataset.color === color;
    button.setAttribute('aria-pressed', String(isActive));
  });

  if (themeMeta) {
    themeMeta.setAttribute('content', config.theme);
  }
};

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    setColor(button.dataset.color);
  });
});

setColor('white');
