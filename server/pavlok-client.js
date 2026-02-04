const axios = require('axios');

class PavlokClient {
    constructor() {
        this.client = axios.create({
            baseURL: 'https://api.pavlok.com',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    auth(token) {
        // Handle both "Bearer <token>" and just "<token>"
        const finalToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
        this.client.defaults.headers.common['Authorization'] = finalToken;
        console.log('Pavlok Client: Auth set');
    }

    async users_get_current_user_api_v5_user__get() {
        return this.client.get('/api/v5/user');
    }

    async users_post_zap_api_v5_user_zap_post(params) {
        return this.client.post('/api/v5/user/zap', params);
    }

    async users_post_vibration_api_v5_user_vibration_post(params) {
        return this.client.post('/api/v5/user/vibration', params);
    }

    async users_post_beep_api_v5_user_beep_post(params) {
        return this.client.post('/api/v5/user/beep', params);
    }
}

module.exports = new PavlokClient();
