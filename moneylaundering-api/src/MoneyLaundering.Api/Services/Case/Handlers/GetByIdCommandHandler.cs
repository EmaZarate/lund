using AutoMapper;
using MediatR;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Services.Case.Handlers
{
    public class GetByIdCommandHandler : IRequestHandler<CaseByIdQuery, CaseQueryResponse>
    {
        private readonly ICaseRepository _caseRepository;
        private readonly IMapper _mapper;

        public GetByIdCommandHandler(ICaseRepository caseRepository, IMapper mapper)
        {
            this._caseRepository = caseRepository ?? throw new ArgumentNullException(nameof(caseRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<CaseQueryResponse> Handle(CaseByIdQuery request, CancellationToken cancellationToken)
        {
            var resp = await this._caseRepository.GetById(request.caseNumber, request.businessUnitId);
            if (resp == null)
                throw new NoActionException(Crosscutting.Globalization.Message.CaseNotFound);
            var result = this._mapper.Map<CaseQueryResponse>(resp);
            return result;
        }
    }
}
