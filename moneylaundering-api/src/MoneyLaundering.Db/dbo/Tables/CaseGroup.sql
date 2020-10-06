CREATE TABLE [dbo].[CaseGroup] (
    [CaseGroupId]   INT IDENTITY (1, 1) NOT NULL,
    [Description]	VARCHAR (200) NOT NULL,
    CONSTRAINT [PK_CaseGroup] PRIMARY KEY CLUSTERED ([CaseGroupId] ASC)
);

