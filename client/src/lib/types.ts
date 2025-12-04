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
  status: "available" | "sold" | "reserved";
}

export interface FilterOptions {
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  city?: string;
}
