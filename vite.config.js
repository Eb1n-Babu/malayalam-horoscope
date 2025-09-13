export default {
    server: {
        proxy: {
            '/api': {
                target: 'https://api.vedicastroapi.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
};