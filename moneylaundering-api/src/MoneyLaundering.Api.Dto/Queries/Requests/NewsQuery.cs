using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System.Collections.Generic;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class NewsQuery : IRequest<IEnumerable<NewsQueryResponse>>
    {
        public int BusinessUnitId { get; set; }
        public int CaseId { get; set; }
    }
}
