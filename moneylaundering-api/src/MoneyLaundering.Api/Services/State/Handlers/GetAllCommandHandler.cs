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

namespace MoneyLaundering.Api.Services.State.Handlers
{
    public class GetAllCommandHandler : IRequestHandler<StateQuery, IEnumerable<StateQueryResponse>>
    {
        private readonly IStateRepository _stateRepository;
        private readonly IMapper _mapper;

        public GetAllCommandHandler(IStateRepository stateRepository, IMapper mapper)
        {
            this._stateRepository = stateRepository ?? throw new ArgumentNullException(nameof(stateRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<StateQueryResponse>> Handle(StateQuery request, CancellationToken cancellationToken)
        {
           
                var states = await this._stateRepository.GetAll();
                var result = this._mapper.Map<IEnumerable<StateQueryResponse>>(states);               
                
            if(result.Count() > 0)
                return result;
            else
                throw new NoActionException(Crosscutting.Globalization.Message.StatesNotFound);
        }
    }
}
