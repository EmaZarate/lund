namespace MoneyLaundering.Api.Infrastructure.Telemetry
{
    public class TelemetryClientAdapter
    {
        //private readonly TelemetryClient telemetryClient;
        //private readonly JsonSerializerSettings jsonSerializerSettings;
        //public TelemetryClientAdapter(TelemetryClient telemetryClient)
        //{
        //    Argument.ThrowIfNull(telemetryClient, nameof(telemetryClient));

        //    this.telemetryClient = telemetryClient;

        //    var propertyIgnoreContractResolver = new PropertyIgnoreContractResolver();
        //    propertyIgnoreContractResolver.IgnoreProperty<SAP.Api.Dtos.DocumentDto>("DocumentBase64Data");
        //    this.jsonSerializerSettings = new JsonSerializerSettings
        //    {
        //        ContractResolver = propertyIgnoreContractResolver
        //    };
        //}

        //public void TrackClientException(string client, object request, Guidewire.Api.Sdk.Lib.RestApiException exception)
        //{
        //    this.TrackClientException(client, request, exception as Exception);
        //}

        //public void TrackClientException(string client, object request, Core.Sdk.Lib.RestApiException exception)
        //{
        //    this.TrackClientException(client, request, exception as Exception);
        //}

        //private void TrackClientException(string client, object request, Exception exception)
        //{
        //    var requestJson = JsonConvert.SerializeObject(request, this.jsonSerializerSettings);
        //    var exceptionJson = JsonConvert.SerializeObject(exception, this.jsonSerializerSettings);
        //    var dictionary = new Dictionary<string, string>
        //    {
        //        { "RequestType", request.GetType().Name },
        //        { "RequestBody", requestJson },
        //        { "ExceptionBody", exceptionJson },
        //    };
        //    this.telemetryClient.TrackEvent($"{client} exception", dictionary);
        //}

        //public void TrackClientValidation(string client, object request, object response)
        //{
        //    var requestJson = JsonConvert.SerializeObject(request, this.jsonSerializerSettings);
        //    var responseJson = JsonConvert.SerializeObject(response, this.jsonSerializerSettings);
        //    var dictionary = new Dictionary<string, string>
        //    {
        //        { "RequestType", request.GetType().Name },
        //        { "RequestBody", requestJson },
        //        { "ResponseBody", responseJson },
        //    };
        //    this.telemetryClient.TrackEvent($"{client} validation", dictionary);
        //}

        //public void TrackBarcodeReadingFailed(IUserSession userSession, string filename)
        //{
        //    var sessionBody = JsonConvert.SerializeObject(userSession, this.jsonSerializerSettings);
        //    var dictionary = new Dictionary<string, string>
        //    {
        //        { "SessionBody", sessionBody },
        //        { "Filename", filename }
        //    };
        //    this.telemetryClient.TrackEvent("Barcode Reading Failed", dictionary);
        //}

        //public void TrackException(Exception exception)
        //{
        //    this.telemetryClient.TrackException(exception);
        //}
    }
}
