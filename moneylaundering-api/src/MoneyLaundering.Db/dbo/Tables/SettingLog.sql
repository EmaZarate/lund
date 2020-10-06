CREATE TABLE [dbo].[SettingLog] (
    [SettingLogId]              INT	IDENTITY (1, 1) NOT NULL,
    [SettingName]				VARCHAR (200)  NOT NULL,
    [OldValue]			        VARCHAR (1000) NULL,
    [ActualValue]				VARCHAR (1000) NOT NULL,
    CONSTRAINT [PK_SettingLog] PRIMARY KEY CLUSTERED ([SettingLogId] ASC)
);

