CREATE EXTERNAL TABLE [dbo].[UserRoles]
(
	[UserId] [nvarchar](450) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
	[IsLocked] BIT NOT NULL, 
	[ApplicationId]  [int] NOT NULL,
    [CreatedDate] DATETIME NULL
)
WITH
( DATA_SOURCE = ElasticQueryIdentityDataSrc)