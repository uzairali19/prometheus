const express = require('express');
const promMid = require('express-prometheus-middleware');
const AJV = require('ajv');
const app = express();
const port = 9000;


const ajv = new AJV();
const timeSchema = {
    type: "object",
    properties: {
        epoch: {
            description: "The current server time, in epoch seconds, at time of processing the request.",
            type: "number"
        }
    },
    required: ["epoch"]
};

app.use((req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader !== 'mysecrettoken') {
        return res.status(403).send('Forbidden');
    }
    next();
});

app.use(promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
}));

app.get('/time', (req, res) => {
    const responseData = {
        epoch: Math.floor(Date.now() / 1000)
    };

    // Validate response data against schema
    const isValid = ajv.validate(timeSchema, responseData);
    if (!isValid) {
        return res.status(500).send('JSON response does not match schema, please check the server logs.');
    }

    res.json(responseData);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
