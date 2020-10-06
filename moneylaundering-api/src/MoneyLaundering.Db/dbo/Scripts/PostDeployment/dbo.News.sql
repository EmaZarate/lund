SET NOCOUNT ON

SET IDENTITY_INSERT [News] ON

MERGE INTO [News] AS [Target]
USING (VALUES
  (1,1,1,1,1,'2020-03-03T00:00:00','2020-03-03T00:00:00','2020-04-06T00:00:00',N'Comments1',1)
 ,(3,2,3,1,1,'2020-03-03T00:00:00','2020-03-03T00:00:00','2020-03-03T00:00:00',N'Comment 1',1)
) AS [Source] ([NewsId],[BusinessUnitId],[CaseId],[NewsTypeId],[StatusId],[CreateDate],[EndDate],[ExpirationDate],[Comments],[NewsReasonTypeId])
ON ([Target].[NewsId] = [Source].[NewsId])
WHEN MATCHED AND (
	NULLIF([Source].[BusinessUnitId], [Target].[BusinessUnitId]) IS NOT NULL OR NULLIF([Target].[BusinessUnitId], [Source].[BusinessUnitId]) IS NOT NULL OR 
	NULLIF([Source].[CaseId], [Target].[CaseId]) IS NOT NULL OR NULLIF([Target].[CaseId], [Source].[CaseId]) IS NOT NULL OR 
	NULLIF([Source].[NewsTypeId], [Target].[NewsTypeId]) IS NOT NULL OR NULLIF([Target].[NewsTypeId], [Source].[NewsTypeId]) IS NOT NULL OR 
	NULLIF([Source].[StatusId], [Target].[StatusId]) IS NOT NULL OR NULLIF([Target].[StatusId], [Source].[StatusId]) IS NOT NULL OR 
	NULLIF([Source].[CreateDate], [Target].[CreateDate]) IS NOT NULL OR NULLIF([Target].[CreateDate], [Source].[CreateDate]) IS NOT NULL OR 
	NULLIF([Source].[EndDate], [Target].[EndDate]) IS NOT NULL OR NULLIF([Target].[EndDate], [Source].[EndDate]) IS NOT NULL OR 
	NULLIF([Source].[ExpirationDate], [Target].[ExpirationDate]) IS NOT NULL OR NULLIF([Target].[ExpirationDate], [Source].[ExpirationDate]) IS NOT NULL OR 
	NULLIF(CAST([Source].[Comments] AS VARCHAR(MAX)), CAST([Target].[Comments] AS VARCHAR(MAX))) IS NOT NULL OR NULLIF(CAST([Target].[Comments] AS VARCHAR(MAX)), CAST([Source].[Comments] AS VARCHAR(MAX))) IS NOT NULL OR 
	NULLIF([Source].[NewsReasonTypeId], [Target].[NewsReasonTypeId]) IS NOT NULL OR NULLIF([Target].[NewsReasonTypeId], [Source].[NewsReasonTypeId]) IS NOT NULL) THEN
 UPDATE SET
  [BusinessUnitId] = [Source].[BusinessUnitId], 
  [CaseId] = [Source].[CaseId], 
  [NewsTypeId] = [Source].[NewsTypeId], 
  [StatusId] = [Source].[StatusId], 
  [CreateDate] = [Source].[CreateDate], 
  [EndDate] = [Source].[EndDate], 
  [ExpirationDate] = [Source].[ExpirationDate], 
  [Comments] = [Source].[Comments], 
  [NewsReasonTypeId] = [Source].[NewsReasonTypeId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([NewsId],[BusinessUnitId],[CaseId],[NewsTypeId],[StatusId],[CreateDate],[EndDate],[ExpirationDate],[Comments],[NewsReasonTypeId])
 VALUES([Source].[NewsId],[Source].[BusinessUnitId],[Source].[CaseId],[Source].[NewsTypeId],[Source].[StatusId],[Source].[CreateDate],[Source].[EndDate],[Source].[ExpirationDate],[Source].[Comments],[Source].[NewsReasonTypeId])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [News]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[News] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [News] OFF
GO
SET NOCOUNT OFF
GO