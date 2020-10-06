IF NOT EXISTS (SELECT 1 FROM sys.symmetric_keys)
BEGIN
	CREATE MASTER KEY ENCRYPTION
	BY PASSWORD = '';
END
GO
IF EXISTS (SELECT 1 FROM sys.symmetric_keys)
	PRINT '<<< CREATED Master Key >>>'
ELSE
	PRINT '<<< FAILED CREATING Master Key >>>'
GO

IF NOT EXISTS (SELECT 1 FROM sys.database_credentials WHERE name = 'ElasticQueryIdentityCred')
BEGIN
	CREATE DATABASE SCOPED CREDENTIAL ElasticQueryIdentityCred
	WITH IDENTITY = 'moneylaundering-user-uat', --mssql-legacy-dev-user
	SECRET = ''; 
END
GO
IF EXISTS (SELECT 1 FROM sys.database_credentials WHERE name = 'ElasticQueryIdentityCred')
	PRINT '<<< CREATED CREDENTIAL $(UserName) >>>'
ELSE
	PRINT '<<< FAILED CREATING CREDENTIAL $(UserName) >>>'
GO