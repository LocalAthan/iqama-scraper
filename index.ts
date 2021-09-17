import { ScraperScript } from "./interfaces";
import express from "express";
import ash from "express-async-handler";

import scrapers from "./scrapers/index";
import mosques from "./mosques";

const app = express();
const port = 3000;

app.disable("etag");

app.get("/", (req, res) => res.send("Running"));

app.get("/mosques", (req, res) => {
  res.send(mosques);
});

app.get(
  "/prayerTimes/:id",
  ash(async (req, res) => {
    const mosque = mosques.find((mosque) => mosque.id == req.params.id);

    if (!mosque) {
      res.sendStatus(404);
    }

    const scraper: ScraperScript = scrapers[mosque.scraperScript];
    const prayerTimes = await scraper.run(mosque.prayerTimesUrl);

    res.send(prayerTimes);
  })
);

app.listen(port, () => {
  console.log(`Sahaba Prayer Times @ http://localhost:${port}/prayerTimes/1`);
});
