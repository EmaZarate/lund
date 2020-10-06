CREATE TABLE [dbo].[PaymentModeRisk] (
    [PaymentModeRiskId]			INT IDENTITY (1, 1) NOT NULL,
    [BusinessUnitId]			INT NOT NULL,
    [PaymentModeId]				INT NOT NULL,
    [RiskId]					INT NULL,
    CONSTRAINT [PK_PaymentModeRisk] PRIMARY KEY CLUSTERED ([PaymentModeRiskId] ASC),
    CONSTRAINT [FK_PaymentModeRisk_PaymentMode] FOREIGN KEY ([PaymentModeId]) REFERENCES [dbo].[PaymentMode] ([PaymentModeId]),
	CONSTRAINT [FK_PaymentModeRisk_BusinessUnit] FOREIGN KEY ([BusinessUnitId]) REFERENCES [dbo].[BusinessUnit] ([BusinessUnitId]),
	CONSTRAINT [FK_PaymentModeRisk_Risk] FOREIGN KEY ([RiskId]) REFERENCES [dbo].[Risk] ([RiskId])
);
GO
CREATE UNIQUE NONCLUSTERED INDEX  [UK_PaymentModeRisk_PaymentModeIdBusinessUnitId] ON [dbo].[PaymentModeRisk]
(
	[PaymentModeId] ASC,
	[BusinessUnitId] ASC
)