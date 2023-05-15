const raindrop = require("./raindrop");
const notion = require("./notion");

runRaindrop2notion();

// run every 24 hours
setInterval(runRaindrop2notion, 1000 * 60 * 60 * 24);

function runRaindrop2notion() {
  raindrop
    .getSyncCollectionId()
    .then(async (collection) => {
      const highlights = await raindrop.getHighlights(collection._id);
      const formattedHighlights = notion.formatHighlights(highlights);
      const syncedRaindrops = await notion.syncHighlights(formattedHighlights);
      await raindrop.moveSyncedHighlightsToArchive(syncedRaindrops);
    })
    .catch((err) => {
      console.error(err);
    });
}
