export function updateUI(indicatorElement, freq, targetFreq) {
  const centsOff = 1200 * Math.log2(freq / targetFreq);
  const maxCents = 50;
  const position = Math.max(-1, Math.min(1, centsOff / maxCents));
  const percent = 50 + position * 50;
  indicatorElement.style.left = `calc(${percent}% - 1px)`;
}
