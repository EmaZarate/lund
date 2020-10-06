using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System.Collections.Generic;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class NewsDocumentQuery : IRequest<NewsDocumentQueryResponse>
    {
		public int NewsId { get; set; }
		public int DocumentLetterTypeId { get; set; }
		public string ContactAddress { get; set; }
		public int ContactZipCode { get; set; }
		public string ContactCity { get; set; }
		public string ContactProvince { get; set; }
		public bool Processed { get; set; }
	}
}
