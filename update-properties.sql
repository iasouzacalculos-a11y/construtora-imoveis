-- Script para atualizar imóveis no banco de dados
-- Mantém: ID 1 e todos com sigla GV
-- Substitui: todos os outros por novos imóveis da tabela

-- 1. Deletar imagens dos imóveis que serão removidos
DELETE FROM propertyImages WHERE propertyId IN ('2', '3', '4', '7', '8', '9', '10', '11', '13', '14', '15', '17', '18', '19', '20', '22', '23', '24', '25', '26', '28');

-- 2. Deletar imóveis antigos (exceto ID 1 e os com GV)
DELETE FROM properties WHERE id IN ('2', '3', '4', '7', '8', '9', '10', '11', '13', '14', '15', '17', '18', '19', '20', '22', '23', '24', '25', '26', '28');

-- 3. Inserir novos imóveis da tabela

-- Parque Universitário - Quadra 126 - Lote 03 (2 casas, R$ 320.000 cada)
INSERT INTO properties (id, title, type, price, address, city, state, latitude, longitude, bedrooms, bathrooms, area, parking, description, status) VALUES
('pu-qd126-lt3-a', 'Casa Parque Universitário', 'house', 320000, 'Quadra 126, Lote 03 - Parque Universitário', 'Rondonópolis', 'MT', -16.464897, -54.672404, 2, 1, 70, 1, 'Casa em excelente localização no Parque Universitário. Imóvel com acabamento de qualidade e pronto para morar.', 'available');

INSERT INTO properties (id, title, type, price, address, city, state, latitude, longitude, bedrooms, bathrooms, area, parking, description, status) VALUES
('pu-qd126-lt3-b', 'Casa Parque Universitário', 'house', 320000, 'Quadra 126, Lote 03 - Parque Universitário', 'Rondonópolis', 'MT', -16.464897, -54.672404, 2, 1, 70, 1, 'Casa em excelente localização no Parque Universitário. Imóvel com acabamento de qualidade e pronto para morar.', 'available');

-- Parque Universitário - Quadra 118 - Lote 06-7 (2 casas, R$ 295.000 cada)
INSERT INTO properties (id, title, type, price, address, city, state, latitude, longitude, bedrooms, bathrooms, area, parking, description, status) VALUES
('pu-qd118-lt6-a', 'Casa Parque Universitário', 'house', 295000, 'Quadra 118, Lote 06-7 - Parque Universitário', 'Rondonópolis', 'MT', -16.465843, -54.671483, 2, 1, 65, 1, 'Casa em excelente localização no Parque Universitário. Imóvel com acabamento de qualidade e pronto para morar.', 'available');

INSERT INTO properties (id, title, type, price, address, city, state, latitude, longitude, bedrooms, bathrooms, area, parking, description, status) VALUES
('pu-qd118-lt6-b', 'Casa Parque Universitário', 'house', 295000, 'Quadra 118, Lote 06-7 - Parque Universitário', 'Rondonópolis', 'MT', -16.465843, -54.671483, 2, 1, 65, 1, 'Casa em excelente localização no Parque Universitário. Imóvel com acabamento de qualidade e pronto para morar.', 'available');

-- Sunflower - Quadra 19 - Lote 30 (1 casa, R$ 545.000)
INSERT INTO properties (id, title, type, price, address, city, state, latitude, longitude, bedrooms, bathrooms, area, parking, description, status) VALUES
('sf-qd19-lt30', 'Casa Sunflower', 'house', 545000, 'Quadra 19, Lote 30 - Sunflower', 'Rondonópolis', 'MT', -16.4638611, -54.5955556, 3, 2, 120, 2, 'Casa ampla no condomínio Sunflower. Excelente acabamento e localização privilegiada.', 'available');

