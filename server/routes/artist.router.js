app.get('/', (req, res) => {
    console.log(`In /songs GET`);
    res.send(artistList);
});

app.post('/', (req, res) => {
    artistList.push(req.body);
    res.sendStatus(201);
});