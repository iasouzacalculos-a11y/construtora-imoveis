import { boolean, date, decimal, int, mysqlEnum, mysqlTable, text, timestamp, varchar, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Properties table
export const properties = mysqlTable("properties", {
  id: varchar("id", { length: 36 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  price: int("price").notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 2 }).notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }).notNull(),
  longitude: decimal("longitude", { precision: 11, scale: 8 }).notNull(),
  bedrooms: int("bedrooms"),
  bathrooms: int("bathrooms"),
  area: int("area"),
  parking: int("parking"),
  description: text("description"),
  status: mysqlEnum("status", ["pronto_para_morar", "em_construcao", "vendido"]).notNull().default("pronto_para_morar"),
  deliveryDate: date("deliveryDate"),
  featured: boolean("featured").notNull().default(false),
  neighborhood: varchar("neighborhood", { length: 100 }),
  whatsappMessage: text("whatsappMessage"),
  mainImageUrl: varchar("mainImageUrl", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Property = typeof properties.$inferSelect;
export type InsertProperty = typeof properties.$inferInsert;

// Property Images table
export const propertyImages = mysqlTable("propertyImages", {
  id: varchar("id", { length: 36 }).primaryKey(),
  propertyId: varchar("propertyId", { length: 36 }).notNull(),
  imageUrl: varchar("imageUrl", { length: 500 }).notNull(),
  order: int("order").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PropertyImage = typeof propertyImages.$inferSelect;
export type InsertPropertyImage = typeof propertyImages.$inferInsert;

// Contact Messages table
export const contactMessages = mysqlTable("contactMessages", {
  id: varchar("id", { length: 36 }).primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  telefone: varchar("telefone", { length: 20 }).notNull(),
  assunto: varchar("assunto", { length: 100 }).notNull(),
  mensagem: text("mensagem").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;

// Broker Applications table (Corretor Parceiro)
export const brokerApplications = mysqlTable("brokerApplications", {
  id: varchar("id", { length: 36 }).primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  telefone: varchar("telefone", { length: 20 }).notNull(),
  creci: varchar("creci", { length: 50 }).notNull(),
  experiencia: varchar("experiencia", { length: 50 }),
  regiao: varchar("regiao", { length: 100 }),
  mensagem: text("mensagem"),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type BrokerApplication = typeof brokerApplications.$inferSelect;
export type InsertBrokerApplication = typeof brokerApplications.$inferInsert;

// Hero Media table (imagens/vídeos do carrossel do hero)
export const heroMedia = mysqlTable("heroMedia", {
  id: varchar("id", { length: 36 }).primaryKey(),
  mediaUrl: varchar("mediaUrl", { length: 500 }).notNull(),
  mediaType: mysqlEnum("mediaType", ["image", "video"]).notNull().default("image"),
  duration: int("duration").notNull().default(5), // tempo em segundos
  position: varchar("position", { length: 50 }).notNull().default("center center"), // object-position CSS
  order: int("order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type HeroMedia = typeof heroMedia.$inferSelect;
export type InsertHeroMedia = typeof heroMedia.$inferInsert;
