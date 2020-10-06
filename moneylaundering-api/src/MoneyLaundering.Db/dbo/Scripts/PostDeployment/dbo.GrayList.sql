/* SET NOCOUNT ON

SET IDENTITY_INSERT [GrayList] ON

MERGE INTO [GrayList] AS [Target]
USING (VALUES
  (1,N'el nuevo chinwen',1,null,null, '2001-01-01 00:00:00.000')
) AS [Source] ([GrayListId],[Comments],[Active],[PersonId],[PersonOriginalId], [CreationDate])
ON ([Target].[GrayListId] = [Source].[GrayListId])
WHEN MATCHED AND (
	NULLIF(CAST([Source].[Comments] AS VARCHAR(MAX)), CAST([Target].[Comments] AS VARCHAR(MAX))) IS NOT NULL OR NULLIF(CAST([Target].[Comments] AS VARCHAR(MAX)), CAST([Source].[Comments] AS VARCHAR(MAX))) IS NOT NULL OR 
	NULLIF([Source].[Active], [Target].[Active]) IS NOT NULL OR NULLIF([Target].[Active], [Source].[Active]) IS NOT NULL OR 
	NULLIF([Source].[PersonId], [Target].[PersonId]) IS NOT NULL OR NULLIF([Target].[PersonId], [Source].[PersonId]) IS NOT NULL OR 
	NULLIF([Source].[PersonOriginalId], [Target].[PersonOriginalId]) IS NOT NULL OR NULLIF([Target].[PersonOriginalId], [Source].[PersonOriginalId]) IS NOT NULL) THEN
 UPDATE SET
  [Comments] = [Source].[Comments], 
  [Active] = [Source].[Active], 
  [PersonId] = [Source].[PersonId], 
  [PersonOriginalId] = [Source].[PersonOriginalId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([GrayListId],[Comments],[Active],[PersonId],[PersonOriginalId])
 VALUES([Source].[GrayListId],[Source].[Comments],[Source].[Active],[Source].[PersonId],[Source].[PersonOriginalId])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [GrayList]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[GrayList] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [GrayList] OFF
GO
SET NOCOUNT OFF
GO
*/