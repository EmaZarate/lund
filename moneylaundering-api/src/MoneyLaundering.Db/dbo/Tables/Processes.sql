CREATE TABLE [dbo].[Processes] (
    [ProcessesId]		INT IDENTITY (1, 1) NOT NULL,
    [Description] VARCHAR (200) NOT NULL,
    CONSTRAINT [PK_Processes] PRIMARY KEY CLUSTERED ([ProcessesId] ASC)
);

