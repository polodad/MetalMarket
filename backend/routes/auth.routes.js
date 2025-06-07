console.log("✅ auth.routes.js cargado");

const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile, refreshToken } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

// Rutas públicas
router.post('/register', register);
console.log("🟣 Ruta POST /register está activa");

router.post('/login', login);
router.post('/refresh-token', refreshToken);

// Rutas protegidas
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;

router.get('/test', (req, res) => {
  res.send("✔️ Ruta /api/auth/test funcionando");
});
