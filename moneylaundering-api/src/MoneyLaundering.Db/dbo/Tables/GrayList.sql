CREATE TABLE [dbo].[GrayList] (
    [GrayListId]				INT IDENTITY (1, 1) NOT NULL,
    [Comments]					TEXT NULL,
    [Active]					BIT NOT NULL,
    [PersonId]					INT NULL,
    [PersonOriginalId]			INT NULL,
    [CreationDate] DATETIME NOT NULL, 
    CONSTRAINT [PK_GrayList] PRIMARY KEY CLUSTERED ([GrayListId] ASC),
    CONSTRAINT [FK_GrayList_PersonOriginal] FOREIGN KEY ([PersonOriginalId]) REFERENCES [dbo].[Person] ([PersonId]),
    CONSTRAINT [FK_GrayList_Person] FOREIGN KEY ([PersonId]) REFERENCES [dbo].[Person] ([PersonId])
);