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