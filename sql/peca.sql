SELECT loja.excluirFuncao('loja','selecionarPeca');
CREATE OR REPLACE FUNCTION loja.selecionarPeca(pFiltro varchar)

    /*
        SELECT * FROM loja.selecionarPeca(null)
    */

    RETURNS json AS $$

    BEGIN
        
        IF pFiltro IS NOT NULL THEN
            pFiltro := '%' || pFiltro || '%';
        END IF;

        RETURN (
            SELECT array_to_json(array_agg(row)) FROM (
                SELECT  p.id,
                        p.nome,
                        tp.nome as "nomeTipoPeca",
                        p.valor,
                        p.cor,
                        p.tamanho
                    FROM loja.peca p
						INNER JOIN loja.tipopeca tp
							ON p.idtipopeca = tp.id
                    WHERE pFiltro IS NULL OR 
                        p.nome ILIKE pFiltro OR
                        p.cor ILIKE pFiltro OR
                        tp.nome ILIKE pFiltro
            ) row
        );
        
    END;
$$
LANGUAGE plpgsql;






SELECT loja.excluirFuncao('loja','buscarPeca');
CREATE OR REPLACE FUNCTION loja.buscarPeca(pId integer)

    /*
        SELECT * FROM loja.buscarPeca(1)
    */

    RETURNS json AS $$

    DECLARE vPeca json;

    BEGIN
        
        vPeca := (
            SELECT row_to_json(row) FROM (
                SELECT  p.id,
                        p.idTipoPeca as "idTipoPeca",
                        p.nome,
                        p.tamanho,
                        p.valor,
                        p.cor,
                        p.quantidadeEstoque as "quantidadeEstoque"
                    FROM loja.peca p
                    WHERE p.id = pId
            ) row
        );
        
        RETURN vPeca;

    END;
$$
LANGUAGE plpgsql;








SELECT loja.excluirFuncao('loja','inserirPeca');
CREATE OR REPLACE FUNCTION loja.inserirPeca(
    pIdTipoPeca smallint,
    pNome varchar(50),
    pTamanho char(1),
    pValor money,
    pCor varchar(20),
    pQuantidadeEstoque integer
)

    /*
        SELECT * FROM loja.inserirPeca(1::smallint, 'Camiseta Adidas Lisa', 'M'::char, 57.5::money, 'Branco', 6)
    */

    RETURNS integer AS $$

    DECLARE vId integer;

    BEGIN
        
       INSERT INTO loja.peca
       (
           idTipoPeca,
           nome,
           tamanho,
           valor,
           cor,
           quantidadeEstoque
       )
       VALUES
       (
           pIdTipoPeca,
           pNome,
           pTamanho,
           pValor,
           pCor,
           pQuantidadeEstoque
       ) RETURNING id INTO vId;

       RETURN vId;

    END;
$$
LANGUAGE plpgsql;






SELECT loja.excluirFuncao('loja','atualizarPeca');
CREATE OR REPLACE FUNCTION loja.atualizarPeca(
    pId integer,
    pIdTipoPeca smallint,
    pNome varchar(50),
    pTamanho char(1),
    pValor money,
    pCor varchar(20),
    pQuantidadeEstoque integer
)

    /*
        SELECT * FROM loja.atualizarPeca(1, 1::smallint, 'Camiseta Adidas Listrada', 'M'::char, 57::money, 'Branco', 6)
    */

    RETURNS integer AS $$

    BEGIN
        
        UPDATE loja.peca
            SET idTipoPeca = pIdTipoPeca,
                nome = pNome,
                tamanho = pTamanho,
                valor = pValor,
                cor = pCor,
                quantidadeEstoque = pQuantidadeEstoque
        WHERE id = pId;

       RETURN pId;

    END;
$$
LANGUAGE plpgsql;






SELECT loja.excluirFuncao('loja','excluirPeca');
CREATE OR REPLACE FUNCTION loja.excluirPeca(pId integer)

    /*
        SELECT * FROM loja.excluirPeca(1)
    */

    RETURNS void AS $$

    BEGIN
        
        DELETE FROM loja.peca
            WHERE id = pId;

    END;
$$
LANGUAGE plpgsql;