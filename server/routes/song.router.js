app.get('/', (req, res) => {
    console.log(`In /songs GET`);
    res.send(songList);
});

app.post('/', (req, res) => {
    songList.push(req.body);
    res.sendStatus(201);
});