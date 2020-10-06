CREATE TABLE [dbo].[Case] (
    [CaseId]					INT IDENTITY (1, 1) NOT NULL,
	[BusinessUnitId]			INT NOT NULL,
    [BranchOfficeId]			INT NOT NULL,
    [CaseTypeId]				INT NULL,
	[CaseNumber]				INT NULL,
    [ActualStageId]				as dbo.GetLastNewsByCaseID(CaseId),
    [StatusId]			        INT NOT NULL,
    [RiskId]					INT NOT NULL,
    [AnalystId]					VARCHAR(100) NULL,
    [CreateDate]		        DATETIME2 (7) NOT NULL,
    [UpdateFile]				BIT NULL,
    [ContactMail]				VARCHAR (100) NULL,
    [ContactAddress]			VARCHAR (500) NULL,
    [ContactZipCode]			INT NULL,
    [ContactProvince]			VARCHAR (500) NULL,
    [ContactCity]			    VARCHAR (500) NULL,
    [ContactStateId]			INT NULL,
    [ProducerId]				INT NULL,
    [PersonId]					INT NULL,
    [OriginalPersonId]			INT NULL,
	[Comment]		            VARCHAR(8000) NULL,
    [Value]						INT NULL, 
    CONSTRAINT [PK_Case] PRIMARY KEY CLUSTERED ([CaseId] ASC),
    CONSTRAINT [FK_Case_CaseType] FOREIGN KEY ([CaseTypeId]) REFERENCES [dbo].[CaseType] ([CaseTypeId]),
    CONSTRAINT [FK_Case_BranchOffice] FOREIGN KEY ([BranchOfficeId]) REFERENCES [dbo].[BranchOffice] ( [BranchOfficeId]),
    CONSTRAINT [FK_Case_Person] FOREIGN KEY ([PersonId]) REFERENCES [dbo].[Person] ([PersonId]),
    CONSTRAINT [FK_Case_Producer] FOREIGN KEY ([ProducerId]) REFERENCES [dbo].[Producer] ([ProducerId]),
	CONSTRAINT [FK_Case_Status] FOREIGN KEY ([StatusId]) REFERENCES [dbo].[Status] ([StatusId]),
    CONSTRAINT [FK_Case_OriginalPerson] FOREIGN KEY ([OriginalPersonId]) REFERENCES [dbo].[Person] ([PersonId]),
	CONSTRAINT [FK_Case_BusinessUnit] FOREIGN KEY ([BusinessUnitId]) REFERENCES [dbo].[BusinessUnit] ([BusinessUnitId]),
	CONSTRAINT [FK_Case_Risk] FOREIGN KEY ([RiskId]) REFERENCES [dbo].[Risk] ([RiskId])

);
GO
CREATE UNIQUE NONCLUSTERED INDEX  [UK_Case_CaseNumberBusinessUnit] ON [dbo].[Case]
(
	[BusinessUnitId] ASC,
	[CaseNumber] ASC
)
WHERE ([CaseNumber] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
CREATE TRIGGER [dbo].[tg_Case_GetNumberCase]
ON dbo.[Case] INSTEAD OF INSERT
NOT FOR REPLICATION
AS
BEGIN
SET NOCOUNT ON;
	 BEGIN
	 DECLARE @NumberCase INT
	 DECLARE @BusinessUnitId INT = (SELECT TOP 1 [BusinessUnitId] FROM inserted);
	 EXEC dbo.GetNumber 'CaseNumber',@BusinessUnitId, @NumberCase OUTPUT;
      INSERT INTO dbo.[Case] 
	  (
	  		[BusinessUnitId],
			[BranchOfficeId],
			[CaseTypeId],
			[CaseNumber],
			[StatusId],
			[RiskId],
			[AnalystId],
			[CreateDate],
			[UpdateFile],
			[ContactMail],
			[ContactAddress],
			[ContactZipCode],
			[ContactProvince],
			[ContactCity],
			[ContactStateId],
			[ProducerId],
			[PersonId],
			[OriginalPersonId],
			[Comment],
			[Value]
	  )
      SELECT 
			[BusinessUnitId],
			[BranchOfficeId],
			[CaseTypeId],
			@NumberCase,
			[StatusId],
			[RiskId],
			[AnalystId],
			[CreateDate],
			[UpdateFile],
			[ContactMail],
			[ContactAddress],
			[ContactZipCode],
			[ContactProvince],
			[ContactCity],
			[ContactStateId],
			[ProducerId],
			[PersonId],
			[OriginalPersonId],
			[Comment],
			[Value]
      FROM   Inserted
	 END
END
GO
