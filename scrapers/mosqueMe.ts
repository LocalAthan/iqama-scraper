import { PrayerTimes } from "../interfaces";
import got from "got";

const run = async (url: string): Promise<PrayerTimes> => {
  const mosqueMeRequest = await got(url);
  const mosqueMeJson = JSON.parse(mosqueMeRequest.body);
  const prayerTimes: PrayerTimes = {
    fajr: {
      athan: mosqueMeJson.fajr,
      iqama: mosqueMeJson.fajri,
    },
    dhuhr: {
      athan: mosqueMeJson.thuhr,
      iqama: mosqueMeJson.thuhri,
    },
    asr: {
      athan: mosqueMeJson.asr,
      iqama: mosqueMeJson.asri,
    },
    maghrib: {
      athan: mosqueMeJson.maghrib,
      iqama: mosqueMeJson.maghribi,
    },
    isha: {
      athan: mosqueMeJson.isha,
      iqama: mosqueMeJson.ishai,
    },
  };
  return prayerTimes;
};

export default {
  run,
};
