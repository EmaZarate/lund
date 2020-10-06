
CREATE PROC [dbo].[spAlertRecovery_LegajosVencidos]
AS
/*
FECHA: 2020-05-20

DETALLE: Marca las personas que tiene legajo vencido

AUTOR: Diego Tripodi
*/
BEGIN

	DECLARE @dias_transcurridos INT
	DECLARE @dias_riesgo2_vencido INT
	DECLARE @dias_riesgo3_vencido INT

	SELECT @dias_riesgo2_vencido=[ActualValue]
	FROM [dbo].[SettingLog]	
	WHERE [SettingName]='VENCIMIENTO_LEGAJO_RIESGO_MEDIO'

	SELECT @dias_riesgo3_vencido=[ActualValue]
	FROM [dbo].[SettingLog]	
	WHERE [SettingName]='VENCIMIENTO_LEGAJO_RIESGO_ALTO'

	DECLARE pointer CURSOR FOR 
	
	SELECT 

	b.BusinessUnitId,
	c.BranchOfficeId,
	4 as CaseTypeId, --- legajo vencido
	8 as StatusId, --- informacion recibida 
	ISNULL(b.AssignedRisk, b.CalcRisk) AS RiskId,
	d.correoe AS ContactMail,
	d.direccion AS ContactAddress,
	d.codigopostal as ContactZipCode,
	d.provincia as ContactProvince,
	d.localidad AS ContactCity, 
	1 AS ContactStateId,
	1 AS ProducerId,
	a.PersonId,
	a.GroupCode AS OriginalPersonId,
	c.UpdateFile,
	a.UpdateDocumentDate,
	f.NombreProductor,
	f.CorreoProductor,
	f.CodigoProductor

	FROM [dbo].[person] a
	INNER JOIN [dbo].[PersonBusinessUnit] b
	ON (a.PersonId=b.PersonId AND 
	ISNULL(b.AssignedRisk, b.CalcRisk) IN (2,3))
	INNER JOIN [dbo].[case] c
	ON (a.PersonId=c.PersonId)
	INNER JOIN [dbo].[GA_vw_PersonasLavado] d
	ON (a.PersonKey=d.ClaveAutomatica 
	COLLATE SQL_Latin1_General_CP1_CI_AS)
	LEFT JOIN [dbo].[GA_vw_NovedadesAlertasLavado] f
	ON (a.PersonKey=f.ClaveAutomatica 
	COLLATE SQL_Latin1_General_CP1_CI_AS)
	WHERE 1=1
	AND a.ThirdParty=0
	AND a.GroupCode IS NULL

	DECLARE @insert BIT
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
	DECLARE @UpdateFile BIT
	DECLARE @UpdateDocumentDate DATETIME
	
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
	@ProducerId,
	@PersonId,
	@OriginalPersonId,
	@UpdateFile,
	@UpdateDocumentDate,
	@ProduceName,
	@ProduceMail,
	@ProduceCode

	WHILE ( @@FETCH_STATUS=0 ) 
	BEGIN 

		SET @insert = 0

		IF (@UpdateFile IS NULL)
		BEGIN
			SET @insert = 1
		END

		IF (@UpdateFile IS NOT NULL)
		BEGIN
			SET @dias_transcurridos = DATEDIFF(d, @UpdateDocumentDate, getdate())

			IF (@RiskId=2 AND @dias_riesgo2_vencido > @dias_transcurridos)
			BEGIN
				SET @insert = 1
			END

			IF (@RiskId=3 AND @dias_riesgo3_vencido > @dias_transcurridos)
			BEGIN
				SET @insert = 1
			END
		END
		
		IF (@insert = 1)
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
		@ProducerId,
		@PersonId,
		@OriginalPersonId,
		@UpdateFile,
		@UpdateDocumentDate,
		@ProduceName,
		@ProduceMail,
		@ProduceCode

	END

	CLOSE pointer
	DEALLOCATE pointer
END
