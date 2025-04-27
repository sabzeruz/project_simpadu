const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const pegawaiRoutes = require('./routes/pegawaiRoutes'); // Pastikan ini adalah path yang benar

const app = express();

// Definisi Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'SIMPADU API Documentation',
    version: '1.0.0',
    description: 'API documentation for Simpadu backend',
  },
  servers: [
    {
      url: 'http://localhost:3000', // Server yang digunakan
    },
  ],
};

// Opsi untuk swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ['./src/routes/pegawaiRoutes.js'], // Pastikan ini sesuai dengan path file rute kamu
};

// Inisialisasi swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Menyajikan Swagger UI di /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Menyambungkan rute API
app.use('/api', pegawaiRoutes);

// Memulai server
const port = 3000;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
