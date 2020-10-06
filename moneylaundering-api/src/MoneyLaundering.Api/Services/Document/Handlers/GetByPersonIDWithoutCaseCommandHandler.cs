using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Repositories.Interfaces;


namespace MoneyLaundering.Api.Services.Document.Handlers
{
    public class GetByPersonIDWithoutCaseCommandHandler : IRequestHandler<DocumentByPersonIdWithoutCaseQuery, IEnumerable<DocumentQueryResponse>>
    {
        private readonly IDocumentRepository _documentRepository;
        public GetByPersonIDWithoutCaseCommandHandler(IDocumentRepository documentRepository)
        {
            this._documentRepository = documentRepository ?? throw new ArgumentNullException(nameof(documentRepository));
        }

        public async Task<IEnumerable<DocumentQueryResponse>> Handle(DocumentByPersonIdWithoutCaseQuery request, CancellationToken cancellationToken)
        {
            return await this._documentRepository.DeleteByPersonIdWithoutCase(request.id);
        }
    }
}
