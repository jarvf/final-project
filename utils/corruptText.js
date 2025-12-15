function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function scrambleWord(word) {
  if (!word || word.length <= 3) return word;
  const chars = word.split("");
  for (let i = 1; i < chars.length - 1; i++) {
    if (Math.random() < 0.5) chars[i] = "█";
  }
  return chars.join("");
}

function corruptText(text, signalStrength = "unstable") {
  if (!text) return "";

  const words = String(text).split(/\s+/);

  let removeChance = 0.2;
  let scrambleChance = 0.15;

  if (signalStrength === "strong") {
    removeChance = 0.06;
    scrambleChance = 0.06;
  } else if (signalStrength === "broken") {
    removeChance = 0.35;
    scrambleChance = 0.3;
  }

  removeChance = clamp(removeChance + (Math.random() * 0.06 - 0.03), 0, 0.7);
  scrambleChance = clamp(scrambleChance + (Math.random() * 0.06 - 0.03), 0, 0.7);

  return words
    .map((w) => {
      const r = Math.random();
      if (r < removeChance) return "[MISSING]";
      if (r < removeChance + scrambleChance) return scrambleWord(w);
      return w;
    })
    .join(" ");
}

module.exports = { corruptText };
