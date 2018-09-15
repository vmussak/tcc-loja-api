SELECT loja.excluirFuncao('loja','selecionarCliente');
CREATE OR REPLACE FUNCTION loja.selecionarCliente(pFiltro varchar)

    /*
        SELECT * FROM loja.selecionarCliente(null)
    */

    RETURNS json AS $$

    BEGIN
        
        IF pFiltro IS NOT NULL THEN
            pFiltro := '%' || pFiltro || '%';
        END IF;

        RETURN (
            SELECT array_to_json(array_agg(row)) FROM (
                SELECT  c.id,
                        c.nome,
                        c.cpf
                    FROM loja.cliente c
                    WHERE pFiltro IS NULL OR 
                        c.nome ILIKE pFiltro OR
                        c.cpf::varchar ILIKE pFiltro
            ) row
        );
        
    END;
$$
LANGUAGE plpgsql;






SELECT loja.excluirFuncao('loja','buscarCliente');
CREATE OR REPLACE FUNCTION loja.buscarCliente(pId integer)

    /*
        SELECT * FROM loja.buscarCliente(1)
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
                    WHERE c.id = pId
            ) row
        );
        
        RETURN vCliente;

    END;
$$
LANGUAGE plpgsql;








SELECT loja.excluirFuncao('loja','inserirCliente');
CREATE OR REPLACE FUNCTION loja.inserirCliente(
    pNome varchar(50),
    pCpf bigint,
    pDataNascimento date,
    pEmail varchar(250),
    pTelefone bigint
)

    /*
        SELECT * FROM loja.inserirCliente('Vinicius Mussak', 44444444444, '1995-08-11', 'vinicius.mussak@outlook.com', 12341234)
    */

    RETURNS integer AS $$

    DECLARE vId integer;

    BEGIN
        
       INSERT INTO loja.cliente
       (
           nome,
           cpf,
           datanascimento,
           email,
           telefone
       )
       VALUES
       (
           pNome,
           pCpf,
           pDataNascimento,
           pEmail,
           pTelefone
       ) RETURNING id INTO vId;

       RETURN vId;

    END;
$$
LANGUAGE plpgsql;






SELECT loja.excluirFuncao('loja','atualizarCliente');
CREATE OR REPLACE FUNCTION loja.atualizarCliente(
    pId integer,
    pNome varchar(50),
    pCpf bigint,
    pDataNascimento date,
    pEmail varchar(250),
    pTelefone bigint
)

    /*
        SELECT * FROM loja.atualizarCliente(1, 'Vinicius Mussak', 44444444444, '1995-08-11', 'vinicius.mussak@outlook.com', 12341234)
    */

    RETURNS integer AS $$

    BEGIN
        
        UPDATE loja.cliente
            SET nome = pNome,
                cpf = pCpf,
                email = pEmail,
                telefone = pTelefone
        WHERE id = pId;

       RETURN pId;

    END;
$$
LANGUAGE plpgsql;






SELECT loja.excluirFuncao('loja','excluirCliente');
CREATE OR REPLACE FUNCTION loja.excluirCliente(pId integer)

    /*
        SELECT * FROM loja.excluirCliente(1)
    */

    RETURNS void AS $$

    BEGIN
        
        DELETE FROM loja.cliente
            WHERE id = pId;

    END;
$$
LANGUAGE plpgsql;






SELECT loja.excluirFuncao('loja','verificaExclusaoCliente');
CREATE OR REPLACE FUNCTION loja.verificaExclusaoCliente(pId integer)

    /*
        SELECT * FROM loja.verificaExclusaoCliente(1)
    */

    RETURNS integer AS $$

    BEGIN
        
        RETURN (
            SELECT 1
                FROM loja.venda
                WHERE idcliente = pId
        );

    END;
$$
LANGUAGE plpgsql;





SELECT loja.excluirFuncao('loja','verificaExisteCliente');
CREATE OR REPLACE FUNCTION loja.verificaExisteCliente(pCpf bigint)

    /*
        SELECT * FROM loja.verificaExisteCliente(44444444444)
    */

    RETURNS integer AS $$

    BEGIN
        
        RETURN (
            SELECT c.id
                FROM loja.cliente c
                WHERE cpf = pCpf
        );

    END;
$$
LANGUAGE plpgsql;







SELECT loja.excluirFuncao('loja','atualizarFaceId');
CREATE OR REPLACE FUNCTION loja.atualizarFaceId(
    pId integer,
    pFaceId varchar(200)
)

    /*
        SELECT * FROM loja.atualizarFaceId(1, 'asdasdasdasdasdasd')
    */

    RETURNS integer AS $$

    BEGIN
        
        UPDATE loja.cliente
            SET faceid = pFaceId
        WHERE id = pId;

       RETURN pId;

    END;
$$
LANGUAGE plpgsql;
