CREATE TABLE [dbo].[Branch] (
    [BranchId]		INT	IDENTITY (1, 1) NOT NULL,
    [Description]	VARCHAR (100) NOT NULL,
    CONSTRAINT [PK_Branch] PRIMARY KEY CLUSTERED ([BranchId] ASC)
);