-- Sunflower - Quadra 16 - Lote 10 (2 casas, R$ 460.000 cada)
INSERT INTO properties (id, title, type, price, address, city, state, latitude, longitude, bedrooms, bathrooms, area, parking, description, status) VALUES
('sf-qd16-lt10-a', 'Casa Sunflower', 'house', 460000, 'Quadra 16, Lote 10 - Sunflower', 'Rondonópolis', 'MT', -16.465454, -54.597629, 3, 2, 100, 2, 'Casa ampla no condomínio Sunflower. Excelente acabamento e localização privilegiada.', 'available');

INSERT INTO properties (id, title, type, price, address, city, state, latitude, longitude, bedrooms, bathrooms, area, parking, description, status) VALUES
('sf-qd16-lt10-b', 'Casa Sunflower', 'house', 460000, 'Quadra 16, Lote 10 - Sunflower', 'Rondonópolis', 'MT', -16.465454, -54.597629, 3, 2, 100, 2, 'Casa ampla no condomínio Sunflower. Excelente acabamento e localização privilegiada.', 'available');

-- Vila Adriana - Quadra 47 - Lote 10 (1 casa, R$ 340.000)
INSERT INTO properties (id, title, type, price, address, city, state, latitude, longitude, bedrooms, bathrooms, area, parking, description, status) VALUES
('va-qd47-lt10', 'Casa Vila Adriana', 'house', 340000, 'R. Espírito Santo, 705 - Vila Adriana', 'Rondonópolis', 'MT', -16.4448068, -54.6604267, 2, 1, 75, 1, 'Casa bem localizada na Vila Adriana. Imóvel com ótimo acabamento e pronto para morar.', 'available');

-- Vila Adriana - Quadra 37 - Lote 03 (1 casa, R$ 590.000)
INSERT INTO properties (id, title, type, price, address, city, state, latitude, longitude, bedrooms, bathrooms, area, parking, description, status) VALUES
('va-qd37-lt3', 'Casa Vila Adriana', 'house', 590000, 'Alameda das Violetas, 421 - Vila Adriana', 'Rondonópolis', 'MT', -16.4467187, -54.6569776, 3, 2, 130, 2, 'Casa espaçosa na Vila Adriana. Excelente acabamento e localização privilegiada.', 'available');

-- Vila Adriana - Quadra 30 - Lote 04 (2 casas, R$ 350.000 e R$ 360.000)
INSERT INTO properties (id, title, type, price, address, city, state, latitude, longitude, bedrooms, bathrooms, area, parking, description, status) VALUES
('va-qd30-lt4-a', 'Casa Vila Adriana', 'house', 350000, 'Quadra 30, Lote 04 - Vila Adriana', 'Rondonópolis', 'MT', -16.44725, -54.6571111, 2, 1, 80, 1, 'Casa bem localizada na Vila Adriana. Imóvel com ótimo acabamento e pronto para morar.', 'available');

INSERT INTO properties (id, title, type, price, address, city, state, latitude, longitude, bedrooms, bathrooms, area, parking, description, status) VALUES
('va-qd30-lt4-b', 'Casa Vila Adriana', 'house', 360000, 'Quadra 30, Lote 04 - Vila Adriana', 'Rondonópolis', 'MT', -16.44725, -54.6571111, 2, 1, 85, 1, 'Casa bem localizada na Vila Adriana. Imóvel com ótimo acabamento e pronto para morar.', 'available');

-- Sunflower - Quadra 13 - Lote 22 (1 casa, R$ 495.000)
INSERT INTO properties (id, title, type, price, address, city, state, latitude, longitude, bedrooms, bathrooms, area, parking, description, status) VALUES
('sf-qd13-lt22', 'Casa Sunflower', 'house', 495000, 'Quadra 13, Lote 22 - Sunflower', 'Rondonópolis', 'MT', -16.46675, -54.59625, 3, 2, 110, 2, 'Casa ampla no condomínio Sunflower. Excelente acabamento e localização privilegiada.', 'available');
