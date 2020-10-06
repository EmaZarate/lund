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

namespace MoneyLaundering.Api.Services.BusinessUnit.Handlers
{
    public class GetAllCommandHandler : IRequestHandler<BusinessUnitQuery, IEnumerable<BusinessUnitQueryResponse>>
    {
        private readonly IBusinessUnitRepository _businessUnitRepository;
        private readonly IMapper _mapper;

        public GetAllCommandHandler(IBusinessUnitRepository businessUnitRepository, IMapper mapper)
        {
            this._businessUnitRepository = businessUnitRepository ?? throw new ArgumentNullException(nameof(businessUnitRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<BusinessUnitQueryResponse>> Handle(BusinessUnitQuery request, CancellationToken cancellationToken)
        {
            var businessUnits = await this._businessUnitRepository.GetAll();
            if (businessUnits.Count() == 0)
                throw new NoActionException(Crosscutting.Globalization.Message.BussinessUnitNotFound);
            var result = this._mapper.Map<IEnumerable<BusinessUnitQueryResponse>>(businessUnits);
            return result;
        }
    }
}
