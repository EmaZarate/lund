
CREATE PROCEDURE [dbo].[spWS_GetSO]
(
@cuit VARCHAR(50),
@resp VARCHAR(8000) OUTPUT
)
AS
/*
FECHA: 2020-05-20
DETALLE: invoca el webservices sujetos obligados
AUTOR: Diego Tripodi
*/
BEGIN
    DECLARE @Object INT
    DECLARE @ResponseText VARCHAR(8000)
	DECLARE @url VARCHAR(2000)
	SET @url = 'https://sro.uif.gob.ar/SROAPI/api/sujetoObligado/consulta/'+TRIM(@cuit)
    EXEC [dbo].[sp_OACreate] 'MSXML2.XMLHTTP', @Object OUT;
    EXEC [dbo].[sp_OAMethod] @Object, 'open', NULL, 'get', @url,'false'
    EXEC [dbo].[sp_OAMethod] @Object, 'send'
    EXEC [dbo].[sp_OAMethod] @Object, 'responseText', @ResponseText OUTPUT
	SET @resp=UPPER(TRIM(ISNULL(@ResponseText,'[]')))
	--- SELECT @resp
    EXEC [dbo].[sp_OADestroy] @Object 
END
