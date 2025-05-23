"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
const router = (0, express_1.Router)();
// Rutas para usuarios
router.get('/', usuariosController_1.usuariosController.getUsuarios);
router.get('/:id', usuariosController_1.usuariosController.getUsuarioById);
router.post('/', usuariosController_1.usuariosController.createUsuario);
router.put('/:id', usuariosController_1.usuariosController.updateUsuario);
router.delete('/:id', usuariosController_1.usuariosController.deleteUsuario);
exports.default = router;
