CREATE EXTERNAL TABLE [dbo].[Users]
(
	[UserId] [nvarchar](450) NOT NULL,
	[UserName] [nvarchar](256) NULL,
	[NormalizedUserName] [nvarchar](256) NULL,
	[Email] [nvarchar](256) NULL,
	[NormalizedEmail] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[FirstName] [nvarchar](max) NULL,
	[LastName] [nvarchar](max) NULL,
    [CreatedDate] DATETIME NULL, 
    [TaxId] NVARCHAR(50) NULL, 
    [OfficialIdType] NVARCHAR(50) NULL, 
    [Gender] NVARCHAR NULL, 
    [CuitCuil] NVARCHAR(50) NULL
)
WITH
( DATA_SOURCE = ElasticQueryIdentityDataSrc)