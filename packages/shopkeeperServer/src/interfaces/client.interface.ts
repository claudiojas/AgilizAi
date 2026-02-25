import type { Client } from '../generated/prisma';

/**
 * Interface for the data needed to create a new Shopkeeper Client.
 */
export interface ClientCreate {
    ownerName: string;
    email: string;
    businessName: string;
    phone?: string;
    slug: string; // Strategic for multitenancy URLs
    primaryColor?: string;
}

/**
 * Interface for updating Shopkeeper Client profile and configurations.
 */
export interface ClientUpdate {
    ownerName?: string;
    phone?: string;
    businessName?: string;
    logoUrl?: string;
    primaryColor?: string;
    minOrderValue?: number;
    deliveryFee?: number;
    isActive?: boolean;
}

/**
 * Repository Contract (The "Handshake" between layers).
 * This ensures that any repository implementation (Prisma, Mock, etc.)
 * follows these exact business requirements.
 */
export interface IClientRepository {
    create(data: ClientCreate): Promise<Client>;
    findById(id: string): Promise<Client | null>;
    findByEmail(email: string): Promise<Client | null>;
    findBySlug(slug: string): Promise<Client | null>;
    update(id: string, data: ClientUpdate): Promise<Client>;
    delete(id: string): Promise<void>;
    listAll(): Promise<Client[]>;
}
