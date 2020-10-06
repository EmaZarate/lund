CREATE PROC spCreateLinkedServer
AS
BEGIN

	DECLARE @repeat INT
	DECLARE @linked_not_existe BIT
	SET @linked_not_existe = 1
	SET @repeat = 0

	WHILE (@linked_not_existe=1 AND @repeat < 5)
	BEGIN	
		SET @repeat = @repeat + 1 

		IF NOT EXISTS(SELECT * FROM SYS.SERVERS WHERE NAME = N'DESA')
		BEGIN
			
			/****** Object:  LinkedServer [DESA]    Script Date: 30/7/2020 15:53:40 ******/
			EXEC master.dbo.sp_dropserver @server=N'DESA', @droplogins='droplogins'
			
			/****** Object:  LinkedServer [DESA]    Script Date: 30/7/2020 15:53:40 ******/
			EXEC master.dbo.sp_addlinkedserver @server = N'DESA', @srvproduct=N'', @provider=N'SQLNCLI', @datasrc=N'sqlsrvbi00.database.windows.net', @catalog=N'sqlsrvdwbi00'
				/* For security reasons the linked server remote logins password is changed with ######## */
			EXEC master.dbo.sp_addlinkedsrvlogin @rmtsrvname=N'DESA',@useself=N'False',@locallogin=NULL,@rmtuser=N'USR_MATRIX_Lavado',@rmtpassword='{#password#}'
			
			EXEC master.dbo.sp_serveroption @server=N'DESA', @optname=N'collation compatible', @optvalue=N'true'
			

			EXEC master.dbo.sp_serveroption @server=N'DESA', @optname=N'data access', @optvalue=N'true'
			

			EXEC master.dbo.sp_serveroption @server=N'DESA', @optname=N'dist', @optvalue=N'false'
			

			EXEC master.dbo.sp_serveroption @server=N'DESA', @optname=N'pub', @optvalue=N'false'
			

			EXEC master.dbo.sp_serveroption @server=N'DESA', @optname=N'rpc', @optvalue=N'true'
			

			EXEC master.dbo.sp_serveroption @server=N'DESA', @optname=N'rpc out', @optvalue=N'true'
			

			EXEC master.dbo.sp_serveroption @server=N'DESA', @optname=N'sub', @optvalue=N'false'
			

			EXEC master.dbo.sp_serveroption @server=N'DESA', @optname=N'connect timeout', @optvalue=N'0'
			

			EXEC master.dbo.sp_serveroption @server=N'DESA', @optname=N'collation name', @optvalue=null
			

			EXEC master.dbo.sp_serveroption @server=N'DESA', @optname=N'lazy schema validation', @optvalue=N'false'
			

			EXEC master.dbo.sp_serveroption @server=N'DESA', @optname=N'query timeout', @optvalue=N'0'
			

			EXEC master.dbo.sp_serveroption @server=N'DESA', @optname=N'use remote collation', @optvalue=N'true'
			

			EXEC master.dbo.sp_serveroption @server=N'DESA', @optname=N'remote proc transaction promotion', @optvalue=N'true'
			

			SET @linked_not_existe=0
		END

	END
END