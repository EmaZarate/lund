CREATE FUNCTION [dbo].[GetLastNewsByCaseID]
(
	@caseID int
)
RETURNS INT
WITH SCHEMABINDING
AS
BEGIN
	Declare @newsID int;
	select @newsID = newsid from news where createdate = (select max(news.createdate) from news where news.caseid = @caseID) and caseid = @caseID;
	RETURN @newsID;
END
