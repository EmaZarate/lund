CREATE TABLE [dbo].[ProductRisk] (
    [ProductRiskId]		INT	IDENTITY (1, 1) NOT NULL,
    [BusinessUnitId]		INT NOT NULL,
    [ProductId]				INT NOT NULL,
    [RiskId]				INT NULL,
    CONSTRAINT [PK_ProductRisk] PRIMARY KEY CLUSTERED ([ProductRiskId] ASC),
    CONSTRAINT [FK_ProductRisk_Product] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Product] ([ProductId]),
	CONSTRAINT [FK_ProductRisk_BusinessUnit] FOREIGN KEY ([BusinessUnitId]) REFERENCES [dbo].[BusinessUnit] ([BusinessUnitId]),
	CONSTRAINT [FK_ProductRisk_Risk] FOREIGN KEY ([RiskId]) REFERENCES [dbo].[Risk] ([RiskId])
);