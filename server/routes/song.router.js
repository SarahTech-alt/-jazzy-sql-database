const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM "song" ORDER BY "title" DESC LIMIT 100;'
    pool.query(queryText).then((result) => {
        res.send(result.rows)
    }).catch((error) => {
        console.log('There was an error making a query', error);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    const newSong = req.body;
    const queryText = `
        INSERT INTO "song" ("title", "length", "released")
        VALUES ($1, $2, $3);
    `;
    pool.query(queryText, [
        newSong.title, // $1
        newSong.length, // $2
        newSong.released // $3
    ]).then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        res.sendStatus(500);
    });
});

const pg = require('pg');
const pool = new pg.Pool({
    // Configure pg
    database: 'jazzy_sql', // Name of the database you want to connect to
    host:  'localhost', // where is your database running?
    port: '5432', // Postico default
    max: 10, // how many queries at one time
    idleTimeoutMillis: 30000 // 30 seconds before timeout, after it will stop 
                            // trying to connect to pg and throw an error
});


pool.on('connect', () => {
    console.log('pg connected to post postgresql!');
});

pool.on('error', (error) => {
    console.log('unable to connect to postgresql', error);
});

module.exports = router;