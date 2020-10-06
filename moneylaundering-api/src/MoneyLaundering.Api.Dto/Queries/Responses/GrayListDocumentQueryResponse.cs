using System;

namespace MoneyLaundering.Api.Dto.Queries.Responses
{
    public class GrayListDocumentQueryResponse
    {
        public int Id { get; set; }
        public int GrayListId { get; set; }
        public int DocumentId { get; set; }
        public DocumentQueryResponse Document { get; set; }
    }
}
