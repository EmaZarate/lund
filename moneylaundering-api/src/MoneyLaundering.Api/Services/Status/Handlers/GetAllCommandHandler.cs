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

namespace MoneyLaundering.Api.Services.Status.Handlers
{
    public class GetAllCommandHandler : IRequestHandler<StatusQuery, IEnumerable<StatusQueryResponse>>
    {
        private readonly IStatusRepository _statusRepository;
        private readonly IMapper _mapper;

        public GetAllCommandHandler(IStatusRepository caseRepository, IMapper mapper)
        {
            this._statusRepository = caseRepository ?? throw new ArgumentNullException(nameof(caseRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<StatusQueryResponse>> Handle(StatusQuery request, CancellationToken cancellationToken)
        {
            var status = await this._statusRepository.GetAll();
            if (status.Count() == 0)
                throw new NoActionException(Crosscutting.Globalization.Message.StatusNotFound);    
            var result = this._mapper.Map<IEnumerable<StatusQueryResponse>>(status);
            return result;
        }
    }
}
