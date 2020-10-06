using AutoMapper;
using MediatR;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Services.DocumentLetterType.Handlers
{
    public class GetAllCommandHandler: IRequestHandler<DocumentLetterTypeQuery, IEnumerable<DocumentLetterTypeQueryResponse>>
    {
        private readonly IDocumentLetterTypeRepository _DocumentLetterTypeRepository;
        private readonly IMapper _mapper;

        public GetAllCommandHandler(IDocumentLetterTypeRepository DocumentLetterTypeRepository, IMapper mapper)
        {
            this._DocumentLetterTypeRepository = DocumentLetterTypeRepository ?? throw new ArgumentNullException(nameof(DocumentLetterTypeRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<DocumentLetterTypeQueryResponse>> Handle(DocumentLetterTypeQuery request, CancellationToken cancellationToken)
        {
            var resp = await this._DocumentLetterTypeRepository.GetAll();

            if (resp.Count() == 0)
                throw new NoActionException(Crosscutting.Globalization.Message.DocumentLetterTypeNotFound);

            var result = this._mapper.Map<IEnumerable<DocumentLetterTypeQueryResponse>>(resp);
            return result;
        }
    }
}
