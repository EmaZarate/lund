using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class CaseByNewsIdQuery : IRequest<CaseQueryResponse>
    {
        public string NewsId { get; set; }
    }
}
