CREATE EXTERNAL TABLE [dbo].[Roles]
(
	[RolesId] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[NormalizedName] [nvarchar](256) NULL,
	[Description] NVARCHAR(MAX) NULL
)
WITH
( DATA_SOURCE = ElasticQueryIdentityDataSrc)