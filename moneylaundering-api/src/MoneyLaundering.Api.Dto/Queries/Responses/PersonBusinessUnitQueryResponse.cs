namespace MoneyLaundering.Api.Dto.Queries.Responses
{
    public class PersonBusinessUnitQueryResponse
    {
		public int Id { get; set; }
		public int PersonId { get; set; }
		public PersonQueryResponse Person { get; set; }
		public int BusinessUnitId { get; set; }
		public BusinessUnitQueryResponse BusinessUnit { get; set; }
		public int FinancialProfile { get; set; }
		public int CalcRisk { get; set; }
		public int AssignedRisk { get; set; }
		public int RiskId { get; set; }
		public RiskQueryResponse Risk { get; set; }
	}
}
