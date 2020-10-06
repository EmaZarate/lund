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

namespace MoneyLaundering.Api.Services.Vehicle.Handlers
{
    public class GetByCaseIdCommandHandler : IRequestHandler<VehicleQuery, IEnumerable<VehicleQueryResponse>>
    {
        private readonly IVehicleRepository _VehicleRepository;
        private readonly IMapper _mapper;

        public GetByCaseIdCommandHandler(IVehicleRepository VehicleRepository, IMapper mapper)
        {
            this._VehicleRepository = VehicleRepository ?? throw new ArgumentNullException(nameof(VehicleRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        public async Task<IEnumerable<VehicleQueryResponse>> Handle(VehicleQuery request, CancellationToken cancellationToken)
        {
            var resp = await this._VehicleRepository.GetByCaseId(request.CaseId);

            if (resp == null)
                throw new NoActionException(Crosscutting.Globalization.Message.VehiclesNotFound);

            var result = this._mapper.Map<IEnumerable<VehicleQueryResponse>>(resp);
            return result;
        }
    }
}
