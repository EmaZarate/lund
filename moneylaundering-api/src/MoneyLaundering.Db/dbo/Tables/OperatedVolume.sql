CREATE TABLE [dbo].[OperatedVolume] (
    [OperatedVolumeId]		INT	IDENTITY (1, 1) NOT NULL,
    [BusinessUnitId]		INT NOT NULL,
    [FromDown]				FLOAT (53) NOT NULL,
    [FromMedium]			FLOAT (53) NOT NULL,
	--[Audit_Insert_User]		VARCHAR (50) NOT NULL,
	--[Audit_Insert_Date]		DATETIME2 (7) NOT NULL,
    --[Audit_Update_User]		DATETIME2 (7) NOT NULL,
    --[Audit_Update_Date]		VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_OperatedVolume] PRIMARY KEY CLUSTERED ([OperatedVolumeId] ASC),
	CONSTRAINT [FK_OperatedVolume_BusinessUnit] FOREIGN KEY ([BusinessUnitId]) REFERENCES [dbo].[BusinessUnit] ([BusinessUnitId])
);

