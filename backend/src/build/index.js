"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const citasRoutes_1 = __importDefault(require("./routes/citasRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.set('port', process.env.PORT || 3000);
    }
    routes() {
        this.app.use('/api/citas', citasRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('SPerrat', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
