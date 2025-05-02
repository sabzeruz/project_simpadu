const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
require('dotenv').config();

const pegawaiRoutes = require('./routes/pegawaiRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS: agar bisa diakses lokal & dari Vercel
const allowedOrigins = [
  'http://localhost:5173',
  'https://simpadu.vercel.app',
  'https://84f6-2001-448a-60c0-1d7f-f50d-b0a9-5620-9e9d.ngrok-free.app/'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Swagger config
const PORT = process.env.PORT || 3000;
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Dokumentasi API Simpadu',
    version: '1.0.0',
    description: 'Dokumentasi API Simpadu untuk 2 level user',
  },
  servers: [
    {
      url: process.env.BASE_URL || `http://localhost:${PORT}`,
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/pegawaiRoutes.js', './src/routes/authRoutes.js'],
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route utama
app.use('/api', pegawaiRoutes);
app.use('/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
