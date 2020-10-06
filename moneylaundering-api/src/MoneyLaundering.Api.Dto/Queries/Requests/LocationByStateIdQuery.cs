using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System.Collections.Generic;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class LocationByStateIdQuery : IRequest<IEnumerable<LocationQueryResponse>> 
    {
        public LocationByStateIdQuery()
        {
        }
        public LocationByStateIdQuery(int id)
        {
            this.Id = id;
        } 
        public int Id { get; set; }
    }
}
