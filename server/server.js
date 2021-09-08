const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

let artistRouter = require('./routes/artist.router');
let songRouter = require('./routes/song.router');

app.use('/songs', songRouter);
app.use('/artist', artistRouter);

// TODO - Replace static content with a database tables
// Moved to database

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});





