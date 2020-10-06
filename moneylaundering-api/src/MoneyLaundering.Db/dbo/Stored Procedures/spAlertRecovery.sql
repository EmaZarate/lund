
CREATE PROC [dbo].[spAlertRecovery]
AS
/*
FECHA: 2020-05-20

DETALLE: Inicia la llamada de todo el proceso  
de migración de datos desde el ambientes de BI a UIF

AUTOR: Diego Tripodi
*/
BEGIN

	EXEC [dbo].[spAlertRecovery_Log] 'spAlertRecovery','start'
	EXEC [dbo].[spAlertRecovery_Log] 'spAlertRecovery_Personas','start'

	EXEC [dbo].[spAlertRecovery_Personas]

	EXEC [dbo].[spAlertRecovery_Log] 'spAlertRecovery_Personas','end'
	EXEC [dbo].[spAlertRecovery_Log] 'spAlertRecovery_LegajosVencidos','start'

	EXEC [dbo].[spAlertRecovery_LegajosVencidos]

	EXEC [dbo].[spAlertRecovery_Log] 'spAlertRecovery_LegajosVencidos','end'
	EXEC [dbo].[spAlertRecovery_Log] 'spAlertRecovery_PepClientes','start'

	EXEC [dbo].[spAlertRecovery_PepClientes]

	EXEC [dbo].[spAlertRecovery_Log] 'spAlertRecovery_PepClientes','end'
	EXEC [dbo].[spAlertRecovery_Log] 'spAlertRecovery_PepOtros','start'

	EXEC [dbo].[spAlertRecovery_PepOtros]

	EXEC [dbo].[spAlertRecovery_Log] 'spAlertRecovery_PepOtros','end'
	EXEC [dbo].[spAlertRecovery_Log] 'spAlertRecovery_SujetosObligados','start'

	EXEC [dbo].[spAlertRecovery_SujetosObligados]

	EXEC [dbo].[spAlertRecovery_Log] 'spAlertRecovery_SujetosObligados','end'
	EXEC [dbo].[spAlertRecovery_Log] 'spAlertRecovery_BI','start'

	EXEC [dbo].[spAlertRecovery_BI]

	EXEC [dbo].[spAlertRecovery_Log] 'spAlertRecovery_BI','end'
	EXEC [dbo].[spAlertRecovery_Log] 'spAlertRecovery_Casos','start'

	EXEC [dbo].[spAlertRecovery_Casos]

	EXEC [dbo].[spAlertRecovery_Log] 'spAlertRecovery_Casos','end'
	EXEC [dbo].[spAlertRecovery_Log] 'spAlertRecovery','end'

END