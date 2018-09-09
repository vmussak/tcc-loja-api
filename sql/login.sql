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
                        u.nome,
                        u.login
                    FROM loja.usuario u
                    WHERE u.login ILIKE pLogin
            ) row
        );
        
        RETURN vUsuario;

    END;
$$
LANGUAGE plpgsql;




SELECT loja.excluirFuncao('loja','buscarUsuarioPorLoginSenha');
CREATE OR REPLACE FUNCTION loja.buscarUsuarioPorLoginSenha(pLogin varchar, pSenha varchar)

    /*
        SELECT * FROM loja.buscarUsuarioPorLoginSenha('mussak', 'teste123')
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
                    WHERE u.login ILIKE pLogin
                        AND u.senha = md5(pSenha)
            ) row
        );
        
        RETURN vUsuario;

    END;
$$
LANGUAGE plpgsql;