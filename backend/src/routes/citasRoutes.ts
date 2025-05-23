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
    }

}

const citaRoutes = new CitaRoutes();
export default citaRoutes.router;