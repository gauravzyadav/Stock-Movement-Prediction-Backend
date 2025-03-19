const https = require('https');

exports.fetchNiftySensex = (req, res) => {
    console.log("inside nify and sensex"); 
    const options = {
        method: 'GET',
        hostname: 'yahoo-finance15.p.rapidapi.com',
        port: null,
        path: '/api/v1/markets/stock/quotes?ticker=%5EBSESN%2C%5ENSEI',
        headers: {
            'x-rapidapi-key': "367f491854mshc1318c2f136ea76p1ba4c9jsnd400378020c3",
            'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
        },
    };

    const request = https.request(options, (response) => {
        const chunks = [];

        response.on('data', (chunk) => {
            chunks.push(chunk);
        });

        response.on('end', () => {
            const body = Buffer.concat(chunks).toString();
            try {
                const jsonResponse = JSON.parse(body);
                res.json(jsonResponse);
            } catch (error) {
                console.error('Failed to parse JSON nifty:', error.message);
                res.status(500).send({ error: 'Invalid JSON response from Yahoo Finance API' });
            }
        });
    });

    request.on('error', (err) => {
        console.error(`Error: ${err.message}`);
        res.status(500).send({ error: 'Failed to fetch stock data' });
    });

    request.end();
};
