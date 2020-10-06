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

namespace MoneyLaundering.Api.Services.GrayList.Handlers
{
    public class GetAllLengthCommandHandler : IRequestHandler<GrayListLengthQuery, int>
    {
        private readonly IGrayListRepository grayListRepository;
        private readonly IMapper _mapper;

        public GetAllLengthCommandHandler(IGrayListRepository grayListRepository, IMapper mapper)
        {
            this.grayListRepository = grayListRepository ?? throw new ArgumentNullException(nameof(grayListRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        public async Task<int> Handle(GrayListLengthQuery request, CancellationToken cancellationToken)
        {
            var grayListLength = await this.grayListRepository
                                .GetLength
                                (
                                    x => (request.Active != null ? (x.Active == request.Active) : true)
                                    &&
                                    ((request.Cuit == null || request.Cuit.Trim() == "" || x.Person.Cuit.Contains(request.Cuit)))
                                    &&
                                    ((request.FullName == null || request.FullName.Trim() == "" || (x.Person.FirstName + " " + x.Person.LastName).ToLower().Contains(request.FullName)))
                                );
           
            return grayListLength;
        }
    }
}
