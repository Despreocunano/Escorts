export type Model = {
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
    gallery: string[];
    created_at: string;
    updated_at: string;
    videos?: string[];
    rate?: number;
    area?: string;
    age?: number;
    weight?: number;
    skin_tone?: string;
    schedule?: string;
    location?: string;
    description?: string;
    whatsapp?: string;
    is_active: boolean;
    is_featured: boolean;
  }