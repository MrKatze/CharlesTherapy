import { Request, Response } from "express";
import pool from "../dataBase";

class CitaController{
    public async list(req: Request, res:Response):Promise<void>{
        const [resp] = await pool.query('SELECT * FROM cita');
        res.json(resp);
    }

    public async listOne(req: Request, res:Response):Promise<void>{
        const { id } = req.params;
        const [resp]:any = await pool.query('SELECT * FROM cita WHERE id_cita = ?', [id]);
        if (resp.length > 0) {
            res.json(resp[0]);
        } else {
            res.status(404).json({ message: 'Cita no encontrada' });
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const { paciente_id, especialista_id, fecha, hora, estado } = req.body;
            const query = `
                INSERT INTO cita (paciente_id, especialista_id, fecha, hora, estado)
                VALUES (?, ?, ?, ?, ?)
            `;
            const [result] = await pool.query(query, [paciente_id, especialista_id, fecha, hora, estado]);

            res.status(201).json({ message: 'Cita creada con éxito', insertId: (result as any).insertId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al crear la cita' });
        }
    }

    public async update(req: Request, res:Response):Promise<void>{
        const { id } = req.params;
        const { fecha, hora, paciente_id, especialista_id } = req.body;
        const [result]:any = await pool.query('UPDATE cita SET fecha = ?, hora = ?, paciente_id = ?, especialista_id = ? WHERE id_cita = ?', [fecha, hora, paciente_id, especialista_id, id]);
        if (result.affectedRows > 0) {
            res.json({ message: 'Cita actualizada' });
        } else {
            res.status(404).json({ message: 'Cita no encontrada' });
        }
    }
    
    public async delete(req: Request, res:Response):Promise<void>{
        const { id } = req.params;
        const [result]:any = await pool.query('DELETE FROM cita WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.json({ message: 'Cita eliminada' });
        } else {
            res.status(404).json({ message: 'Cita no encontrada' });
        }
    }

    public async getCitasByPaciente(req: Request, res: Response): Promise<void> {
        const { paciente_id } = req.params;
        const [resp]:any = await pool.query('SELECT * FROM cita WHERE paciente_id = ?', [paciente_id]);
        if (resp.length === 0) {
            res.status(404).json({ message: 'No se encontraron citas para este paciente' });
        } else if (resp.length > 1) {
            res.status(200).json(resp);
        }
    }
    public async getCitasByEspecialista(req: Request, res: Response): Promise<void> {
        const { especialista_id } = req.params;
        const [resp] = await pool.query('SELECT * FROM cita WHERE especialista_id = ?', [especialista_id]);
        res.json(resp);
    }

    
}

export const citaController = new CitaController();
