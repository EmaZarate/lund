CREATE TABLE [dbo].[CaseVehicle] (
    [CaseVehicleId]			INT IDENTITY (1, 1) NOT NULL,
    [BusinessUnitId]		INT NOT NULL,
    [CaseId]				INT NOT NULL,
    [LicensePlate]			VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_CaseVehicle] PRIMARY KEY CLUSTERED (CaseVehicleId ASC),
    CONSTRAINT [FK_CaseVehicle_Case] FOREIGN KEY ([CaseId]) REFERENCES [dbo].[Case] ([CaseId]),
	CONSTRAINT [FK_CaseVehicle_BusinessUnit] FOREIGN KEY ([BusinessUnitId]) REFERENCES [dbo].[BusinessUnit] ([BusinessUnitId])
);
GO
CREATE UNIQUE NONCLUSTERED INDEX  [UK_CaseVehicle_CaseIdLicensePlateBusinessUnitId] ON [dbo].[CaseVehicle]
(
	[CaseId] ASC,
	[LicensePlate] ASC,
	[BusinessUnitId] ASC
)