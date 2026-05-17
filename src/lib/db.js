"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const client_1 = require("@prisma/client");
const adapter_neon_1 = require("@prisma/adapter-neon");
const prismaClientSingleton = () => {
    const adapter = new adapter_neon_1.PrismaNeon({
        connectionString: process.env.POSTGRES_PRISMA_URL ?? process.env.DATABASE_URL ?? '',
    });
    return new client_1.PrismaClient({ adapter });
};
exports.db = globalThis.prisma ?? prismaClientSingleton();
if (process.env.NODE_ENV !== 'production')
    globalThis.prisma = exports.db;
