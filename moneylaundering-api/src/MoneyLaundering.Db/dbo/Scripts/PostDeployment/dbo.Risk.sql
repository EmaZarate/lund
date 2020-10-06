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
