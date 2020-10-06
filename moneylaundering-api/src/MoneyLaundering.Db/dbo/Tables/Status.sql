CREATE TABLE [dbo].[Status] (
    [StatusId]				INT	IDENTITY (1, 1) NOT NULL,
    [Description]			VARCHAR (300) NOT NULL,
    [Finisher]				BIT           NOT NULL,
    [DefaultExpiration]		INT           NULL,
    [WarningDays]           INT           NULL,
    CONSTRAINT [PK_Status]  PRIMARY KEY CLUSTERED ([StatusId] ASC)
);

