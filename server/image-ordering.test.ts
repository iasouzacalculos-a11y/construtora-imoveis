import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { getDb } from './db';
import { properties, propertyImages } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import { getPropertyImages } from './db';

describe('Image Ordering System', () => {
  let testPropertyId: string;

  beforeAll(async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    
    testPropertyId = 'test-property-ordering';
    
    await db.insert(properties).values({
      id: testPropertyId,
      title: 'Test Property for Ordering',
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
      status: 'available',
    });

    await db.insert(propertyImages).values([
      { id: 'img-order-3', propertyId: testPropertyId, imageUrl: 'https://test.com/image3.jpg', order: 2 },
      { id: 'img-order-1', propertyId: testPropertyId, imageUrl: 'https://test.com/image1.jpg', order: 0 },
      { id: 'img-order-2', propertyId: testPropertyId, imageUrl: 'https://test.com/image2.jpg', order: 1 },
    ]);
  });

  afterAll(async () => {
    const db = await getDb();
    if (!db) return;
    
    await db.delete(propertyImages).where(eq(propertyImages.propertyId, testPropertyId));
    await db.delete(properties).where(eq(properties.id, testPropertyId));
  });

  it('should return images ordered by order column', async () => {
    const images = await getPropertyImages(testPropertyId);
    
    expect(images).toHaveLength(3);
    expect(images[0].imageUrl).toBe('https://test.com/image1.jpg');
    expect(images[0].order).toBe(0);
    expect(images[1].imageUrl).toBe('https://test.com/image2.jpg');
    expect(images[1].order).toBe(1);
    expect(images[2].imageUrl).toBe('https://test.com/image3.jpg');
    expect(images[2].order).toBe(2);
  });

  it('should maintain order even when inserted in different sequence', async () => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    
    await db.delete(propertyImages).where(eq(propertyImages.propertyId, testPropertyId));
    
    await db.insert(propertyImages).values([
      { id: 'img-random-5', propertyId: testPropertyId, imageUrl: 'https://test.com/last.jpg', order: 4 },
      { id: 'img-random-2', propertyId: testPropertyId, imageUrl: 'https://test.com/second.jpg', order: 1 },
      { id: 'img-random-4', propertyId: testPropertyId, imageUrl: 'https://test.com/fourth.jpg', order: 3 },
      { id: 'img-random-1', propertyId: testPropertyId, imageUrl: 'https://test.com/first.jpg', order: 0 },
      { id: 'img-random-3', propertyId: testPropertyId, imageUrl: 'https://test.com/third.jpg', order: 2 },
    ]);
    
    const images = await getPropertyImages(testPropertyId);
    
    expect(images).toHaveLength(5);
    expect(images[0].imageUrl).toBe('https://test.com/first.jpg');
    expect(images[1].imageUrl).toBe('https://test.com/second.jpg');
    expect(images[2].imageUrl).toBe('https://test.com/third.jpg');
    expect(images[3].imageUrl).toBe('https://test.com/fourth.jpg');
    expect(images[4].imageUrl).toBe('https://test.com/last.jpg');
  });
});
