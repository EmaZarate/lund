using AutoMapper;
using MediatR;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Services.Case.Handlers
{
    public class GetAllCommandHandler : IRequestHandler<CaseQuery, IEnumerable<CaseQueryResponse>>
    {
        private readonly ICaseRepository _caseRepository;
        private readonly IMapper _mapper;
        private readonly INewsRepository _newsRepository;

        public GetAllCommandHandler(ICaseRepository caseRepository, INewsRepository newsRepository, IMapper mapper)
        {
            this._caseRepository = caseRepository ?? throw new ArgumentNullException(nameof(caseRepository));
            this._newsRepository = newsRepository ?? throw new ArgumentNullException(nameof(newsRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<CaseQueryResponse>> Handle(CaseQuery request, CancellationToken cancellationToken)
        {
                var cases = await this._caseRepository.GetAll(request);
                var result = this._mapper.Map<IEnumerable<CaseQueryResponse>>(cases);
                foreach (var caseElement in result)
                {
                    var newElement = await this._newsRepository.GetNewByCase(caseElement.ActualStageId, caseElement.BusinessUnitId, caseElement.Id);
                    if(newElement != null)
                    caseElement.News = _mapper.Map<NewsQueryResponse>(newElement);
                }
                return result;
        }
    }
}
