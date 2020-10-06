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

namespace MoneyLaundering.Api.Services.NewsReasonType.Handlers
{
    public class GetAllCommandHandler : IRequestHandler<NewsReasonQuery, IEnumerable<NewsReasonQueryResponse>>
    {
        private readonly INewsReasonRepository _newsReasonRepository;
        private readonly IMapper _mapper;

        public GetAllCommandHandler(INewsReasonRepository newsReasonTypeRepository, IMapper mapper)
        {
            this._newsReasonRepository = newsReasonTypeRepository ?? throw new ArgumentNullException(nameof(newsReasonTypeRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        public async Task<IEnumerable<NewsReasonQueryResponse>> Handle(NewsReasonQuery request, CancellationToken cancellationToken)
        {
            var reasons = await this._newsReasonRepository.GetAll(request.id);
            var result = this._mapper.Map<IEnumerable<NewsReasonQueryResponse>>(reasons);

            if (result.Count() == 0)
                throw new NoActionException(Crosscutting.Globalization.Message.NewsReasonsNotFound);
            return result;
        }
    }
}
