//// Core modules

//// External modules
const { createClient } = require('redis');


module.exports = {
    connect: async () => {
        try {
            const client = createClient({
                // Replace with your Redis server host and port if not using localhost:6379
                host: 'localhost',
                port: 6379
            });

            await client.connect()
            return client
        } catch (error) {
            if (ENV === 'dev') {
                console.error(error)
            }
            throw new Error('Connection error.')
        }
    },

}