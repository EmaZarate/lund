SET NOCOUNT ON

SET IDENTITY_INSERT [BranchOffice] ON

MERGE INTO [BranchOffice] AS [Target]
USING (VALUES
  (1,N'Arroyo Seco',N'sucursal@mail.com',N'San Martin 840',1,1,2128),
(2,N'Perez',N'sucursalperez@mail.com',N'Alberdi 840',1,1,2128)
) AS [Source] ([BranchOfficeId],[Description],[Mail],[Address],[StateId],[CountryId],[ZipCode])
ON ([Target].[BranchOfficeId] = [Source].[BranchOfficeId])
WHEN MATCHED AND (
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL OR 
	NULLIF([Source].[Mail], [Target].[Mail]) IS NOT NULL OR NULLIF([Target].[Mail], [Source].[Mail]) IS NOT NULL OR 
	NULLIF([Source].[Address], [Target].[Address]) IS NOT NULL OR NULLIF([Target].[Address], [Source].[Address]) IS NOT NULL OR 
	NULLIF([Source].[StateId], [Target].[StateId]) IS NOT NULL OR NULLIF([Target].[StateId], [Source].[StateId]) IS NOT NULL OR 
	NULLIF([Source].[CountryId], [Target].[CountryId]) IS NOT NULL OR NULLIF([Target].[CountryId], [Source].[CountryId]) IS NOT NULL OR 
	NULLIF([Source].[ZipCode], [Target].[ZipCode]) IS NOT NULL OR NULLIF([Target].[ZipCode], [Source].[ZipCode]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = [Source].[Description], 
  [Mail] = [Source].[Mail], 
  [Address] = [Source].[Address], 
  [StateId] = [Source].[StateId], 
  [CountryId] = [Source].[CountryId], 
  [ZipCode] = [Source].[ZipCode]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([BranchOfficeId],[Description],[Mail],[Address],[StateId],[CountryId],[ZipCode])
 VALUES([Source].[BranchOfficeId],[Source].[Description],[Source].[Mail],[Source].[Address],[Source].[StateId],[Source].[CountryId],[Source].[ZipCode])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [BranchOffice]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[BranchOffice] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [BranchOffice] OFF
GO
SET NOCOUNT OFF
GO