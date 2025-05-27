"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.citaController = void 0;
const dataBase_1 = __importDefault(require("../dataBase"));
class CitaController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [resp] = yield dataBase_1.default.query('SELECT * FROM cita');
            res.json(resp);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const [resp] = yield dataBase_1.default.query('SELECT * FROM cita WHERE id = ?', [id]);
            if (resp.length > 0) {
                res.json(resp[0]);
            }
            else {
                res.status(404).json({ message: 'Cita no encontrada' });
            }
        });
    }
}
exports.citaController = new CitaController();
