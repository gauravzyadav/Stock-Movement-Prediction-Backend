const https = require('https');

exports.fetchCompaniesData = (req, res) => {
    const options = {
        method: 'GET',
        hostname: 'yahoo-finance15.p.rapidapi.com',
        port: null,
        path: '/api/v1/markets/stock/quotes?ticker=HDFCBANK.NS,INFY.NS,TCS.NS,ONGC.NS,HINDUNILVR.NS,GOLDBEES.NS',
        headers: {
            'x-rapidapi-key':'367f491854mshc1318c2f136ea76p1ba4c9jsnd400378020c3',
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
            console.log('API Response:', body);

            try {
                const jsonResponse = JSON.parse(body);
                const companiesData = jsonResponse.body;

                if (!Array.isArray(companiesData)) {
                    throw new Error('Invalid data format: companiesData is not an array');
                }

                const currentMarketPrices = [];
                const previousMarketPrices = [];
                const changes = [];
                const percentChanges = [];

                companiesData.forEach((company) => {
                    currentMarketPrices.push(company?.regularMarketPrice ?? null);
                    previousMarketPrices.push(company?.regularMarketPreviousClose ?? null);
                    changes.push(company?.regularMarketChange ?? null);
                    percentChanges.push(company?.regularMarketChangePercent?.toFixed(1) ?? null);
                });

                res.json({
                    currentMarketPrices,
                    previousMarketPrices,
                    changes,
                    percentChanges,
                });
            } catch (error) {
                console.error('Failed to parse JSON company:', error.message);
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
