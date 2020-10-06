CREATE TABLE [dbo].[RiskAssignmentRangesLog] (
    [RiskAssignmentRangesLogId]		INT IDENTITY (1, 1) NOT NULL,
    [BusinessUnitId]				INT NOT NULL,
    [Pep]                           BIT NOT NULL,
    [LimitDown]						FLOAT (53) NOT NULL,
    [LimitHigh]						FLOAT (53) NOT NULL,
	--[Audit_Insert_User]				VARCHAR (50) NOT NULL,
	--[Audit_Insert_Date]				DATETIME2 (7) NOT NULL,
    --[Audit_Update_User]				DATETIME2 (7) NOT NULL,
    --[Audit_Update_Date]				VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_RiskAssignmentRangesLog] PRIMARY KEY CLUSTERED (RiskAssignmentRangesLogId ASC),
	CONSTRAINT [FK_RiskAssignmentRangesLog_BusinessUnit] FOREIGN KEY ([BusinessUnitId]) REFERENCES [dbo].[BusinessUnit] ([BusinessUnitId])
);
