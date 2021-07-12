export interface PrayerTimes {
  fajr: {
    athan: string;
    iqama: string;
  };
  dhuhr: {
    athan: string;
    iqama: string;
  };
  asr: {
    athan: string;
    iqama: string;
  };
  maghrib: {
    athan: string;
    iqama: string;
  };
  isha: {
    athan: string;
    iqama: string;
  };
}

export interface Mosque {
  id: number;
  name: string;
  address: string;
  imageUrl: string;
  websiteUrl: string;
  prayerTimesUrl: string;
  scraperScript: string;
}

export interface ScraperScript {
  run(url: string): Promise<PrayerTimes>;
}
