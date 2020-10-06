CREATE TABLE [dbo].[ProcessesLog] (
    [ProcessesLogId]    INT IDENTITY (1, 1) NOT NULL,
    [ProcessesId]       INT NOT NULL,
    [Message]           TEXT NOT NULL,
    [MessageTypeId]		INT NOT NULL,
    [Date]				DATETIME2 (7) NOT NULL,
    [BusinessUnitId]		INT NOT NULL,
    CONSTRAINT [PK_ProcessesLog] PRIMARY KEY CLUSTERED ([ProcessesLogId] ASC),
    CONSTRAINT [FK_ProcessesLog_Processes] FOREIGN KEY ([ProcessesId]) REFERENCES [dbo].[Processes] ([ProcessesId]),
    CONSTRAINT [FK_ProcessesLog_MessageType] FOREIGN KEY ([MessageTypeId]) REFERENCES [dbo].[MessageType] ([MessageTypeId]),
	CONSTRAINT [FK_ProcessesLog_BusinessUnit] FOREIGN KEY ([BusinessUnitId]) REFERENCES [dbo].[BusinessUnit] ([BusinessUnitId])

);
