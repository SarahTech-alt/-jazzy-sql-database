const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM "artist" ORDER BY "birthdate" DESC LIMIT 100;'
    pool.query(queryText).then((result) => {
        res.send(result.rows)
    }).catch((error) => {
        console.log('There was an error making a query', error);
        res.sendStatus(500);
    });
});


router.post('/', (req, res) => {
    const newArtist = req.body;
    const queryText = `
        INSERT INTO "artist" ("name", "birthdate")
        VALUES ($1, $2);
    `;
    pool.query(queryText, [
        newArtist.name, // $1
        newArtist.birthdate // $2
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