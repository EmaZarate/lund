
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
