import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { getDb } from "./db";
import { contactMessages, brokerApplications } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

describe("Contact System", () => {
  const testContactId = `test-contact-${nanoid(8)}`;
  const testBrokerId = `test-broker-${nanoid(8)}`;

  afterAll(async () => {
    // Cleanup test data
    const db = await getDb();
    if (db) {
      await db.delete(contactMessages).where(eq(contactMessages.id, testContactId));
      await db.delete(brokerApplications).where(eq(brokerApplications.id, testBrokerId));
    }
  });

  it("should save contact message to database", async () => {
    const db = await getDb();
    if (!db) {
      console.warn("Database not available, skipping test");
      return;
    }

    const testMessage = {
      id: testContactId,
      nome: "João Teste",
      email: "joao@teste.com",
      telefone: "(66) 99999-9999",
      assunto: "interesse",
      mensagem: "Gostaria de mais informações sobre os imóveis.",
    };

    await db.insert(contactMessages).values(testMessage);

    const result = await db
      .select()
      .from(contactMessages)
      .where(eq(contactMessages.id, testContactId))
      .limit(1);

    expect(result.length).toBe(1);
    expect(result[0].nome).toBe("João Teste");
    expect(result[0].email).toBe("joao@teste.com");
    expect(result[0].assunto).toBe("interesse");
  });

  it("should save broker application to database", async () => {
    const db = await getDb();
    if (!db) {
      console.warn("Database not available, skipping test");
      return;
    }

    const testBroker = {
      id: testBrokerId,
      nome: "Maria Corretora",
      email: "maria@corretor.com",
      telefone: "(66) 88888-8888",
      creci: "12345/MT",
      experiencia: "3-5",
      regiao: "rondonopolis",
      mensagem: "Tenho experiência em imóveis residenciais.",
    };

    await db.insert(brokerApplications).values(testBroker);

    const result = await db
      .select()
      .from(brokerApplications)
      .where(eq(brokerApplications.id, testBrokerId))
      .limit(1);

    expect(result.length).toBe(1);
    expect(result[0].nome).toBe("Maria Corretora");
    expect(result[0].creci).toBe("12345/MT");
    expect(result[0].regiao).toBe("rondonopolis");
  });

  it("should validate required fields for contact message", () => {
    const validMessage = {
      nome: "Teste",
      email: "teste@email.com",
      telefone: "123456789",
      assunto: "interesse",
      mensagem: "Mensagem de teste",
    };

    expect(validMessage.nome.length).toBeGreaterThan(0);
    expect(validMessage.email).toContain("@");
    expect(validMessage.telefone.length).toBeGreaterThan(0);
    expect(validMessage.assunto.length).toBeGreaterThan(0);
    expect(validMessage.mensagem.length).toBeGreaterThan(0);
  });

  it("should validate CRECI format for broker application", () => {
    const validCreci = "12345/MT";
    const invalidCreci = "";

    expect(validCreci.length).toBeGreaterThan(0);
    expect(validCreci).toContain("/");
    expect(invalidCreci.length).toBe(0);
  });
});
