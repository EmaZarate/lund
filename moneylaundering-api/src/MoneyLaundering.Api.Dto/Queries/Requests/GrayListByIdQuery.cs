using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System;
using System.Collections.Generic;
using System.Text;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class GrayListByIdQuery : IRequest<GrayListAndPersonQueryResponse>
    {
        public int Id { get; set; }
       
        public GrayListByIdQuery(int Id)
        {
            this.Id = Id;
        }
    }
}
