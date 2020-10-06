CREATE TABLE [dbo].[DocumentVersion] (
    [DocumentVersionId]		INT IDENTITY (1, 1) NOT NULL,
    [DocumentId]				INT	NOT NULL,
    [VersionId]					INT	NOT NULL,
    [PhysicalName]				VARCHAR (500) NOT NULL,
    [CreateDate]				DATETIME2 (7) NOT NULL,
    [Comment]					TEXT NULL,
    [Expiration]				DATETIME2 (7) NULL,
	--[Audit_Insert_User]			VARCHAR (50) NOT NULL,
	--[Audit_Insert_Date]			DATETIME2 (7) NOT NULL,
    --[Audit_Update_User]			DATETIME2 (7) NOT NULL,
    --[Audit_Update_Date]			VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_DocumentVersion] PRIMARY KEY CLUSTERED ([DocumentVersionId] ASC),
    CONSTRAINT [FK_DocumentVersion_Document] FOREIGN KEY ([DocumentId]) REFERENCES [dbo].[Document] ([DocumentId]) ON DELETE CASCADE
);
GO
CREATE UNIQUE NONCLUSTERED INDEX  [UK_DocumentVersion_DocumentIdVersionId] ON [dbo].[DocumentVersion]
(
	[DocumentId] ASC,
	[VersionId] ASC
)

