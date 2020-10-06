SET NOCOUNT ON

SET IDENTITY_INSERT [PersonBusinessUnit] ON

MERGE INTO [PersonBusinessUnit] AS [Target]
USING (VALUES
  (1,2,1,3,1,1,1)
) AS [Source] ([PersonBusinessUnitId],[PersonId],[BusinessUnitId],[FinancialProfile],[CalcRisk],[AssignedRisk],[RiskId])
ON ([Target].[PersonBusinessUnitId] = [Source].[PersonBusinessUnitId])
WHEN MATCHED AND (
	NULLIF([Source].[PersonId], [Target].[PersonId]) IS NOT NULL OR NULLIF([Target].[PersonId], [Source].[PersonId]) IS NOT NULL OR 
	NULLIF([Source].[BusinessUnitId], [Target].[BusinessUnitId]) IS NOT NULL OR NULLIF([Target].[BusinessUnitId], [Source].[BusinessUnitId]) IS NOT NULL OR 
	NULLIF([Source].[FinancialProfile], [Target].[FinancialProfile]) IS NOT NULL OR NULLIF([Target].[FinancialProfile], [Source].[FinancialProfile]) IS NOT NULL OR 
	NULLIF([Source].[CalcRisk], [Target].[CalcRisk]) IS NOT NULL OR NULLIF([Target].[CalcRisk], [Source].[CalcRisk]) IS NOT NULL OR 
	NULLIF([Source].[AssignedRisk], [Target].[AssignedRisk]) IS NOT NULL OR NULLIF([Target].[AssignedRisk], [Source].[AssignedRisk]) IS NOT NULL OR 
	NULLIF([Source].[RiskId], [Target].[RiskId]) IS NOT NULL OR NULLIF([Target].[RiskId], [Source].[RiskId]) IS NOT NULL) THEN
 UPDATE SET
  [PersonId] = [Source].[PersonId], 
  [BusinessUnitId] = [Source].[BusinessUnitId], 
  [FinancialProfile] = [Source].[FinancialProfile], 
  [CalcRisk] = [Source].[CalcRisk], 
  [AssignedRisk] = [Source].[AssignedRisk], 
  [RiskId] = [Source].[RiskId]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([PersonBusinessUnitId],[PersonId],[BusinessUnitId],[FinancialProfile],[CalcRisk],[AssignedRisk],[RiskId])
 VALUES([Source].[PersonBusinessUnitId],[Source].[PersonId],[Source].[BusinessUnitId],[Source].[FinancialProfile],[Source].[CalcRisk],[Source].[AssignedRisk],[Source].[RiskId])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [PersonBusinessUnit]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[PersonBusinessUnit] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [PersonBusinessUnit] OFF
GO
SET NOCOUNT OFF
GO
