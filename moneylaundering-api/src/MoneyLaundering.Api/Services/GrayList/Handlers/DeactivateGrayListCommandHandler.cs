using AutoMapper;
using MediatR;
using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Dto.Commands.Request;
using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Services.GrayList.Handlers
{
    public class DeactivateGrayListCommandHandler : IRequestHandler<GrayListDeactivateCommand, bool>
    {
        private readonly IGrayListRepository grayListRepository;
        private readonly IPersonRepository personRepository;
        private readonly IMapper _mapper;

        public DeactivateGrayListCommandHandler(IGrayListRepository grayListRepository, IPersonRepository personRepository, IMapper mapper)
        {
            this.grayListRepository = grayListRepository ?? throw new ArgumentNullException(nameof(grayListRepository));
            this.personRepository = personRepository ?? throw new ArgumentNullException(nameof(personRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        public async Task<bool> Handle(GrayListDeactivateCommand command, CancellationToken cancellationToken)
        {
            var entity = await this.grayListRepository.GetByGrayListId(command.GrayListId);
            entity.DeactivateGrayListItem(command.Active);
            var result = await this.grayListRepository.SaveAsync();

            return result;
        }
    }
}
