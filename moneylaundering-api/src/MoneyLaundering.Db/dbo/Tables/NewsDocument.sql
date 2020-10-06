CREATE TABLE [dbo].[NewsDocument] (
    [NewsDocumentId]			INT	IDENTITY (1, 1) NOT NULL,
    [NewsId]					INT NOT NULL,
    [DocumentLetterTypeId]		INT NOT NULL,
    [ContactAddress]			VARCHAR (500) NOT NULL,
    [ContactZipCode]			INT	NOT NULL,
    [ContactLocationId]			INT	NOT NULL,
    [Processed]					BIT NOT NULL,
    CONSTRAINT [PK_NewsDocument] PRIMARY KEY CLUSTERED ([NewsDocumentId] ASC),
    CONSTRAINT [FK_NewsDocument_News] FOREIGN KEY ([NewsId]) REFERENCES [dbo].[News] ([NewsId]),
    CONSTRAINT [FK_NewsDocument_DocumentLetterType] FOREIGN KEY ([DocumentLetterTypeId]) REFERENCES [dbo].[DocumentLetterType] ([DocumentLetterTypeId]),
    CONSTRAINT [FK_NewsDocument_Location] FOREIGN KEY ([ContactLocationId]) REFERENCES [dbo].[Location] ([LocationId])
);