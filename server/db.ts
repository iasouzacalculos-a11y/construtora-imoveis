import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, properties, propertyImages, InsertProperty, InsertPropertyImage } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

// Property queries
export async function getAllProperties() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(properties);
}

export async function getPropertyById(id: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(properties).where(eq(properties.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createProperty(property: InsertProperty) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(properties).values(property);
}

export async function getPropertyImages(propertyId: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select()
    .from(propertyImages)
    .where(eq(propertyImages.propertyId, propertyId))
    .orderBy(propertyImages.order);
}

export async function addPropertyImage(image: InsertPropertyImage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(propertyImages).values(image);
}

export async function updatePropertyId(oldId: string, newId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(properties).set({ id: newId }).where(eq(properties.id, oldId));
  await db.update(propertyImages).set({ propertyId: newId }).where(eq(propertyImages.propertyId, oldId));
}

export async function updateProperty(id: string, updates: Partial<InsertProperty>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(properties).set(updates).where(eq(properties.id, id));
}

export async function updateImageOrder(imageId: string, order: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(propertyImages).set({ order }).where(eq(propertyImages.id, imageId));
}

export async function deletePropertyImage(imageId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(propertyImages).where(eq(propertyImages.id, imageId));
}


// Contact Message queries
export async function createContactMessage(message: {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  assunto: string;
  mensagem: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { contactMessages } = await import("../drizzle/schema");
  await db.insert(contactMessages).values(message);
}

// Broker Application queries
export async function createBrokerApplication(application: {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  creci: string;
  experiencia?: string;
  regiao?: string;
  mensagem?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { brokerApplications } = await import("../drizzle/schema");
  await db.insert(brokerApplications).values(application);
}


export async function updatePropertyFeatured(propertyId: string, featured: boolean) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(properties).set({ featured }).where(eq(properties.id, propertyId));
}
