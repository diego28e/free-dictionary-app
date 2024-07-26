const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");

const app = express();
const router = express.Router();

app.set("view engine", "ejs");
app.use(express.static("public")); // Serving static files from 'public' directory
app.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/search", async (req, res) => {
  const word = req.body.word;
  try {
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = response.data[0];
    res.render("result", { wordData: data });
  } catch (error) {
    res.render("result", { wordData: null, error: "Word not found" });
  }
});

app.use("/", router);

module.exports.handler = serverless(app);
