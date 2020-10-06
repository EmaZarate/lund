CREATE TABLE [dbo].[PolicyType] (
    [PolicyTypeId]		INT IDENTITY (1, 1) NOT NULL,
    [Description]		VARCHAR (100) NOT NULL,
	[BranchId]			INT NOT NULL,
    CONSTRAINT [PK_PolicyType] PRIMARY KEY CLUSTERED ([PolicyTypeId] ASC),
    CONSTRAINT [FK_PolicyType_Branch] FOREIGN KEY ([BranchId]) REFERENCES [dbo].[Branch] ([BranchId])
);

