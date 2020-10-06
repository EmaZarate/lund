CREATE TABLE [dbo].[NewsRiskChange] (
	[NewsRiskChangeId]	INT	IDENTITY (1, 1) NOT NULL,
    [NewsId]			INT	NOT NULL,
    [NewRisk]			SMALLINT NOT NULL,
    CONSTRAINT [PK_NewsRiskChange] PRIMARY KEY CLUSTERED ([NewsRiskChangeId] ASC),
    CONSTRAINT [FK_NewsRiskChange_News] FOREIGN KEY ([NewsId]) REFERENCES [dbo].[News] ([NewsId]),
);
