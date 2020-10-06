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