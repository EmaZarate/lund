using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using MoneyLaundering.Api.Dto.Commands.Request;
using MoneyLaundering.Api.Repositories.Interfaces;


namespace MoneyLaundering.Api.Services.CaseDocument.Handlers
{
    public class NewCaseDocumentCommandHandler : IRequestHandler<CaseDocumentCommand, bool>
    {
        private readonly IMapper _mapper;
        private readonly ICaseDocumentRepository caseDocumentReposotory;
        public NewCaseDocumentCommandHandler(IMapper mapper, ICaseDocumentRepository caseDocumentRepository)
        {
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.caseDocumentReposotory = caseDocumentRepository ?? throw new ArgumentNullException(nameof(caseDocumentRepository));
        }
        public async Task<bool> Handle(CaseDocumentCommand request, CancellationToken cancellationToken)
        {
            await this.caseDocumentReposotory.SaveAsync(_mapper.Map<Domain.Entities.CaseDocument>(request));
            return true;
        }
    }
}
