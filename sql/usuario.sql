SELECT loja.excluirFuncao('loja','selecionarUsuario');
CREATE OR REPLACE FUNCTION loja.selecionarUsuario(pFiltro varchar)

    /*
        SELECT * FROM loja.selecionarUsuario(null)
    */

    RETURNS json AS $$

    BEGIN
        
        IF pFiltro IS NOT NULL THEN
            pFiltro := '%' || pFiltro || '%';
        END IF;

        RETURN (
            SELECT array_to_json(array_agg(row)) FROM (
                SELECT  u.id,
                        u.nome,
                        u.login
                    FROM loja.usuario u
                    WHERE pFiltro IS NULL OR 
                        u.nome ILIKE pFiltro OR
                        u.login ILIKE pFiltro
            ) row
        );
        
    END;
$$
LANGUAGE plpgsql;






SELECT loja.excluirFuncao('loja','buscarUsuario');
CREATE OR REPLACE FUNCTION loja.buscarUsuario(pId integer)

    /*
        SELECT * FROM loja.buscarUsuario(1)
    */

    RETURNS json AS $$

    DECLARE vUsuario json;

    BEGIN
        
        vUsuario := (
            SELECT row_to_json(row) FROM (
                SELECT  u.id,
                        u.nome,
                        u.login
                    FROM loja.usuario u
                    WHERE u.id = pId
            ) row
        );
        
        RETURN vUsuario;

    END;
$$
LANGUAGE plpgsql;








SELECT loja.excluirFuncao('loja','inserirUsuario');
CREATE OR REPLACE FUNCTION loja.inserirUsuario(pNome varchar, pLogin varchar, pSenha varchar)

    /*
        SELECT * FROM loja.inserirUsuario('Arvoros', 'arvoros', 'teste123')
    */

    RETURNS integer AS $$

    DECLARE vId integer;

    BEGIN
        
       INSERT INTO loja.usuario
       (
           nome,
           login,
           senha
       )
       VALUES
       (
           pNome,
           pLogin,
           md5(pSenha)
       ) RETURNING id INTO vId;

       RETURN vId;

    END;
$$
LANGUAGE plpgsql;






SELECT loja.excluirFuncao('loja','atualizarUsuario');
CREATE OR REPLACE FUNCTION loja.atualizarUsuario(pId integer, pNome varchar, pLogin varchar, pSenha varchar)

    /*
        SELECT * FROM loja.atualizarUsuario(2, 'Arvoros', 'arvoros', 'teste123')
    */

    RETURNS integer AS $$

    DECLARE vId integer;

    BEGIN
        
        UPDATE loja.usuario
            SET nome = pNome,
                login = pLogin,
                senha = COALESCE(md5(pSenha), senha)
        WHERE id = pId;

       RETURN pId;

    END;
$$
LANGUAGE plpgsql;






SELECT loja.excluirFuncao('loja','excluirUsuario');
CREATE OR REPLACE FUNCTION loja.excluirUsuario(pId integer)

    /*
        SELECT * FROM loja.excluirUsuario(3)
    */

    RETURNS void AS $$

    DECLARE vId integer;

    BEGIN
        
        DELETE FROM loja.usuario
            WHERE id = pId;

    END;
$$
LANGUAGE plpgsql;





SELECT loja.excluirFuncao('loja','verificaExisteUsuario');
CREATE OR REPLACE FUNCTION loja.verificaExisteUsuario(pLogin varchar)

    /*
        SELECT * FROM loja.verificaExisteUsuario('mussak')
    */

    RETURNS integer AS $$

    BEGIN
        
        RETURN (
            SELECT id
                FROM loja.usuario
                WHERE login ILIKE pLogin
        );

    END;
$$
LANGUAGE plpgsql;