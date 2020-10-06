SET NOCOUNT ON

SET IDENTITY_INSERT [Setting] ON

MERGE INTO [Setting] AS [Target]
USING (VALUES
  (1,N'Ultima Sincronizacion Personas',0,NULL)
 ,(2,N'Ultima Sincronizacion Alertas',0,NULL)
 ,(3,N'Ultima Sincronizacion Log',0,NULL)
 ,(4,N'SMVM',1,N'Valor para el salario minimo vital y movil')
 ,(5,N'Vencimiento Legajo Riesgo Medio',1,N'Cantidad de Años que tarda en vencer el legajo de una persona con riesgo medio')
 ,(6,N'Vencimiento Legajo Riesgo Alto',1,N'Cantidad de Años que tarda en vencer el legajo de una persona con riesgo alto')
 ,(7,N'Dias Revalidacion Listas',1,N'Parametrización para alerta de relación entre aportes y rescates')
 ,(8,N'Relación aportes rescates',1,N'Parametrización para alerta de relación entre aportes y rescates')
 ,(9,N'Tolerancia aportes rescates',1,N'Parametrización para alerta de relación entre aportes y rescates')
 ,(10,N'Meses Retencion Tabla Log',0,N'Guarda la cantidad de meses que se deben retener os registros en la tabla log procesos')
) AS [Source] ([SettingId],[SettingName],[Edit],[Description])
ON ([Target].[SettingId] = [Source].[SettingId])
WHEN MATCHED AND (
	NULLIF([Source].[SettingName], [Target].[SettingName]) IS NOT NULL OR NULLIF([Target].[SettingName], [Source].[SettingName]) IS NOT NULL OR 
	NULLIF([Source].[Edit], [Target].[Edit]) IS NOT NULL OR NULLIF([Target].[Edit], [Source].[Edit]) IS NOT NULL OR 
	NULLIF([Source].[Description], [Target].[Description]) IS NOT NULL OR NULLIF([Target].[Description], [Source].[Description]) IS NOT NULL) THEN
 UPDATE SET
  [SettingName] = [Source].[SettingName], 
  [Edit] = [Source].[Edit], 
  [Description] = [Source].[Description]
WHEN NOT MATCHED BY TARGET THEN
 INSERT([SettingId],[SettingName],[Edit],[Description])
 VALUES([Source].[SettingId],[Source].[SettingName],[Source].[Edit],[Source].[Description])
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE
;
GO
DECLARE @mergeError int
 , @mergeCount int
SELECT @mergeError = @@ERROR, @mergeCount = @@ROWCOUNT
IF @mergeError != 0
 BEGIN
 PRINT 'ERROR OCCURRED IN MERGE FOR [Setting]. Rows affected: ' + CAST(@mergeCount AS VARCHAR(100)); -- SQL should always return zero rows affected
 END
ELSE
 BEGIN
 PRINT '[Setting] rows affected by MERGE: ' + CAST(@mergeCount AS VARCHAR(100));
 END
GO

SET IDENTITY_INSERT [Setting] OFF
GO
SET NOCOUNT OFF
GO
