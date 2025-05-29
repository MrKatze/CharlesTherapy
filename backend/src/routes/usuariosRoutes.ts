import { Router } from 'express';
import { usuariosController } from '../controllers/usuariosController';

const router = Router();

// Rutas para usuarios
router.post('/login', usuariosController.login);
router.get('/', usuariosController.getUsuarios);
router.get('/:id', usuariosController.getUsuarioById);
router.post('/', usuariosController.createUsuario);
router.put('/:id', usuariosController.updateUsuario);
router.delete('/:id', usuariosController.deleteUsuario);

export default router;
