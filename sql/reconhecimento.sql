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