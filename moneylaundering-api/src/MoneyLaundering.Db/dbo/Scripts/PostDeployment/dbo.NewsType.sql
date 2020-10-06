
SET NOCOUNT ON

SET IDENTITY_INSERT [NewsType] ON

MERGE INTO [NewsType] AS [Target]
USING (VALUES
  (1,N'Falso Positivo')
 ,(2,N'Desestimación')
 ,(3,N'Finalizacion')
 ,(4,N'Asignacion Analista')
 ,(5,N'Requerimiento Información')
 ,(6,N'Recibo Información')
 ,(7,N'Asignación Superior')
 ,(8,N'Asignación a Oficial de Cumplimiento')
 ,(9,N'Cierre por Nuevo Caso')
 ,(10,N'Cambio de Fecha de Vencimiento')
 ,(11,N'Reasignación de Analista')
 ,(12,N'Modificación del Riesgo')
 ,(13,N'Nueva Alerta')
 ,(14,N'Devolución')
) AS [Source] ([NewsTypeId],[Description])
ON ([Target].[NewsTypeId] = [Source].[NewsTypeId])
WHEN MATCHED AND (
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL) THEN
 UPDATE SET
  [Description] = [Source].[Description]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([NewsTypeId],[Description])
 VALUES([Source].[NewsTypeId],[Source].[Description])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [NewsType]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[NewsType] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [NewsType] OFF
GO
SET NOCOUNT OFF
GO