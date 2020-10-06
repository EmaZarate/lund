CREATE TABLE [dbo].[CoverageType] (
    [CoverageTypeId]	INT	IDENTITY (1, 1) NOT NULL,
    [Description]		VARCHAR (200) NOT NULL,
    CONSTRAINT [PK_CoverageType] PRIMARY KEY CLUSTERED ([CoverageTypeId] ASC)
);

