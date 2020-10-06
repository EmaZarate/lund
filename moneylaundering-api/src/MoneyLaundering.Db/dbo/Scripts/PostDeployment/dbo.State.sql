SET NOCOUNT ON

SET IDENTITY_INSERT [State] ON

MERGE INTO [State] AS [Target]
USING (VALUES
  (1,N'Santa Fe',1)
 ,(2,N'Buenos Aires',1)
) AS [Source] ([StateId],[Description],[CountryId])
ON ([Target].[StateId] = [Source].[StateId])
WHEN MATCHED AND (
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL OR 
	NULLIF([Source].[CountryId], [Target].[CountryId]) IS NOT NULL OR NULLIF([Target].[CountryId], [Source].[CountryId]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = [Source].[Description], 
  [CountryId] = [Source].[CountryId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([StateId],[Description],[CountryId])
 VALUES([Source].[StateId],[Source].[Description],[Source].[CountryId])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [State]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[State] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [State] OFF
GO
SET NOCOUNT OFF
GO
