CREATE TABLE [dbo].[NewsMail] (
    [NewsMailId]		INT	IDENTITY (1, 1) NOT NULL,
    [NewsId]			INT	NOT NULL,
    [ContactMail]		VARCHAR (200) NOT NULL,
    [MailTypeId]		INT NOT NULL,
    [Subject]           VARCHAR (500) NULL,
    [Message]           TEXT          NULL,
    CONSTRAINT [PK_NewsMail] PRIMARY KEY CLUSTERED ([NewsMailId] ASC),
    CONSTRAINT [FK_NewsMail_News] FOREIGN KEY ([NewsId]) REFERENCES [dbo].[News] ([NewsId]),
    CONSTRAINT [FK_NewsMail_MailType] FOREIGN KEY ([MailTypeId]) REFERENCES [dbo].[Mailtype] ([MailTypeId]),
);

