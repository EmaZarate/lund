using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System.Collections.Generic;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class PersonQuery : IRequest<PagedResultsQueryResponse<PersonQueryResponse>>
    {
        public string cuit { get; set; }
        public string fullName { get; set; }
        public int? riskId { get; set; }
        public string tranBefore { get; set; }
        public string tranAfter { get; set; }
        public int? orderId { get; set; }
        public int? businessUnitId { get; set; }
        public bool group { get; set; }
        public bool getWithoutGrouping { get; set; }
        public int groupCode { get; set; }
        public bool? active { get; set; }
        public PaginationQuery pagination { get; set; }
    }
}
