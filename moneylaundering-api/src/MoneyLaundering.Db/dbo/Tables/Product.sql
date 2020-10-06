CREATE TABLE [dbo].[Product] (
    [ProductId]						INT	IDENTITY (1, 1) NOT NULL,
    [Description]					VARCHAR (200) NOT NULL,
	--[Audit_Insert_User]				VARCHAR (50)	NOT NULL,
	--[Audit_Insert_Date]				DATETIME2 (7)	NOT NULL,
    --[Audit_Update_User]				DATETIME2 (7)	NOT NULL,
    --[Audit_Update_Date]				VARCHAR (50)	NOT NULL,
    CONSTRAINT [Key142] PRIMARY KEY CLUSTERED ([ProductId] ASC)
);

