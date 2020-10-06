namespace MoneyLaundering.Api.Dto.Queries.Responses
{
    public class CaseDocumentQueryResponse
    {
        public int CaseId { get; set; }
        public int DocumentId { get; set; }
        public DocumentQueryResponse Document { get; set; }
        public int BusinessUnitId { get; set; }
    }
}
