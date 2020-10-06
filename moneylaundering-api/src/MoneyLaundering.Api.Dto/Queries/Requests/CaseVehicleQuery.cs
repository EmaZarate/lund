using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System.Collections.Generic;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    
    public class CaseVehicleQuery : IRequest<IEnumerable<CaseVehicleQueryResponse>>
    {
        public CaseVehicleQuery(int caseId)
        {
            this.CaseId = caseId;
        }

        public int CaseId { get; set; }
    }
}
