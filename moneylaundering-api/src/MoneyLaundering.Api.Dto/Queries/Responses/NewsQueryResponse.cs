using System;

namespace MoneyLaundering.Api.Dto.Queries.Responses
{
    public class NewsQueryResponse
    {
		public int Id { get; set; }
		public int BusinessUnitId { get; set; }
		public int CaseId { get; set; }
		public int NewsTypeId { get; set; }
		public int StatusId { get; set; }
		public DateTime CreateDate { get; set; }
		public DateTime EndDate { get; set; }
		public DateTime? ExpirationDate { get; set; }
		public string Comments { get; set; }
		public int NewsReasonTypeId { get; set; }
		public String NewsTypeDescription { get; set; }
		public String StatusDescription { get; set; } 

	}
}
