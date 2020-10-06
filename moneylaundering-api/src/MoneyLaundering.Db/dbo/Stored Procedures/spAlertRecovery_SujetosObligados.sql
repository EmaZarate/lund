
CREATE PROC [dbo].[spAlertRecovery_SujetosObligados]
AS
/*
FECHA: 2020-05-20

DETALLE: Recorre la tabla en base a las posibles personas de SO

AUTOR: Diego Tripodi
*/

BEGIN

	DECLARE pointer CURSOR FOR 
	
	SELECT 
	b.BusinessUnitId,
	1,
	12 as CaseTypeId, --- Sujeto Obligado no inscripto
	8 as StatusId, --- informacion recibida 
	ISNULL(b.AssignedRisk, b.CalcRisk) AS RiskId,
	d.correoe AS ContactMail,
	d.direccion AS ContactAddress,
	d.codigopostal as ContactZipCode,
	d.provincia as ContactProvince,
	d.localidad AS ContactCity, 
	1 AS ContactStateId,
	a.PersonId,
	a.GroupCode AS OriginalPersonId,
	a.UpdateDocumentDate,
	a.cuit,
	f.NombreProductor,
	f.CorreoProductor,
	f.CodigoProductor

	FROM [dbo].[person] a
	INNER JOIN [dbo].[PersonBusinessUnit] b
	ON (a.PersonId=b.PersonId AND 
	ISNULL(b.AssignedRisk, b.CalcRisk) IN (2,3))
	INNER JOIN [dbo].[GA_vw_PersonasLavado] d
	ON (a.PersonKey=d.ClaveAutomatica 
	COLLATE SQL_Latin1_General_CP1_CI_AS)	
	INNER JOIN [dbo].[GA_vw_NovedadesAlertasLavado] f
	ON (a.PersonKey=f.ClaveAutomatica 
	COLLATE SQL_Latin1_General_CP1_CI_AS)
	WHERE 1=1
	AND a.ThirdParty=0
	AND a.GroupCode IS NULL
	AND a.RegisterUIF IS NULL

	DECLARE @BusinessUnitId INT
	DECLARE @BranchOfficeId INT
	DECLARE @CaseTypeId INT
	DECLARE @StatusId INT
	DECLARE @RiskId INT
	DECLARE @ContactMail VARCHAR(300)
	DECLARE @ContactAddress VARCHAR(300)
	DECLARE @ContactZipCode INT
	DECLARE @ContactProvince VARCHAR(150)
	DECLARE @ContactCity VARCHAR(150)
	DECLARE @ContactStateId INT
	DECLARE @ProducerId INT
	DECLARE @PersonId INT
	DECLARE @OriginalPersonId INT
	DECLARE @UpdateDocumentDate DATETIME
	DECLARE @Cuit VARCHAR(50)

	DECLARE @ProduceName VARCHAR(200)
	DECLARE @ProduceMail VARCHAR(200)
	DECLARE @ProduceCode VARCHAR(50)	

	OPEN pointer

	--- FETCH ---
	FETCH NEXT FROM pointer 
	INTO 
	@BusinessUnitId,
	@BranchOfficeId,
	@CaseTypeId, 
	@StatusId,
	@RiskId,
	@ContactMail,
	@ContactAddress,
	@ContactZipCode,
	@ContactProvince,
	@ContactCity, 
	@ContactStateId,
	@PersonId,
	@OriginalPersonId,
	@UpdateDocumentDate,
	@Cuit,
	@ProduceName,
	@ProduceMail,
	@ProduceCode

	WHILE ( @@FETCH_STATUS=0 ) 
	BEGIN 
		DECLARE @resp VARCHAR(max)
		EXEC [dbo].[spWS_GetSO] @Cuit, @resp OUTPUT

		IF (@resp!='[]')
		BEGIN
			UPDATE [dbo].[person] 
			SET RegisterUIF=1
			WHERE personid=@PersonId
		END

		IF (@resp='[]')
		BEGIN
			
			SELECT @ProducerId=ProducerId
			FROM [dbo].[Producer]
			WHERE OriginCode=@ProduceCode
			
			IF (@ProducerId IS NULL)
			BEGIN
				INSERT INTO [dbo].[Producer]
				(
				BusinessUnitId,
				ProduceName,
				Mail,
				OriginCode
				)
				VALUES
				(
				@BusinessUnitId,
				@ProduceName,
				@ProduceMail,
				@ProduceCode
				)
				SELECT @ProducerId=@@IDENTITY
			END

			INSERT INTO [dbo].[case]
			(
			[BusinessUnitId],
			[BranchOfficeId],
			[CaseTypeId],
			[StatusId],
			[RiskId],
			[CreateDate],
			[ContactMail],
			[ContactAddress],
			[ContactZipCode],
			[ContactProvince],
			[ContactCity],
			[ContactStateId],
			[ProducerId],
			[PersonId],
			[OriginalPersonId]
			)
			VALUES
			(
			@BusinessUnitId,
			@BranchOfficeId,
			@CaseTypeId, 
			@StatusId,
			@RiskId,
			getdate(),
			@ContactMail,
			@ContactAddress,
			@ContactZipCode,
			@ContactProvince,
			@ContactCity, 
			@ContactStateId,
			@ProducerId,
			@PersonId,
			@OriginalPersonId
			)
		END

		FETCH NEXT FROM pointer 
		INTO 
		@BusinessUnitId,
		@BranchOfficeId,
		@CaseTypeId, 
		@StatusId,
		@RiskId,
		@ContactMail,
		@ContactAddress,
		@ContactZipCode,
		@ContactProvince,
		@ContactCity, 
		@ContactStateId,
		@PersonId,
		@OriginalPersonId,
		@UpdateDocumentDate,
		@Cuit,
		@ProduceName,
		@ProduceMail,
		@ProduceCode

	END

	CLOSE pointer
	DEALLOCATE pointer
END
