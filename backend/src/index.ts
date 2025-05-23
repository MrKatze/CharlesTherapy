import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import citasRoutes from './routes/citasRoutes';
import usuariosRoutes from './routes/usuariosRoutes'

class Server {
    public app: Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config(): void {
        this.app.use(express.json());
        this.app.use(cors());

        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }
    routes(): void { 
        this.app.use('/api/citas', citasRoutes);
        this.app.use('api/usuarios',usuariosRoutes);
    }
    
    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();