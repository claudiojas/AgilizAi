"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = require("@fastify/cors");
class App {
    app;
    PORT;
    constructor() {
        this.app = (0, fastify_1.default)();
        this.PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
    }
    getServer() {
        return this.app;
    }
    listen() {
        this.app.listen({
            host: '0.0.0.0',
            port: this.PORT,
        }).then(() => {
            console.log(`HTTP Server running in port ${this.PORT}`);
        });
    }
    ;
    register() {
        this.app.register(cors_1.fastifyCors, {
            origin: "*",
            methods: ['POST', 'DELETE', 'GET', 'PUT', 'PATCH']
        });
    }
}
exports.App = App;
