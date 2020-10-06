using AutoMapper;
using MediatR;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Services.Location.Handlers
{
    public class GetByIdCommandHandler: IRequestHandler<LocationByIdQuery, LocationQueryResponse>
    {
        private readonly ILocationRepository _locationRepository;
        private readonly IMapper _mapper;

        public GetByIdCommandHandler(ILocationRepository locationRepository, IMapper mapper)
        {
            _locationRepository = locationRepository ?? throw new ArgumentNullException(nameof(locationRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<LocationQueryResponse> Handle(LocationByIdQuery request, CancellationToken cancellationToken)
        {
            var location = await this._locationRepository.GetLocationById(request.id);
            var result = this._mapper.Map<LocationQueryResponse>(location);
            if(result != null)
            {
                return result;
            }

            throw new NoActionException(Crosscutting.Globalization.Message.LocationsNotFound);

        }
    }
}
