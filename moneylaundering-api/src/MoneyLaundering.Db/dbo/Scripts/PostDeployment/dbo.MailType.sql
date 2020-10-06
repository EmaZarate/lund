
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
