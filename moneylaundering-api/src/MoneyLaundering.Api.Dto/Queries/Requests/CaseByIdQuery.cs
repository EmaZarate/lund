using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class CaseByIdQuery : IRequest<CaseQueryResponse>
    {
        public int caseNumber { get; set; }
        public int businessUnitId { get; set; }
    }
}
