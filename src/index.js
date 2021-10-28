const express = require('express')
const session = require('express-session')

let app = express()

app.use(session({
    name: "userSession",
    secret: 'secretCode',
    saveUninitialized: true,
    resave: false,
    duration: 2592000000,
    activeDuration: 2592000000,
    secure: true
}))

app.use(express.static(__dirname + '/views'))

app.get('/', async function(req, res) {

    res.render(__dirname + "/views/index.ejs")
})

app.get('/game', async function(req, res) {

    res.render(__dirname + "/views/game.ejs")
})

app.listen(5200)

console.log("Listening on http://localhost:" + 5200)