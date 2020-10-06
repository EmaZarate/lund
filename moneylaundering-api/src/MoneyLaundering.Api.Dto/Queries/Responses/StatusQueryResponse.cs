namespace MoneyLaundering.Api.Dto.Queries.Responses
{
    public class StatusQueryResponse
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public bool Finisher { get; set; }
        public int DefaultExpiration { get; set; }
        public int WarningDays { get; set; }
    }
}
