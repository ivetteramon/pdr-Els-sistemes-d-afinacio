export function updateIndicator(tuningIndicator, centsOff, maxCents = 50) {
  const position = Math.max(-1, Math.min(1, centsOff / maxCents));

  const percent = 50 + position * 50;

  tuningIndicator.style.left = `calc(${percent}% - 1px)`;
}
