// Utilities for all tests

const ERROR = 1;
const WARNING = 2;

var docTests = {};

function mapMatches(matches, type) {
  return matches.map(match => {
    return {msg: match, type: type};
  });
}