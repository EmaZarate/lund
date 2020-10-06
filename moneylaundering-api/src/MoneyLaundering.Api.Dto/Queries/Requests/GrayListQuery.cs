using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System;
using System.Collections.Generic;
using System.Text;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class GrayListQuery : IRequest<PagedResultsQueryResponse<GrayListAndPersonQueryResponse>>
    {
        public string Cuit { get; set; }
        public string FullName { get; set; }
        public bool? Active { get; set; }
        public PaginationQuery Pagination { get; set; }
    }
}
