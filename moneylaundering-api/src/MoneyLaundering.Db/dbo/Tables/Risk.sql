CREATE TABLE [dbo].[Risk]
(
    [RiskId]				INT	IDENTITY (1, 1) NOT NULL,
    [Description]			VARCHAR (300) NOT NULL,
CONSTRAINT [PK_Risk] PRIMARY KEY CLUSTERED ([RiskId] ASC)
)

