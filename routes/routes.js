const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const transferenciasController = require('../controllers/transferenciasController');

// Ruta para servir el archivo HTML principal
router.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});

// Rutas para usuarios
router.post('/usuario', usuariosController.createUsuario);
router.get('/usuarios', usuariosController.getUsuarios);
router.put('/usuario', usuariosController.updateUsuario);
router.delete('/usuario', usuariosController.deleteUsuario);

// Rutas para transferencias
router.post('/transferencia', transferenciasController.createTransferencia);
router.get('/transferencias', transferenciasController.getTransferencias);

module.exports = router;
