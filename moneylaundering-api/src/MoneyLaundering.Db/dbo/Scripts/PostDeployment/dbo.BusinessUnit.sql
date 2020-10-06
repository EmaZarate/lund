SET NOCOUNT ON

SET IDENTITY_INSERT [BusinessUnit] ON

MERGE INTO [BusinessUnit] AS [Target]
USING (VALUES
  (1,N'Seguros')
 ,(2,N'Retiro')
 ,(3,N'Iúnigo')
) AS [Source] ([BusinessUnitId],[Description])
ON ([Target].[BusinessUnitId] = [Source].[BusinessUnitId])
WHEN MATCHED AND (
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = [Source].[Description]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([BusinessUnitId],[Description])
 VALUES([Source].[BusinessUnitId],[Source].[Description])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [BusinessUnit]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[BusinessUnit] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [BusinessUnit] OFF
GO
SET NOCOUNT OFF
GO