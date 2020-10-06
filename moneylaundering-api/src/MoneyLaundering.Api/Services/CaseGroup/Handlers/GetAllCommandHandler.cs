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

namespace MoneyLaundering.Api.Services.CaseGroup.Handlers
{
    public class GetAllCommandHandler : IRequestHandler<CaseGroupQuery, IEnumerable<CaseGroupQueryResponse>>
    {
        private readonly ICaseGroupRepository _caseGroupRepository;
        private readonly IMapper _mapper;
        public GetAllCommandHandler(ICaseGroupRepository caseGroupRepository, IMapper mapper)
        {
            this._caseGroupRepository = caseGroupRepository ?? throw new ArgumentNullException(nameof(caseGroupRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<CaseGroupQueryResponse>> Handle(CaseGroupQuery request, CancellationToken cancellationToken)
        {
                var cases = await this._caseGroupRepository.GetAll();
                if (cases.Count() == 0)
                    throw new NoActionException(Crosscutting.Globalization.Message.CaseGroupNotFound);
                var result = this._mapper.Map<IEnumerable<CaseGroupQueryResponse>>(cases);
                return result;
        }
    }
}
