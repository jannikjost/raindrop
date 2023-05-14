const axios = require("axios");
const token = require("./../token.json");

async function addItem(text) {
  try {
    const response = await axios.post(
      "https://api.notion.com/v1/pages",
      {
        parent: { database_id: token.notionDatabaseId },
        icon: {
          emoji: "🥬",
        },
        cover: {
          external: {
            url: "https://upload.wikimedia.org/wikipedia/commons/6/62/Tuscankale.jpg",
          },
        },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: "Tuscan Kale",
                },
              },
            ],
          },
        },
        children: [
          {
            object: "block",
            type: "heading_2",
            heading_2: {
              rich_text: [{ type: "text", text: { content: "Lacinato kale" } }],
            },
          },
          {
            object: "block",
            type: "paragraph",
            paragraph: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content:
                      "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
                    link: {
                      url: "https://en.wikipedia.org/wiki/Lacinato_kale",
                    },
                  },
                },
              ],
            },
          },
        ],
      },
      {
        headers: {
          Authorization: "Bearer " + token.notionToken,
          "Content-Type": " application/json",
          "Notion-Version": "2022-06-28",
        },
      }
    );
    if (response && response.data) {
      console.log("Success! Entry added.");
    }
  } catch (error) {
    console.error(error);
  }
}

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
  addItem();

  // const syncedRaindrops = new Set([]);
  // console.log(`syncing ${highlights.size} highlights with notion ...`);
  // for (const raindrop of highlights.values()) {
  //   for (const highlight of raindrop) {
  //     syncedRaindrops.add(highlight.raindropRef);
  //   }
  // }
  // console.log(`syncing highlights with notion finished`);
  // return syncedRaindrops;
};

module.exports = { formatHighlights, syncHighlights };
