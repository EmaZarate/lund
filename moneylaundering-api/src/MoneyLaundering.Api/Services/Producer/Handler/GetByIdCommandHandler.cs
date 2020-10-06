using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Repositories.Interfaces;

namespace MoneyLaundering.Api.Services.Producer.Handler
{
    public class GetByIdCommandHandler : IRequestHandler<ProducerByIdQuery, ProducerQueryResponse>
    {
        private readonly IMapper _mapper;
        private readonly IProducerRepository _producerRepository;
        public GetByIdCommandHandler(IMapper mapper, IProducerRepository producerRepository)
        {
            this._producerRepository = producerRepository ?? throw new ArgumentNullException(nameof(producerRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        public async Task<ProducerQueryResponse> Handle(ProducerByIdQuery request, CancellationToken cancellationToken)
        {
            return _mapper.Map<ProducerQueryResponse>(await this._producerRepository.GetAsync(request.Id));
        }
    }
}
