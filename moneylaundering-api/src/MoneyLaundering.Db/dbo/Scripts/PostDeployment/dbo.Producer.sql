SET NOCOUNT ON

SET IDENTITY_INSERT [Producer] ON

MERGE INTO [Producer] AS [Target]
USING (VALUES
  (1,1,N'Nahuel',N'nahuel@mail.com',N'abc123')
 ,(2,2,N'Emanuel',N'emanuel@mail.com',N'123abc')
) AS [Source] ([ProducerId],[BusinessUnitId],[ProduceName],[Mail],[OriginCode])
ON ([Target].[ProducerId] = [Source].[ProducerId])
WHEN MATCHED AND (
	NULLIF([Source].[BusinessUnitId], [Target].[BusinessUnitId]) IS NOT NULL OR NULLIF([Target].[BusinessUnitId], [Source].[BusinessUnitId]) IS NOT NULL OR 
	NULLIF([Source].[ProduceName], [Target].[ProduceName]) IS NOT NULL OR NULLIF([Target].[ProduceName], [Source].[ProduceName]) IS NOT NULL OR 
	NULLIF([Source].[Mail], [Target].[Mail]) IS NOT NULL OR NULLIF([Target].[Mail], [Source].[Mail]) IS NOT NULL OR 
	NULLIF([Source].[OriginCode], [Target].[OriginCode]) IS NOT NULL OR NULLIF([Target].[OriginCode], [Source].[OriginCode]) IS NOT NULL) THEN
 UPDATE SET
  [BusinessUnitId] = [Source].[BusinessUnitId], 
  [ProduceName] = [Source].[ProduceName], 
  [Mail] = [Source].[Mail], 
  [OriginCode] = [Source].[OriginCode]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ProducerId],[BusinessUnitId],[ProduceName],[Mail],[OriginCode])
 VALUES([Source].[ProducerId],[Source].[BusinessUnitId],[Source].[ProduceName],[Source].[Mail],[Source].[OriginCode])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [Producer]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[Producer] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [Producer] OFF
GO
SET NOCOUNT OFF
GO