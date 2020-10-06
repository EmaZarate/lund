CREATE TABLE [fwk].[Table] (
    [TableId]               INT           IDENTITY (1, 1) NOT NULL,
    [Name]                  VARCHAR (100) NOT NULL,
    [Token]                 VARCHAR (200) NOT NULL,
    [Schema]                VARCHAR (10)  NOT NULL,
    [HasAudit]              BIT           CONSTRAINT [DF_fwk_Table_HasAudit] DEFAULT ((0)) NOT NULL,
    [IsSystemData]          BIT           CONSTRAINT [DF_fwk_Table_IsSystemData] DEFAULT ((0)) NOT NULL,
    [IsAdministeringByUser] BIT           CONSTRAINT [DF_fwk_Table_IsAdministeringByUser] DEFAULT ((0)) NOT NULL,
    [HasSystemRecords]      BIT           CONSTRAINT [DF_fwk_Table_HasSystemRecords] DEFAULT ((0)) NOT NULL,
    [IsParameterData]       BIT           CONSTRAINT [DF_fwk_Table_IsParameterData] DEFAULT ((0)) NOT NULL,
    [IsTransactionData]     BIT           CONSTRAINT [DF_fwk_Table_IsTransactionData] DEFAULT ((0)) NOT NULL,
    [NotDeleteTrigger]      BIT           CONSTRAINT [DF_fwk_Table_NotDeleteTrigger] DEFAULT ((0)) NOT NULL,
    [NotUpdateTrigger]      BIT           CONSTRAINT [DF_fwk_Table_NotUpdateTrigger] DEFAULT ((0)) NOT NULL,
    [NotAuditField]         BIT           CONSTRAINT [DF_fwk_Table_NotAuditField] DEFAULT ((0)) NOT NULL,
    [HasInsertAudit]        BIT           CONSTRAINT [df_fwk_Table_HasInsertAudit] DEFAULT ((0)) NOT NULL,
    [HasUpdateAudit]        BIT           CONSTRAINT [df_fwk_table_HasUpdateAudit] DEFAULT ((0)) NOT NULL,
    [HasDeleteAudit]        BIT           CONSTRAINT [df_fwk_table_HasDeleteAudit] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_fwk_Table] PRIMARY KEY CLUSTERED ([TableId] ASC),
    CONSTRAINT [CK01_fwk_Table] CHECK (([IsSystemData]=(1) AND [HasSystemRecords]=(0) OR [IsSystemData]=(0)) AND ([IsSystemData]=(0) AND [IsAdministeringByUser]=(0) OR [IsSystemData]=(1))),
    CONSTRAINT [UK01_fwk_Table] UNIQUE NONCLUSTERED ([Name] ASC),
    CONSTRAINT [UK02_fwk_Table] UNIQUE NONCLUSTERED ([Token] ASC)
);

