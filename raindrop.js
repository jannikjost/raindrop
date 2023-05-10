const axios = require("axios");
const token = require("./token.json");
const fs = require("fs");

const url = "https://api.raindrop.io/rest/v1/highlights";

axios
  .get(url, {
    headers: {
      Authorization: "Bearer " + token.token,
    },
  })
  .then((res) => {
    console.log("res", res.data);
    if (!res.data) return;
    res.data.items.forEach((element) => {
      const fileText = generateNoteForHighlight(element);
      writeNote(element.title, fileText);
    });
  })
  .catch((err) => {
    console.log("Error: ", err.message);
  });

function generateNoteForHighlight(highlight) {
  let note = "\b\fs28" + highlight.title;
  note += "\\par\\i " + highlight.link;
  note += "\\par " + highlight.text;
  return note;
}

function writeNote(filename, note) {
  fs.appendFile(`./highlightsToSync/${filename}.rtf`, note, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
}
