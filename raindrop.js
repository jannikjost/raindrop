const axios = require("axios");
const token = require("./token.json");
const fsPromises = require("fs/promises");
const path = require("path");

const url = "https://api.raindrop.io/rest/v1/highlights";

cleanDirectory("./highlightsToSync").then(() => {
  axios
    .get(url, {
      headers: {
        Authorization: "Bearer " + token.token,
      },
    })
    .then(async (res) => {
      if (!res.data) return;
      for (const element of res.data.items) {
        await writeNote(element.title, element);
      }
      await addCurlyBracket();
    })
    .catch((err) => {
      console.log("Error: ", err.message);
    });
});

async function writeNote(filename, element) {
  await writeFileWithHeader(filename, element);
  await fsPromises.appendFile(
    `./highlightsToSync/${filename}.rtf`,
    generateNoteForHighlight(element),
    function (err) {
      if (err) throw err;
    }
  );
}

async function writeFileWithHeader(filename, element) {
  const files = await fsPromises.readdir("./highlightsToSync");
  if (!files.includes(filename + ".rtf")) {
    await fsPromises.writeFile(
      `./highlightsToSync/${filename}.rtf`,
      generateFileHeader(element)
    );
  }
}

function generateFileHeader(element) {
  let header = "{\\rtf1 ";
  header += element.title + " \\line ";
  header += "{\\i " + element.link + "}";
  return header;
}

function generateNoteForHighlight(highlight) {
  return " \\line " + highlight.text;
}

async function cleanDirectory(folderPath) {
  try {
    const files = await fsPromises.readdir(folderPath);
    for (const file of files) {
      await fsPromises.unlink(path.resolve(folderPath, file));
    }
  } catch (err) {
    console.error(err);
  }
}

async function addCurlyBracket() {
  const files = await fsPromises.readdir("./highlightsToSync");
  for (const file of files) {
    await fsPromises.appendFile(
      path.resolve("./highlightsToSync", file),
      "}",
      function (err) {
        if (err) throw err;
      }
    );
  }
}
