import chai, { expect } from 'chai';
import sinon, { SinonSandbox } from 'sinon';
import sinonChai from 'sinon-chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { Request, Response } from 'express';
import * as controller from '../../controllers/sesionChatController';
// En lugar de:
// import pool from '../../dataBase';

chai.use(sinonChai);

// Usa:
import pool from '../mocks/dataBaseMock';


describe('SesionChat Controller', () => {
  let sandbox: sinon.SinonSandbox;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = { body: {}, params: {}, query: {} };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('crearSesion()', () => {
    it('debe retornar 400 si faltan datos', async () => {
      req.body = { id_usuario: 1 };
      await controller.crearSesion(req as Request, res as Response);
      
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        error: 'Faltan datos requeridos'
      });
    });

    it('debe crear sesión correctamente', async () => {
      const executeStub = sandbox.stub(pool, 'execute').resolves([{ insertId: 456 }]);
      req.body = { id_usuario: 1, contenido: 'Hola mundo' };

      await controller.crearSesion(req as Request, res as Response);
      
      expect(executeStub.calledOnce).to.be.true;
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({
        message: 'Sesión creada',
        id_sesion: 456
      });
    });
  });

  describe('obtenerSesionesPorUsuarioYFecha()', () => {
    it('debe usar fecha actual si no se proporciona', async () => {
      const today = new Date().toISOString().split('T')[0];
      const executeStub = sandbox.stub(pool, 'execute').resolves([[]]);
      req.params = { id_usuario: '1' };

      await controller.obtenerSesionesPorUsuarioYFecha(req as Request, res as Response);
      
      expect(executeStub.calledWithMatch(
        `SELECT * FROM sesiones WHERE id_usuario = ? AND DATE(fecha_creacion) = ?`,
        ['1', today]
      )).to.be.true;
    });

    it('debe usar fecha proporcionada', async () => {
      const executeStub = sandbox.stub(pool, 'execute').resolves([[]]);
      req.params = { id_usuario: '1' };
      req.query = { fecha: '2023-05-15' };

      await controller.obtenerSesionesPorUsuarioYFecha(req as Request, res as Response);
      
      expect(executeStub.calledWithMatch(
        `SELECT * FROM sesiones WHERE id_usuario = ? AND DATE(fecha_creacion) = ?`,
        ['1', '2023-05-15']
      )).to.be.true;
    });
  });

  // Pruebas similares para los otros métodos...
});