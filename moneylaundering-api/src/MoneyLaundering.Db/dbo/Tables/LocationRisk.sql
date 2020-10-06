CREATE TABLE [dbo].[LocationRisk] (
    [LocationRiskId]	INT	IDENTITY (1, 1) NOT NULL,
    [BusinessUnitId]	INT NOT NULL,
    [LocationId]		INT	NOT NULL,
    [ZipCode]			INT	NOT NULL,
    [RiskId]			INT NULL,
    CONSTRAINT [PK_LocationRisk] PRIMARY KEY CLUSTERED ([LocationRiskId] ASC),
    CONSTRAINT [FK_LocationRisk_Location] FOREIGN KEY ([LocationId]) REFERENCES [dbo].[Location] ([LocationId]),
	CONSTRAINT [FK_LocationRisk_BusinessUnit] FOREIGN KEY ([BusinessUnitId]) REFERENCES [dbo].[BusinessUnit] ([BusinessUnitId]),
	CONSTRAINT [FK_LocationRisk_Risk] FOREIGN KEY ([RiskId]) REFERENCES [dbo].[Risk] ([RiskId])
);
GO
CREATE UNIQUE NONCLUSTERED INDEX  [UK_LocationRisk_LocationRiskIdBusinessUnitId] ON [dbo].[LocationRisk]
(
	[LocationId] ASC,
	[BusinessUnitId] ASC
)