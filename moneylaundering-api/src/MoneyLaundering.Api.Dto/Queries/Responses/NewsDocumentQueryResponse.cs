using System;
using System.Collections.Generic;

namespace MoneyLaundering.Api.Dto.Queries.Responses
{
    public class NewsDocumentQueryResponse
    {
		public string ContactAddress { get; set; }
		public int ContactLocationId { get; set; }
		public int ContactZipCode { get; set; }
		public int DocumentLetterTypeId { get; set; }
		public int NewsId { get; set; }
		public bool Processed { get; set; }
	}

}
