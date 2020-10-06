SET NOCOUNT ON

SET IDENTITY_INSERT [Location] ON

MERGE INTO [Location] AS [Target]
USING (VALUES
  (4,N'Arroyo Seco',1,2128)
 ,(5,N'Rosario',1,2000)
) AS [Source] ([LocationId],[Description],[StateId],[ZipCode])
ON ([Target].[LocationId] = [Source].[LocationId])
WHEN MATCHED AND (
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL OR 
	NULLIF([Source].[StateId], [Target].[StateId]) IS NOT NULL OR NULLIF([Target].[StateId], [Source].[StateId]) IS NOT NULL OR 
	NULLIF([Source].[ZipCode], [Target].[ZipCode]) IS NOT NULL OR NULLIF([Target].[ZipCode], [Source].[ZipCode]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = [Source].[Description], 
  [StateId] = [Source].[StateId], 
  [ZipCode] = [Source].[ZipCode]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([LocationId],[Description],[StateId],[ZipCode])
 VALUES([Source].[LocationId],[Source].[Description],[Source].[StateId],[Source].[ZipCode])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [Location]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[Location] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [Location] OFF
GO
SET NOCOUNT OFF
GO