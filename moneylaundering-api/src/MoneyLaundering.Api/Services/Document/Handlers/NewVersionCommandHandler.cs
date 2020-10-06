using AutoMapper;
using MediatR;
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
    public class NewVersionCommandHandler : IRequestHandler<NewVersionDocumentCommand, DocumentQueryResponse>
    {
        private readonly IFileRepository fileRepository;
        private readonly IDocumentRepository documentRepository;
        private readonly IMapper _mapper;
        public NewVersionCommandHandler(IFileRepository fileRepository, IDocumentRepository documentRepository, IMapper mapper)
        {
            this.fileRepository = fileRepository ?? throw new ArgumentNullException(nameof(fileRepository));
            this.documentRepository = documentRepository ?? throw new ArgumentNullException(nameof(documentRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<DocumentQueryResponse> Handle(NewVersionDocumentCommand request, CancellationToken cancellationToken)
        {
            string filePath;
            var document = await this.documentRepository.GetAsync(request.DocumentId);
            filePath = $"{document.Id}_{request.VersionId}_{request.DocumentEvidence.FileName}";
            filePath = await this.fileRepository.AddAsync(request.DocumentEvidence, filePath);
            document.DocumentTypeId = request.DocumentTypeId;
            document.DocumentVersions.Add(new Domain.Entities.DocumentVersion()
            {
                VersionId = request.VersionId,
                PhysicalName = filePath,
                CreateDate = DateTime.Today,
                Comment = request.Comment,
                Expiration = request.Expiration,
            });
            await this.documentRepository.Update(document);
            return this._mapper.Map<Domain.Entities.Document, DocumentQueryResponse>(document);
        }
    }
}
