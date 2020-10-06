namespace MoneyLaundering.Api.Dto.Queries.Responses
{
    public class BranchOfficeQueryResponse
    {
		public int Id { get; set; }
		public string Description { get; set; }
		public string Mail { get; set; }
		public string Address { get; set; }
		public int StateId { get; set; }
		public int CountryId { get; set; }
		public int ZipCode { get; set; }
	}
}
