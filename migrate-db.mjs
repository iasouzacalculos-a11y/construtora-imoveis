import { getDb } from './server/db.ts';
import { properties } from './drizzle/schema.ts';

const propertiesData = [
  { id: "1", title: "Residencial Luxo Moderno", type: "house", price: 2850000, address: "Rua das Palmeiras, 450", city: "São Paulo", state: "SP", latitude: -16.46042, longitude: -54.59678, bedrooms: 4, bathrooms: 5, area: 450, parking: 3, description: "Casa de luxo com arquitetura moderna, amplos espaços e acabamento de primeira linha. Localizada em condomínio fechado com segurança 24h.", status: "available" },
  { id: "2", title: "Apartamento Vista Verde", type: "apartment", price: 890000, address: "Av. das Nações, 1200", city: "São Paulo", state: "SP", latitude: -23.5505, longitude: -46.6333, bedrooms: 3, bathrooms: 2, area: 120, parking: 2, description: "Apartamento moderno com vista para área verde, acabamento premium e localização privilegiada próximo a shopping e metrô.", status: "available" },
  { id: "3", title: "Cobertura Skyline Premium", type: "penthouse", price: 4200000, address: "Av. Berrini, 3500", city: "São Paulo", state: "SP", latitude: -23.5505, longitude: -46.6333, bedrooms: 5, bathrooms: 6, area: 380, parking: 4, description: "Cobertura de alto padrão com piscina privativa, terraço panorâmico e vista deslumbrante da cidade. Acabamento de luxo em todos os ambientes.", status: "available" },
  { id: "4", title: "Townhouse Contemporânea", type: "townhouse", price: 1650000, address: "Rua dos Jardins, 890", city: "São Paulo", state: "SP", latitude: -23.5505, longitude: -46.6333, bedrooms: 3, bathrooms: 4, area: 220, parking: 2, description: "Townhouse moderna em condomínio exclusivo, com design contemporâneo e jardim privativo. Perfeita para famílias que buscam conforto e segurança.", status: "available" },
  { id: "5", title: "Apartamento Gourmet", type: "apartment", price: 1280000, address: "Rua Augusta, 2100", city: "São Paulo", state: "SP", latitude: -23.5505, longitude: -46.6333, bedrooms: 2, bathrooms: 2, area: 95, parking: 2, description: "Apartamento compacto com cozinha gourmet completa, ideal para quem aprecia gastronomia. Localização central com fácil acesso a restaurantes e cultura.", status: "available" },
  { id: "6", title: "Casa Condomínio Fechado", type: "house", price: 1950000, address: "Alameda dos Anjos, 320", city: "Barueri", state: "SP", latitude: -23.5505, longitude: -46.6333, bedrooms: 4, bathrooms: 3, area: 280, parking: 3, description: "Casa espaçosa em condomínio fechado com área de lazer completa, incluindo piscina, quadra e salão de festas. Ambiente familiar e seguro.", status: "available" },
  { id: "7", title: "Loft Industrial Chic", type: "apartment", price: 720000, address: "Rua da Consolação, 1500", city: "São Paulo", state: "SP", latitude: -23.5505, longitude: -46.6333, bedrooms: 1, bathrooms: 1, area: 65, parking: 1, description: "Loft moderno com estilo industrial, pé-direito alto e conceito aberto. Perfeito para jovens profissionais que buscam praticidade e design.", status: "reserved" },
  { id: "8", title: "Duplex Vista Parque", type: "apartment", price: 1580000, address: "Av. Ibirapuera, 2800", city: "São Paulo", state: "SP", latitude: -23.5505, longitude: -46.6333, bedrooms: 3, bathrooms: 3, area: 180, parking: 2, description: "Apartamento duplex com vista privilegiada para o parque, ambientes integrados e varanda gourmet. Lazer completo no condomínio.", status: "available" },
  { id: "9", title: "Apartamento Executivo Itaim", type: "apartment", price: 1450000, address: "Av. Brigadeiro Faria Lima, 1500", city: "São Paulo", state: "SP", latitude: -23.5505, longitude: -46.6333, bedrooms: 2, bathrooms: 2, area: 110, parking: 2, description: "Apartamento executivo no coração do Itaim, próximo a restaurantes e vida noturna. Acabamento premium com varanda gourmet.", status: "available" },
  { id: "10", title: "Casa Sobrado Vila Madalena", type: "house", price: 2200000, address: "Rua Aspicuelta, 600", city: "São Paulo", state: "SP", latitude: -23.5505, longitude: -46.6333, bedrooms: 3, bathrooms: 3, area: 250, parking: 2, description: "Casa com arquitetura contemporânea na Vila Madalena, bairro boêmio e cultural. Jardim paisagístico e pátio interno.", status: "available" },
];

async function migrate() {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    
    console.log("Starting migration of properties...");
    
    for (const prop of propertiesData) {
      await db.insert(properties).values({
        id: prop.id,
        title: prop.title,
        type: prop.type,
        price: prop.price,
        address: prop.address,
        city: prop.city,
        state: prop.state,
        latitude: prop.latitude,
        longitude: prop.longitude,
        bedrooms: prop.bedrooms,
        bathrooms: prop.bathrooms,
        area: prop.area,
        parking: prop.parking,
        description: prop.description,
        status: prop.status,
        mainImageUrl: "/hero-property.jpg",
      });
      console.log(`✓ Migrated property: ${prop.title}`);
    }
    
    console.log("Migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrate();
