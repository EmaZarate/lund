
CREATE PROC [dbo].[spAlertRecovery_Personas]
AS
/*
FECHA: 2020-05-20

DETALLE: migra todas las personas de BI

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
	TRUNCATE TABLE [SettingLog]

	--- FIJAMOS LINKED SERVER A BI ---
	SET @server='DESA'

	--- FIJAMOS ACTUALIZACION ACTUAL ---
	SET @now_sync=CONVERT(varchar, getdate(), 121)

	--- TOMAMOS ULTIMA ACTUALIZACION ---
	SELECT @last_sync=[ActualValue]
	FROM [dbo].[SettingLog]	
	WHERE [SettingName]='ULTIMA_SINCRONIZACION_PERSONAS'

	---- RANGO BEFORE ---
	SET @before=''
	IF (@last_sync IS NOT NULL)
		SET @before=REPLACE(' AND FechaActualizacion > ''''@last_sync'''' ','@last_sync', @last_sync) 

	---- RANGO AFTER ---
	SET @after=''
	IF (@now_sync IS NOT NULL)
		SET @after= REPLACE(' AND FechaActualizacion <= ''''@now_sync'''' ', '@now_sync', @now_sync)				
		
    SET @tsql='INSERT INTO [dbo].[GA_vw_PersonasLavado] SELECT * FROM OPENQUERY(@server,''SELECT * FROM [dbo].[GA_vw_PersonasLavado] WHERE 1=1 @before @after '')'
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
	a.ActividadAFIP,
	a.Antiguedad,
	a.AñoFabricacion,
	a.Apellido,
	a.Categoria,
	a.ClaveAutomatica,
	a.CodigoPostal,
	a.CodUnidadNegocio,
	a.CorreoE,
	a.DescripcionActividadAFIP,
	a.Direccion,
	a.DocumentoNro,
	a.EsBeneficiarioTercero,
	a.EsPEP,
	a.EstadoCivil,
	a.FechaActualizacion,
	a.FechaNacimiento,
	a.FechaRegistracion,
	a.Localidad,
	a.MarcaModelo,
	a.Nacionalidad,
	a.NivelRiesgoActual,
	a.Nombre,
	a.NroSocio,
	a.NumeroRegistracion,
	a.PaisResidencia,
	a.Patente,
	a.PerfilFinanciero,
	a.Provincia,
	a.Sexo,
	CASE WHEN UPPER(a.SujetoObligado)='SI' THEN 1 ELSE 0 END AS SujetoObligado,
	a.Telefono,
	a.TipoDocumento,
	CASE WHEN a.TipoPersona='F' THEN 'H' ELSE a.TipoPersona END AS TipoPersona

	FROM  [dbo].[GA_vw_PersonasLavado] a
	--INNER JOIN [vw_PersonasLavado] b
	--ON (a.ClaveAutomatica=b.Clave)
		
	--- VAR-LOOKUP ---
	DECLARE @personId INT
	DECLARE @ActivityId INT
	DECLARE @LocationId INT
	DECLARE @CountryId INT
	DECLARE @StateId INT
	DECLARE @ZipCode INT

	--- VAR-CURSOR ---
	DECLARE @ActividadAFIP VARCHAR(50)
	DECLARE @Antiguedad VARCHAR(19)
	DECLARE @AnioFabricacion VARCHAR(20)
	DECLARE @Apellido VARCHAR(300)
	DECLARE @Categoria VARCHAR(150)
	DECLARE @ClaveAutomatica VARCHAR(8000)
	DECLARE @CodigoPostal INT
	DECLARE @CodUnidadNegocio SMALLINT
	DECLARE @CorreoE VARCHAR(300)
	DECLARE @DescripcionActividadAFIP VARCHAR(150)
	DECLARE @Direccion VARCHAR(300)
	DECLARE @DocumentoNro VARCHAR(50)
	DECLARE @EsBeneficiarioTercero INT
	DECLARE @EsPEP BIT
	DECLARE @EstadoCivil VARCHAR(50)
	DECLARE @FechaActualizacion DATETIME
	DECLARE @FechaNacimiento DATE
	DECLARE @FechaRegistracion INT
	DECLARE @Localidad VARCHAR(150)
	DECLARE @MarcaModelo VARCHAR(500)
	DECLARE @Nacionalidad VARCHAR(150)
	DECLARE @NivelRiesgoActual SMALLINT
	DECLARE @Nombre VARCHAR(300)
	DECLARE @NroSocio VARCHAR(100)
	DECLARE @NumeroRegistracion INT
	DECLARE @PaisResidencia VARCHAR(150)
	DECLARE @Patente VARCHAR(50)
	DECLARE @PerfilFinanciero MONEY
	DECLARE @Provincia VARCHAR(150)
	DECLARE @Sexo CHAR(1)
	DECLARE @SujetoObligado BIT
	DECLARE @Telefono VARCHAR(50)
	DECLARE @TipoDocumento VARCHAR(50)
	DECLARE @TipoPersona VARCHAR(50)

	--- OPEN ---
	OPEN pointer

	--- FETCH ---
	FETCH NEXT FROM pointer 
	INTO
	@ActividadAFIP,
	@Antiguedad,
	@AnioFabricacion,
	@Apellido,
	@Categoria,
	@ClaveAutomatica,
	@CodigoPostal,
	@CodUnidadNegocio,
	@CorreoE,
	@DescripcionActividadAFIP,
	@Direccion,
	@DocumentoNro,
	@EsBeneficiarioTercero,
	@EsPEP,
	@EstadoCivil,
	@FechaActualizacion,
	@FechaNacimiento,
	@FechaRegistracion,
	@Localidad,
	@MarcaModelo,
	@Nacionalidad,
	@NivelRiesgoActual,
	@Nombre,
	@NroSocio,
	@NumeroRegistracion,
	@PaisResidencia,
	@Patente,
	@PerfilFinanciero,
	@Provincia,
	@Sexo,
	@SujetoObligado,
	@Telefono,
	@TipoDocumento,
	@TipoPersona

	WHILE ( @@FETCH_STATUS=0 ) 
	BEGIN 
		--- ACTIVIDAD ---
		SELECT @ActivityId=ActivityId 
		FROM  [dbo].[Activity] 
		WHERE AfipCode=@ActividadAFIP

		IF (@ActivityId IS NULL)
		BEGIN			
			INSERT INTO [dbo].[Activity] 
			(
			[Description],
			[ObligatedSubject],
			[AfipCode]
			)
			VALUES
			(
			@DescripcionActividadAfip,
			@SujetoObligado,
			@ActividadAFIP
			)
			SELECT @ActivityId=@@IDENTITY
		END

		--- PAIS ---		
		SELECT @CountryId=CountryId
		FROM [dbo].[Country] 
		WHERE UPPER(RTRIM([Description]))=UPPER(RTRIM(@PaisResidencia))

		IF (@CountryId IS NULL)
		BEGIN
			INSERT INTO [dbo].[Country] ([Description]) VALUES (@PaisResidencia)
			SELECT @CountryId=@@IDENTITY
		END

		--- PROVINCIA ---
		SELECT @StateId=StateId
		FROM [dbo].[State] 
		WHERE UPPER(RTRIM([Description]))=UPPER(RTRIM(@Provincia))
		AND CountryId=@CountryId

		IF (@StateId IS NULL)
		BEGIN
			INSERT INTO [dbo].[State]
			(
			[Description],
			[CountryId]
			)
			VALUES
			(
			@Provincia,
			@CountryId
			)
			SELECT @StateId=@@IDENTITY
		END

		--- LOCALIDAD ---
		SELECT @LocationId=LocationId, @ZipCode=ZipCode
		FROM [dbo].[Location] 
		WHERE UPPER(RTRIM([Description]))=UPPER(RTRIM(@Localidad))
		AND StateId=@StateId

		IF (@LocationId IS NULL)
		BEGIN
			INSERT INTO [dbo].[Location]
			(
			[Description],
			[StateId],
			[ZipCode]
			)
			VALUES
			(
			@Localidad,
			@StateId,
			@CodigoPostal
			)
			SELECT @LocationId=@@IDENTITY
		END

		SELECT @personId=personId
		FROM [dbo].[person]
		WHERE PersonKey=@ClaveAutomatica

		IF (@personId IS NOT NULL)
			BEGIN				
				--- [Person] ---
				UPDATE [dbo].[person] SET 
				Active=1,
				ActivityId=@ActivityId,
				[Address]=@Direccion,
				BirthDate=@FechaNacimiento,
				BusinessUnitId=@CodUnidadNegocio,
				--- CheckListDate		
				--- CreationDate		
				Cuit=@DocumentoNro,
				FirstName=@Nombre,
				--- Group
				--- GroupCode
				LastName=@Apellido,
				LocationId=@LocationId,
				Mail=@CorreoE,
				Maritalstatus=@EstadoCivil,
				Nationality=@Nacionalidad,
				--- OfficialTypeId
				Pep=@EsPep,
				--- PepSystem	
				--- PersonId	
				PersonKey=@ClaveAutomatica,
				PersonType=@tipopersona,
				PhoneNumber=@Telefono,
				--- RegisterUIF	
				RegistrationDate=getdate(),
				RegistrationNumber=@NumeroRegistracion,
				--- TaxId		
				--- Terrorist		
				ThirdParty=@EsBeneficiarioTercero,
				--- UpdateDocumentDate		
				ZipCode=@ZipCode
				WHERE personId=@personId

				--- [PersonBusinessUnit] ---
				UPDATE [PersonBusinessUnit] SET 
				FinancialProfile=@NivelRiesgoActual,
				AssignedRisk=@NivelRiesgoActual		
				WHERE PersonId=@PersonId
				AND BusinessUnitId=@CodUnidadNegocio
			END

		IF (@personId IS NULL)
			BEGIN
				--- [Person] ---
				INSERT INTO [dbo].[person] 
				(
				Active,
				ActivityId,
				[Address],
				BirthDate,
				BusinessUnitId,
				--- CheckListDate		
				CreationDate,
				Cuit,
				FirstName,
				[Group],
				--- GroupCode
				LastName,
				LocationId,
				Mail,
				Maritalstatus,
				Nationality,
				--- OfficialTypeId
				Pep,
				--- PepSystem	
				--- PersonId	
				PersonKey,
				PersonType,
				PhoneNumber,
				--- RegisterUIF	
				RegistrationDate,
				RegistrationNumber,
				--- TaxId		
				--- Terrorist		
				ThirdParty,
				--- UpdateDocumentDate
				ZipCode		
				)
				VALUES
				(
				1,
				@ActivityId,
				@Direccion,
				@FechaNacimiento,
				@CodUnidadNegocio,
				--- CheckListDate		
				getdate(),		
				@DocumentoNro,
				@Nombre,
				0,
				--- GroupCode
				@Apellido,
				@LocationId,
				@CorreoE,
				@EstadoCivil,
				@Nacionalidad,
				--- OfficialTypeId
				@EsPEP,
				--- PepSystem	
				--- PersonId	
				@ClaveAutomatica,
				@tipopersona,
				@Telefono,
				--- RegisterUIF	
				getdate(),
				@NumeroRegistracion,
				--- TaxId		
				--- Terrorist		
				@EsBeneficiarioTercero,
				--- UpdateDocumentDate		
				@ZipCode
				)
				SELECT @personId=@@IDENTITY

				--- [PersonBusinessUnit] ---
				INSERT INTO [dbo].[PersonBusinessUnit]
				(
				PersonId,
				BusinessUnitId,
				FinancialProfile,
				CalcRisk,
				AssignedRisk,
				RiskId	
				)
				VALUES
				(
				@personId,
				@CodUnidadNegocio,
				@PerfilFinanciero,				
				@NivelRiesgoActual,
				@NivelRiesgoActual,
				@NivelRiesgoActual
				)
			END
		
		--- FETCH ---
		FETCH NEXT FROM pointer 
		INTO
		@ActividadAFIP,
		@Antiguedad,
		@AnioFabricacion,
		@Apellido,
		@Categoria,
		@ClaveAutomatica,
		@CodigoPostal,
		@CodUnidadNegocio,
		@CorreoE,
		@DescripcionActividadAFIP,
		@Direccion,
		@DocumentoNro,
		@EsBeneficiarioTercero,
		@EsPEP,
		@EstadoCivil,
		@FechaActualizacion,
		@FechaNacimiento,
		@FechaRegistracion,
		@Localidad,
		@MarcaModelo,
		@Nacionalidad,
		@NivelRiesgoActual,
		@Nombre,
		@NroSocio,
		@NumeroRegistracion,
		@PaisResidencia,
		@Patente,
		@PerfilFinanciero,
		@Provincia,
		@Sexo,
		@SujetoObligado,
		@Telefono,
		@TipoDocumento,
		@TipoPersona

		SET @personId=NULL
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
		'ULTIMA_SINCRONIZACION_PERSONAS',
		NULL,
		@now_sync
		)
	END
	
	--- SI EXISTE LA ACTUALIZAMOS ---
	IF (@last_sync IS NOT NULL)
	BEGIN
		UPDATE [dbo].[SettingLog]
		SET [OldValue]=@last_sync, [ActualValue]=@now_sync
		WHERE [SettingName]='ULTIMA_SINCRONIZACION_PERSONAS'
	END

END
