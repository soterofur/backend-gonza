import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import prisma from './config/database.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', async (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Gestión Gonza API funcionando',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await prisma.$connect();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

startServer();
