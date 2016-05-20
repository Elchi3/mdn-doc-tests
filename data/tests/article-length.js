const LONG_ARTICLE_WORD_COUNT_THRESHOLD = 1000;
const WORDS_PER_MINUTE = 275;

docTests.articleLength = {
  name: "article_length",
  desc: "article_length_desc",
  check: function checkArticleLength(rootElement) {
    let text = rootElement.textContent;
    let wordCount = text.match(/\w+/g).length;
    let readTimeEstimation = Math.round(wordCount / WORDS_PER_MINUTE);
    if (readTimeEstimation === 0) {
      readTimeEstimation = "< 1";
    }
    let matches = [{
      msg: "article_length_info",
      msgParams: [String(wordCount), String(readTimeEstimation)],
      type: INFO
    }];
    if (wordCount > LONG_ARTICLE_WORD_COUNT_THRESHOLD) {
      matches.push({
        msg: "long_article",
        type: WARNING
      });
    }
    return matches;
  }
};