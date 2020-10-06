using AutoMapper;
using MediatR;
using MoneyLaundering.Api.Crosscutting.Globalization;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Services.DocumentType.Handlers
{
    public class GetAllCommandHandler : IRequestHandler<DocumentTypeQuery, IEnumerable<DocumentTypeQueryResponse>>
    {
        private readonly IRepository<Domain.Entities.DocumentType> documentTypeRepository;
        private readonly IMapper mapper;

        public GetAllCommandHandler(IRepository<Domain.Entities.DocumentType> documentTypeRepository, IMapper mapper)
        {
            this.documentTypeRepository = documentTypeRepository ?? throw new ArgumentNullException(nameof(documentTypeRepository));
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<DocumentTypeQueryResponse>> Handle(DocumentTypeQuery request, CancellationToken cancellationToken)
        {

            var documentTypes = documentTypeRepository.All<DocumentTypeQueryResponse>();
                 
            if (documentTypes.Count() > 0)
            {   
                return documentTypes.OrderBy(x => x.Description);
            }

            throw new NoDocumentResultsWithPersonId(Message.DocumentNotFound);
        }
    }
}
