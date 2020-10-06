CREATE TABLE [dbo].[Number]
(
    [NumberId]				INT IDENTITY (1, 1) NOT NULL,
	[Description]			VARCHAR (100) NULL,
	[Name]					VARCHAR (100) NULL,
	[Token]					VARCHAR (100) NULL,
	[LastNumber]			INT NOT NULL DEFAULT(0),
	[Seed]					INT NOT NULL DEFAULT(1),
	CONSTRAINT [PK_Number] PRIMARY KEY CLUSTERED ([NumberId] ASC)
)
