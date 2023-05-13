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
  return formattedHighlights;
};

const formatHighlightContent = (highlight) => {
  return highlight;
};

const syncHighlights = async (highlights) => {
  const syncedRaindrops = new Set([]);
  console.log(`syncing ${highlights.size} highlights with notion ...`);
  for (const raindrop of highlights.values()) {
    for (const highlight of raindrop) {
      syncedRaindrops.add(highlight.raindropRef);
    }
  }
  console.log(`syncing highlights with notion finished`);
  return syncedRaindrops;
};

module.exports = { formatHighlights, syncHighlights };
