/*
  # Create Models Schema

  1. New Tables
    - `models`
      - `id` (uuid, primary key)
      - `name` (text)
      - `height` (integer, in cm)
      - `bust` (integer, in cm)
      - `waist` (integer, in cm)
      - `hips` (integer, in cm)
      - `shoe_size` (integer)
      - `eyes` (text)
      - `hair` (text)
      - `main_image` (text, URL)
      - `gallery` (text[], URLs)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `admins`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to models
    - Add policies for admin write access to models
*/

-- Create models table
CREATE TABLE models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  height integer NOT NULL,
  bust integer NOT NULL,
  waist integer NOT NULL,
  hips integer NOT NULL,
  shoe_size integer NOT NULL,
  eyes text NOT NULL,
  hair text NOT NULL,
  main_image text NOT NULL,
  gallery text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create admins table
CREATE TABLE admins (
  id uuid PRIMARY KEY REFERENCES auth.users,
  email text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE models ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" ON models
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin full access" ON models
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.id = auth.uid()
    )
  );

CREATE POLICY "Allow admin access to admin table" ON admins
  FOR ALL
  TO authenticated
  USING (id = auth.uid());