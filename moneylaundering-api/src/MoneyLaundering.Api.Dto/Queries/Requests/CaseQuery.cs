using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System.Collections.Generic;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class CaseQuery : IRequest<IEnumerable<CaseQueryResponse>>
    {
        public string Firstname { get; set; }
        public string Surname { get; set; }
        public string Cuit { get; set; }
        public int NumberCase { get; set; }
        public string Analist { get; set; }
        public int[] Risks { get; set; }
        public int[] Statuses { get; set; }
        public int[] CaseTypes { get; set; }
        public int businessUnitId { get; set; }
    }
}
