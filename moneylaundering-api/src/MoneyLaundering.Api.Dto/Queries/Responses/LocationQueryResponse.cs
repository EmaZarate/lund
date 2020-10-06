namespace MoneyLaundering.Api.Dto.Queries.Responses
{
    public class LocationQueryResponse
    {
        public int LocationId { get; set; }
        public string Description { get; set; }
        public int StateId { get; set; }
        public StateQueryResponse State { get; set; }
        public int ZipCode { get; set; }
    }
}
