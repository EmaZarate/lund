CREATE TABLE [dbo].[CategoryCost] (
    [CategoryCostId]	INT	IDENTITY (1, 1) NOT NULL,
    [Description]		VARCHAR (150) NOT NULL,
    CONSTRAINT [PK_CategoryCost] PRIMARY KEY CLUSTERED ([CategoryCostId] ASC)
);

