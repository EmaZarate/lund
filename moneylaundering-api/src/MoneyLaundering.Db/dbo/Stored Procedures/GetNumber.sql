CREATE PROCEDURE [dbo].[GetNumber]
(
	@Name varchar(100),
	@Token varchar(100),
	@Number INT OUTPUT
)
AS
BEGIN
	DECLARE @Seed INT;

	SET @Seed = (SELECT TOP 1 n.Seed  FROM Number n WHERE n.Name = @Name AND n.Token = @Token); 	
	SET @Number = (SELECT TOP 1 n.LastNumber  FROM Number n WHERE n.Name = @Name AND n.Token = @Token) + @Seed; 
	
	UPDATE Number
	SET LastNumber = @Number
	WHERE [Name] = @Name AND Token = @Token


END
