CREATE TABLE [dbo].[ChannelRisk] (
    [ChannelRiskId]		INT IDENTITY (1, 1) NOT NULL,
    [BusinessUnitId]	INT NOT NULL,
    [ChannelId]         INT NOT NULL,
    [RiskId]			INT NULL,
    CONSTRAINT [PK_ChannelRisk] PRIMARY KEY CLUSTERED ([ChannelRiskId] ASC),
	CONSTRAINT [FK_ChannelRisk_BusinessUnit] FOREIGN KEY ([BusinessUnitId]) REFERENCES [dbo].[BusinessUnit] ([BusinessUnitId]),
    CONSTRAINT [FK_ChannelRisk_Channel] FOREIGN KEY ([ChannelId]) REFERENCES [dbo].[Channel] ([ChannelId]),
	CONSTRAINT [FK_ChannelRisk_Risk] FOREIGN KEY ([RiskId]) REFERENCES [dbo].[Risk] ([RiskId])
);
GO
CREATE UNIQUE NONCLUSTERED INDEX  [UK_ChannelRisk_ChannelIdBusinessUnitId] ON [dbo].[ChannelRisk]
(
	[ChannelId] ASC,
	[BusinessUnitId] ASC
)
