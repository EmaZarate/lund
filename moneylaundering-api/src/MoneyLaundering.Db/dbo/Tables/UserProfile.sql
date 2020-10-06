CREATE TABLE [dbo].[UserProfile] (
    [UserProfileId]		INT	IDENTITY (1, 1) NOT NULL,
    [Description]		VARCHAR (200) NOT NULL,
    CONSTRAINT [PK_UserProfile] PRIMARY KEY CLUSTERED ([UserProfileId] ASC)
);

