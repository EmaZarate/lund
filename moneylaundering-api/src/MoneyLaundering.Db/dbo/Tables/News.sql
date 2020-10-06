CREATE TABLE [dbo].[News] (
    [NewsId]				INT	IDENTITY (1, 1) NOT NULL,
	[NewsNumber]			INT NULL,
    [BusinessUnitId]		INT NOT NULL,
    [CaseId]				INT	NOT NULL,
    [NewsTypeId]			INT	NOT NULL,
    [StatusId]				INT  NOT NULL,
    [CreateDate]			DATETIME2 (7) NOT NULL,
    [EndDate]				DATETIME2 (7) NULL,
    [ExpirationDate]        DATETIME2 (7)  NULL,
    [Comments]              TEXT NULL,
    [NewsReasonTypeId]		INT NULL,
	--[Audit_Insert_User]		VARCHAR (50)		NOT NULL,
	--[Audit_Insert_Date]		DATETIME2 (7)		NOT NULL,
    --[Audit_Update_User]		DATETIME2 (7)		NOT NULL,
    --[Audit_Update_Date]		VARCHAR (50)		NOT NULL,
    CONSTRAINT [PK_News]	PRIMARY KEY CLUSTERED ([NewsId] ASC),
    CONSTRAINT [FK_News_Status] FOREIGN KEY ([StatusId]) REFERENCES [dbo].[Status] ([StatusId]),
    CONSTRAINT [FK_News_NewsType] FOREIGN KEY ([NewsTypeId]) REFERENCES [dbo].[NewsType] ([NewsTypeId]),
    CONSTRAINT [FK_News_NewsReasonType] FOREIGN KEY ([NewsReasonTypeId]) REFERENCES [dbo].[NewsReasonType] ([NewsReasonTypeId]),
	CONSTRAINT [FK_News_BusinessUnit] FOREIGN KEY ([BusinessUnitId]) REFERENCES [dbo].[BusinessUnit] ([BusinessUnitId]),
	CONSTRAINT [FK_News_Cases] FOREIGN KEY ([CaseId]) REFERENCES [dbo].[Case] ([CaseId])ON DELETE CASCADE
);
GO
--CREATE UNIQUE NONCLUSTERED INDEX  [UK_News_CaseIdNewsNumberBusinessUnitId] ON [dbo].[News]
--(
--	--[NewsNumber] ASC,
--	[BusinessUnitId] ASC,
--	[CaseId] ASC
--)