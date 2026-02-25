import type { Client } from "../generated/prisma";
import { ClientCreate, ClientUpdate, IClientRepository } from "../interfaces/client.interface";
import { prisma } from "../DB/prisma.config";

export class ClientRepository implements IClientRepository {
    async create(data: ClientCreate): Promise<Client> {
        return await prisma.client.create({
            data: {
                ownerName: data.ownerName,
                email: data.email,
                businessName: data.businessName,
                phone: data.phone,
                slug: data.slug,
                primaryColor: data.primaryColor,
            },
        });
    }

    async findById(id: string): Promise<Client | null> {
        return await prisma.client.findUnique({
            where: { id },
        });
    }

    async findByEmail(email: string): Promise<Client | null> {
        return await prisma.client.findUnique({
            where: { email },
        });
    }

    async findBySlug(slug: string): Promise<Client | null> {
        return await prisma.client.findUnique({
            where: { slug },
        });
    }

    async update(id: string, data: ClientUpdate): Promise<Client> {
        return await prisma.client.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.client.delete({
            where: { id },
        });
    }

    async listAll(): Promise<Client[]> {
        return await prisma.client.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
}