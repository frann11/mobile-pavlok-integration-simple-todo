require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pavlok = require('@api/pavlok');

// Initialize Pavlok SDK
const token = process.env.PAVLOK_ACCESS_TOKEN;
if (token) {
    pavlok.auth(`Bearer ${token}`);
    console.log('Pavlok SDK initialized with token');

    // Initial verification
    pavlok.users_get_current_user_api_v5_user__get()
        .then(({ data }) => console.log('Successfully connected to Pavlok as:', data.email))
        .catch(err => console.error('Pavlok Auth Verification Failed:', err.status, err.data || err.message));
} else {
    console.warn('Warning: PAVLOK_ACCESS_TOKEN missing in .env');
}

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('Body:', JSON.stringify(req.body, null, 2));
    }
    next();
});

const handleStimulus = async (type, req, res) => {
    const { intensity, reason } = req.body;

    // Map internal types to Pavlok V5 stimulus types
    const stimulusTypeMap = {
        'zap': 'zap',
        'vibrate': 'vibe',
        'beep': 'beep'
    };

    const payload = {
        stimulus: {
            stimulusType: stimulusTypeMap[type] || 'vibe',
            stimulusValue: parseInt(intensity) || 5, // Pavlok V5 usually takes 1-10 or percentage
            reason: reason || 'Task incomplete'
        }
    };

    console.log(`>>> Sending ${type.toUpperCase()} request to Pavlok API (Type: ${payload.stimulus.stimulusType})...`);

    try {
        const result = await pavlok.stimulus_create_api_v5_stimulus_send_post(payload);

        console.log(`${type.toUpperCase()} success!`);
        res.status(200).json({
            status: 'success',
            message: `${type} delivered successfully via V5 Stimulus API`,
            data: result.data
        });
    } catch (err) {
        // Log detailed error from Pavlok
        const errorData = err.data || (err.response ? err.response.data : err.message);
        console.error(`${type.toUpperCase()} failure:`, err.status || 'No Status', errorData);

        res.status(err.status || 500).json({
            status: 'error',
            message: `Pavlok API failed to ${type}`,
            error: errorData
        });
    }
};

app.post('/zap', (req, res) => handleStimulus('zap', req, res));
app.post('/vibrate', (req, res) => handleStimulus('vibrate', req, res));
app.post('/beep', (req, res) => handleStimulus('beep', req, res));

app.get('/status', (req, res) => {
    res.json({
        status: 'online',
        sdk: 'official',
        authenticated: !!token
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`\n--- Pavlok Dev Backend Ready ---`);
    console.log(`Listening at: http://localhost:${port}`);
    console.log(`Using Token: ${token ? 'YES' : 'NO'}\n`);
});
