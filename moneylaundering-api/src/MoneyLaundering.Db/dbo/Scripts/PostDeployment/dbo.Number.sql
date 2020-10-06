GO

SET NOCOUNT ON

SET IDENTITY_INSERT [Number] ON

MERGE INTO [Number] AS [Target]
USING (VALUES
  (1,N'Numero Caso Seguros',N'CaseNumber',N'1',1)
 ,(2,N'Numero Caso Retiro',N'CaseNumber',N'2',1)
 ,(3,N'Numero Caso Iunigo',N'CaseNumber',N'3',1)
) AS [Source] ([NumberId],[Description],[Name],[Token],[Seed])
ON ([Target].[NumberId] = [Source].[NumberId])
WHEN MATCHED AND (
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL OR 
	NULLIF([Source].[Name], [Target].[Name]) IS NOT NULL OR NULLIF([Target].[Name], [Source].[Name]) IS NOT NULL OR 
	NULLIF([Source].[Token], [Target].[Token]) IS NOT NULL OR NULLIF([Target].[Token], [Source].[Token]) IS NOT NULL OR 
	NULLIF([Source].[Seed], [Target].[Seed]) IS NOT NULL OR NULLIF([Target].[Seed], [Source].[Seed]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = [Source].[Description], 
  [Name] = [Source].[Name], 
  [Token] = [Source].[Token], 
  [Seed] = [Source].[Seed]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([NumberId],[Description],[Name],[Token],[Seed])
 VALUES([Source].[NumberId],[Source].[Description],[Source].[Name],[Source].[Token],[Source].[Seed])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [Number]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[Number] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [Number] OFF
GO
SET NOCOUNT OFF
GO