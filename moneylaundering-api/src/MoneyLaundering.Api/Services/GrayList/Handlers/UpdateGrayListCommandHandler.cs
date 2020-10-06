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
    public class UpdateGrayListCommandHandler : IRequestHandler<GrayListUpdateCommand, bool>
    {
        private readonly IGrayListRepository grayListRepository;
        private readonly IPersonRepository personRepository;
        private readonly IMapper _mapper;

        public UpdateGrayListCommandHandler(IGrayListRepository grayListRepository, IPersonRepository personRepository, IMapper mapper)
        {
            this.grayListRepository = grayListRepository ?? throw new ArgumentNullException(nameof(grayListRepository));
            this.personRepository = personRepository ?? throw new ArgumentNullException(nameof(personRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        public async Task<bool> Handle(GrayListUpdateCommand command, CancellationToken cancellationToken)
        {
            var entity = await this.grayListRepository.GetByGrayListId(command.GrayListId);
            entity.UpdateComment(command.Comments);
            var grayListDocuments = await this.grayListRepository.GetDocumentById(command.GrayListId);
            List<int> newList = new List<int>();

            if (grayListDocuments.Count() > 0)
            {
            // It iterates the DocumentId list and dismiss the ones that already exist // 
                foreach (var eachDoc in grayListDocuments)
                {
                    foreach (var eachId in command.DocumentId)
                    {
                        if (eachDoc.DocumentId == eachId)
                        {
                            continue;
                        }
                        newList.Add(eachId);
                    }
                }
            } 
            else
            {
                foreach(var eachNewId in command.DocumentId)
                {
                    newList.Add(eachNewId);
                }
            }
            
            await this.grayListRepository.AddDocument(command.GrayListId, newList);
            var result = await this.grayListRepository.SaveAsync();

            return result;
        }
    }
}
