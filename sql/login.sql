SELECT loja.excluirFuncao('loja','buscarUsuarioPorLogin');
CREATE OR REPLACE FUNCTION loja.buscarUsuarioPorLogin(pLogin varchar)

    /*
        SELECT * FROM loja.buscarUsuarioPorLogin('asd')
    */

    RETURNS json AS $$

    DECLARE vUsuario json;

    BEGIN
        
        vUsuario := (
            SELECT row_to_json(row) FROM (
                SELECT  u.id,
                        u.nome
                    FROM loja.usuario u
                    WHERE u.login ILIKE pLogin
            ) row
        );
        
        RETURN vUsuario;

    END;
$$
LANGUAGE plpgsql;