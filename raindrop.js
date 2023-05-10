const axios = require("axios");
const token = require("./token.json")

const url = "https://api.raindrop.io/rest/v1/highlights";

axios
  .get(url, {
    headers: {
      Authorization: "Bearer " + token.token,
    },
  })
  .then((res) => {
    console.log("res", res.data);
  })
  .catch((err) => {
    console.log("Error: ", err.message);
  });
