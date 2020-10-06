CREATE TABLE [dbo].[NewsReason] (
    [NewsReasonId]		INT	IDENTITY (1, 1) NOT NULL,
    [NewsTypeId] INT NOT NULL,
	[NewsReasonTypeId] INT NOT NULL,
    CONSTRAINT [PK_NewsReason] PRIMARY KEY CLUSTERED ([NewsReasonId] ASC),
    CONSTRAINT [FK_NewsReason] FOREIGN KEY ([NewsTypeId]) REFERENCES [dbo].[NewsType] ([NewsTypeId]),
    CONSTRAINT [FK_NewsReason_NewsReasonType] FOREIGN KEY ([NewsReasonTypeId]) REFERENCES [dbo].[NewsReasonType] ([NewsReasonTypeId])
);

