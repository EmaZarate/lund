using System;
using System.Collections.Generic;

namespace MoneyLaundering.Api.Dto.Queries.Responses
{
    public class CaseQueryResponse
    {
		public int Id { get; set; }
		public int BusinessUnitId { get; set; }
		public BusinessUnitQueryResponse BusinessUnit { get; set; }
		public int BranchOfficeId { get; set; }
		public int CaseTypeId { get; set; }
		public CaseTypeQueryResponse CaseType { get; set; }
		public int CaseNumber { get; set; }
		public int ActualStageId { get; set; }
		public int StatusId { get; set; }
		public int RiskId { get; set; }
		public RiskQueryResponse  Risk { get; set; }
		public string AnalystId { get; set; }
		public UserQueryResponse Analyst { get; set; }
		public DateTime CreateDate { get; set; }
		public string Comment { get; set; }
		public bool? UpdateFile { get; set; }
		public string ContactMail { get; set; }
		public string ContactAddress { get; set; }
		public int ContactZipCode { get; set; }
		public string ContactCity { get; set; }
		public string ContactProvince { get; set; }
		public int ContactStateId { get; set; }
		public int ProducerId { get; set; }
		public int PersonId { get; set; }
		public PersonQueryResponse Person { get; set; }
		public BranchOfficeQueryResponse BranchOffice { get; set; }
		public StatusQueryResponse Status { get; set; }
		public int? OriginalPersonId { get; set; }
		public int Value { get; set; }
		public NewsQueryResponse News { get; set; }
		public IEnumerable<CaseDocumentQueryResponse> CaseDocuments { get; set; }
		public IEnumerable<NewsQueryResponse> NewsList { get; set; }
	}
}
