using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Repositories.Interfaces;

namespace MoneyLaundering.Api.Services.Producer.Handler
{
    public class GetAllCommandHandler : IRequestHandler<ProducerQuery, IEnumerable<ProducerQueryResponse>>
    {
        private readonly IMapper _mapper;
        private readonly IProducerRepository _producerRepository;
        public GetAllCommandHandler(IMapper mapper, IProducerRepository producerRepository)
        {
            this._producerRepository = producerRepository ?? throw new ArgumentNullException(nameof(producerRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        public async Task<IEnumerable<ProducerQueryResponse>> Handle(ProducerQuery request, CancellationToken cancellationToken)
        {
            var a = _mapper.Map<IEnumerable<ProducerQueryResponse>>(await _producerRepository.GetAll(request));
            return a;
        }
    }
}
