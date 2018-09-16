SELECT loja.excluirFuncao('loja','reconhecerCliente');
CREATE OR REPLACE FUNCTION loja.reconhecerCliente(pFaceId varchar)

    /*
        SELECT * FROM loja.reconhecerCliente('15378123-2874-4f48-9995-011082c720c0')
    */

    RETURNS json AS $$

    DECLARE vCliente json;

    BEGIN
        
        vCliente := (
            SELECT row_to_json(row) FROM (
                SELECT  c.id
                    FROM loja.cliente c
                    WHERE c.faceId = pFaceId
            ) row
        );
        
        RETURN vCliente;

    END;
$$
LANGUAGE plpgsql;





SELECT loja.excluirFuncao('loja','registrarVisitaCliente');
CREATE OR REPLACE FUNCTION loja.registrarVisitaCliente(pIdCliente integer, pImagem varchar)

    /*
        SELECT * FROM loja.reconhecerCliente(1, '12323123123.jpg')
    */

    RETURNS integer AS $$

    DECLARE vId integer;

    BEGIN
        
        INSERT INTO loja.visitacliente(idcliente, imagem, datavisita)
            VALUES (pIdCliente, pImagem, now()) RETURNING id INTO vId;

        RETURN vId;

    END;
$$
LANGUAGE plpgsql;






SELECT loja.excluirFuncao('loja','buscarClientePorVisita');
CREATE OR REPLACE FUNCTION loja.buscarClientePorVisita(pIdVisita int)

    /*
        SELECT * FROM loja.buscarClientePorVisita(1)
    */

    RETURNS json AS $$

    DECLARE vCliente json;

    BEGIN
        
        vCliente := (
            SELECT row_to_json(row) FROM (
                SELECT  c.id,
                        c.nome,
                        vc.imagem as "imagemVisita",
                        COALESCE(uv.datavisita, vc.datavisita) as "dataUltimaVisita",
                        uc.datavenda as "dataVenda",
                        uc.valor,
                        uc.itens as "itensVenda"
                    FROM loja.visitacliente vc
                        INNER JOIN loja.cliente c
                            ON c.id = vc.idcliente
                        LEFT JOIN LATERAL (
                            SELECT v.datavisita
                                FROM loja.visitacliente v
                                WHERE v.idcliente = c.id
                                    AND v.id <> pIdVisita
                                ORDER BY v.datavisita DESC
                                LIMIT 1
                        ) uv ON true
                        LEFT JOIN LATERAL (
							SELECT  vd.datavenda,
									vd.valor,
									(	
										SELECT json_agg(o) FROM (
											SELECT  p.id,
													p.nome,
													p.tamanho,
													vi.quantidade
												FROM loja.vendaitem vi
													INNER JOIN loja.peca p
														ON vi.idpeca = p.id
												WHERE vi.idvenda = vd.id
										) o
									) as itens
								FROM loja.venda vd
								WHERE vd.idcliente = c.id
								ORDER BY vd.datavenda DESC
								LIMIT 1
						) uc ON true
                    WHERE vc.id = pIdVisita
            ) row
        );
        
        RETURN vCliente;

    END;
$$
LANGUAGE plpgsql

-- CREATE TABLE loja.visitacliente (
--     id serial NOT NULL,
--     idcliente integer NOT NULL,
--     imagem varchar(20) NOT NULL,
--     datavisita timestamp NOT NULL,
--     CONSTRAINT visitacliente_pk PRIMARY KEY (id)
-- );

-- ALTER TABLE loja.usuario OWNER TO postgres;

-- ALTER TABLE loja.visitacliente ADD CONSTRAINT visitacliente_cliente_fk FOREIGN KEY (idcliente)
-- REFERENCES loja.cliente (id) MATCH FULL
-- ON DELETE NO ACTION ON UPDATE NO ACTION;


-- ALTER TABLE loja.venda
-- 	ALTER COLUMN valor type DECIMAL(10,2)

-- ALTER TABLE loja.peca
-- 	ALTER COLUMN valor type DECIMAL(10,2)

-- ALTER TABLE loja.vendaitem
-- 	ADD COLUMN valorunitario DECIMAL(10,2)