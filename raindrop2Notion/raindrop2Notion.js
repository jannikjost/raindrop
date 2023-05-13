const raindrop = require("./raindrop");
const notion = require("./notion");

raindrop
  .getSyncCollectionId()
  .then(async (collection) => {
    const highlights = await raindrop.getHighlights(collection._id);
    const formattedHighlights = notion.formatHighlights(highlights);
    // const syncedHighlights = await notion.syncHighlights(formattedHighlights);
    // await raindrop.moveSyncedHighlightsToArchive(syncedHighlights);
  })
  .catch((err) => {
    console.error(err);
  });
