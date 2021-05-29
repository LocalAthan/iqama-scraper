import express from 'express'
import ash from 'express-async-handler'

import scripts from './scripts/index.js'
import mosques from './mosques.js'

const app = express()
const port = 3000

app.disable("etag");

app.get('/', (req, res) => res.send("Running"))

app.get('/mosques', (req, res) => {
    res.send(mosques)
})

app.get('/prayerTimes/:id', ash(async (req, res) => {
    const mosque = mosques.find(mosque => mosque.id == req.params.id)
    
    if (!mosque) {
        res.sendStatus(404)
    }

    const script = scripts[mosque.scraperScript];
    const prayerTimes = await script.run(mosque.prayerTimesUrl)

    res.send(prayerTimes)
}))

app.listen(port, () => {
    console.log(`Sahaba Prayer Times @ http://localhost:${port}/prayerTimes/1`)
})