using System.Collections.Generic;
using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class DocumentByPersonIdWithoutCaseQuery : IRequest<IEnumerable<DocumentQueryResponse>>
    {
        public DocumentByPersonIdWithoutCaseQuery(int id)
        {
            this.id = id;
        }
        public int id { get; set; }
    }
}
