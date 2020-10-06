CREATE TABLE [dbo].[CaseDocument] (
    [CaseDocumentId]	INT IDENTITY (1, 1) NOT NULL,
    [CaseId]			INT NOT NULL,
    [DocumentId]		INT NOT NULL,
    [BusinessUnitId]	INT NOT NULL,
    CONSTRAINT [PK_CaseDocument] PRIMARY KEY CLUSTERED ([CaseDocumentId]),
    CONSTRAINT [FK_CaseDocument_Case] FOREIGN KEY ([CaseId]) REFERENCES [dbo].[Case] ([CaseId]),
    CONSTRAINT [FK_CaseDocument_Document] FOREIGN KEY ([DocumentId]) REFERENCES [dbo].[Document] ([DocumentId]),
	CONSTRAINT [FK_CaseDocument_BusinessUnit] FOREIGN KEY ([BusinessUnitId]) REFERENCES [dbo].[BusinessUnit] ([BusinessUnitId])
);
GO
CREATE UNIQUE NONCLUSTERED INDEX  [UK_CaseDocument_CaseIdDocumentIdBusinessUnitId] ON [dbo].[CaseDocument]
(
	[CaseId] ASC,
	[DocumentId] ASC,
	[BusinessUnitId] ASC
)