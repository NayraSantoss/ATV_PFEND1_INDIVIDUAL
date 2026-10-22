USE aroma_importados;

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria_id INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    preco_antigo DECIMAL(10,2) NOT NULL,
    desconto INT NOT NULL,
    imagem VARCHAR(255) NOT NULL,
    estoque INT NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL
);

CREATE TABLE contatos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mensagem TEXT
);

INSERT INTO categorias (nome) VALUES
('Feminino'),
('Masculino');

INSERT INTO produtos (categoria_id, nome, preco, preco_antigo, desconto, imagem, estoque) VALUES
(1, 'Chanel No 5 Eau de Parfum', 1310.00, 1899.00, 30, '/imagens/chanel5.png', 10),
(1, 'Good Girl Eau de Parfum', 560.63, 800.90, 30, '/imagens/goodgirlazul.png', 10),
(1, 'La Vie Est Belle Vanille Nude', 370.30, 529.00, 30, '/imagens/lancome.png', 10),
(1, 'Libre Intense Eau de Parfum', 538.30, 769.00, 30, '/imagens/ysl.png', 10),
(1, 'La Panthère Eau de Parfum', 1184.40, 1692.00, 30, '/imagens/lapanthere.png', 10),
(1, 'Miss Dior Eau de Parfum', 447.30, 639.00, 30, '/imagens/missdior.png', 10),
(1, 'Scandal Eau de Parfum', 349.30, 499.00, 30, '/imagens/scandall.png', 10),
(1, 'L’Interdit Eau de Parfum', 405.30, 579.00, 30, '/imagens/givanchy.png', 10),
(1, 'Paradoxe Eau de Parfum', 489.30, 699.00, 30, '/imagens/prada.png', 10),
(1, '212 Eroes For Her Eau de Parfum', 594.30, 849.00, 30, '/imagens/212fem.png', 10),
(1, 'La Nuit Trésor Eau de Parfum', 909.30, 1299.00, 30, '/imagens/lanuittresor.png', 10),
(1, 'Lady Million Eau de Parfum', 328.30, 469.00, 30, '/imagens/ladymilion.png', 10),
(1, 'Hypnotic Poison Eau de Parfum', 563.50, 805.00, 30, '/imagens/poison.png', 10),
(1, 'Born in Roma Donna Eau de Parfum', 597.10, 853.00, 30, '/imagens/valentinofem.png', 10),
(2, 'Sauvage Eau de Parfum', 879.20, 1256.00, 30, '/imagens/sauvagemasc.png', 10),
(2, 'Scandal Pour Homme Le Parfum', 594.30, 849.00, 30, '/imagens/scandalmasc.png', 10),
(2, 'Born in Roma Uomo Extradose', 825.30, 1179.00, 30, '/imagens/valentinomasc.png', 10),
(2, '1 Million Elixir', 629.30, 899.00, 30, '/imagens/onemilionmasc.png', 10),
(2, 'Polo Green Eau de Toilette', 642.60, 918.00, 30, '/imagens/raulflourent.png', 10),
(2, 'Invictus Victory Eau de Parfum', 492.10, 703.00, 30, '/imagens/invictusmasc.png', 10),
(2, '212 Heroes Forever Young Eau de Toilette', 489.30, 699.00, 30, '/imagens/212masc.png', 10),
(2, 'Phantom Eau de Toilette', 538.30, 769.00, 30, '/imagens/rabannemasc.png', 10),
(2, 'Eros Eau de Parfum', 559.30, 799.00, 30, '/imagens/erosmasc.png', 10),
(2, 'Le Male Elixir', 622.30, 889.00, 30, '/imagens/jeanpmasc.png', 10),
(2, 'The Blazing Mister Sam Eau de Parfum', 1813.00, 2590.00, 30, '/imagens/penhaligonsmasc.png', 10),
(2, 'Gentleman Reserve Privée Eau de Parfum', 601.30, 859.00, 30, '/imagens/givanchymasc.png', 10),
(2, 'Bad Boy Eau de Toilette', 545.30, 779.00, 30, '/imagens/carolinehmasc.png', 10),
(2, 'The Most Wanted Parfum Intense', 615.30, 879.00, 30, '/imagens/azzaromasc.png', 10);

SELECT * FROM produtos;
