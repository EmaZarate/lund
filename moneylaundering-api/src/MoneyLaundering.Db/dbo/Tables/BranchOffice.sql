CREATE TABLE [dbo].[BranchOffice] (
    [BranchOfficeId]		INT IDENTITY (1, 1) NOT NULL,
    [Description]			VARCHAR (200) NOT NULL,
    [Mail]					VARCHAR (200) NULL,
    [Address]				VARCHAR (500) NULL,
    [StateId]				INT NULL,
    [CountryId]				INT NULL,
    [ZipCode]				INT NULL,
    CONSTRAINT [PK_BranchOffice] PRIMARY KEY CLUSTERED ([BranchOfficeId] ASC),
);
GO
