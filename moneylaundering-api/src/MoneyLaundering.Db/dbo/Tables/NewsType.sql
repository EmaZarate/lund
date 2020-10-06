CREATE TABLE [dbo].[NewsType] (
    [NewsTypeId]		INT	IDENTITY (1, 1) NOT NULL,
    [Description]		VARCHAR (200) NOT NULL,
    CONSTRAINT [PK_NewsType] PRIMARY KEY CLUSTERED ([NewsTypeId] ASC)
);

