
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
