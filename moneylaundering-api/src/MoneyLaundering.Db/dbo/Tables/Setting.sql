CREATE TABLE [dbo].[Setting] (
    [SettingId]			INT	IDENTITY (1, 1) NOT NULL,
    [SettingName]		VARCHAR (200)		NOT NULL,
    [StringValue]		VARCHAR (1000)		NULL,
    [IntValue]			INT					NULL,
    [DecimalValue]		DECIMAL (18,2)		NULL,
    [DateTimeValue]		DATETIME2 (7)		NULL,
    [BooleanValue]		BIT					NULL,
    [Edit]				BIT					NOT NULL,
    [Description]		VARCHAR (1000)		NULL,
    CONSTRAINT [PK_Setting] PRIMARY KEY CLUSTERED ([SettingId] ASC)
);
GO
CREATE UNIQUE NONCLUSTERED INDEX  [UK_Setting_SettingName] ON [dbo].[Setting]
(
	[SettingName] ASC
)
