CREATE TABLE [dbo].[CaseType] (
    [CaseTypeId]  INT IDENTITY (1, 1) NOT NULL,
    [Description] VARCHAR (200) NOT NULL,
    [CaseGroupId] INT NULL,
    CONSTRAINT [PK_CaseType] PRIMARY KEY CLUSTERED ([CaseTypeId] ASC),
    CONSTRAINT [FK_CaseType_CaseGroup] FOREIGN KEY ([CaseGroupId]) REFERENCES [dbo].[CaseGroup] ([CaseGroupId])
);

