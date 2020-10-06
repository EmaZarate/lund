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
