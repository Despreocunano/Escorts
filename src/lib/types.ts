export interface Model {
    id: string;
    name: string;
    height: number;
    bust: number;
    waist: number;
    hips: number;
    shoe_size: number;
    eyes: string;
    hair: string;
    main_image: string;
    gallery?: string[];
    videos?: string[];
    created_at?: string;
    updated_at?: string;
    location?: string;
    rate?: number;
    area?: string;
    schedule?: string;
    skin_tone?: string;
    age?: number;
    weight?: number;
    description?: string;
    whatsapp?: string;
  }