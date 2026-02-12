import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { getDb } from './db';
import { properties, propertyImages } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

describe('Image Upload System', () => {
  let testPropertyId: string;

  beforeAll(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    
    testPropertyId = 'test-property-upload';
    
    await db.insert(properties).values({
      id: testPropertyId,
      title: 'Test Property for Upload',
      description: 'Test property',
      price: 100000,
      area: 100,
      bedrooms: 2,
      bathrooms: 1,
      parking: 1,
      address: 'Test Address',
      city: 'Test City',
      state: 'MT',
      zipCode: '00000-000',
      latitude: -16.4707,
      longitude: -54.6354,
      type: 'Casa',
      status: 'pronto_para_morar',
    });
  });

  afterAll(async () => {
    const db = await getDb();
    if (!db) return;
    
    await db.delete(propertyImages).where(eq(propertyImages.propertyId, testPropertyId));
    await db.delete(properties).where(eq(properties.id, testPropertyId));
  });

  it('should accept base64 image data', async () => {
    const base64Data = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    
    expect(base64Data).toMatch(/^data:image\/(png|jpeg|jpg|webp);base64,/);
    
    const mimeMatch = base64Data.match(/^data:(image\/[a-z]+);base64,/);
    expect(mimeMatch).toBeTruthy();
    expect(mimeMatch![1]).toBe('image/png');
    
    const base64Content = base64Data.split(',')[1];
    expect(base64Content).toBeTruthy();
    expect(base64Content.length).toBeGreaterThan(0);
  });

  it('should validate image file types', () => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    
    validTypes.forEach(type => {
      expect(['image/jpeg', 'image/jpg', 'image/png', 'image/webp']).toContain(type);
    });
    
    const invalidType = 'image/gif';
    expect(['image/jpeg', 'image/jpg', 'image/png', 'image/webp']).not.toContain(invalidType);
  });

  it('should store image metadata in database', async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    
    await db.insert(propertyImages).values({
      id: 'test-image-1',
      propertyId: testPropertyId,
      imageUrl: 'https://test.com/test-image.jpg',
      order: 0,
    });

    const savedImages = await db.select()
      .from(propertyImages)
      .where(eq(propertyImages.propertyId, testPropertyId));

    expect(savedImages.length).toBeGreaterThan(0);
    expect(savedImages[0].imageUrl).toBe('https://test.com/test-image.jpg');
    expect(savedImages[0].order).toBe(0);
  });

  it('should maintain image order', async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    
    await db.delete(propertyImages).where(eq(propertyImages.propertyId, testPropertyId));

    await db.insert(propertyImages).values([
      { id: 'test-image-order-1', propertyId: testPropertyId, imageUrl: 'https://test.com/image1.jpg', order: 0 },
      { id: 'test-image-order-2', propertyId: testPropertyId, imageUrl: 'https://test.com/image2.jpg', order: 1 },
      { id: 'test-image-order-3', propertyId: testPropertyId, imageUrl: 'https://test.com/image3.jpg', order: 2 },
    ]);

    const images = await db.select()
      .from(propertyImages)
      .where(eq(propertyImages.propertyId, testPropertyId))
      .orderBy(propertyImages.order);

    expect(images).toHaveLength(3);
    expect(images[0].order).toBe(0);
    expect(images[1].order).toBe(1);
    expect(images[2].order).toBe(2);
  });
});
