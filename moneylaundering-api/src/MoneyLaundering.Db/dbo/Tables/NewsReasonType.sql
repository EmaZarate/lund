CREATE TABLE [dbo].[NewsReasonType] (
    [NewsReasonTypeId]		INT	IDENTITY (1, 1) NOT NULL,
    [Description]			VARCHAR (200) NOT NULL,
    [Global]				BIT NOT NULL,
    CONSTRAINT [PK_NewsReasonType] PRIMARY KEY CLUSTERED ([NewsReasonTypeId] ASC)
);

