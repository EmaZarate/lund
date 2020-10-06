
CREATE proc [dbo].[spGetWebServices]
AS
/*
sp_configure 'show advanced options', 1
GO
RECONFIGURE;
GO
sp_configure 'Ole Automation Procedures', 1
GO
RECONFIGURE;
*/
BEGIN

        DECLARE @xmlOut VARCHAR(8000)
        DECLARE @RequestText AS VARCHAR(8000)

        SET @RequestText=
        '<soap:Envelope xmlns:xsi=''http://www.w3.org/2001/XMLSchema-instance'' xmlns:xsd=''http://www.w3.org/2001/XMLSchema'' xmlns:soap=''http://schemas.xmlsoap.org/soap/envelope/''>
          <soap:Body>
            <DescargarCarteraRSA xmlns=''http://tempuri.org/'' />
          </soap:Body>
        </soap:Envelope>'
 
        EXEC    spHTTPRequest 
                'https://sro.uif.gob.ar/SROAPI/api/sujetoObligado/consulta/34500045339', 
                'GET', 
                @RequestText,
                'http://tempuri.org/DescargarCarteraRSA',
                '', '', @xmlOut OUT

		        SELECT @xmlOut AS response
END
