module.exports = {
  apps: [
    {
      name: 'SHOE-API',
      script: './app.js',
      env: {
        NODE_ENV: 'production',
        PORT: 1001,
      },
    },
  ],
};
