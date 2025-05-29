import { Request, Response } from 'express';
import pool from '../dataBase'; // Importa la conexión desde dataBase.ts

class UsuariosController {
  // Obtener todos los usuarios
  async getUsuarios(req: Request, res: Response): Promise<void> {
    try {
      const [rows] = await pool.query('SELECT * FROM usuarios');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
  }

  // Obtener un usuario por ID
  async getUsuarioById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const [rows] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
      if ((rows as any[]).length === 0) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.json(rows);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
  }

  // Crear un nuevo usuario
  async createUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { usuario, correo, password, rol } = req.body;
      const result = await pool.query('INSERT INTO usuarios (usuario, correo, password, rol) VALUES (?, ?, ?, ?)', [usuario, correo, password, rol]);
      res.status(201).json({ message: 'Usuario creado', id: (result[0] as any).insertId });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el usuario', error });
    }
  }

  // Actualizar un usuario por ID
  async updateUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { usuario, correo, password, rol } = req.body;
      const result = await pool.query('UPDATE usuarios SET usuario = ?, correo = ?, password = ?, rol = ? WHERE id_usuario = ?', [usuario, correo, password, rol, id]);
      if ((result[0] as any).affectedRows === 0) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.json({ message: 'Usuario actualizado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
  }

  // Eliminar un usuario por ID
  async deleteUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
      if ((result[0] as any).affectedRows === 0) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.json({ message: 'Usuario eliminado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
  }

  // Login de usuario
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { correo, password } = req.body;
      const [rows] = await pool.query(
        'SELECT * FROM usuarios WHERE correo = ? AND password = ?',
        [correo, password]
      );
      if ((rows as any[]).length === 0) {
        res.status(401).json({ message: 'Correo o contraseña incorrectos' });
      } else {
        // Puedes retornar solo los datos necesarios, no toda la fila
        res.json({ message: 'Login exitoso', usuario: (rows as any[])[0] });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
  }
}


export const usuariosController = new UsuariosController();
