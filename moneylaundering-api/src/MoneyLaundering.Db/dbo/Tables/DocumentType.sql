CREATE TABLE [dbo].[DocumentType] (
    [DocumentTypeId]  INT IDENTITY (1, 1) NOT NULL,
    [Description]	  VARCHAR (200) NOT NULL,
    CONSTRAINT [PK_DocumentType] PRIMARY KEY CLUSTERED ([DocumentTypeId] ASC)
);

