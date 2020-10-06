
CREATE PROC [dbo].[spAlertRecovery_PepClientes]
AS
/*
FECHA: 2020-05-20

DETALLE: Marca como PEP a las personas

AUTOR: Diego Tripodi
*/

BEGIN

	DECLARE @dias_transcurridos INT
	DECLARE @dias_revalidacion_listas INT

	SELECT @dias_revalidacion_listas=[ActualValue]
	FROM [dbo].[SettingLog]	
	WHERE [SettingName]='DIAS_REVALIDACION_LISTAS'

	DECLARE pointer CURSOR FOR 
	
	SELECT 
	a.PersonId,
	a.FirstName+' '+a.LastName AS [FullName],
	a.CheckListDate
	FROM [dbo].[person] a
	WHERE 1=1
	AND a.ThirdParty=0
	AND a.GroupCode IS NULL

	DECLARE @PersonId INT
	DECLARE @FullName VARCHAR(400)
	DECLARE @CheckListDate DATETIME
	DECLARE @update BIT

	OPEN pointer

	--- FETCH ---
	FETCH NEXT FROM pointer 
	INTO 
	@PersonId,
	@FullName,
	@CheckListDate

	WHILE ( @@FETCH_STATUS=0 ) 
	BEGIN 
		SET @update = 0

		IF (@CheckListDate IS NULL)
		BEGIN
			SET @update = 1
		END

		IF (@CheckListDate IS NOT NULL)
		BEGIN
			SET @dias_transcurridos = DATEDIFF(d, @CheckListDate, getdate())

			IF (@dias_revalidacion_listas > @dias_transcurridos)
			BEGIN
				SET @update = 1
			END
		END
		
		IF (@update = 1)
		BEGIN
			DECLARE @resp VARCHAR(max)
			EXEC [dbo].[spWS_GetPEP] @FullName, @resp OUTPUT
			
			IF (@resp='PEPS-ARG')
			BEGIN
				UPDATE [dbo].[person] 
				SET PepSystem=1
				WHERE personid=@PersonId
			END

			IF (@resp='REPET-PERS')
			BEGIN
				UPDATE [dbo].[person] 
				SET Terrorist=1
				WHERE personid=@PersonId
			END
		END

		FETCH NEXT FROM pointer 
		INTO 
		@PersonId,
		@FullName,
		@CheckListDate
	END

	CLOSE pointer
	DEALLOCATE pointer

END
