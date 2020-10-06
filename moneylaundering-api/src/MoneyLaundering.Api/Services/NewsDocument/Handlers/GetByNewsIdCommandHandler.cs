using AutoMapper;
using MediatR;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Services.NewsDocument.Handlers
{
    public class GetByNewsIdCommandHandler : IRequestHandler<NewsDocumentQuery, NewsDocumentQueryResponse>
    {
        private readonly INewsDocumentRepository _NewsDocumentRepository;
        private readonly IMapper _mapper;

        public GetByNewsIdCommandHandler(INewsDocumentRepository NewsDocumentRepository, IMapper mapper)
        {
            this._NewsDocumentRepository = NewsDocumentRepository ?? throw new ArgumentNullException(nameof(NewsDocumentRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<NewsDocumentQueryResponse> Handle(NewsDocumentQuery request, CancellationToken cancellationToken)
        {
            var entity = await this._NewsDocumentRepository.GetByNewsId(request.NewsId);
            if (entity == null)
                throw new NoActionException(Crosscutting.Globalization.Message.NewsNotFound);
            var result = this._mapper.Map<NewsDocumentQueryResponse>(entity);
            return result;
        }
    }
}
