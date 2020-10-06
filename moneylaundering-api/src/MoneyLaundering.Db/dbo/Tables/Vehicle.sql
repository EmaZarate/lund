CREATE TABLE [dbo].[Vehicle] (
    [VehicleId]			INT IDENTITY (1, 1) NOT NULL,
    [LicensePlate]		VARCHAR (50)  NOT NULL,
    [Make]				VARCHAR (200) NULL,
    [Model]				VARCHAR (300) NULL,
	[Version]			VARCHAR (300) NULL,
    [Year]				SMALLINT      NULL,
    CONSTRAINT [PK_Vehicle] PRIMARY KEY CLUSTERED ([VehicleId] ASC)
);
GO
CREATE UNIQUE NONCLUSTERED INDEX  [UK_Vehicle_LicensePlate] ON [dbo].[Vehicle]
(
	[LicensePlate] ASC
)