using MediatR;
using MoneyLaundering.Api.Dto.Commands.Request;
using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Services.Person.Handlers
{
    public class BusinessUnitUpdateCommandHandler : IRequestHandler<PersonBusinessUnitCommand, bool>
    {
        private readonly IPersonRepository _personRepository;

        public BusinessUnitUpdateCommandHandler(IPersonRepository personRepository)
        {
            this._personRepository = personRepository ?? throw new ArgumentNullException(nameof(personRepository));
        }
        public async Task<bool> Handle(PersonBusinessUnitCommand request, CancellationToken cancellationToken)
        {
            var updated = await this._personRepository.BusinessUnitUpdate(request);
            if (!updated)
                throw new NoActionException(Crosscutting.Globalization.Message.CantUpdatePersonBusinessUnit);
            return true;
        }

    }
}
