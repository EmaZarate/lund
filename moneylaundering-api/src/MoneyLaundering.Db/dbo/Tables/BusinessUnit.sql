CREATE TABLE [dbo].[BusinessUnit] (
    [BusinessUnitId]		INT IDENTITY (1, 1) NOT NULL,
    [Description]			VARCHAR (200) NOT NULL,
    CONSTRAINT [PK_BusinessUnit] PRIMARY KEY CLUSTERED ([BusinessUnitId] ASC)
);

