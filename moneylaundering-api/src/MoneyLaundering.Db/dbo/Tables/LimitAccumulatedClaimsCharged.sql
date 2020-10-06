CREATE TABLE [dbo].[LimitAccumulatedClaimsCharged] (
    [LimitAccumulatedClaimsChargedId]		INT	IDENTITY (1, 1) NOT NULL,
    [BusinessUnitId]						INT NOT NULL,
    [PersonType]							CHAR (1) NOT NULL,
    [RiskType]								SMALLINT NOT NULL,
    [Limit]									INT NOT NULL,
	--[Audit_Insert_User]						VARCHAR (50) NOT NULL,
	--[Audit_Insert_Date]						DATETIME2 (7) NOT NULL,
    --[Audit_Update_User]						DATETIME2 (7) NOT NULL,
    --[Audit_Update_Date]						VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_LimitAccumulatedClaimsCharged] PRIMARY KEY CLUSTERED ([LimitAccumulatedClaimsChargedId] ASC),
	CONSTRAINT [FK_LimitAccumulatedClaimsCharged_BusinessUnit] FOREIGN KEY ([BusinessUnitId]) REFERENCES [dbo].[BusinessUnit] ([BusinessUnitId])
);
GO
CREATE UNIQUE NONCLUSTERED INDEX  [UK_LimitAccumulatedClaimsCharged_PersonTypeRiskTypeBusinessUnitId] ON [dbo].[LimitAccumulatedClaimsCharged]
(
	[PersonType] ASC,
	[RiskType] ASC,
	[BusinessUnitId] ASC
)