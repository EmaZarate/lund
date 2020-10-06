using System.Collections.Generic;
using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;


namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class ProducerQuery : IRequest<IEnumerable<ProducerQueryResponse>>
    {
        public int BusinessUnitId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
    }
}
