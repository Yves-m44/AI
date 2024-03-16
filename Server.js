const express = require('express');
const { CropDetector } = require('./CropDetector');

const app = express();
const port = 3000;

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Public/index.html');
});

// Handle form submission
app.get('/predict', (req, res) => {
    const soilPhValue = parseFloat(req.query.soilPh);
    const predictedCrops = CropDetector(soilPhValue);
    res.send(predictedCrops);
});

// Start the server
app.listen(process.env.PORT || port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
