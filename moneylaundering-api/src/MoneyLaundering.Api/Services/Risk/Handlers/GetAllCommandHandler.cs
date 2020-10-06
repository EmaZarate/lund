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

namespace MoneyLaundering.Api.Services.Risk.Handlers
{
    public class GetAllCommandHandler: IRequestHandler<RiskQuery, IEnumerable<RiskQueryResponse>>
    {
        private readonly IRiskRepository _riskRepository;
        private readonly IMapper _mapper;

        public GetAllCommandHandler(IRiskRepository riskRepository, IMapper mapper)
        {
            this._riskRepository = riskRepository ?? throw new ArgumentNullException(nameof(riskRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<RiskQueryResponse>> Handle(RiskQuery request, CancellationToken cancellationToken)
        {
            var resp = await this._riskRepository.GetAll();

            if (resp.Count() == 0)
                throw new NoActionException(Crosscutting.Globalization.Message.RiskNotFound);

            var result = this._mapper.Map<IEnumerable<RiskQueryResponse>>(resp);
            return result;
        }
    }
}
