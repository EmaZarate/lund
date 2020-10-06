using System;

namespace MoneyLaundering.Api.Dto.Queries.Responses
{
    public class DocumentQueryResponse
    {
		public int DocumentId { get; set; }
		public string LogicName { get; set; }
		public string PhysicalName { get; set; }
		public string DocumentTypeDescription { get; set; }
		public int VersionId { get; set; }
		public string Comment { get; set; }
		public int DocumentTypeId { get; set; }
		public virtual bool Confidential { get; set; }
		public DateTime CreateDate { get; set; }
		public DateTime Expiration { get; set; }
	}
}
