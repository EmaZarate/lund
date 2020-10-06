namespace MoneyLaundering.Api.Dto.Queries.Responses
{
    public class ProducerQueryResponse
    {
        public int Id { get; set; }
        public int BusinessUnitId { get; set; }
        public string ProduceName { get; set; }
        public string Mail { get; set; }
        public string OriginCode { get; set; }
        public BusinessUnitResponse BusinessUnit { get; set; }
    }
}
