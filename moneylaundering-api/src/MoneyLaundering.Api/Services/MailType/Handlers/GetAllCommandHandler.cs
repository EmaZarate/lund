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

namespace MoneyLaundering.Api.Services.MailType.Handlers
{
    public class GetAllCommandHandler: IRequestHandler<MailTypeQuery, IEnumerable<MailTypeQueryResponse>>
    {
        private readonly IMailTypeRepository _MailTypeRepository;
        private readonly IMapper _mapper;

        public GetAllCommandHandler(IMailTypeRepository MailTypeRepository, IMapper mapper)
        {
            this._MailTypeRepository = MailTypeRepository ?? throw new ArgumentNullException(nameof(MailTypeRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<MailTypeQueryResponse>> Handle(MailTypeQuery request, CancellationToken cancellationToken)
        {
            var resp = await this._MailTypeRepository.GetAll();

            if (resp.Count() == 0)
                throw new NoActionException(Crosscutting.Globalization.Message.MailTypeNotFound);

            var result = this._mapper.Map<IEnumerable<MailTypeQueryResponse>>(resp);
            return result;
        }
    }
}
