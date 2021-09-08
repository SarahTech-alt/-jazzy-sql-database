const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(`In /songs GET`);
    res.send(songList);
});

router.post('/', (req, res) => {
    songList.push(req.body);
    res.sendStatus(201);
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