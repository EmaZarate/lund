﻿using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class LocationByIdQuery : IRequest<LocationQueryResponse>
    {
        public LocationByIdQuery(int id)
        {
            this.id = id;
        }
        public int id { get; set; }
    }
}
