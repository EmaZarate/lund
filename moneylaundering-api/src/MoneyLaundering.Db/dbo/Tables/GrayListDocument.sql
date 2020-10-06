CREATE TABLE [dbo].[GrayListDocument] (
    [GrayListDocumentId]	INT	IDENTITY (1, 1) NOT NULL,
    [DocumentId]			INT	NOT NULL,
    [GrayListId]			INT NOT NULL,
    CONSTRAINT [PK_GrayListDocument] PRIMARY KEY CLUSTERED ([GrayListDocumentId]),
    CONSTRAINT [FK_GrayListDocument_GrayList] FOREIGN KEY ([GrayListId]) REFERENCES [dbo].[GrayList] ([GrayListId]),
    CONSTRAINT [FK_GrayListDocument_Document] FOREIGN KEY ([DocumentId]) REFERENCES [dbo].[Document] ([DocumentId])
);
GO
CREATE UNIQUE NONCLUSTERED INDEX  [UK_GrayListDocument_DocumentIdGrayListId] ON [dbo].[GrayListDocument]
(
	[DocumentId] ASC,
	[GrayListId] ASC
)