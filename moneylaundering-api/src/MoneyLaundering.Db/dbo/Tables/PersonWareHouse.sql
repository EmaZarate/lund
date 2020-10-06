CREATE TABLE [dbo].[PersonWareHouse] (
    [PersonWareHouseId]		INT	IDENTITY (1, 1) NOT NULL,
    [UniqueKey]				VARCHAR (50) NULL,
    [PartnerNumber]			INT	NULL,
    [TaxId]					VARCHAR (50)  NULL,
    [LastNamePartner]		VARCHAR (300) NULL,
    [FirstNamePartner]		VARCHAR (300) NULL,
    [PersonType]			CHAR (1) NOT NULL,
    [Email]					VARCHAR (100) NULL,
    [ActivityId]			INT	NULL,
    [ActivityDescription]	VARCHAR (200) NULL,
    [UIFStatus]				VARCHAR (2)   NULL,
    [Nationality]			VARCHAR (100) NULL,
    [CountryOfResidence]	VARCHAR (100) NULL,
    [Address]				VARCHAR (300) NULL,
    [Location]				VARCHAR (200) NULL,
    [ZipCode]				INT           NULL,
    [State]					VARCHAR (150) NULL,
    [Country]				VARCHAR (150) NULL,
    [PolicyFirstDate]		DATE          NULL,
    CONSTRAINT [PK_PersonWareHouse] PRIMARY KEY CLUSTERED ([PersonWareHouseId] ASC),
	CONSTRAINT [FK_PersonWareHouse_Activity] FOREIGN KEY ([PersonWareHouseId]) REFERENCES [dbo].[Activity] ([ActivityId])
);

