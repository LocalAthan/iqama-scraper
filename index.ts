import { ScraperScript } from "./interfaces";
import express from "express";
import responseTime from "response-time";
import ash from "express-async-handler";
import redis from "redis";
import { Promise } from "bluebird";

import scrapers from "./scrapers/index";
import mosques from "./mosques";
import moment from "moment-timezone";

declare module "redis" {
  export interface RedisClient extends NodeJS.EventEmitter {
    setAsync(key: string, value: string): Promise<void>;
    getAsync(key: string): Promise<string>;
    existsAsync(key: string): Promise<string>;
  }
}

const oldRedisClient = redis.createClient(6379, "redis");
const redisClient = Promise.promisifyAll(oldRedisClient) as redis.RedisClient;
redisClient.on("error", function (error) {
  console.error(error);
});

const app = express();
app.use(responseTime());
app.disable("etag");

app.get("/", (req, res) => res.send("Running"));

app.get("/mosques", (req, res) => {
  return res.send(mosques);
});

app.get(
  "/prayerTimes/:id",
  ash(async (req, res) => {
    const mosque = mosques.find((mosque) => mosque.id == Number(req.params.id));

    if (!mosque) {
      return res.sendStatus(404);
    }

    const isPrayerCached = await redisClient.existsAsync(mosque.name);
    if (isPrayerCached) {
      const prayerTimes = await redisClient.getAsync(mosque.name);
      return res.send(prayerTimes);
    }

    const scraper: ScraperScript = scrapers[mosque.scraperScript];
    const prayerTimes = await scraper.run(mosque.prayerTimesUrl);

    const timeZoneOffset =
      moment.tz("America/Edmonton").utcOffset() * 60 * 1000;
    let timeUntilMidnight = new Date().setHours(24, 0, 0, 0) - Date.now();
    const timeLengthOfDay = 24 * 60 * 60 * 1000;
    if (timeUntilMidnight > timeLengthOfDay) {
      timeUntilMidnight -= timeLengthOfDay;
    }
    const cacheDuration = timeUntilMidnight - timeZoneOffset;

    redisClient.set(
      mosque.name,
      JSON.stringify(prayerTimes),
      "PX",
      cacheDuration
    );
    return res.send(prayerTimes);
  })
);

app.listen(process.env.PORT, () => {
  console.log(
    `Dar Al-Sunnah Prayer Times @ http://localhost:${process.env.PORT}/prayerTimes/1`
  );
});
