CREATE TABLE [dbo].[Antiquity] (
    [AntiquityId]			INT IDENTITY (1, 1) NOT NULL,
    [BusinessUnitId]		INT NOT NULL,
    [RiskHighTo]			SMALLINT NOT NULL,
    [RiskMediumTo]			SMALLINT NOT NULL,
	--[Audit_Insert_User]		VARCHAR (50) NOT NULL,
	--[Audit_Insert_Date]		DATETIME2 (7) NOT NULL,
    --[Audit_Update_User]		DATETIME2 (7) NOT NULL,
    --[Audit_Update_Date]		VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Antiquity] PRIMARY KEY CLUSTERED ([AntiquityId] ASC),
	CONSTRAINT [FK_Antiquity_BusinessUnit] FOREIGN KEY ([BusinessUnitId]) REFERENCES [dbo].[BusinessUnit] ([BusinessUnitId])
);

