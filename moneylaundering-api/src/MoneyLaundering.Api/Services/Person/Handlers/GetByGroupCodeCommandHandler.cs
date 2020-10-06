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

namespace MoneyLaundering.Api.Services.Person.Handlers
{
    public class GetByGroupCodeCommandHandler : IRequestHandler<PersonGroupQuery, IEnumerable<PersonGroupQueryResponse>>
    {
        private readonly IPersonRepository _personRepository;
        private readonly IMapper _mapper;

        public GetByGroupCodeCommandHandler(IPersonRepository personRepository, IMapper mapper)
        {
            this._personRepository = personRepository ?? throw new ArgumentNullException(nameof(personRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        public async Task<IEnumerable<PersonGroupQueryResponse>> Handle(PersonGroupQuery request, CancellationToken cancellationToken)
        {
            var resp = await this._personRepository.GetByGroupCode(request.id);

            if (resp.Count() == 0)
                throw new NoActionException(Crosscutting.Globalization.Message.PersonsNotFound);

            var result = this._mapper.Map<IEnumerable<PersonGroupQueryResponse>>(resp);
            return result;
        }
    }
}
