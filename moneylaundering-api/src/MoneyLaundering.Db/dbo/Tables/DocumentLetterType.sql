CREATE TABLE [dbo].[DocumentLetterType] (
    [DocumentLetterTypeId]  INT	IDENTITY (1, 1) NOT NULL,
    [Description]			VARCHAR (300) NULL,
    CONSTRAINT [PK_DocumentLetterType] PRIMARY KEY CLUSTERED ([DocumentLetterTypeId] ASC)
);

