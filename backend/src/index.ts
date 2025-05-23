import express, { Application } from 'express';
import cors from 'cors';
import citasRoutes from './routes/citasRoutes';
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
    }
    routes(): void { 
        this.app.use('/api/citas', citasRoutes);
    }
    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('SPerrat', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();