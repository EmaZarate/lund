using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System.Collections.Generic;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class NewsReasonQuery : IRequest<IEnumerable<NewsReasonQueryResponse>>
    {
        public NewsReasonQuery(int id)
        {
            this.id = id;
        }
        public int id { get; set; }
    }
}
