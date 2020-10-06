CREATE TABLE [dbo].[MessageType] (
    [MessageTypeId]		INT	IDENTITY (1, 1) NOT NULL,
	[Description]		VARCHAR (200) NOT NULL,
    CONSTRAINT [PK_MessageType] PRIMARY KEY CLUSTERED ([MessageTypeId] ASC)
);

