CREATE TABLE [dbo].[ActivityRisk] (
    [ActivityRiskId]    INT IDENTITY (1, 1) NOT NULL,
    [BusinessUnitId]	INT NOT NULL,
    [ActivityId]		INT NOT NULL,
    [RiskPH]			SMALLINT NULL,
    [RiskPJ]			SMALLINT NULL,
    CONSTRAINT [PK_ActivityRisk] PRIMARY KEY CLUSTERED ([ActivityRiskId] ASC),
    CONSTRAINT [FK_ActivityRisk] FOREIGN KEY ([ActivityId]) REFERENCES [dbo].[Activity] ([ActivityId]),
	CONSTRAINT [FK_ActivityRisk_BusinessUnit] FOREIGN KEY ([BusinessUnitId]) REFERENCES [dbo].[BusinessUnit] ([BusinessUnitId])
);
GO
CREATE UNIQUE NONCLUSTERED INDEX  [UK_ActivityRisk_ActivityIdBusinessUnitId] ON [dbo].[ActivityRisk]
(
	[ActivityId] ASC,
	[BusinessUnitId] ASC
)

