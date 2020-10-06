CREATE TABLE [dbo].[Document] (
    [DocumentId]        INT	IDENTITY (1, 1) NOT NULL,
    [PersonId]          INT NOT NULL,
    [PersonOrignalId]	INT NULL,
    [LogicName]			VARCHAR (500) NOT NULL,
    [DocumentTypeId]    INT NOT NULL,
    [Confidential]		BIT NOT NULL,
    CONSTRAINT [PK_Document] PRIMARY KEY CLUSTERED ([DocumentId] ASC),
    CONSTRAINT [FK_Document_DocumentType] FOREIGN KEY ([DocumentTypeId]) REFERENCES [dbo].[DocumentType] ([DocumentTypeId]),
    CONSTRAINT [FK_Document_Person] FOREIGN KEY ([PersonId]) REFERENCES [dbo].[Person] ([PersonId]),
    CONSTRAINT [FK_Document_PersonOriginal] FOREIGN KEY ([PersonId]) REFERENCES [dbo].[Person] ([PersonId])
);
