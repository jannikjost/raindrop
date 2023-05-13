const formatHighlights = (highlights) => {
  console.log(`Formatting ${highlights.length} highlights`);
  let formattedHighlights = new Map();

  highlights.forEach((highlight) => {
    if (!formattedHighlights.has(highlight.raindropRef)) {
      formattedHighlights.set(highlight.raindropRef, []);
    }
    formattedHighlights
      .get(highlight.raindropRef)
      .push(formatHighlightContent(highlight));
  });
  console.log(`Formatting highlights finished`);
  return formatHighlights;
};

const formatHighlightContent = (highlight) => {
  return highlight;
};

const syncHighlights = async (highlights) => {
  console.log(`syncing ${highlights.length} highlights with notion ...`);
  for (const highlight of highlights) {
  }
  console.log(`syncing highlights with notion finished`);
};

module.exports = { formatHighlights, syncHighlights };
