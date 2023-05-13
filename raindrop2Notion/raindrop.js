const axios = require("axios");
const token = require("./../token.json");
const urls = require("./urls.js");

const syncCollectionTitle = "ToSync";

const getSyncCollectionId = async () => {
  try {
    console.log(
      `getting sync collection id for collection ${syncCollectionTitle} ...`
    );
    const res = await axios.get(urls.raindrop.collections, {
      headers: {
        Authorization: "Bearer " + token.token,
      },
    });
    if (res.data && res.data.result) {
      return res.data.items.find((collection) => {
        if (collection.title === syncCollectionTitle) {
          console.log(`found sync collection id '${collection._id}'`);
          return collection;
        }
      });
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

const moveToArchive = async () => {};

module.exports = { getSyncCollectionId, getHighlights, moveToArchive };
