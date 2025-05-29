import { Router } from "express";
import { citaController } from "../controllers/citaController";

class CitaRoutes{
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void {
        this.router.get('/', (req, res) => {
            res.send('Citas API');
        });
        this.router.get('/list', citaController.list);
        this.router.get('/list/:id', citaController.listOne);
        this.router.post('/create', citaController.create);
        this.router.put('/update/:id', citaController.update);
        this.router.delete('/delete/:id', citaController.delete);
        this.router.get('/paciente/:paciente_id', citaController.getCitasByPaciente);
        this.router.get('/especialista/:especialista_id', citaController.getCitasByEspecialista);
    }
}

const citaRoutes = new CitaRoutes();
export default citaRoutes.router;