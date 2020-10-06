
CREATE TABLE [dbo].[GA_vw_NovedadesAlertasLavado](
	[Id] [int] NOT NULL,
	[CodUnidadNegocio] [smallint] NULL,
	[ClaveAutomatica] [varchar](8000) NULL,
	[Sucursal] [smallint] NULL,
	[CodigoProductor] [varchar](50) NULL,
	[NombreProductor] [varchar](200) NULL,
	[CorreoProductor] [varchar](200) NULL,
	[Comentarios] [varchar](8000) NULL,
	[TipoCaso] [varchar](50) NULL,
	[Prioridad] [money] NULL,
	[FechaActualizacion] [datetime] NULL
) ON [PRIMARY]
GO


