-- 001_init.sql

CREATE TYPE public.size AS ENUM ('single', 'double', 'suite');

CREATE TABLE public.rooms (
    id SERIAL PRIMARY KEY,
    size public.size NOT NULL,
    has_minibar BOOLEAN NOT NULL,
    is_available BOOLEAN NOT NULL
);
