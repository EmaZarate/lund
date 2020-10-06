
CREATE PROC [dbo].[spAlertRecovery_BI]
AS
/*
FECHA: 2020-05-20

DETALLE: Insertar un nuevo registro en la tabla CASOS según lo indicado

AUTOR: Diego Tripodi
*/
BEGIN

	--- GLOBALES ---
	DECLARE @tsql NVARCHAR(MAX)
	DECLARE @query VARCHAR(4000)
	DECLARE @before VARCHAR(100)
	DECLARE @after VARCHAR(100)
	DECLARE @now_sync VARCHAR(30)
	DECLARE @last_sync VARCHAR(30)
	DECLARE @server VARCHAR(50)

	--- LIMPIAAMOS LOG PORQUE POR AHORA NO APLICA ---
	TRUNCATE TABLE [dbo].[SettingLog]

	--- FIJAMOS LINKED SERVER A BI ---
	SET @server='DESA'

	--- FIJAMOS ACTUALIZACION ACTUAL ---
	SET @now_sync=CONVERT(varchar, getdate(), 121)

	--- TOMAMOS ULTIMA ACTUALIZACION ---
	SELECT @last_sync=[ActualValue]
	FROM [dbo].[SettingLog]	
	WHERE [SettingName]='ULTIMA_SINCRONIZACION_ALERTAS'

	---- RANGO BEFORE ---
	SET @before=''
	IF (@last_sync IS NOT NULL)
		SET @before=REPLACE(' AND FechaActualizacion > ''''@last_sync'''' ','@last_sync', @last_sync) 

	---- RANGO AFTER ---
	SET @after=''
	IF (@now_sync IS NOT NULL)
		SET @after= REPLACE(' AND FechaActualizacion <= ''''@now_sync'''' ', '@now_sync', @now_sync)				

    SET @tsql='INSERT INTO [dbo].[GA_vw_NovedadesAlertasLavado] SELECT * FROM OPENQUERY(@server,''SELECT * FROM [dbo].[GA_vw_NovedadesAlertasLavado] WHERE 1=1 @before @after '')'
	SET @tsql=REPLACE(@tsql, '@server',  @server)
	SET @tsql=REPLACE(@tsql, '@before', @before)
	SET @tsql=REPLACE(@tsql, '@after', @after)

/*
	--- LIMPIAMOS TABLA TEMPORARIA ---
	TRUNCATE TABLE [vw_PersonasLavado]
	--- TRAEMOS LOS DATOS ---
    EXEC (@tsql)
*/
	--- PROCESAMOS ---
	DECLARE pointer CURSOR FOR 
	
	SELECT 

	b.BusinessUnitId,
	1,
	f.TipoCaso,
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
	DECLARE @CaseType VARCHAR(50)
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
	@CaseType, 
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

		/*
			  (1,N'Nuevo Cliente',2)
			 ,(2,N'Disminución del Riesgo',2)
			 ,(3,N'Incremento del Riesgo',2)
			 ,(4,N'Legajo Vencido',2)
			 ,(5,N'Exceso en acumulado de pago de siniestros',3)
			 ,(6,N'Exceso en acumulado de primas',3)
			 ,(7,N'Operación de cliente incluido en lista gris',3)
			 ,(8,N'Exceso en suma asegurada (vehículos de alta gama)',3)
			 ,(9,N'Reintegro por cancelación de pólizas',3)
			 ,(10,N'Cambio en la condición de PEP',1)
			 ,(11,N'Cambio en la condición de Terrorista',1)
			 ,(12,N'Sujeto Obligado no inscripto',1)
		*/

		SET @CaseTypeId=1
		
		IF (@CaseType='SUMA_ASEGURADA')
			SET @CaseTypeId=8

		IF (@CaseType='OPERACION_CLIENTE_LISTA_GRIS')
			SET @CaseTypeId=7

		IF (@CaseType='ACUMULADO_PAGO_SINIESTROS')
			SET @CaseTypeId=5

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

		FETCH NEXT FROM pointer 
		INTO 
		@BusinessUnitId,
		@BranchOfficeId,
		@CaseType, 
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

	--- MARCAMOS LA TABLA SETEOS PORQUE TERMINAMOS ---
	--- SI NO EXISTE LA CREAMOS ---
	IF (@last_sync IS NULL)
	BEGIN
		INSERT INTO [dbo].[SettingLog]
		(
		[SettingName],
		[OldValue],
		[ActualValue]
		)
		VALUES
		(
		'ULTIMA_SINCRONIZACION_ALERTAS',
		NULL,
		@now_sync
		)
	END
	
	--- SI EXISTE LA ACTUALIZAMOS ---
	IF (@last_sync IS NOT NULL)
	BEGIN
		UPDATE [dbo].[SettingLog]
		SET [OldValue]=@last_sync, [ActualValue]=@now_sync
		WHERE [SettingName]='ULTIMA_SINCRONIZACION_ALERTAS'
	END

END



