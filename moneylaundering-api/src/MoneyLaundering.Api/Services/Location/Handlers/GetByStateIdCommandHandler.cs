using AutoMapper;
using MediatR;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Services.Location.Handlers
{
    public class GetByStateIdCommandHandler : IRequestHandler<LocationByStateIdQuery, IEnumerable<LocationQueryResponse>>
    {
        private readonly ILocationRepository _locationRepository;
        private readonly IMapper _mapper;

        public GetByStateIdCommandHandler(ILocationRepository locationRepository, IMapper mapper)
        {
            _locationRepository = locationRepository ?? throw new ArgumentNullException(nameof(locationRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<LocationQueryResponse>> Handle(LocationByStateIdQuery request, CancellationToken cancellationToken)
        {
            var location = await this._locationRepository.GetLocationByStateId(request.Id);
            var result = this._mapper.Map<IEnumerable<LocationQueryResponse>>(location);

            if (result.Count() > 0)
                return result;
            else
                throw new NoActionException(Crosscutting.Globalization.Message.LocationsNotFound);
        }


    }
}
