
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/location', (req, res) => {
    const data = req.body;
    data.timestamp = new Date().toISOString();
    let locations = [];
    try { locations = JSON.parse(fs.readFileSync('locations.json', 'utf8')); } catch (e) {}
    locations.push(data);
    fs.writeFileSync('locations.json', JSON.stringify(locations, null, 2));
    res.json({ success: true });
});

app.get('/locations', (req, res) => {
    try {
        const json = fs.readFileSync('locations.json', 'utf8');
        res.type('json').send(json);
    } catch (e) { res.json([]); }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
