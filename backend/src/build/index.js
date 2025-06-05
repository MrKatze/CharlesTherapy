"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const citasRoutes_1 = __importDefault(require("./routes/citasRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
const observacionRoutes_1 = __importDefault(require("./routes/observacionRoutes"));
const bigfiveRoutes_1 = __importDefault(require("./routes/bigfiveRoutes"));
const sesionChatRoutes_1 = __importDefault(require("./routes/sesionChatRoutes"));
const resumenRoutes_1 = __importDefault(require("./routes/resumenRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        // Configura el puerto del servidor
        this.app.set('port', process.env.PORT || 3000);
        // Configura CORS para permitir peticiones externas (como desde ngrok o otras redes)
        this.app.use((0, cors_1.default)({
            origin: '*', // ⚠️ En producción deberías reemplazar '*' por tu dominio seguro
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
        // Middlewares adicionales
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        // Definición de rutas
        this.app.use('/api/citas', citasRoutes_1.default);
        this.app.use('/api/usuarios', usuariosRoutes_1.default);
        this.app.use('/api/observaciones', observacionRoutes_1.default);
        this.app.use('/api/bigfive', bigfiveRoutes_1.default);
        this.app.use('/api/sesiones', sesionChatRoutes_1.default);
        this.app.use('/api/resumen', resumenRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('🚀 Server running on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
