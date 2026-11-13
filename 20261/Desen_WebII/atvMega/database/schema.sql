SET datestyle = 'ISO, DMY';
DROP TABLE IF EXISTS megasena;
CREATE TABLE megasena (
    concurso INTEGER NOT NULL,
    data_do_sorteio DATE NOT NULL,
    bola1 INTEGER NOT NULL,
    bola2 INTEGER NOT NULL,
    bola3 INTEGER NOT NULL,
    bola4 INTEGER NOT NULL,
    bola5 INTEGER NOT NULL,
    bola6 INTEGER NOT NULL,
    ganhadores_6_acertos INTEGER NOT NULL,
    cidade_uf VARCHAR(510) NULL,
    rateio_6_acertos VARCHAR(100) NOT NULL,
    ganhadores_5_acertos INTEGER NOT NULL,
    rateio_5_acertos VARCHAR(50) NOT NULL, 
    ganhadores_4_acertos INTEGER NOT NULL,
    rateio_4_acertos VARCHAR(50) NOT NULL, 
    acumulado_6_acertos VARCHAR(50) NOT NULL,
    arrecadacao_total VARCHAR(50) NOT NULL,
    estimativa_premio VARCHAR(50) NOT NULL,
    acumulado_sorteio_especial_mega_da_virada VARCHAR(50) NOT NULL,
    observacao VARCHAR(255) NULL,
    PRIMARY KEY(concurso)
);

COPY megasena
FROM '/database/megasena.csv'
WITH (
    FORMAT csv,
    DELIMITER ',',
    QUOTE '"',
    HEADER,
    NULL '',
    ENCODING 'UTF8'
);