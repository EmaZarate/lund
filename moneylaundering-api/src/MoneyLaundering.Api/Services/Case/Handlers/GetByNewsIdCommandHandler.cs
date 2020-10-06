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
    public class GetByNewsIdCommandHandler : IRequestHandler<CaseByNewsIdQuery, CaseQueryResponse>
    {
        private readonly ICaseRepository _caseRepository;
        private readonly IMapper _mapper;

        public GetByNewsIdCommandHandler(ICaseRepository caseRepository, IMapper mapper)
        {
            this._caseRepository = caseRepository ?? throw new ArgumentNullException(nameof(caseRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<CaseQueryResponse> Handle(CaseByNewsIdQuery request, CancellationToken cancellationToken)
        {
            var entity = await this._caseRepository.GetByNewsId(request.NewsId);
            if (entity == null)
                throw new NoActionException(Crosscutting.Globalization.Message.CaseNotFound);
            var result = this._mapper.Map<CaseQueryResponse>(entity);
            return result;
        }
    }
}
