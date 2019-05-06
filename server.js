const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const scrape = require('./routes/scraper.Routes')
const routes = require('./routes')
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
} const app = express();


app.use(bodyParser.json({ limit: '50mb', extended: false }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
const server = require('http').Server((app), setTimeout((timeout) => { return console.log('session timed out', timeout) }, 500000))


function haltOnTimedout(req, res, next) {
    if (!req.timedout) next();
}
app.use(express.static(path.join(__dirname, 'client/build')));



app.get('/api/world', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});

// Demo middleware to play with error handling
app.use((req, res, next) => {
    res.setTimeout(9900000, function () {
        console.log('Request has timed out.');
        res.send(408);
    })
    const startTime = Date.now();
    console.log("Request Time: " + startTime);
    console.log(`${req.method} ${req.path}`);
    // Request returns 500, default handler returns error
    // as html with stack trace in dev, does not terminate server process.
    // throw new Error("Bazinga!");
    next();
    // Request returns 500, default handler returns error as html showing stack trace,
    // and terminates server process with error ERR_HTTP_HEADERS_SENT.
    //next(new Error("Bazonga!"));
    const endTime = Date.now();
    console.log(
        "Response Time: " + endTime + " Elapsed: " + (endTime - startTime)
    );
    // Request goes through, error is written to log.
    //throw new Error("Bazunga!");
});
// Serve static files from the React app

app.use("/server/server.js", routes)
app.use('/server/server.js/scrape', scrape)

app.get("/*", function (req, res) {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})
server.listen(process.env.PORT || 5000, () => console.log(`Listening on port ${port}`));
// server.setTimeout(9900000);

// app.use(haltOnTimedout);