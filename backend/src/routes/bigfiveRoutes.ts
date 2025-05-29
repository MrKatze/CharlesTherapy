import { Router } from 'express';
import { guardarBigFive, obtenerBigFivePorUsuario } from '../controllers/bigfiveController';

const router = Router();

router.post('/bigfive', guardarBigFive as any);
router.get('/bigfive/:id_usuario', obtenerBigFivePorUsuario as any);

export default router;
