using AutoMapper;
using MediatR;
using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Dto.Commands.Request;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Services.Document.Handlers
{
    public class UploadDocumentCommandHandler : IRequestHandler<UploadDocumentCommand, DocumentQueryResponse>
    {
        private readonly IFileRepository fileRepository;
        private readonly IDocumentRepository documentRepository;
        private readonly IDocumentVersionRepository documentVersionRepository;
        private readonly IMapper _mapper;

        public UploadDocumentCommandHandler(IFileRepository fileRepository, IDocumentRepository documentRepository,IMapper mapper, IDocumentVersionRepository documentVersionRepository)
        {
            this.fileRepository = fileRepository ?? throw new ArgumentNullException(nameof(fileRepository));
            this.documentRepository = documentRepository ?? throw new ArgumentNullException(nameof(documentRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.documentVersionRepository = documentVersionRepository ?? throw new ArgumentNullException(nameof(documentVersionRepository));
        }

        public async Task<DocumentQueryResponse> Handle(UploadDocumentCommand request, CancellationToken cancellationToken)
        {
            var document = _mapper.Map<UploadDocumentCommand, Domain.Entities.Document>(request);
            string filePath;
            document.DocumentVersions = new List<DocumentVersion>();
            document.DocumentVersions.Add(new Domain.Entities.DocumentVersion()
            {
                VersionId = 1,
                PhysicalName = "",
                CreateDate = DateTime.Today,
                Comment = request.Comment,
                Expiration = request.Expiration,
            });
            if (request.CaseId != null)
            {
                document.CaseDocuments = new List<Domain.Entities.CaseDocument>();
                document.CaseDocuments.Add(new Domain.Entities.CaseDocument()
                {
                    CaseId = (int)request.CaseId,
                    BusinessUnitId = request.BusinessUnit
                });
            }
            document.LogicName = request.LogicName;
            var newDocument = await this.documentRepository.UploadDocument(document);
            filePath = $"{newDocument.Id}_{newDocument.DocumentVersions.FirstOrDefault().VersionId}_{request.DocumentEvidence.FileName}";
            filePath = await this.fileRepository.AddAsync(request.DocumentEvidence, filePath);
            newDocument.DocumentVersions.FirstOrDefault().PhysicalName = filePath;
            await this.documentVersionRepository.Update(newDocument.DocumentVersions.FirstOrDefault());
            return this._mapper.Map<Domain.Entities.Document, DocumentQueryResponse>(newDocument);

        }
    }
}
