using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System.Collections.Generic;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    
    public class VehicleQuery : IRequest<IEnumerable<VehicleQueryResponse>>
    {
        public VehicleQuery(int caseId)
        {
            this.CaseId = caseId;
        }

        public int CaseId { get; set; }
    }
}
