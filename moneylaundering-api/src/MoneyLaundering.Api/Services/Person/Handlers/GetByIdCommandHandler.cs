using AutoMapper;
using MediatR;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Services.Person.Handlers
{
    public class GetByIdCommandHandler : IRequestHandler<PersonByIdQuery, PersonQueryResponse>
    {
        private readonly IPersonRepository _personRepository;
        private readonly IMapper _mapper;

        public GetByIdCommandHandler(IPersonRepository personRepository, IMapper mapper)
        {
            this._personRepository = personRepository ?? throw new ArgumentNullException(nameof(personRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<PersonQueryResponse> Handle(PersonByIdQuery request, CancellationToken cancellationToken)
        {
            var resp = await this._personRepository.GetById(request.id);

            if (resp == null)
                throw new NoActionException(Crosscutting.Globalization.Message.PersonsNotFound);

            var result = this._mapper.Map<PersonQueryResponse>(resp);

            return result;
        }
    }
}
