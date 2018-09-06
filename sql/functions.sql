CREATE OR REPLACE FUNCTION loja.excluirFuncao(schemaFuncao text, nomeFuncao text)

    RETURNS text AS $BODY$

    /*
	Documentação
	Arquivo Fonte.....: DeletarFuncoes.sql
	Objetivo..........: Identifica todas as funções com um schema e nome específico e as deleta.
	Autor.............: Vinicius Mussak
 	Data..............: 03/03/2017
	Ex................: SELECT Seguranca.ExcluirFuncao('Seguranca', 'DeletarFuncoes');
	*/

    DECLARE funcrow RECORD;
            numfunctions smallint := 0;
            numparameters int;
            i int;
            paramtext text;
    BEGIN
        schemaFuncao := lower(schemaFuncao);
        nomeFuncao := lower(nomeFuncao);
        FOR funcrow IN SELECT proargtypes FROM pg_proc WHERE proname = nomeFuncao LOOP

            numparameters = array_upper(funcrow.proargtypes, 1) + 1;

            i = 0;
            paramtext = '';

            LOOP
                IF i < numparameters THEN
                    IF i > 0 THEN
                        paramtext = paramtext || ', ';
                    END IF;
                    paramtext = paramtext || (SELECT typname FROM pg_type WHERE oid = funcrow.proargtypes[i]);
                    i = i + 1;
                ELSE
                    EXIT;
                END IF;
            END LOOP;

            EXECUTE 'DROP FUNCTION ' || schemaFuncao || '.' || nomeFuncao || '(' || paramtext || ');';
            numfunctions = numfunctions + 1;

        END LOOP;

        RETURN '0';
    END;
$BODY$
LANGUAGE plpgsql;