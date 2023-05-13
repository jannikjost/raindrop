const raindrop = require("./raindrop");

raindrop
  .getSyncCollectionId()
  .then(async (collection) => {
    const highlights = await raindrop.getHighlights(collection._id);
  })
  .catch((err) => {
    console.error(err);
  });
