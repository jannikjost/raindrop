const axios = require("axios");
const token = require("./../token.json");
const urls = require("./urls.js");

const syncCollectionTitle = "ToSync";
const archiveCollectionTitle = "Archive";
let archiveCollectionId;

const getSyncCollectionId = async () => {
  try {
    console.log(
      `getting sync collection id for collection '${syncCollectionTitle}' ...`
    );
    const res = await axios.get(urls.raindrop.collections, {
      headers: {
        Authorization: "Bearer " + token.token,
      },
    });
    if (res.data && res.data.result) {
      return res.data.items.filter((collection) => {
        if (collection.title === syncCollectionTitle) {
          console.log(`found sync collection id '${collection._id}'`);
          return collection;
        }
        if (collection.title === archiveCollectionTitle) {
          archiveCollectionId = collection._id;
        }
      })[0];
    }
  } catch (err) {
    console.error(err.message);
  }
};

const getHighlights = async (id) => {
  try {
    console.log("getting highlights ...");
    const res = await axios.get(urls.raindrop.highlights + "/" + id, {
      headers: {
        Authorization: "Bearer " + token.token,
      },
    });
    if (res.data && res.data.result) {
      console.log("received highlights");
      return res.data.items;
    }
  } catch (err) {
    console.error(err.message);
  }
};

const moveSyncedHighlightsToArchive = async (raindropIds) => {
  console.log(
    `moving ${raindropIds.size} raindrops to ${archiveCollectionTitle} ...`
  );
  for (const raindropId of raindropIds.values()) {
    await moveToArchive(raindropId, archiveCollectionId);
  }
  console.log(`moving raindrops finished`);
};

const moveToArchive = async (id, newCollectionId) => {
  try {
    axios.put(
      urls.raindrop.raindrops + "/" + id,
      {
        collection: {
          $id: newCollectionId,
          oid: newCollectionId,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token.token,
        },
      }
    );
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  getSyncCollectionId,
  getHighlights,
  moveSyncedHighlightsToArchive,
};
