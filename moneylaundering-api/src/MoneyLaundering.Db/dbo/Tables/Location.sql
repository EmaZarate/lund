CREATE TABLE [dbo].[Location] (
    [LocationId]					INT	IDENTITY (1, 1) NOT NULL,
	[Description]					VARCHAR (200) NOT NULL,
    [StateId]						INT	NOT NULL,
    [ZipCode]						INT	NOT NULL,
	--[Audit_Insert_User]				VARCHAR (50)	NOT NULL,
	--[Audit_Insert_Date]				DATETIME2 (7)	NOT NULL,
    --[Audit_Update_User]				DATETIME2 (7)	NOT NULL,
    --[Audit_Update_Date]				VARCHAR (50)	NOT NULL,
    CONSTRAINT [PK_Location] PRIMARY KEY CLUSTERED ([LocationId] ASC),
    CONSTRAINT [FK_Location_State] FOREIGN KEY ([StateId]) REFERENCES [dbo].[State] ([StateId])
);

