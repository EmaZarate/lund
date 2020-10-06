﻿GO


--MERGE generated by 'sp_generate_merge' stored procedure
--Originally by Vyas (http://vyaskn.tripod.com/code): sp_generate_inserts (build 22)
--Adapted for SQL Server 2008+ by Daniel Nolan (https://twitter.com/dnlnln)

SET NOCOUNT ON

SET IDENTITY_INSERT [Country] ON

MERGE INTO [Country] AS [Target]
USING (VALUES
  (1,N'Argentina')
) AS [Source] ([CountryId],[Description])
ON ([Target].[CountryId] = [Source].[CountryId])
WHEN MATCHED AND (
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = [Source].[Description]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([CountryId],[Description])
 VALUES([Source].[CountryId],[Source].[Description])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [Country]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[Country] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [Country] OFF
GO
SET NOCOUNT OFF
GO
SET NOCOUNT ON

SET IDENTITY_INSERT [State] ON

MERGE INTO [State] AS [Target]
USING (VALUES
  (1,N'Santa Fe',1)
 ,(2,N'Buenos Aires',1)
) AS [Source] ([StateId],[Description],[CountryId])
ON ([Target].[StateId] = [Source].[StateId])
WHEN MATCHED AND (
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL OR 
	NULLIF([Source].[CountryId], [Target].[CountryId]) IS NOT NULL OR NULLIF([Target].[CountryId], [Source].[CountryId]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = [Source].[Description], 
  [CountryId] = [Source].[CountryId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([StateId],[Description],[CountryId])
 VALUES([Source].[StateId],[Source].[Description],[Source].[CountryId])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [State]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[State] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [State] OFF
GO
SET NOCOUNT OFF
GO

SET NOCOUNT ON

SET IDENTITY_INSERT [Location] ON

MERGE INTO [Location] AS [Target]
USING (VALUES
  (4,N'Arroyo Seco',1,2128)
 ,(5,N'Rosario',1,2000)
) AS [Source] ([LocationId],[Description],[StateId],[ZipCode])
ON ([Target].[LocationId] = [Source].[LocationId])
WHEN MATCHED AND (
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL OR 
	NULLIF([Source].[StateId], [Target].[StateId]) IS NOT NULL OR NULLIF([Target].[StateId], [Source].[StateId]) IS NOT NULL OR 
	NULLIF([Source].[ZipCode], [Target].[ZipCode]) IS NOT NULL OR NULLIF([Target].[ZipCode], [Source].[ZipCode]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = [Source].[Description], 
  [StateId] = [Source].[StateId], 
  [ZipCode] = [Source].[ZipCode]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([LocationId],[Description],[StateId],[ZipCode])
 VALUES([Source].[LocationId],[Source].[Description],[Source].[StateId],[Source].[ZipCode])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [Location]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[Location] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [Location] OFF
GO
SET NOCOUNT OFF
GO

SET NOCOUNT ON

SET IDENTITY_INSERT [Status] ON

MERGE INTO [Status] AS [Target]
USING (VALUES
  (1,N'Nuevo',0)
 ,(2,N'Falso Positivo',1)
 ,(3,N'Desestimado',1)
 ,(4,N'Finalizado',1)
 ,(5,N'Cancelado',1)
 ,(6,N'Asignado Analista',0)
 ,(7,N'Información Requerida',0)
 ,(8,N'Información Recibida',0)
 ,(9,N'Asignado a Oficial de Cumplimiento',0)
 ,(10,N'Asignado Superior',0)
) AS [Source] ([StatusId],[Description],[Finisher])
ON ([Target].[StatusId] = [Source].[StatusId])
WHEN MATCHED AND (
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL OR 
	NULLIF([Source].[Finisher], [Target].[Finisher]) IS NOT NULL OR NULLIF([Target].[Finisher], [Source].[Finisher]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = [Source].[Description], 
  [Finisher] = [Source].[Finisher]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([StatusId],[Description],[Finisher])
 VALUES([Source].[StatusId],[Source].[Description],[Source].[Finisher])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [Status]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[Status] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [Status] OFF
GO
SET NOCOUNT OFF
GO

SET NOCOUNT ON

SET IDENTITY_INSERT [BranchOffice] ON

MERGE INTO [BranchOffice] AS [Target]
USING (VALUES
  (1,N'Arroyo Seco',N'sucursal@mail.com',N'San Martin 840',1,1,2128),
(2,N'Perez',N'sucursalperez@mail.com',N'Alberdi 840',1,1,2128)
) AS [Source] ([BranchOfficeId],[Description],[Mail],[Address],[StateId],[CountryId],[ZipCode])
ON ([Target].[BranchOfficeId] = [Source].[BranchOfficeId])
WHEN MATCHED AND (
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL OR 
	NULLIF([Source].[Mail], [Target].[Mail]) IS NOT NULL OR NULLIF([Target].[Mail], [Source].[Mail]) IS NOT NULL OR 
	NULLIF([Source].[Address], [Target].[Address]) IS NOT NULL OR NULLIF([Target].[Address], [Source].[Address]) IS NOT NULL OR 
	NULLIF([Source].[StateId], [Target].[StateId]) IS NOT NULL OR NULLIF([Target].[StateId], [Source].[StateId]) IS NOT NULL OR 
	NULLIF([Source].[CountryId], [Target].[CountryId]) IS NOT NULL OR NULLIF([Target].[CountryId], [Source].[CountryId]) IS NOT NULL OR 
	NULLIF([Source].[ZipCode], [Target].[ZipCode]) IS NOT NULL OR NULLIF([Target].[ZipCode], [Source].[ZipCode]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = [Source].[Description], 
  [Mail] = [Source].[Mail], 
  [Address] = [Source].[Address], 
  [StateId] = [Source].[StateId], 
  [CountryId] = [Source].[CountryId], 
  [ZipCode] = [Source].[ZipCode]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([BranchOfficeId],[Description],[Mail],[Address],[StateId],[CountryId],[ZipCode])
 VALUES([Source].[BranchOfficeId],[Source].[Description],[Source].[Mail],[Source].[Address],[Source].[StateId],[Source].[CountryId],[Source].[ZipCode])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [BranchOffice]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[BranchOffice] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [BranchOffice] OFF
GO
SET NOCOUNT OFF
GO
SET NOCOUNT ON

SET IDENTITY_INSERT [BusinessUnit] ON

MERGE INTO [BusinessUnit] AS [Target]
USING (VALUES
  (1,N'Seguros')
 ,(2,N'Retiro')
 ,(3,N'Iúnigo')
) AS [Source] ([BusinessUnitId],[Description])
ON ([Target].[BusinessUnitId] = [Source].[BusinessUnitId])
WHEN MATCHED AND (
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = [Source].[Description]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([BusinessUnitId],[Description])
 VALUES([Source].[BusinessUnitId],[Source].[Description])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [BusinessUnit]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[BusinessUnit] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [BusinessUnit] OFF
GO
SET NOCOUNT OFF
GO
SET NOCOUNT ON

SET IDENTITY_INSERT [CaseGroup] ON

MERGE INTO [CaseGroup] AS [Target]
USING (VALUES
  (1,N'Cambios de Condición')
 ,(2,N'Conozca a su Cliente')
 ,(3,N'Transaccionales')
) AS [Source] ([CaseGroupId],[Description])
ON ([Target].[CaseGroupId] = [Source].[CaseGroupId])
WHEN MATCHED AND (
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = [Source].[Description]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([CaseGroupId],[Description])
 VALUES([Source].[CaseGroupId],[Source].[Description])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [CaseGroup]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[CaseGroup] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [CaseGroup] OFF
GO
SET NOCOUNT OFF
GO

SET NOCOUNT ON

SET IDENTITY_INSERT [CaseType] ON

MERGE INTO [CaseType] AS [Target]
USING (VALUES
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
) AS [Source] ([CaseTypeId],[Description],[CaseGroupId])
ON ([Target].[CaseTypeId] = [Source].[CaseTypeId])
WHEN MATCHED AND (
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL OR 
	NULLIF([Source].[CaseGroupId], [Target].[CaseGroupId]) IS NOT NULL OR NULLIF([Target].[CaseGroupId], [Source].[CaseGroupId]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = [Source].[Description], 
  [CaseGroupId] = [Source].[CaseGroupId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([CaseTypeId],[Description],[CaseGroupId])
 VALUES([Source].[CaseTypeId],[Source].[Description],[Source].[CaseGroupId])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [CaseType]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[CaseType] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [CaseType] OFF
GO
SET NOCOUNT OFF
GO

SET NOCOUNT ON

SET IDENTITY_INSERT [DocumentType] ON

MERGE INTO [DocumentType] AS [Target]
USING (VALUES
  (1,N'Recibo de Sueldo')
 ,(2,N'Balance')
 ,(3,N'Liquidación por Indemnización')
 ,(4,N'Comentarios')
) AS [Source] ([DocumentTypeId],[Description])
ON ([Target].[DocumentTypeId] = [Source].[DocumentTypeId])
WHEN MATCHED AND (
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = [Source].[Description]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([DocumentTypeId],[Description])
 VALUES([Source].[DocumentTypeId],[Source].[Description])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [DocumentType]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[DocumentType] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [DocumentType] OFF
GO
SET NOCOUNT OFF
GO

SET NOCOUNT ON

SET IDENTITY_INSERT [MailType] ON

MERGE INTO [MailType] AS [Target]
USING (VALUES
  (1,N'Persona Juridica sin AG')
 ,(2,N'Persona Humana sin AG')
 ,(3,N'Persona Juridica con AG')
 ,(4,N'Persona Humana con AG')
) AS [Source] ([MailTypeId],[Description])
ON ([Target].[MailTypeId] = [Source].[MailTypeId])
WHEN MATCHED AND (
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = [Source].[Description]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([MailTypeId],[Description])
 VALUES([Source].[MailTypeId],[Source].[Description])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [MailType]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[MailType] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [MailType] OFF
GO
SET NOCOUNT OFF
GO


SET NOCOUNT ON

SET IDENTITY_INSERT [MessageType] ON

MERGE INTO [MessageType] AS [Target]
USING (VALUES
  (1,N'Error')
 ,(2,N'Warning')
 ,(3,N'Informacion')
 ,(4,N'Error Interno')
) AS [Source] ([MessageTypeId],[Description])
ON ([Target].[MessageTypeId] = [Source].[MessageTypeId])
WHEN MATCHED AND (
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = [Source].[Description]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([MessageTypeId],[Description])
 VALUES([Source].[MessageTypeId],[Source].[Description])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [MessageType]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[MessageType] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [MessageType] OFF
GO
SET NOCOUNT OFF
GO


SET NOCOUNT ON

SET IDENTITY_INSERT [NewsReasonType] ON

MERGE INTO [NewsReasonType] AS [Target]
USING (VALUES
  (1,N'Otro',1)
 ,(2,N'Analista asignado',0)
 ,(3,N'Reasignado por error',0)
 ,(4,N'Derivado por actitud sospechosa',0)
 ,(5,N'Caso finalizado',0)
 ,(6,N'Falso positivo',0)
 ,(7,N'Caso desestimado',0)
 ,(8,N'Se necesita más tiempo',0)
 ,(9,N'Analista debe continuar',0)
 ,(10,N'Se requiere información más detallada',0)
 ,(11,N'Información recibida',0)
) AS [Source] ([NewsReasonTypeId],[Description],[Global])
ON ([Target].[NewsReasonTypeId] = [Source].[NewsReasonTypeId])
WHEN MATCHED AND (
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL OR 
	NULLIF([Source].[Global], [Target].[Global]) IS NOT NULL OR NULLIF([Target].[Global], [Source].[Global]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = [Source].[Description], 
  [Global] = [Source].[Global]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([NewsReasonTypeId],[Description],[Global])
 VALUES([Source].[NewsReasonTypeId],[Source].[Description],[Source].[Global])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [NewsReasonType]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[NewsReasonType] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [NewsReasonType] OFF
GO
SET NOCOUNT OFF
GO

SET NOCOUNT ON

SET IDENTITY_INSERT [NewsType] ON

MERGE INTO [NewsType] AS [Target]
USING (VALUES
  (1,N'Falso Positivo')
 ,(2,N'Desestimación')
 ,(3,N'Finalizacion')
 ,(4,N'Asignacion Analista')
 ,(5,N'Requerimiento Información')
 ,(6,N'Recibo Información')
 ,(7,N'Asignación Superior')
 ,(8,N'Asignación a Oficial de Cumplimiento')
 ,(9,N'Cierre por Nuevo Caso')
 ,(10,N'Cambio de Fecha de Vencimiento')
 ,(11,N'Reasignación de Analista')
 ,(12,N'Modificación del Riesgo')
 ,(13,N'Nueva Alerta')
 ,(14,N'Devolución')
) AS [Source] ([NewsTypeId],[Description])
ON ([Target].[NewsTypeId] = [Source].[NewsTypeId])
WHEN MATCHED AND (
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = [Source].[Description]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([NewsTypeId],[Description])
 VALUES([Source].[NewsTypeId],[Source].[Description])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [NewsType]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[NewsType] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [NewsType] OFF
GO
SET NOCOUNT OFF
GO
SET NOCOUNT ON

SET IDENTITY_INSERT [Processes] ON

MERGE INTO [Processes] AS [Target]
USING (VALUES
  (1,N'Calculo de Riesgo')
 ,(2,N'Vencimiento de Legajos')
) AS [Source] ([ProcessesId],[Description])
ON ([Target].[ProcessesId] = [Source].[ProcessesId])
WHEN MATCHED AND (
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = [Source].[Description]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ProcessesId],[Description])
 VALUES([Source].[ProcessesId],[Source].[Description])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [Processes]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[Processes] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [Processes] OFF
GO
SET NOCOUNT OFF
GO
SET NOCOUNT ON

SET IDENTITY_INSERT [Setting] ON

MERGE INTO [Setting] AS [Target]
USING (VALUES
  (1,N'Ultima Sincronizacion Personas',NULL,NULL,NULL,NULL,NULL,0,NULL)
 ,(2,N'Ultima Sincronizacion Alertas',NULL,NULL,NULL,NULL,NULL,0,NULL)
 ,(3,N'Ultima Sincronizacion Log',NULL,NULL,NULL,NULL,NULL,0,NULL)
 ,(4,N'SMVM',NULL,NULL,NULL,NULL,NULL,1,N'Valor para el salario minimo vital y movil')
 ,(5,N'Vencimiento Legajo Riesgo Medio',NULL,NULL,NULL,NULL,NULL,1,N'Cantidad de Años que tarda en vencer el legajo de una persona con riesgo medio')
 ,(6,N'Vencimiento Legajo Riesgo Alto',NULL,NULL,NULL,NULL,NULL,1,N'Cantidad de Años que tarda en vencer el legajo de una persona con riesgo alto')
 ,(7,N'Dias Revalidacion Listas',NULL,NULL,NULL,NULL,NULL,1,N'Parametrización para alerta de relación entre aportes y rescates')
 ,(8,N'Relación aportes rescates',NULL,NULL,NULL,NULL,NULL,1,N'Parametrización para alerta de relación entre aportes y rescates')
 ,(9,N'Tolerancia aportes rescates',NULL,NULL,NULL,NULL,NULL,1,N'Parametrización para alerta de relación entre aportes y rescates')
 ,(10,N'Meses Retencion Tabla Log',NULL,NULL,NULL,NULL,NULL,0,N'Guarda la cantidad de meses que se deben retener os registros en la tabla log procesos')
) AS [Source] ([SettingId],[SettingName],[StringValue],[IntValue],[DecimalValue],[DateTimeValue],[BooleanValue],[Edit],[Description])
ON ([Target].[SettingId] = [Source].[SettingId])
WHEN MATCHED AND (
	NULLIF([Source].[SettingName], [Target].[SettingName]) IS NOT NULL OR NULLIF([Target].[SettingName], [Source].[SettingName]) IS NOT NULL OR 
	NULLIF([Source].[StringValue], [Target].[StringValue]) IS NOT NULL OR NULLIF([Target].[StringValue], [Source].[StringValue]) IS NOT NULL OR 
	NULLIF([Source].[IntValue], [Target].[IntValue]) IS NOT NULL OR NULLIF([Target].[IntValue], [Source].[IntValue]) IS NOT NULL OR 
	NULLIF([Source].[DecimalValue], [Target].[DecimalValue]) IS NOT NULL OR NULLIF([Target].[DecimalValue], [Source].[DecimalValue]) IS NOT NULL OR 
	NULLIF([Source].[DateTimeValue], [Target].[DateTimeValue]) IS NOT NULL OR NULLIF([Target].[DateTimeValue], [Source].[DateTimeValue]) IS NOT NULL OR 
	NULLIF([Source].[BooleanValue], [Target].[BooleanValue]) IS NOT NULL OR NULLIF([Target].[BooleanValue], [Source].[BooleanValue]) IS NOT NULL OR 
	NULLIF([Source].[Edit], [Target].[Edit]) IS NOT NULL OR NULLIF([Target].[Edit], [Source].[Edit]) IS NOT NULL OR 
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL) THEN
 UPDATE SET
  [SettingName] = [Source].[SettingName], 
  [StringValue] = [Source].[StringValue], 
  [IntValue] = [Source].[IntValue], 
  [DecimalValue] = [Source].[DecimalValue], 
  [DateTimeValue] = [Source].[DateTimeValue], 
  [BooleanValue] = [Source].[BooleanValue], 
  [Edit] = [Source].[Edit], 
  [Description] = [Source].[Description]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([SettingId],[SettingName],[StringValue],[IntValue],[DecimalValue],[DateTimeValue],[BooleanValue],[Edit],[Description])
 VALUES([Source].[SettingId],[Source].[SettingName],[Source].[StringValue],[Source].[IntValue],[Source].[DecimalValue],[Source].[DateTimeValue],[Source].[BooleanValue],[Source].[Edit],[Source].[Description])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [Setting]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[Setting] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [Setting] OFF
GO
SET NOCOUNT OFF
GO

SET NOCOUNT ON

SET IDENTITY_INSERT [Risk] ON

MERGE INTO [Risk] AS [Target]
USING (VALUES
  (1,N'Bajo')
 ,(2,N'Medio')
 ,(3,N'Alto')
) AS [Source] ([RiskId],[Description])
ON ([Target].[RiskId] = [Source].[RiskId])
WHEN MATCHED AND (
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = [Source].[Description]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([RiskId],[Description])
 VALUES([Source].[RiskId],[Source].[Description])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [Risk]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[Risk] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [Risk] OFF
GO
SET NOCOUNT OFF
GO

SET NOCOUNT ON

SET IDENTITY_INSERT [NewsReasonType] ON

MERGE INTO [NewsReasonType] AS [Target]
USING (VALUES
  (1,N'Otro',1)
 ,(2,N'Analista asignado',0)
 ,(3,N'Reasignado por error',0)
 ,(4,N'Derivado por actitud sospechosa',0)
 ,(5,N'Caso finalizado',0)
 ,(6,N'Falso positivo',0)
 ,(7,N'Caso desestimado',0)
 ,(8,N'Se necesita más tiempo',0)
 ,(9,N'Analista debe continuar',0)
 ,(10,N'Se requiere información más detallada',0)
 ,(11,N'Información recibida',0)
) AS [Source] ([NewsReasonTypeId],[Description],[Global])
ON ([Target].[NewsReasonTypeId] = [Source].[NewsReasonTypeId])
WHEN MATCHED AND (
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL OR 
	NULLIF([Source].[Global], [Target].[Global]) IS NOT NULL OR NULLIF([Target].[Global], [Source].[Global]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = [Source].[Description], 
  [Global] = [Source].[Global]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([NewsReasonTypeId],[Description],[Global])
 VALUES([Source].[NewsReasonTypeId],[Source].[Description],[Source].[Global])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [NewsReasonType]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[NewsReasonType] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [NewsReasonType] OFF
GO
SET NOCOUNT OFF
GO
GO

SET NOCOUNT ON

SET IDENTITY_INSERT [Number] ON

MERGE INTO [Number] AS [Target]
USING (VALUES
  (1,N'Numero Caso Seguros',N'CaseNumber',N'1',1)
 ,(2,N'Numero Caso Retiro',N'CaseNumber',N'2',1)
 ,(3,N'Numero Caso Iunigo',N'CaseNumber',N'3',1)
) AS [Source] ([NumberId],[Description],[Name],[Token],[Seed])
ON ([Target].[NumberId] = [Source].[NumberId])
WHEN MATCHED AND (
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL OR 
	NULLIF([Source].[Name], [Target].[Name]) IS NOT NULL OR NULLIF([Target].[Name], [Source].[Name]) IS NOT NULL OR 
	NULLIF([Source].[Token], [Target].[Token]) IS NOT NULL OR NULLIF([Target].[Token], [Source].[Token]) IS NOT NULL OR 
	NULLIF([Source].[Seed], [Target].[Seed]) IS NOT NULL OR NULLIF([Target].[Seed], [Source].[Seed]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = [Source].[Description], 
  [Name] = [Source].[Name], 
  [Token] = [Source].[Token], 
  [Seed] = [Source].[Seed]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([NumberId],[Description],[Name],[Token],[Seed])
 VALUES([Source].[NumberId],[Source].[Description],[Source].[Name],[Source].[Token],[Source].[Seed])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [Number]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[Number] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [Number] OFF
GO
SET NOCOUNT OFF
GO
SET NOCOUNT ON

SET IDENTITY_INSERT [DocumentLetterType] ON

MERGE INTO [DocumentLetterType] AS [Target]
USING (VALUES
  (1,N'Persona Jurídica sin AG')
 ,(2,N'Persona Humana sin AG')
 ,(3,N'Persona Jurídica con AG')
 ,(4,N'Persona Humana con AG')
) AS [Source] ([DocumentLetterTypeId],[Description])
ON ([Target].[DocumentLetterTypeId] = [Source].[DocumentLetterTypeId])
WHEN MATCHED AND (
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = [Source].[Description]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([DocumentLetterTypeId],[Description])
 VALUES([Source].[DocumentLetterTypeId],[Source].[Description])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [DocumentLetterType]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[DocumentLetterType] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [DocumentLetterType] OFF
GO
SET NOCOUNT OFF
GO


--Dummies
--:r .\PostDeployment\dbo.Case.sql
--:r .\PostDeployment\dbo.News.sql
--:r .\PostDeployment\dbo.Person.sql
--:r .\PostDeployment\dbo.PersonBusinessUnit.sql
--:r .\PostDeployment\dbo.GrayList.sql
--:r .\PostDeployment\dbo.Activity.sql
--:r .\PostDeployment\dbo.Producer.sql

GO
