CREATE TABLE [dbo].[FinancialProfilesDefaultLog] (
    [FinancialProfilesDefaultLogId]			INT IDENTITY (1, 1) NOT NULL,
    [BusinessUnitId]						INT NOT NULL,
    [PersonType]							CHAR (1) NOT NULL,
    [RiskType]								SMALLINT NOT NULL,
    [FinancialProfile]						INT	NOT NULL,
	[Audit_Insert_User]						VARCHAR (50) NOT NULL,
	[Audit_Insert_Date]						DATETIME2 (7) NOT NULL,
    [Audit_Update_User]						DATETIME2 (7) NOT NULL,
    [Audit_Update_Date]						VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_FinancialProfilesDefaultLog] PRIMARY KEY CLUSTERED ([FinancialProfilesDefaultLogId] ASC),
	CONSTRAINT [FK_FinancialProfilesDefaultLog_BusinessUnit] FOREIGN KEY ([BusinessUnitId]) REFERENCES [dbo].[BusinessUnit] ([BusinessUnitId])

);
