"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
const router = (0, express_1.Router)();
// Rutas para usuarios
router.post('/login', usuariosController_1.usuariosController.login);
router.get('/', usuariosController_1.usuariosController.getUsuarios);
router.get('/:id', usuariosController_1.usuariosController.getUsuarioById);
router.post('/', usuariosController_1.usuariosController.createUsuario);
router.put('/:id', usuariosController_1.usuariosController.updateUsuario);
router.delete('/:id', usuariosController_1.usuariosController.deleteUsuario);
router.get('/rol/:rol', usuariosController_1.usuariosController.getUsuariosByRol);
router.get('/especialidad/:especialidad', usuariosController_1.usuariosController.getUsuariosByEspecialidad);
exports.default = router;
