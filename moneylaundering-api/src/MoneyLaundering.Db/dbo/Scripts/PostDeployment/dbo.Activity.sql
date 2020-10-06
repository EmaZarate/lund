SET NOCOUNT ON

SET IDENTITY_INSERT [Activity] ON

MERGE INTO [Activity] AS [Target]
USING (VALUES
  (1,N'Desarrollador de Software',0)
 ,(2,N'Analista de sistemas',0)
) AS [Source] ([ActivityId],[Description],[ObligatedSubject])
ON ([Target].[ActivityId] = [Source].[ActivityId])
WHEN MATCHED AND (
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL OR 
	NULLIF([Source].[ObligatedSubject], [Target].[ObligatedSubject]) IS NOT NULL OR NULLIF([Target].[ObligatedSubject], [Source].[ObligatedSubject]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = [Source].[Description], 
  [ObligatedSubject] = [Source].[ObligatedSubject]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([ActivityId],[Description],[ObligatedSubject])
 VALUES([Source].[ActivityId],[Source].[Description],[Source].[ObligatedSubject])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [Activity]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[Activity] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [Activity] OFF
GO
SET NOCOUNT OFF
GO