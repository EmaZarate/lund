
CREATE PROCEDURE [dbo].[spWS_GetPEP]
(
@fullname VARCHAR(400),
@resp VARCHAR(8000) OUTPUT
)
AS
/*
FECHA: 2020-05-20
DETALLE: invoca el webservices PEP
AUTOR: Diego Tripodi
*/
BEGIN
    DECLARE @Object INT
    DECLARE @ResponseText VARCHAR(8000)
	DECLARE @url VARCHAR(2000)
	DECLARE @usr VARCHAR(50)
	DECLARE @pwd VARCHAR(50)
	SET @usr = 'scs.playft'
	SET @pwd = 'gNIfzweBA5WtgtwhsK7Spdu3ObrXCn0B'
	SET @url = 'http://systech-list.systechsa.com:8446/systechlist/?SEARCHSTR='+ UPPER(TRIM(@fullname)+'&usr='+@usr+'&pwd='+@pwd)
    EXEC [dbo].[sp_OACreate] 'MSXML2.XMLHTTP', @Object OUT;
    EXEC [dbo].[sp_OAMethod] @Object, 'open', NULL, 'get', @url,'false'
    EXEC [dbo].[sp_OAMethod] @Object, 'send'
    EXEC [dbo].[sp_OAMethod] @Object, 'responseText', @ResponseText OUTPUT
	SET @resp=UPPER(TRIM(ISNULL(@ResponseText,'[]')))
	--- SELECT @resp
    EXEC [dbo].[sp_OADestroy] @Object
END



