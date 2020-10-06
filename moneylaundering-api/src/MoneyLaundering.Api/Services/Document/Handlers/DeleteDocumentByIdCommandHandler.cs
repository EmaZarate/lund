using MediatR;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Services.Document.Handlers
{
    public class DeleteDocumentByIdCommandHandler : IRequestHandler<DocumentIdQuery, bool>
    {
        private readonly IDocumentRepository _documentRepository;
        private readonly ICaseRepository _caseRepository;
        private readonly IFileRepository _fileRepository;

        public DeleteDocumentByIdCommandHandler(IDocumentRepository documentRepository, ICaseRepository caseRepository, IFileRepository fileRepository)
        {
            this._documentRepository = documentRepository ?? throw new ArgumentNullException(nameof(documentRepository));
            this._caseRepository = caseRepository ?? throw new ArgumentNullException(nameof(caseRepository));
            this._fileRepository = fileRepository ?? throw new ArgumentNullException(nameof(fileRepository));
        }

        public async Task<bool> Handle(DocumentIdQuery request, CancellationToken cancellationToken)
        {
            var document = await this._documentRepository.GetById(request.ID);
            if (document == null)
                throw new DocumentNotFoundException(Crosscutting.Globalization.Message.DocumentNotFound);
            if (await this._documentRepository.IsDocumentInGrayList(request.ID))
                throw new DocumentInGrayListException(Crosscutting.Globalization.Message.DocumentInGrayList);
            var cases = await this._caseRepository.GetCaseByDocumentID(request.ID);
            if (cases.Count() <= 1)
            foreach (var documentVersion in document.DocumentVersions)
            {
               await _fileRepository.DeleteAsync(documentVersion.PhysicalName);
            }
            return await this._documentRepository.DeleteById(request.ID);
            throw new DocumentInMultipleCasesException(Crosscutting.Globalization.Message.DocumentInMultipleCases);
        }
    }
}
