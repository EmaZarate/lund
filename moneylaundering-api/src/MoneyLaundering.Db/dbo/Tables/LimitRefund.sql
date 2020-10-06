CREATE TABLE [dbo].[LimitRefund] (
    [LimitRefundId]			INT	IDENTITY (1, 1) NOT NULL,
    [BusinessUnitId]		INT NOT NULL,
    [RiskType]				SMALLINT NOT NULL,
    [Limit]					FLOAT (53) NULL,
	--[Audit_Insert_User]		VARCHAR (50) NOT NULL,
	--[Audit_Insert_Date]		DATETIME2 (7) NOT NULL,
    --[Audit_Update_User]		DATETIME2 (7) NOT NULL,
    --[Audit_Update_Date]		VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_LimitRefund] PRIMARY KEY CLUSTERED ([LimitRefundId] ASC),
	CONSTRAINT [FK_LimitRefund_BusinessUnit] FOREIGN KEY ([BusinessUnitId]) REFERENCES [dbo].[BusinessUnit] ([BusinessUnitId])
);
GO
CREATE UNIQUE NONCLUSTERED INDEX  [UK_LimitRefund_RiskTypeBusinessUnitId] ON [dbo].[LimitRefund]
(
	[RiskType] ASC,
	[BusinessUnitId] ASC
)
