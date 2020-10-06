CREATE TABLE [dbo].[RiskAssignmentRanges] (
    [RiskAssignmentRangesId]	INT	IDENTITY (1, 1) NOT NULL,
    [BusinessUnitId]			INT NOT NULL,
    [Pep]						BIT NOT NULL,
    [LimitDown]					FLOAT (53) NOT NULL,
    [LimitMedium]				FLOAT (53) NOT NULL,
	--[Audit_Insert_User]			VARCHAR (50) NOT NULL,
	--[Audit_Insert_Date]			DATETIME2 (7) NOT NULL,
    --[Audit_Update_User]			DATETIME2 (7) NOT NULL,
    --[Audit_Update_Date]			VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_RiskAssignmentRanges] PRIMARY KEY CLUSTERED ([RiskAssignmentRangesId] ASC),
	CONSTRAINT [FK_RiskAssignmentRanges_BusinessUnit] FOREIGN KEY ([BusinessUnitId]) REFERENCES [dbo].[BusinessUnit] ([BusinessUnitId])

);

