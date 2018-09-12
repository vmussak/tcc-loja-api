SELECT loja.excluirFuncao('loja','selecionarTipoPeca');
CREATE OR REPLACE FUNCTION loja.selecionarTipoPeca()

    /*
        SELECT * FROM loja.selecionarTipoPeca()
    */

    RETURNS json AS $$

    BEGIN
        
        RETURN (
            SELECT array_to_json(array_agg(row)) FROM (
                SELECT  t.id,
                        t.nome
                    FROM loja.tipopeca t
            ) row
        );
        
    END;
$$
LANGUAGE plpgsql;