-- Drop existing table and type if they exist
DROP TABLE IF EXISTS rooms CASCADE;
DROP TYPE IF EXISTS size CASCADE;

-- Create type
CREATE TYPE size AS ENUM ('single', 'double', 'suite');

-- Create table
CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    size size NOT NULL,
    has_minibar BOOLEAN NOT NULL,
    is_available BOOLEAN NOT NULL
);

-- Insert seed data
INSERT INTO rooms (size, has_minibar, is_available) VALUES
('double', true, true),
('single', true, true),
('suite', false, true);
