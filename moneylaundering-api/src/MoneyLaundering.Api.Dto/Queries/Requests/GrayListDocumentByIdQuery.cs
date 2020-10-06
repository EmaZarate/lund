using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System;
using System.Collections.Generic;
using System.Text;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class GrayListDocumentByIdQuery : IRequest<IEnumerable<GrayListDocumentQueryResponse>>
    {
        public int Id { get; set; }
       
        public GrayListDocumentByIdQuery(int Id)
        {
            this.Id = Id;
        }
    }
}
