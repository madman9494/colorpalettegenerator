// const natural = require('natural');
// const readFileSync = require('fs').readFileSync; // For file reading

const colorPale = require('color-pale-generatorly');
const textMoji = require('textmoji');
const randPass = require('randomly-password-generator');
const colorGen = require('color_generator_complex');

function summarizeText(text, options = {}) {
  const { length = 3, method = 'sentences' } = options;

  // Preprocess text (remove punctuation, lowercase, etc.)
  const preprocessedText = natural.text.normalizeWhitespace(text).toLowerCase();

  // Extract sentences or keywords based on the chosen method
  let keyElements;
  if (method === 'sentences') {
    keyElements = natural.sentencer.summarize(preprocessedText, length);
  } else if (method === 'key-phrases') {
    keyElements = natural.tfidf.keywords(preprocessedText, { topk: length });
  } else {
    throw new Error('Invalid method: Use "sentences" or "key-phrases"');
  }

  // Construct the summary based on chosen elements
  const summary = keyElements.join(' ');

  return summary;
}

function summarizeFromFile(filePath, options = {}) {
  const { ratio = 0.2 } = options;

  const fileContent = readFileSync(filePath, 'utf8');
  const summaryLength = Math.floor(fileContent.length * ratio);
  const summary = summarizeText(fileContent, { length: summaryLength });

  return summary;
}

module.exports = {
  summarizeText,
  summarizeFromFile,
};
