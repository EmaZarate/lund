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