const https = require('https');

require('dotenv').config(); 

const fetchCharts = async (req, res) => {
    const { region, symbol, interval, range, comparisons } = req.query;

    if (!region || !symbol || !interval || !range) {
        return res.status(400).json({
            error: 'Missing required query parameters: region, symbol, interval, range',
        });
    }
    
    const encodedComparisons = encodeURIComponent(comparisons || '');
    const path = `/market/get-charts?region=${region}&symbol=${symbol}&interval=${interval}&range=${range}&comparisons=${encodedComparisons}`;

    const options = {
        method: 'GET',
        hostname: 'yh-finance.p.rapidapi.com',
        port: null,
        path: path,
        headers: {
            'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
            'x-rapidapi-key': '6e087f2304msh372453a50528263p12e1e9jsn87de7919e806', // Add your API key in .env
        },
    };

    console.log(`Requesting URL: https://${options.hostname}${options.path}`);

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
                console.error('Failed to parse JSON chartdata:', error.message);
                res.status(500).json({ error: 'Invalid JSON response from Yahoo Finance API' });
            }
        });
    });

    request.on('error', (err) => {
        console.error(`Error: ${err.message}`);
        res.status(500).json({ error: 'Failed to fetch chart data' });
    });

    request.end();
};

module.exports = {fetchCharts};