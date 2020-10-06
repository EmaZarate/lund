SET NOCOUNT ON

SET IDENTITY_INSERT [Person] ON

MERGE INTO [Person] AS [Target]
USING (VALUES
  (1,N'Key',1,N'30',N'Test',N'Test',1,'2020-02-13T00:00:00','2020-02-13T00:00:00',1,1,1,1,'2020-02-13T00:00:00',N'1',N'test@test.com.ar',1,4,N'1',N'1',1,N'1','2020-02-13T00:00:00',N'1',N'1',1,1,1,1,'2020-02-13T00:00:00',N''),
(2,N'Key2',1,N'50',N'Name2',N'Surname2',1,'2020-02-13T00:00:00','2020-02-13T00:00:00',1,1,1,1,'2020-02-13T00:00:00',N'1',N'test@test.com.ar',1,4,N'1',N'1',1,N'1','2020-02-13T00:00:00',N'1',N'1',1,1,1,1,'2020-02-13T00:00:00',N'')
) AS [Source] ([PersonId],[PersonKey],[BusinessUnitId],[Cuit],[LastName],[FirstName],[Active],[CreationDate],[UpdateDocumentDate],[Pep],[PepSystem],[RegisterUIF],[Terrorist],[CheckListDate],[PersonType],[Mail],[ActivityId],[LocationId],[Address],[OfficialTypeId],[TaxId],[Nationality],[BirthDate],[Maritalstatus],[PhoneNumber],[ThirdParty],[GroupCode],[Group],[ZipCode],[RegistrationDate],[RegistrationNumber])
ON ([Target].[PersonId] = [Source].[PersonId])
WHEN MATCHED AND (
	NULLIF([Source].[PersonKey], [Target].[PersonKey]) IS NOT NULL OR NULLIF([Target].[PersonKey], [Source].[PersonKey]) IS NOT NULL OR 
	NULLIF([Source].[BusinessUnitId], [Target].[BusinessUnitId]) IS NOT NULL OR NULLIF([Target].[BusinessUnitId], [Source].[BusinessUnitId]) IS NOT NULL OR 
	NULLIF([Source].[Cuit], [Target].[Cuit]) IS NOT NULL OR NULLIF([Target].[Cuit], [Source].[Cuit]) IS NOT NULL OR 
	NULLIF([Source].[LastName], [Target].[LastName]) IS NOT NULL OR NULLIF([Target].[LastName], [Source].[LastName]) IS NOT NULL OR 
	NULLIF([Source].[FirstName], [Target].[FirstName]) IS NOT NULL OR NULLIF([Target].[FirstName], [Source].[FirstName]) IS NOT NULL OR 
	NULLIF([Source].[Active], [Target].[Active]) IS NOT NULL OR NULLIF([Target].[Active], [Source].[Active]) IS NOT NULL OR 
	NULLIF([Source].[CreationDate], [Target].[CreationDate]) IS NOT NULL OR NULLIF([Target].[CreationDate], [Source].[CreationDate]) IS NOT NULL OR 
	NULLIF([Source].[UpdateDocumentDate], [Target].[UpdateDocumentDate]) IS NOT NULL OR NULLIF([Target].[UpdateDocumentDate], [Source].[UpdateDocumentDate]) IS NOT NULL OR 
	NULLIF([Source].[Pep], [Target].[Pep]) IS NOT NULL OR NULLIF([Target].[Pep], [Source].[Pep]) IS NOT NULL OR 
	NULLIF([Source].[PepSystem], [Target].[PepSystem]) IS NOT NULL OR NULLIF([Target].[PepSystem], [Source].[PepSystem]) IS NOT NULL OR 
	NULLIF([Source].[RegisterUIF], [Target].[RegisterUIF]) IS NOT NULL OR NULLIF([Target].[RegisterUIF], [Source].[RegisterUIF]) IS NOT NULL OR 
	NULLIF([Source].[Terrorist], [Target].[Terrorist]) IS NOT NULL OR NULLIF([Target].[Terrorist], [Source].[Terrorist]) IS NOT NULL OR 
	NULLIF([Source].[CheckListDate], [Target].[CheckListDate]) IS NOT NULL OR NULLIF([Target].[CheckListDate], [Source].[CheckListDate]) IS NOT NULL OR 
	NULLIF([Source].[PersonType], [Target].[PersonType]) IS NOT NULL OR NULLIF([Target].[PersonType], [Source].[PersonType]) IS NOT NULL OR 
	NULLIF([Source].[Mail], [Target].[Mail]) IS NOT NULL OR NULLIF([Target].[Mail], [Source].[Mail]) IS NOT NULL OR 
	NULLIF([Source].[ActivityId], [Target].[ActivityId]) IS NOT NULL OR NULLIF([Target].[ActivityId], [Source].[ActivityId]) IS NOT NULL OR 
	NULLIF([Source].[LocationId], [Target].[LocationId]) IS NOT NULL OR NULLIF([Target].[LocationId], [Source].[LocationId]) IS NOT NULL OR 
	NULLIF([Source].[Address], [Target].[Address]) IS NOT NULL OR NULLIF([Target].[Address], [Source].[Address]) IS NOT NULL OR 
	NULLIF([Source].[OfficialTypeId], [Target].[OfficialTypeId]) IS NOT NULL OR NULLIF([Target].[OfficialTypeId], [Source].[OfficialTypeId]) IS NOT NULL OR 
	NULLIF([Source].[TaxId], [Target].[TaxId]) IS NOT NULL OR NULLIF([Target].[TaxId], [Source].[TaxId]) IS NOT NULL OR 
	NULLIF([Source].[Nationality], [Target].[Nationality]) IS NOT NULL OR NULLIF([Target].[Nationality], [Source].[Nationality]) IS NOT NULL OR 
	NULLIF([Source].[BirthDate], [Target].[BirthDate]) IS NOT NULL OR NULLIF([Target].[BirthDate], [Source].[BirthDate]) IS NOT NULL OR 
	NULLIF([Source].[Maritalstatus], [Target].[Maritalstatus]) IS NOT NULL OR NULLIF([Target].[Maritalstatus], [Source].[Maritalstatus]) IS NOT NULL OR 
	NULLIF([Source].[PhoneNumber], [Target].[PhoneNumber]) IS NOT NULL OR NULLIF([Target].[PhoneNumber], [Source].[PhoneNumber]) IS NOT NULL OR 
	NULLIF([Source].[ThirdParty], [Target].[ThirdParty]) IS NOT NULL OR NULLIF([Target].[ThirdParty], [Source].[ThirdParty]) IS NOT NULL OR 
	NULLIF([Source].[GroupCode], [Target].[GroupCode]) IS NOT NULL OR NULLIF([Target].[GroupCode], [Source].[GroupCode]) IS NOT NULL OR 
	NULLIF([Source].[Group], [Target].[Group]) IS NOT NULL OR NULLIF([Target].[Group], [Source].[Group]) IS NOT NULL OR 
	NULLIF([Source].[ZipCode], [Target].[ZipCode]) IS NOT NULL OR NULLIF([Target].[ZipCode], [Source].[ZipCode]) IS NOT NULL OR 
	NULLIF([Source].[RegistrationDate], [Target].[RegistrationDate]) IS NOT NULL OR NULLIF([Target].[RegistrationDate], [Source].[RegistrationDate]) IS NOT NULL OR 
	NULLIF([Source].[RegistrationNumber], [Target].[RegistrationNumber]) IS NOT NULL OR NULLIF([Target].[RegistrationNumber], [Source].[RegistrationNumber]) IS NOT NULL) THEN
 UPDATE SET
  [PersonKey] = [Source].[PersonKey], 
  [BusinessUnitId] = [Source].[BusinessUnitId], 
  [Cuit] = [Source].[Cuit], 
  [LastName] = [Source].[LastName], 
  [FirstName] = [Source].[FirstName], 
  [Active] = [Source].[Active], 
  [CreationDate] = [Source].[CreationDate], 
  [UpdateDocumentDate] = [Source].[UpdateDocumentDate], 
  [Pep] = [Source].[Pep], 
  [PepSystem] = [Source].[PepSystem], 
  [RegisterUIF] = [Source].[RegisterUIF], 
  [Terrorist] = [Source].[Terrorist], 
  [CheckListDate] = [Source].[CheckListDate], 
  [PersonType] = [Source].[PersonType], 
  [Mail] = [Source].[Mail], 
  [ActivityId] = [Source].[ActivityId], 
  [LocationId] = [Source].[LocationId], 
  [Address] = [Source].[Address], 
  [OfficialTypeId] = [Source].[OfficialTypeId], 
  [TaxId] = [Source].[TaxId], 
  [Nationality] = [Source].[Nationality], 
  [BirthDate] = [Source].[BirthDate], 
  [Maritalstatus] = [Source].[Maritalstatus], 
  [PhoneNumber] = [Source].[PhoneNumber], 
  [ThirdParty] = [Source].[ThirdParty], 
  [GroupCode] = [Source].[GroupCode], 
  [Group] = [Source].[Group], 
  [ZipCode] = [Source].[ZipCode], 
  [RegistrationDate] = [Source].[RegistrationDate], 
  [RegistrationNumber] = [Source].[RegistrationNumber]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([PersonId],[PersonKey],[BusinessUnitId],[Cuit],[LastName],[FirstName],[Active],[CreationDate],[UpdateDocumentDate],[Pep],[PepSystem],[RegisterUIF],[Terrorist],[CheckListDate],[PersonType],[Mail],[ActivityId],[LocationId],[Address],[OfficialTypeId],[TaxId],[Nationality],[BirthDate],[Maritalstatus],[PhoneNumber],[ThirdParty],[GroupCode],[Group],[ZipCode],[RegistrationDate],[RegistrationNumber])
 VALUES([Source].[PersonId],[Source].[PersonKey],[Source].[BusinessUnitId],[Source].[Cuit],[Source].[LastName],[Source].[FirstName],[Source].[Active],[Source].[CreationDate],[Source].[UpdateDocumentDate],[Source].[Pep],[Source].[PepSystem],[Source].[RegisterUIF],[Source].[Terrorist],[Source].[CheckListDate],[Source].[PersonType],[Source].[Mail],[Source].[ActivityId],[Source].[LocationId],[Source].[Address],[Source].[OfficialTypeId],[Source].[TaxId],[Source].[Nationality],[Source].[BirthDate],[Source].[Maritalstatus],[Source].[PhoneNumber],[Source].[ThirdParty],[Source].[GroupCode],[Source].[Group],[Source].[ZipCode],[Source].[RegistrationDate],[Source].[RegistrationNumber])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [Person]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[Person] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [Person] OFF
GO
SET NOCOUNT OFF
GO
