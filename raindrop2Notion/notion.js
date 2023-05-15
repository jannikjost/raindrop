const axios = require("axios");
const token = require("../token.json");

function getHighlightBlueprint(title, link) {
  return {
    icon: {
      emoji: "📰",
    },
    cover: {
      external: {
        url: "https://i.pinimg.com/564x/b5/1a/3f/b51a3f209222bdf01062f4da0d7da66f.jpg",
      },
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
      Link: {
        url: link,
      },
      Status: {
        status: {
          name: "Erledigt",
        },
      },
      Typ: {
        select: { name: "Artikel" },
      },
    },
    children: [
      {
        object: "block",
        type: "heading_1",
        heading_1: {
          rich_text: [
            { type: "text", text: { content: `Highlights von ${title}` } },
          ],
        },
      },
    ],
  };
}

async function addPage(content) {
  const response = await axios.post(
    "https://api.notion.com/v1/pages",
    {
      parent: { database_id: token.notionDatabaseId },
      ...content,
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
}

const formatHighlights = (highlights) => {
  console.log(`Formatting ${highlights.length} highlights`);
  let formattedHighlights = new Map();

  highlights.forEach((highlight) => {
    if (!formattedHighlights.has(highlight.raindropRef)) {
      formattedHighlights.set(
        highlight.raindropRef,
        getHighlightBlueprint(highlight.title, highlight.link)
      );
    }
    formattedHighlights
      .get(highlight.raindropRef)
      .children.push(formatHighlightContent(highlight));
  });
  console.log(`Formatting highlights finished`);
  return formattedHighlights;
};

const formatHighlightContent = (highlight) => {
  return {
    object: "block",
    type: "paragraph",
    paragraph: {
      rich_text: [
        {
          type: "text",
          text: {
            content: highlight.text,
          },
        },
      ],
    },
  };
};

const syncHighlights = async (highlights) => {
  const syncedRaindrops = new Set([]);
  console.log(`syncing ${highlights.size} highlights with notion ...`);
  for (const [key, value] of highlights.entries()) {
    try {
      await addPage(value);
      syncedRaindrops.add(key);
    } catch (err) {
      console.error(`${key} could not be synced ${err.data}`);
    }
  }
  console.log(`syncing highlights with notion finished`);
  return syncedRaindrops;
};

module.exports = { formatHighlights, syncHighlights };
