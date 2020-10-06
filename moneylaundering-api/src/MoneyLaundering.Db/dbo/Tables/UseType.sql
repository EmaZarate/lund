CREATE TABLE [dbo].[UseType] (
    [UseTypeId]			INT	IDENTITY (1, 1) NOT NULL,
    [Description]		VARCHAR (150) NOT NULL,
    CONSTRAINT [PK_UseType] PRIMARY KEY CLUSTERED ([UseTypeId] ASC)
);

