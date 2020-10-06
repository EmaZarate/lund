CREATE TABLE [dbo].[LimitAssuredSum] (
    [LimitAssuredSumId]		INT	IDENTITY (1, 1) NOT NULL,
    [BusinessUnitId]		INT NOT NULL,
    [ProductId]				INT	NOT NULL,
    [IndividualStop]		INT	NOT NULL,
    [AccumulatedStop]		INT	NOT NULL,
	--[Audit_Insert_User]		VARCHAR (50)	NOT NULL,
	--[Audit_Insert_Date]		DATETIME2 (7)	NOT NULL,
    --[Audit_Update_User]		DATETIME2 (7)	NOT NULL,
    --[Audit_Update_Date]		VARCHAR (50)	NOT NULL,
    CONSTRAINT [PK_LimitAssuredSum] PRIMARY KEY CLUSTERED ([LimitAssuredSumId] ASC),
    CONSTRAINT [FK_LimitAssuredSum_Product] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Product] ([ProductId]),
	CONSTRAINT [FK_LimitAssuredSum_BusinessUnit] FOREIGN KEY ([BusinessUnitId]) REFERENCES [dbo].[BusinessUnit] ([BusinessUnitId])
);
GO
CREATE UNIQUE NONCLUSTERED INDEX  [UK_LimitAssuredSum_ProductIdBusinessUnitId] ON [dbo].[LimitAssuredSum]
(
	[ProductId] ASC,
	[BusinessUnitId] ASC
)