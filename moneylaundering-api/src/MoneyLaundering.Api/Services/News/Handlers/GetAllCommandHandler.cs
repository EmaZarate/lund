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

namespace MoneyLaundering.Api.Services.News.Handlers
{
    public class GetAllCommandHandler : IRequestHandler<NewsQuery, IEnumerable<NewsQueryResponse>>
    {
        private readonly INewsRepository _newsRepository;
        private readonly IMapper _mapper;

        public GetAllCommandHandler(INewsRepository newsRepository, IMapper mapper)
        {
            this._newsRepository = newsRepository ?? throw new ArgumentNullException(nameof(newsRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        public async Task<IEnumerable<NewsQueryResponse>> Handle(NewsQuery request, CancellationToken cancellationToken)
        {
            IEnumerable<NewsQueryResponse> res = await this._newsRepository.GetNewByCaseAndBussinessUnit(request.CaseId, request.BusinessUnitId);
            if (res.Count() == 0)
                throw new NoActionException(Crosscutting.Globalization.Message.NewsNotFoundInCase);
            return res;
        }
    }
}
