const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
require('dotenv').config();


// 
const pegawaiRoutes = require('./routes/pegawaiRoutes'); //path pegawaiRoutes.js
const authRoutes = require('./routes/authRoutes'); //path authRoutes.js 

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Dokumentasi API Simpadu',
    version: '1.0.0',
    description: 'Dokumentasi API Simpadu untuk 2 level user',
  },
  servers: [{
    url: 'http://localhost:3000',
  }, ],
};

//swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ['./src/routes/pegawaiRoutes.js'],
};

// Inisialisasi swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

//  Swagger UI di /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Menyambungkan rute API
app.use('/api', pegawaiRoutes);
app.use('/auth', authRoutes);

// Memulai server



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});