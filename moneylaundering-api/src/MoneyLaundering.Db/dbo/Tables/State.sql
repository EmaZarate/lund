CREATE TABLE [dbo].[State] (
    [StateId]			INT	IDENTITY (1, 1) NOT NULL,
	[Description]		VARCHAR (200) NOT NULL,
    [CountryId]			INT	NOT NULL,
    CONSTRAINT [PK_State] PRIMARY KEY CLUSTERED ([StateId] ASC),
    CONSTRAINT [FK_State_Country] FOREIGN KEY ([CountryId]) REFERENCES [dbo].[Country] ([CountryId])
);

