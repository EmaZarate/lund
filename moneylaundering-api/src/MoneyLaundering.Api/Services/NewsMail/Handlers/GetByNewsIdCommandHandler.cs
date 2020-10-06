using AutoMapper;
using MediatR;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Services.NewsMail.Handlers
{
    public class GetByNewsIdCommandHandler : IRequestHandler<NewsMailQuery, NewsMailQueryResponse>
    {
        private readonly INewsMailRepository _newsMailRepository;
        private readonly IMapper _mapper;

        public GetByNewsIdCommandHandler(INewsMailRepository newsMailRepository, IMapper mapper)
        {
            this._newsMailRepository = newsMailRepository ?? throw new ArgumentNullException(nameof(newsMailRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<NewsMailQueryResponse> Handle(NewsMailQuery request, CancellationToken cancellationToken)
        {
            var entity = await this._newsMailRepository.GetByNewsId(request.NewsId);
            if (entity == null)
                throw new NoActionException(Crosscutting.Globalization.Message.NewsNotFound);
            var result = this._mapper.Map<NewsMailQueryResponse>(entity);
            return result;
        }
    }
}
