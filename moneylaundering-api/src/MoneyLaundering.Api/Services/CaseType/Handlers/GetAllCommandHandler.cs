using AutoMapper;
using MediatR;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Services.CaseType.Handlers
{
    public class GetAllCommandHandler : IRequestHandler<CaseTypeQuery, IEnumerable<CaseTypeQueryResponse>>
    {
        private readonly ICaseTypeRepository _caseTypeRepository;
        private readonly IMapper _mapper;

        public GetAllCommandHandler(ICaseTypeRepository caseTypeRepository, IMapper mapper)
        {
            _caseTypeRepository = caseTypeRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CaseTypeQueryResponse>> Handle(CaseTypeQuery request, CancellationToken cancellationToken)
        {
            var cases = await this._caseTypeRepository.GetAll();
            if (cases.Count() == 0)
                throw new NoActionException(Crosscutting.Globalization.Message.CaseTypeNotFound);
            var result = this._mapper.Map<IEnumerable<CaseTypeQueryResponse>>(cases);
            return result;
        }
    }
}
