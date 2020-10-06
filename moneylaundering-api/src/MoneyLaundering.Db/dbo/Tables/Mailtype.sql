CREATE TABLE [dbo].[MailType] (
    [MailTypeId]		INT	IDENTITY (1, 1) NOT NULL,
    [Description]		VARCHAR (200) NOT NULL,
    [Subject]			VARCHAR (500) NULL,
    [Message]			TEXT          NULL,
    CONSTRAINT [PK_MailType] PRIMARY KEY CLUSTERED ([MailTypeId] ASC)
);

