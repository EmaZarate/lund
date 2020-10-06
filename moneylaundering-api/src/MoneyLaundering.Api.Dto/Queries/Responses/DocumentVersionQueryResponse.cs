using System;

namespace MoneyLaundering.Api.Dto.Queries.Responses
{
    public class DocumentVersionQueryResponse
    {
		public int DocumentId { get; set; }
		public int VersionId { get; set; }
		public string PhysicalName { get; set; }
		public DateTime CreateDate { get; set; }
		public string Comment { get; set; }
		public DateTime Expiration { get; set; }
	}
}
