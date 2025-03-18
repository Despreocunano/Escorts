/*
  # Add sample models data

  1. Sample Data
    - Adds 6 example models with realistic measurements and characteristics
    - Includes main images and gallery images for each model
    - Uses placeholder image URLs that should be replaced with real images

  2. Data Structure
    - Each model has complete profile information
    - Gallery arrays contain multiple image URLs
    - All required fields are populated with realistic values
*/

INSERT INTO models (name, height, bust, waist, hips, shoe_size, eyes, hair, main_image, gallery) VALUES
(
  'Valentina Rodríguez',
  175, -- 1.75m
  86,  -- bust
  61,  -- waist
  89,  -- hips
  38,  -- EU shoe size
  'Café',
  'Castaño',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
  ARRAY[
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e2',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e3'
  ]
),
(
  'Catalina Silva',
  178,
  84,
  60,
  88,
  39,
  'Verde',
  'Rubio',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
  ARRAY[
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    'https://images.unsplash.com/photo-1534528741775-53994a69daec',
    'https://images.unsplash.com/photo-1534528741775-53994a69daed'
  ]
),
(
  'Isabella Martínez',
  173,
  85,
  62,
  90,
  37,
  'Miel',
  'Negro',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
  ARRAY[
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7f',
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7g'
  ]
),
(
  'Fernanda López',
  176,
  87,
  63,
  91,
  38,
  'Azul',
  'Castaño claro',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9',
  ARRAY[
    'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    'https://images.unsplash.com/photo-1517841905240-472988babdf8',
    'https://images.unsplash.com/photo-1517841905240-472988babdf7'
  ]
),
(
  'Camila Morales',
  174,
  83,
  59,
  87,
  37,
  'Verde',
  'Castaño oscuro',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04',
  ARRAY[
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04',
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e05',
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e06'
  ]
),
(
  'Antonia Vargas',
  177,
  86,
  62,
  89,
  39,
  'Café',
  'Negro',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
  ARRAY[
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c7',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c8'
  ]
);