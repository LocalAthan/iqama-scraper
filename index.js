const express = require('express')
const app = express()
const port = 3000
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

app.get('/', async (req, res) => {
    res.send('Hello World!')

    try {
        const dom = await JSDOM.fromURL("https://mosque.me/prayer-times/sahaba/")
        console.log(dom.serialize())
        console.log(fajr);
    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})