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
exports.usuariosController = void 0;
const dataBase_1 = __importDefault(require("../dataBase")); // Importa la conexión desde dataBase.ts
class UsuariosController {
    // Obtener todos los usuarios
    getUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield dataBase_1.default.query('SELECT * FROM usuarios');
                res.json(rows);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener usuarios', error });
            }
        });
    }
    // Obtener un usuario por ID
    getUsuarioById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const [rows] = yield dataBase_1.default.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
                if (rows.length === 0) {
                    res.status(404).json({ message: 'Usuario no encontrado' });
                }
                else {
                    res.json(rows[0]);
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener el usuario', error });
            }
        });
    }
    // Crear un nuevo usuario
    createUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { usuario, correo, password, rol, bigFive } = req.body;
                const result = yield dataBase_1.default.query('INSERT INTO usuarios (usuario, correo, password, rol, bigFive) VALUES (?, ?, ?, ?, ?)', [usuario, correo, password, rol, bigFive !== null && bigFive !== void 0 ? bigFive : false]);
                res.status(201).json({ message: 'Usuario creado', id: result[0].insertId });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al crear el usuario', error });
            }
        });
    }
    // Actualizar un usuario por ID
    updateUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { usuario, correo, password, rol, bigFive } = req.body;
                const result = yield dataBase_1.default.query('UPDATE usuarios SET usuario = ?, correo = ?, password = ?, rol = ?, bigFive = ? WHERE id_usuario = ?', [usuario, correo, password, rol, bigFive, id]);
                if (result[0].affectedRows === 0) {
                    res.status(404).json({ message: 'Usuario no encontrado' });
                }
                else {
                    res.json({ message: 'Usuario actualizado' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error al actualizar el usuario', error });
            }
        });
    }
    // Eliminar un usuario por ID
    deleteUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield dataBase_1.default.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
                if (result[0].affectedRows === 0) {
                    res.status(404).json({ message: 'Usuario no encontrado' });
                }
                else {
                    res.json({ message: 'Usuario eliminado' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error al eliminar el usuario', error });
            }
        });
    }
    // Login de usuario
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { correo, password } = req.body;
                const [rows] = yield dataBase_1.default.query('SELECT * FROM usuarios WHERE correo = ? AND password = ?', [correo, password]);
                if (rows.length === 0) {
                    res.status(401).json({ message: 'Correo o contraseña incorrectos' });
                }
                else {
                    // Puedes retornar solo los datos necesarios, no toda la fila
                    res.json({ message: 'Login exitoso', usuario: rows[0] });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error al iniciar sesión', error });
            }
        });
    }
}
exports.usuariosController = new UsuariosController();
