CREATE TABLE [dbo].[PersonBusinessUnit] (
    [PersonBusinessUnitId]		INT IDENTITY (1, 1) NOT NULL,
    [PersonId]					INT NOT NULL,
    [BusinessUnitId]			INT NOT NULL,
    [FinancialProfile]			INT NULL,
    [CalcRisk]					INT NULL,
    [AssignedRisk]				INT NULL,
    [RiskId]					INT NULL,
    CONSTRAINT [PK_PersonBusinessUnit] PRIMARY KEY CLUSTERED ([PersonBusinessUnitId] ASC),
    CONSTRAINT [FK_PersonBusinessUnit_Person] FOREIGN KEY ([PersonId]) REFERENCES [dbo].[Person] ([PersonId]),
	CONSTRAINT [FK_PersonBusinessUnit_BusinessUnit] FOREIGN KEY ([BusinessUnitId]) REFERENCES [dbo].[BusinessUnit] ([BusinessUnitId]),
	CONSTRAINT [FK_PersonBusinessUnit_Risk] FOREIGN KEY ([RiskId]) REFERENCES [dbo].[Risk] ([RiskId])
);
GO
CREATE UNIQUE NONCLUSTERED INDEX  [UK_PersonBusinessUnit_PersonIdBusinessUnitId] ON [dbo].[PersonBusinessUnit]
(
	[PersonId] ASC,
	[BusinessUnitId] ASC
)

