using AutoMapper;
using MediatR;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Services.State.Handlers
{
    public class GetByIdCommandHandler : IRequestHandler<StateByIdQuery, StateQueryResponse>
    {
        private readonly IStateRepository _stateRepository;
        private readonly IMapper _mapper;

        public GetByIdCommandHandler(IStateRepository stateRepository, IMapper mapper)
        {
            this._stateRepository = stateRepository ?? throw new ArgumentNullException(nameof(stateRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<StateQueryResponse> Handle(StateByIdQuery request, CancellationToken cancellationToken)
        {
            var state = await this._stateRepository.GetById(request.id);
            var result = this._mapper.Map<StateQueryResponse>(state);

            if(result == null)
            {
                throw new NoActionException(Crosscutting.Globalization.Message.StatesNotFound);
            }

            return result;
        }
    }
}
