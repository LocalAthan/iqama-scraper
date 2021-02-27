import express from 'express'
import got from 'got'
const app = express()
const port = 3000

const mosques = [
    {
        id: 1,
        name: "Sahaba Mosque",
        address: "9216 105 Ave NW, Edmonton, AB T5H 0J5",
        imageUrl: "https://lirp-cdn.multiscreensite.com/bd8c603f/dms3rep/multi/opt/Dar-Al-Sunnah-Logo-584w.png",
        websiteUrl: "https://www.daralsunnah.com/",
        prayerTimesUrl: "https://mosque.me/prayer-times/daralsunnah/getdata.php"
    },
    {
        id: 2,
        name: "Daralsunnah",
        address: "9228 144 Ave NW, Edmonton, AB T5E 6A3",
        imageUrl: "https://lirp-cdn.multiscreensite.com/7a517fc2/dms3rep/multi/opt/Screen+Shot+2019-01-24+at+10.12.23+PM-1920w.png",
        websiteUrl: "https://www.sahabamosque.ca/",
        prayerTimesUrl: "https://mosque.me/prayer-times/sahaba/getdata.php"
    }
]

app.get('/', (req, res) => res.send("Running"))

app.get('/mosques', (req, res) => {
    res.send(mosques)
})

app.get('/prayerTimes/:id', async (req, res) => {
    const mosque = mosques.find(mosque => mosque.id == req.params.id)

    try {
        const mosqueMeRequest = await got(mosque.prayerTimesUrl);
        const mosqueMeJson = JSON.parse(mosqueMeRequest.body)

        res.send({
            fajr: {
                athan: mosqueMeJson.fajr,
                iqama: mosqueMeJson.fajri
            },
            dhuhr: {
                athan: mosqueMeJson.thuhr,
                iqama: mosqueMeJson.thuhri
            },
            asr: {
                athan: mosqueMeJson.asr,
                iqama: mosqueMeJson.asri
            },
            maghrib: {
                athan: mosqueMeJson.maghrib,
                iqama: mosqueMeJson.marghrib
            },
            isha: {
                athan: mosqueMeJson.isha,
                iqama: mosqueMeJson.ishai
            }
        })
    } catch (error) {
        console.log(error);
        res.send("error")
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})