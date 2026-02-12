export interface Property {
  id: string;
  title: string;
  type: "apartment" | "house" | "penthouse" | "townhouse";
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    latitude?: number;
    longitude?: number;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    parking: number;
  };
  image: string;
  gallery?: string[];
  description: string;
  status: "pronto_para_morar" | "em_construcao" | "vendido";
  deliveryDate?: string;
}

export interface FilterOptions {
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  city?: string;
}
