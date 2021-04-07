import got from 'got'
import cheerio from 'cheerio'

const run = async (url) => {

    const omariRequest = await got(url);
    const $ = cheerio.load(omariRequest.body);
    const prayerTimes = 
    {
        fajr: {
            athan: $("body > table > tbody > tr:nth-child(2) > td:nth-child(2)").text(),
            iqama: $("body > table > tbody > tr:nth-child(2) > td:nth-child(3)").text()
        },
        dhuhr: {
            athan: $("body > table > tbody > tr:nth-child(4) > td:nth-child(2)").text(),
            iqama: $("body > table > tbody > tr:nth-child(4) > td:nth-child(3)").text()
        },
        asr: {
            athan: $("body > table > tbody > tr:nth-child(5) > td:nth-child(2)").text(),
            iqama: $("body > table > tbody > tr:nth-child(5) > td:nth-child(3)").text()
        },
        maghrib: {
            athan: $("body > table > tbody > tr:nth-child(6) > td:nth-child(2)").text(),
            iqama: $("body > table > tbody > tr:nth-child(6) > td:nth-child(3)").text()
        },
        isha: {
            athan: $("body > table > tbody > tr:nth-child(7) > td:nth-child(2)").text(),
            iqama: $("body > table > tbody > tr:nth-child(7) > td:nth-child(3)").text()
        }
    }
    return prayerTimes
}

export default {
    run
}
