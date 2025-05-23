import { Request, Response } from "express";
import pool from "../dataBase";

class CitaController{
    public async list(req: Request, res:Response):Promise<void>{
        const [resp] = await pool.query('SELECT * FROM cita');
        res.json(resp);
    }
    public async listOne(req: Request, res:Response):Promise<void>{
        const { id } = req.params;
        const [resp]:any = await pool.query('SELECT * FROM cita WHERE id = ?', [id]);
        if (resp.length > 0) {
            res.json(resp[0]);
        } else {
            res.status(404).json({ message: 'Cita no encontrada' });
        }
    }
}

export const citaController = new CitaController();
