"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const citaController_1 = require("../controllers/citaController");
class CitaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('Citas API');
        });
        this.router.get('/list', citaController_1.citaController.list);
    }
}
const citaRoutes = new CitaRoutes();
exports.default = citaRoutes.router;
