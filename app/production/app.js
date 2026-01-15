// this is just for this test task
const express = require('express');
const pool = require('./config/db');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => res.status(200).send('App is running OK'));
app.get('/status', (req, res) => res.status(200).json({ status: 'UP', timestamp: new Date() }));
app.post('/process', (req, res) => {
    const data = req.body;
    res.status(202).json({ message: 'Data received', data });
});

app.listen(port, () => console.log(`App listening on port ${port}`));

module.exports = app; // For testing