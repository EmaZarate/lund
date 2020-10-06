CREATE TABLE [dbo].[Producer] (
    [ProducerId]			INT	IDENTITY (1, 1) NOT NULL,
    [BusinessUnitId]		INT NOT NULL,
    [ProduceName]			VARCHAR (200) NOT NULL,
    [Mail]					VARCHAR (200) NULL,
    [OriginCode]			VARCHAR (50)  NULL,
    CONSTRAINT [PK_Producer] PRIMARY KEY CLUSTERED ([ProducerId] ASC),
	CONSTRAINT [FK_Producer_BusinessUnit] FOREIGN KEY ([BusinessUnitId]) REFERENCES [dbo].[BusinessUnit] ([BusinessUnitId])

);

