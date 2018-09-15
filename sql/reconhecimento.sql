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
                SELECT  c.id,
                        c.nome,
                        c.cpf,
                        c.dataNascimento as "dataNascimento",
                        c.email,
                        c.telefone
                    FROM loja.cliente c
                    WHERE c.faceId = pFaceId
            ) row
        );
        
        RETURN vCliente;

    END;
$$
LANGUAGE plpgsql;