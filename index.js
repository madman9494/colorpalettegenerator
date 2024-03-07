const textSummer = require('text-summarizerly');
const textMoji = require('textmoji');
const randPass = require('randomly-password-generator');
const colorGen = require('color_generator_complex');

function colorPaletteGenerator(options = {}) {
  const { seed = '#000000', count = 5, bias = 'neutral' } = options;

  // Validate input count
  if (count <= 0) {
    throw new Error('Number of colors in the palette must be a positive integer.');
  }

  // Convert seed color to Chroma object
  const seedColor = chroma(seed);

  // Generate base color based on seed and bias
  let baseColor;
  if (bias === 'warm') {
    baseColor = seedColor.saturate(1.5).brighten(1);
  } else if (bias === 'cool') {
    baseColor = seedColor.desaturate(1.5).darken(1);
  } else {
    baseColor = seedColor;
  }

  // Generate color palette using Chroma's analogous and tetrad scales
  const palette = [];
  palette.push(baseColor.hex());
  palette.push(chroma.analogous(baseColor, 2)[0].hex());
  palette.push(chroma.analogous(baseColor, -2)[0].hex());
  palette.push(chroma.tetrad(baseColor)[1].hex());
  palette.push(chroma.tetrad(baseColor)[3].hex());

  // Adjust palette size based on user-specified count
  return palette.slice(0, count);
}

module.exports = colorPaletteGenerator;
