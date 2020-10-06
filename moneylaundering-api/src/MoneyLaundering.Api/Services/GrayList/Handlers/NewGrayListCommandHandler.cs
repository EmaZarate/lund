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
    public class NewGrayListCommandHandler : IRequestHandler<GrayListCommand, bool>
    {
        private readonly IGrayListRepository grayListRepository;
        private readonly IPersonRepository personRepository;
        private readonly IMapper _mapper;

        public NewGrayListCommandHandler(IGrayListRepository grayListRepository, IPersonRepository personRepository, IMapper mapper)
        {
            this.grayListRepository = grayListRepository ?? throw new ArgumentNullException(nameof(grayListRepository));
            this.personRepository = personRepository ?? throw new ArgumentNullException(nameof(personRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        public async Task<bool> Handle(GrayListCommand command, CancellationToken cancellationToken)
        {
            var docIds = command.DocumentId.Where(x => x != null).Select(x => x.Value).ToList();
            var result = await this.grayListRepository.AddNew(command);
            if (docIds.Count > 0)
            {
                await this.grayListRepository.AddDocument(result.Id, docIds);
                var saving = await this.grayListRepository.SaveAsync();
                if (saving)
                    return true;
                else
                {
                    var deleteResult = await grayListRepository.DeleteAsync(result);
                    return false;
                }
            }
            return true;
        }
    }
}
