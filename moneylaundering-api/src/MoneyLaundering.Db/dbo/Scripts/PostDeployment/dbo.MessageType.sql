
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

