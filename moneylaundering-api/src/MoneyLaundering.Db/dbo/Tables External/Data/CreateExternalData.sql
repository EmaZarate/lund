IF NOT EXISTS (SELECT 1 FROM sys.external_data_sources WHERE name = 'ElasticQueryIdentityDataSrc')
BEGIN
	CREATE EXTERNAL DATA SOURCE ElasticQueryIdentityDataSrc
	WITH (
		TYPE = RDBMS,
		LOCATION = 'mssql-uat-hjanduyt.database.windows.net', -- 'mssql-legacy-7nqjv2hn20.database.windows.net'
		DATABASE_NAME = 'Identity', -- Identity
		CREDENTIAL = ElasticQueryIdentityCred
	);
END
go

IF EXISTS (SELECT 1 FROM sys.external_data_sources WHERE name = 'ElasticQueryIdentityDataSrc')
	PRINT '<<< CREATED DATA SOURCE cnxMADS >>>'
ELSE
	PRINT '<<< FAILED CREATING DATA SOURCE cnxMADS  >>>'
GO

