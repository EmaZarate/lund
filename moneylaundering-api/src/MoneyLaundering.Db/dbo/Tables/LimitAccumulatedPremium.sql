CREATE TABLE [dbo].[LimitAccumulatedPremium] (
    [LimitAccumulatedPremiumId]		INT IDENTITY (1, 1) NOT NULL,
    [BusinessUnitId]				INT NOT NULL,
    [PersonType]					CHAR (1) NOT NULL,
    [RiskType]						SMALLINT NOT NULL,
    [Limit]							FLOAT (53) NULL,
	--[Audit_Insert_User]				VARCHAR (50) NOT NULL,
	--[Audit_Insert_Date]				DATETIME2 (7) NOT NULL,
    --[Audit_Update_User]				DATETIME2 (7) NOT NULL,
    --[Audit_Update_Date]				VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_LimitAccumulatedPremium] PRIMARY KEY CLUSTERED ([LimitAccumulatedPremiumId] ASC),
	CONSTRAINT [FK_LimitAccumulatedPremium_BusinessUnit] FOREIGN KEY ([BusinessUnitId]) REFERENCES [dbo].[BusinessUnit] ([BusinessUnitId])
);
GO
CREATE UNIQUE NONCLUSTERED INDEX  [UK_LimitAccumulatedPremium_PersonTypeRiskTypeBusinessUnitId] ON [dbo].[LimitAccumulatedPremium]
(
	[PersonType] ASC,
	[RiskType] ASC,
	[BusinessUnitId] ASC
)