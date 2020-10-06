using AutoMapper;
using MediatR;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Services.news.Handlers
{
    public class GetByIdCommandHandler : IRequestHandler<NewsByIdQuery, NewsQueryResponse>
    {
        private readonly INewsRepository _newsRepository;
        private readonly IMapper _mapper;

        public GetByIdCommandHandler(INewsRepository newsRepository, IMapper mapper)
        {
            this._newsRepository = newsRepository ?? throw new ArgumentNullException(nameof(newsRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<NewsQueryResponse> Handle(NewsByIdQuery request, CancellationToken cancellationToken)
        {
            var entity = await this._newsRepository.GetNewsById(request.id);
            if (entity == null)
                throw new NoActionException(Crosscutting.Globalization.Message.NewsNotFound);
            var result = this._mapper.Map<NewsQueryResponse>(entity);
            return result;
        }
    }
}
