using MediatR;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Services.Document.Handlers
{
    public class GetAllCommandHandler : IRequestHandler<DocumentByIdQuery, IEnumerable<DocumentQueryResponse>>
    {
        private readonly IDocumentRepository _documentRepository;

        public GetAllCommandHandler(IDocumentRepository documentRepository)
        {
            this._documentRepository = documentRepository ?? throw new ArgumentNullException(nameof(documentRepository));
        }

        public async Task<IEnumerable<DocumentQueryResponse>> Handle(DocumentByIdQuery request, CancellationToken cancellationToken)
        {
            return await this._documentRepository.GetDocumentByPersonId(request.id);
        }
    }
}
