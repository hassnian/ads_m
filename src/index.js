const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const {
  postAd,
  getAllAds,
  deleteAd,
  deleteExpireAd,
  getOne
} = require("./controllers/index");

dotenv.config();

const apiRoot = process.env.DM_BASE_URL;
const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.get("/ad", async (req, res, next) => {
  const response = await getAllAds();
  res.json(response);
});

app.post("/ad", async (req, res) => {
  const response = await postAd(req);
  res.json(response);
});
app.get("/ad/:id", async (req, res) => {
  const response = await getOne(req);
  res.json(response);
});

app.delete("/ad/:id", async (req, res) => {
  const response = await deleteAd(req);
  res.json(response);
});

app.delete("/ad/expire/:date", async (req, res) => {
  const response = await deleteExpireAd(req);
  res.json(response);
});

if (process.env.DM_ENV === "dev") {
  // listen for requests
  app.listen(process.env.DM_PORT, () => {
    console.log(`Server is listening on port ${process.env.DM_PORT}`);
  });
}

module.exports = app;
