SET NOCOUNT ON

SET IDENTITY_INSERT [Case] ON

MERGE INTO [Case] AS [Target]
USING (VALUES
  (2,1,1,1,1,1,1,'2020-03-03T00:00:00',0,N'contact@contact.com',N'San Martin 840',2000,N'Rosario',N'Santa Fe',1,1,2,1,N'Nuevo chinwenwencha',9999)
 ,(3,2,1,1,2,2,1,'2020-02-25T00:00:00',1,N'mail@mail.com',N'Rioja 1800',2000,N'Rosario',N'Santa Fe',1,1,1,1,N'Otro chinwen',1550)
) AS [Source] ([CaseId],[BusinessUnitId],[BranchOfficeId],[CaseTypeId],[StatusId],[RiskId],[AnalystId],[CreateDate],[UpdateFile],[ContactMail],[ContactAddress],[ContactZipCode],[ContactCity],[ContactProvince],[ContactStateId],[ProducerId],[PersonId],[OriginalPersonId],[Comment],[Value])
ON ([Target].[CaseId] = [Source].[CaseId])
WHEN MATCHED AND (
	NULLIF([Source].[BusinessUnitId], [Target].[BusinessUnitId]) IS NOT NULL OR NULLIF([Target].[BusinessUnitId], [Source].[BusinessUnitId]) IS NOT NULL OR 
	NULLIF([Source].[BranchOfficeId], [Target].[BranchOfficeId]) IS NOT NULL OR NULLIF([Target].[BranchOfficeId], [Source].[BranchOfficeId]) IS NOT NULL OR 
	NULLIF([Source].[CaseTypeId], [Target].[CaseTypeId]) IS NOT NULL OR NULLIF([Target].[CaseTypeId], [Source].[CaseTypeId]) IS NOT NULL OR 
	NULLIF([Source].[StatusId], [Target].[StatusId]) IS NOT NULL OR NULLIF([Target].[StatusId], [Source].[StatusId]) IS NOT NULL OR 
	NULLIF([Source].[RiskId], [Target].[RiskId]) IS NOT NULL OR NULLIF([Target].[RiskId], [Source].[RiskId]) IS NOT NULL OR 
	NULLIF([Source].[AnalystId], [Target].[AnalystId]) IS NOT NULL OR NULLIF([Target].[AnalystId], [Source].[AnalystId]) IS NOT NULL OR 
	NULLIF([Source].[CreateDate], [Target].[CreateDate]) IS NOT NULL OR NULLIF([Target].[CreateDate], [Source].[CreateDate]) IS NOT NULL OR 
	NULLIF([Source].[UpdateFile], [Target].[UpdateFile]) IS NOT NULL OR NULLIF([Target].[UpdateFile], [Source].[UpdateFile]) IS NOT NULL OR 
	NULLIF([Source].[ContactMail], [Target].[ContactMail]) IS NOT NULL OR NULLIF([Target].[ContactMail], [Source].[ContactMail]) IS NOT NULL OR 
	NULLIF([Source].[ContactAddress], [Target].[ContactAddress]) IS NOT NULL OR NULLIF([Target].[ContactAddress], [Source].[ContactAddress]) IS NOT NULL OR 
	NULLIF([Source].[ContactCity], [Target].[ContactCity]) IS NOT NULL OR NULLIF([Target].[ContactCity], [Source].[ContactCity]) IS NOT NULL OR 
	NULLIF([Source].[ContactProvince], [Target].[ContactProvince]) IS NOT NULL OR NULLIF([Target].[ContactProvince], [Source].[ContactProvince]) IS NOT NULL OR 
	NULLIF([Source].[ContactZipCode], [Target].[ContactZipCode]) IS NOT NULL OR NULLIF([Target].[ContactZipCode], [Source].[ContactZipCode]) IS NOT NULL OR 
	NULLIF([Source].[ContactStateId], [Target].[ContactStateId]) IS NOT NULL OR NULLIF([Target].[ContactStateId], [Source].[ContactStateId]) IS NOT NULL OR 
	NULLIF([Source].[ProducerId], [Target].[ProducerId]) IS NOT NULL OR NULLIF([Target].[ProducerId], [Source].[ProducerId]) IS NOT NULL OR 
	NULLIF([Source].[PersonId], [Target].[PersonId]) IS NOT NULL OR NULLIF([Target].[PersonId], [Source].[PersonId]) IS NOT NULL OR 
	NULLIF([Source].[OriginalPersonId], [Target].[OriginalPersonId]) IS NOT NULL OR NULLIF([Target].[OriginalPersonId], [Source].[OriginalPersonId]) IS NOT NULL OR 
	NULLIF([Source].[Comment], [Target].[Comment]) IS NOT NULL OR NULLIF([Target].[Comment], [Source].[Comment]) IS NOT NULL OR 
	NULLIF([Source].[Value], [Target].[Value]) IS NOT NULL OR NULLIF([Target].[Value], [Source].[Value]) IS NOT NULL) THEN
 UPDATE SET
  [BusinessUnitId] = [Source].[BusinessUnitId], 
  [BranchOfficeId] = [Source].[BranchOfficeId], 
  [CaseTypeId] = [Source].[CaseTypeId], 
  [StatusId] = [Source].[StatusId], 
  [RiskId] = [Source].[RiskId], 
  [AnalystId] = [Source].[AnalystId], 
  [CreateDate] = [Source].[CreateDate], 
  [UpdateFile] = [Source].[UpdateFile], 
  [ContactMail] = [Source].[ContactMail], 
  [ContactAddress] = [Source].[ContactAddress], 
  [ContactCity] = [Source].[ContactCity], 
  [ContactProvince] = [Source].[ContactProvince], 
  [ContactZipCode] = [Source].[ContactZipCode], 
  [ContactStateId] = [Source].[ContactStateId], 
  [ProducerId] = [Source].[ProducerId], 
  [PersonId] = [Source].[PersonId], 
  [OriginalPersonId] = [Source].[OriginalPersonId], 
  [Comment] = [Source].[Comment], 
  [Value] = [Source].[Value]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([CaseId],[BusinessUnitId],[BranchOfficeId],[CaseTypeId],[StatusId],[RiskId],[AnalystId],[CreateDate],[UpdateFile],[ContactMail],[ContactAddress],[ContactZipCode],[ContactCity],[ContactProvince],[ContactStateId],[ProducerId],[PersonId],[OriginalPersonId],[Comment],[Value])
 VALUES([Source].[CaseId],[Source].[BusinessUnitId],[Source].[BranchOfficeId],[Source].[CaseTypeId],[Source].[StatusId],[Source].[RiskId],[Source].[AnalystId],[Source].[CreateDate],[Source].[UpdateFile],[Source].[ContactMail],[Source].[ContactAddress],[Source].[ContactZipCode],[Source].[ContactCity],[Source].[ContactProvince],[Source].[ContactStateId],[Source].[ProducerId],[Source].[PersonId],[Source].[OriginalPersonId],[Source].[Comment],[Source].[Value])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [Case]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[Case] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [Case] OFF
GO
SET NOCOUNT OFF
GO
