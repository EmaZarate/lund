CREATE TABLE [dbo].[Country] (
    [CountryId]	  INT IDENTITY (1, 1) NOT NULL,
    [Description] VARCHAR (200) NOT NULL,
    CONSTRAINT [PK_Country] PRIMARY KEY CLUSTERED ([CountryId] ASC)
);

