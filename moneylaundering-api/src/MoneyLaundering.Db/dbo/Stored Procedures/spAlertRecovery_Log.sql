CREATE PROC [dbo].[spAlertRecovery_Log]
(
@procedure varchar(50),
@state varchar(50)
)
AS
/*
FECHA: 2020-05-20

DETALLE: Genera el log de estado de los procesos

AUTOR: Diego Tripodi
*/
BEGIN
	INSERT INTO [dbo].[AlertRecoveryLog] 
	VALUES (@procedure, @state, null, getdate())
END
